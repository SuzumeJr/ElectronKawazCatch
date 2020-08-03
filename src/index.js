
// タイトルシーンをロード
function LoadSceneTitile()
{
    if(!cc.sys.isNative && document.getElementById("cocosLoading"))
    {
        document.body.removeChild(document.getElementById("cocosLoading"));
    }
    cc.view.enableRetina(false);
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(320, 480, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new TitleScene());
    }, this);
};

// 開始処理設定
cc.game.onStart = LoadSceneTitile;

// ゲーム開始
cc.game.run("gameCanvas");
