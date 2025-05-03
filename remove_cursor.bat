@echo off
echo Removing .cursor directory from GitHub repository...

REM Clone repository to a temp directory
git clone https://github.com/BabbbleGum/textpop.git temp-textpop
if %errorlevel% neq 0 (
    echo Error cloning repository.
    exit /b %errorlevel%
)

cd temp-textpop
if %errorlevel% neq 0 (
    echo Error changing directory.
    exit /b %errorlevel%
)

REM Configure Git
git config user.name "BabbbleGum"
git config user.email "131264087+BabbbleGum@users.noreply.github.com"

REM Remove .cursor directory
if exist .cursor (
    rmdir /s /q .cursor
    echo .cursor directory removed.
) else (
    echo .cursor directory not found.
)

REM Add changes to Git
git add -A

REM Commit changes
git commit -m "Remove .cursor directory from repository"
if %errorlevel% neq 0 (
    echo No changes to commit or error in commit.
    cd ..
    rmdir /s /q temp-textpop
    exit /b %errorlevel%
)

REM Push changes
git push
if %errorlevel% neq 0 (
    echo Error pushing changes. You might need to authenticate.
    cd ..
    rmdir /s /q temp-textpop
    exit /b %errorlevel%
)

cd ..
rmdir /s /q temp-textpop

echo Successfully removed .cursor directory from GitHub repository.
echo Remember: The .gitignore file has been updated to ignore .cursor/ and .cursorrules in future commits. 