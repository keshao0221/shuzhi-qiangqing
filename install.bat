@echo off
chcp 65001 >nul
echo ========================================
echo     数智强青 - 一键安装脚本
echo ========================================
echo.

echo [1/3] 正在安装前端依赖...
call npm install
if %errorlevel% neq 0 (
    echo 前端依赖安装失败！
    pause
    exit /b 1
)
echo 前端依赖安装完成！
echo.

echo [2/3] 正在安装后端依赖...
cd server
call npm install
if %errorlevel% neq 0 (
    echo 后端依赖安装失败！
    pause
    exit /b 1
)
echo 后端依赖安装完成！
cd ..
echo.

echo [3/3] 正在生成 Prisma 客户端...
cd server
call npx prisma generate
if %errorlevel% neq 0 (
    echo Prisma 客户端生成失败！
    pause
    exit /b 1
)
cd ..
echo Prisma 客户端生成完成！
echo.

echo ========================================
echo     所有依赖安装成功！
echo ========================================
echo.
echo 下一步：
echo   1. 复制 .env.example 为 .env 并配置环境变量
echo   2. 复制 server/.env.example 为 server/.env 并配置环境变量
echo   3. 运行 npm run dev 启动前端
echo   4. 在 server 目录运行 npm run dev 启动后端
echo.
pause
