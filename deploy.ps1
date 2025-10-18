#!/usr/bin/env pwsh

# Tic-Tac-Toe GitHub Pages Deployment Script
# This script helps you deploy to GitHub Pages

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Tic-Tac-Toe GitHub Pages Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    git --version | Out-Null
}
catch {
    Write-Host "❌ Git is not installed. Please install Git from https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Get GitHub username
Write-Host "📝 Enter your GitHub username:" -ForegroundColor Yellow
$username = Read-Host

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username cannot be empty" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Setting up deployment..." -ForegroundColor Cyan
Write-Host ""

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Add remote
Write-Host "🔗 Configuring GitHub remote..." -ForegroundColor Yellow
$remote_url = "https://github.com/$username/tic-tac-toe.git"

git remote remove origin -ErrorAction SilentlyContinue
git remote add origin $remote_url

Write-Host "✅ Remote configured: $remote_url" -ForegroundColor Green
Write-Host ""

# Deploy
Write-Host "🚀 Deploying to GitHub Pages..." -ForegroundColor Yellow
git subtree push --prefix dist origin gh-pages

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ Deployment Successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎮 Your game is now live at:" -ForegroundColor Green
    Write-Host "https://$username.github.io/tic-tac-toe/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⏱️  GitHub Pages may take 2-5 minutes to deploy." -ForegroundColor Yellow
    Write-Host "🔄 Refresh the page if it doesn't appear immediately." -ForegroundColor Yellow
}
else {
    Write-Host "❌ Deployment failed. Make sure:" -ForegroundColor Red
    Write-Host "1. Repository 'tic-tac-toe' exists on GitHub" -ForegroundColor Red
    Write-Host "2. You have permission to push to the repository" -ForegroundColor Red
    exit 1
}
