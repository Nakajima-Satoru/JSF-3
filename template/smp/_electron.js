const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
app.on('ready', () => {


  mainWindow = new BrowserWindow({
    width: 420, 
    height: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true
    },
    // frame:null,
  });

  mainWindow.setMenu(null);
  //mainWindow.setSkipTaskbar(true);
  mainWindow.setTitle("Electron Sample - Made With Javelin");
  
  mainWindow.loadURL('file://' + __dirname + '/_build/index.html');

  // ChromiumのDevツールを開く
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});