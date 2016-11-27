const rollings = require('../bilidili/lib/rollings');
const config = require('../bilidili/lib/config').default;
const createStyleSheet = require('../bilidili/lib/styles').applyStyle;
const {
    danmaku,
    HTMLMedia,
    BilibiliDanmakuDocument,
    DanmakuViewer,
} = rollings;

rollings.DEBUG = 0;

var mainCss = createStyleSheet({
    body: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});

document.body.className = mainCss.body;

var xhr = new XMLHttpRequest();

var xmlPath = '/files/' + /\/play\/(.*)\.mp4/.exec(location.pathname)[1] + '.xml';

xhr.open('GET', xmlPath);

xhr.onload = function(ev) {
    var media = new HTMLMedia(document.querySelector('video'));
    config(danmaku(media, xhr.responseText), 'danmakuViewer');
};

xhr.send();

window.onresize = () => {
    document.body.style.maxWidth = window.innerWidth + 'px';
    document.querySelector('video').style.maxWidth = window.innerWidth + 'px';
}

document.body.onclick = () => {
    document.body.webkitRequestFullscreen();
}