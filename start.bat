@echo off
echo Starting Inventory Management System...
echo.
echo Starting Backend Server on port 5000...
start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
echo.
echo Starting Frontend Server on port 3000...
start "Frontend Server" cmd /k "npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window (servers will continue running)...
pause >nul

