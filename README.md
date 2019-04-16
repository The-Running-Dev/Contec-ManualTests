# Manual Tests Angular Implementation

1. Install NodeJS either manually or through Choclatey (see Below for Chocolatey installation)
2. Open CMD as administrator and change the directory to the "ManualTests" project directory
3. Install all the node modules by running: "npm install"
4. Install "gulp" and "bower" globally by running: "npm install gulp bower -g"
5. Update the bower components by running: "bower update"
6. Start the TypeScript trinspiler, watcher and lite server with: "gulp serve-dev"

## Running the Application
* To run in IIS, just create an application that points to the root of the "ManualTests" directory
* To run under IIS Express:
** In Visual Studio go to Project/ManualTests Properties, go to Web
** Click on "Create Virtual Directory"
** Run from Visual Studio (F5 or Debug/Start Debugging)
* To run the client app only: "gulp serve-dev" (Development) or "guld serve-build" (Production)

## How to Install Chocolatey

1. Rnn CMD as an adminsitrator
2. Copy/paste and run the following command:
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

## How to Install NodeJS through Chocolatey

1. Rnn CMD as an adminsitrator
2. Copy/paste and run the following command:
choco install nodejs.install -y