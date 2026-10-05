# Run from any directory: powershell -File scripts/prepare-gallery.ps1
# Keeps original photos and generates browser-sized copies plus gallery metadata.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$repo = Split-Path $PSScriptRoot -Parent
$source = Join-Path $repo 'public/gallery_images'
$output = Join-Path $source 'web'
$manifest = Join-Path $repo 'src/gallery.json'
$descriptions = @{}
if (Test-Path $manifest) {
    $existingPhotos = Get-Content $manifest -Raw | ConvertFrom-Json
    foreach ($existingPhoto in $existingPhotos) { $descriptions[$existingPhoto.src] = $existingPhoto.alt }
}
New-Item -ItemType Directory -Force $output | Out-Null
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$quality = New-Object System.Drawing.Imaging.EncoderParameters(1)
$quality.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
$prepared = @(Get-ChildItem $source -File | Where-Object Extension -Match '^\.(jpg|jpeg|png)$' | Sort-Object Name | ForEach-Object {
    $photo = [System.Drawing.Image]::FromFile($_.FullName)
    try {
        if ($photo.PropertyIdList -contains 274) {
            $orientation = [BitConverter]::ToUInt16($photo.GetPropertyItem(274).Value, 0)
            $rotations = @{ 2='RotateNoneFlipX'; 3='Rotate180FlipNone'; 4='Rotate180FlipX'; 5='Rotate90FlipX'; 6='Rotate90FlipNone'; 7='Rotate270FlipX'; 8='Rotate270FlipNone' }
            if ($rotations.ContainsKey([int]$orientation)) { $photo.RotateFlip([System.Enum]::Parse([System.Drawing.RotateFlipType], $rotations[[int]$orientation])) }
        }
        $scale = [Math]::Min(1.0, 1600 / [Math]::Max($photo.Width, $photo.Height))
        $width = [int][Math]::Round($photo.Width * $scale)
        $height = [int][Math]::Round($photo.Height * $scale)
        $bitmap = New-Object System.Drawing.Bitmap($width, $height)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try {
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.Clear([System.Drawing.Color]::Black)
            $graphics.DrawImage($photo, 0, 0, $width, $height)
            $name = $_.BaseName + '.jpg'
            $bitmap.Save((Join-Path $output $name), $encoder, $quality)
            $url = 'gallery_images/web/' + $name
            $description = if ($descriptions.ContainsKey($url)) { $descriptions[$url] } else { 'UCF HSI Battle of the Brains team gallery photo' }
            [ordered]@{ src = $url; width = $width; height = $height; orientation = $(if ($width -ge $height) { 'landscape' } else { 'portrait' }); alt = $description }
        } finally { $graphics.Dispose(); $bitmap.Dispose() }
    } finally { $photo.Dispose() }
})
$quality.Dispose()
$items = @(Get-ChildItem $output -File | Where-Object Extension -Match '^\.(jpg|jpeg|png|webp)$' | Sort-Object Name | ForEach-Object {
    $photo = [System.Drawing.Image]::FromFile($_.FullName)
    try {
        $width = $photo.Width
        $height = $photo.Height
        if ($photo.PropertyIdList -contains 274) {
            $orientation = [BitConverter]::ToUInt16($photo.GetPropertyItem(274).Value, 0)
            if ($orientation -in 5, 6, 7, 8) { $width = $photo.Height; $height = $photo.Width }
        }
        $url = 'gallery_images/web/' + $_.Name
        $description = if ($descriptions.ContainsKey($url)) { $descriptions[$url] } else { 'UCF HSI Battle of the Brains team gallery photo' }
        [ordered]@{ src = $url; width = $width; height = $height; orientation = $(if ($width -ge $height) { 'landscape' } else { 'portrait' }); alt = $description }
    } finally { $photo.Dispose() }
})
$json = ConvertTo-Json -InputObject $items -Depth 3
[System.IO.File]::WriteAllText($manifest, $json)
Write-Output "Prepared $($items.Count) gallery images."

