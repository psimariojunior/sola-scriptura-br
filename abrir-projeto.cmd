@echo off
echo =============================================
echo   Sola Scriptura BR - Sincronizando...
echo =============================================
echo.

cd /d "%~dp0"

echo [1/2] Puxando atualizacoes do GitHub...
"C:\Program Files\Git\cmd\git.exe" pull origin main
if %errorlevel% neq 0 (
    echo.
    echo [!] Atencao: houve um erro ao puxar. Verifique o Git.
    pause
    exit /b 1
)

echo.
echo [2/2] Abrindo no VS Code...
code .

echo.
echo Pronto! Projeto sincronizado e aberto.
timeout /t 3 >nul
