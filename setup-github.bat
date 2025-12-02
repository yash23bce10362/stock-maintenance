@echo off
echo ========================================
echo GitHub Setup Script
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Run the installer
    echo 3. Restart Command Prompt and run this script again
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Check if already a git repository
if exist ".git" (
    echo [WARNING] Git repository already initialized
    set /p continue="Continue anyway? (y/n): "
    if /i not "%continue%"=="y" exit /b
) else (
    echo Initializing Git repository...
    git init
    echo [OK] Repository initialized
    echo.
)

echo Adding files to Git...
git add .
echo [OK] Files added
echo.

echo Creating initial commit...
git commit -m "Initial commit: Full-stack Inventory Management System"
echo [OK] Commit created
echo.

echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Create a new repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Name: inventory-management-system
echo    - Visibility: Public
echo    - DO NOT initialize with README
echo.
echo 2. Connect and push:
echo    git remote add origin https://github.com/YOUR_USERNAME/inventory-management-system.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo For detailed instructions, see: GITHUB_SETUP.md
echo.
pause

