'use strict';

const { app, BrowserWindow } = require('electron');
let mainWindow = null;

//console.log(process.versions);

// OS毎に異なる処理のLiblaryを読み込み
let PfLib = null; 
if (process.platform === 'darwin')
{
	// macOS用処理関数ライブラリ読込
	PfLib = require('./main_mac.js');
}
else
{
	// Windows用処理関数ライブラリ読込
	PfLib = require('./main_win.js');
}

// シングル起動ロック
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock)
{
	app.quit();	//ロックが取得出来ない場合は終了
}

// 二つ目以降のプロセスが起動された場合に呼ばれるイベント処理を登録
app.on('second-instance', (event, commandLine, workingDirectory) => {
	// ウインド有無判定
	if (null != mainWindow)
	{
		// 最小化されているかチェック
		if (mainWindow.isMinimized())
		{
			mainWindow.restore();	// 最小化を解除
		}

		// 二つ目のプロセスに替わって自分自身にフォーカスを当てる
		mainWindow.focus();
	}
});

//メインウインド生成処理
function createWindow()
{
	// mainWindowを作成（windowの大きさや、Kioskモードにするかどうかなどもここで定義できる）
	mainWindow = new BrowserWindow({
		width: 450,
		height: 700,
		webPreferences: {
			nodeIntegration: true
		}
	});
	
	// メニュー設定
	PfLib.MenuSettings();

	// Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	
	// ChromiumのDevツールを開く
	// mainWindow.webContents.openDevTools();
	
	//ウインドクローズ時イベント処理設定
	mainWindow.on('closed', function() {
		mainWindow = null;
	});	
}

//全てのウインドが閉じられた場合のイベント処理登録
app.on('window-all-closed', function (){
	app.quit();
});

//準備が出来たらウインド生成処理を呼ぶ
app.whenReady().then(createWindow);
