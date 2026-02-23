$backend = Start-Process powershell -ArgumentList "cd server; node index.js" -PassThru -NoNewWindow
Write-Host "Backend started with PID: $($backend.Id)"

$frontend = Start-Process powershell -ArgumentList "cd client; npm run dev" -PassThru -NoNewWindow
Write-Host "Frontend started with PID: $($frontend.Id)"

Write-Host "Smart Crowd Monitoring System is running!"
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:5173"
