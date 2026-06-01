Add-Type -AssemblyName System.Drawing
$inPath = "C:\Users\Admin\Downloads\hra-reality-gate-main\public\favicon.png"
$tmpPath = "C:\Users\Admin\Downloads\hra-reality-gate-main\public\favicon-crop.png"

$img = [System.Drawing.Image]::FromFile($inPath)
$bmp = New-Object System.Drawing.Bitmap($img)

$minX = $bmp.Width
$minY = $bmp.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

if ($minX -le $maxX -and $minY -le $maxY) {
    $width = $maxX - $minX + 1
    $height = $maxY - $minY + 1
    
    $size = [math]::Max($width, $height)
    $squareBmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($squareBmp)
    $padX = [math]::Floor(($size - $width) / 2)
    $padY = [math]::Floor(($size - $height) / 2)
    
    $srcRect = New-Object System.Drawing.Rectangle($minX, $minY, $width, $height)
    $destRect = New-Object System.Drawing.Rectangle($padX, $padY, $width, $height)
    $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $squareBmp.Save($tmpPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $squareBmp.Dispose()
    Write-Host "Cropped from $($bmp.Width)x$($bmp.Height) to $($size)x$($size)"
}
$img.Dispose()
$bmp.Dispose()
