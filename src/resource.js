var res = {
    background: "res/images/background.png",
    player: "res/images/player.png",
    fruits: [
        "res/images/fruit0.png",
        "res/images/fruit1.png",
        "res/images/fruit2.png",
        "res/images/fruit3.png",
        "res/images/fruit4.png",
        "res/images/fruit5.png"
    ],
    replayButton: "res/images/replay_button.png",
    replayButtonPressed: "res/images/replay_button_pressed.png",
    titleButton: "res/images/title_button.png",
    titleButtonPressed: "res/images/title_button_pressed.png",
    mainMusic: "res/bgm/main.mp3",
    catchFruitEffect: "res/se/catch_fruit.mp3",
    catchGoldenEffect: "res/se/catch_golden.mp3",
    decideEffect: "res/se/decide.mp3"
};

var g_resources = [];
for (var i in res) {
    if(res[i].constructor === Array) {
        for(var j in res[i]) {
            g_resources.push(res[i][j]);
        }
    } else {
        g_resources.push(res[i]);
    }
}
