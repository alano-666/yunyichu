@echo off
chcp 65001 >nul
cd /d "D:\云衣橱"
echo.
echo   🌤️  云衣橱 - 正在启动...
echo   ─────────────────────────
echo   浏览器将自动打开 http://localhost:8765
echo   关闭此窗口即可停止服务
echo.
start "" "http://localhost:8765"
python -m http.server 8765
pause
