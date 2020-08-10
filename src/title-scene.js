/**
 * ゲーム開始処理
 */
function SceneTitleGameStart()
{
    var scene = new MainScene();
    var transition = new cc.TransitionPageTurn(0.5, scene, true);
    cc.director.runScene(transition);
}

/**
 * ゲーム開始イベント処理
 */
function SceneTitleEventGameStart(touch, event)
{
    // タイトル画面の音を止める
    cc.audioEngine.playEffect(res.decideEffect);
    
    // 何度も押せないように一度押したらアクションを無効化する
    cc.eventManager.removeListener(listener);
    
    // ５秒待つアクションを生成
    var delay = cc.delayTime(0.5);
    
    // ゲーム開始関数を呼ぶアクションを生成
    var startGame = cc.callFunc(SceneTitleGameStart, this.ownerScene_);
    
    // アクションを組み立てて”0.5秒待ってからゲーム開始”のアクションを生成する
    var seqAction = cc.sequence(delay, startGame);

    // アクションを実行
    this.ownerScene_.runAction(seqAction);
    
    return true;
}

/**
 *  シーン初期処理
 */
function SceneTitleInit()
{
    this._super();

    var winSize = cc.director.getWinSize();

    // 背景の追加
    var background = new cc.Sprite(res.titleBackground);
    background.setPosition(cc.p(winSize.width / 2.0, winSize.height / 2.0));
    this.addChild(background);

    // ロゴの追加
    var logo = new cc.Sprite(res.titleLogo);
    logo.setPosition(cc.p(winSize.width / 2.0, winSize.height - 150));
    this.addChild(logo);

    // スタート表示の生成
    var touchToStart = new cc.Sprite(res.titleStart);
    touchToStart.setPosition(cc.p(winSize.width / 2.0, 90));
    // 点滅させるアクションの定義
    var blink = cc.sequence(cc.fadeTo(0.5, 127), cc.fadeTo(0.5, 255));  // フェードアウト、フェードインのシーケンスアクション
    var blinkLoop = cc.repeatForever(blink);    // 破棄されるまで永遠に繰り返すアクションを生成
    touchToStart.runAction(blinkLoop);  // アクションを登録 

    // スタート表示を登録
    this.addChild(touchToStart);

    // 画面をタッチしたときにゲーム開始イベント処理を呼ぶように設定
    var listener = cc.eventManager.addListener({
        ownerScene_: this,
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        onTouchBegan: SceneTitleGameStart,
    }, this);
}

/**
 *  演出設定完了時処理
 */
function SceneLayerEnterTransitionDidFinish()
{
    this._super();

    // BGMを鳴らす
    cc.audioEngine.playMusic(res.titleMusic, true);
}

/**
 *  演出設定 
 */
function SceneEnterTitle()
{
    this._super();

    // タイトルシーンレイヤークラス構築
    var TitleSceneLayer = cc.Layer.extend({
        ctor: SceneTitleInit,
        onEnterTransitionDidFinish: SceneLayerEnterTransitionDidFinish
    });

    // シーンクラスへレイヤーを登録
    var layer = new TitleSceneLayer();
    this.addChild(layer);
}

/**
 *  タイトルシーンクラス構築
 */
var TitleScene = cc.Scene.extend({
    onEnter: SceneEnterTitle
});

