@echo off
echo Setting up Poetry Guestbook Terminal...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js found. Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Creating config file...
if not exist config.js (
    copy config.template.js config.js
    echo Config file created. Please edit config.js and add your OpenAI API key.
) else (
    echo Config file already exists.
)

echo.
echo Setup complete! 
echo.
echo To run the app: npm start
echo To build for distribution: npm run build-win
echo.
pause
