# Runs Web on Windows PowerShell
$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent

# Start Web in foreground
$webPath = Join-Path $repo 'apps\web'
Write-Host "Starting Web from $webPath" -ForegroundColor Cyan
Set-Location $webPath
npm run dev
