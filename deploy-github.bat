@echo off
title GitHub Pages Deployer - DangerCR7
color 0b
echo =======================================================================
echo         GITHUB PAGES AUTO-DEPLOYER FOR DangerCR7
echo =======================================================================
echo.
echo Before proceeding, please ensure you have:
echo 1. Logged into GitHub in your browser.
echo 2. Created a new repository named "prep-sheet" at:
echo    https://github.com/new
echo    (Keep it public and do NOT initialize with a README or .gitignore)
echo.
echo Press any key when you have created the repository...
pause > nul
echo.
echo Initializing Git repository...
git init
echo.
echo Adding files to commit...
git add index.html styles.css app.js data.js server.js DEPLOY.md
echo.
echo Creating local commit...
git commit -m "Initialize SDE Prep Sheet dashboard"
echo.
echo Setting branch to main...
git branch -M main
echo.
echo Linking to your remote repository...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/DangerCR7/prep-sheet.git
echo.
echo Pushing code to GitHub (You may be prompted to log in/authorize)...
git push -u origin main --force
echo.
echo =======================================================================
echo  DEPLOYMENT SENT TO GITHUB SUCCESSFUL!
echo =======================================================================
echo.
echo To make the website live on the web:
echo 1. Open: https://github.com/DangerCR7/prep-sheet/settings/pages
echo 2. Under "Build and deployment" -> "Branch", choose "main" and "/ (root)".
echo 3. Click "Save".
echo.
echo In 1-2 minutes, your dashboard will be live at:
echo https://DangerCR7.github.io/prep-sheet/
echo.
echo =======================================================================
pause
