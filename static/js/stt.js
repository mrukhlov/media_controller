/**
 * Created by s4d_panda on 18-Nov-16.
 */

function startDictation() {
    if (navigator.userAgent.match(/Vivaldi/) == null) {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {

            var recognition = new webkitSpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.lang = "en-US";
            recognition.start();

            recognition.onaudiostart = function (e) {
                console.log('capture started');
                console.log(e);
                document.getElementById("onair_button").className = "btn btn-danger";
            };

            recognition.onresult = function (e) {
                var result = e.results[0][0].transcript;
                console.log(result);
                if (result != 'turn off') {
                    $('#request').val(result);
                    request_to_api();
                    $('#request').val(result);
                    startDictation();
                } else {
                    recognition.stop();
                }
            };

            recognition.onerror = function (e) {
                //recognition.stop();
                console.log('recognition error');
                console.log(e);
                startDictation();
            };

            recognition.onspeechend = function (e) {
                console.log('speech ended');
                console.log(e);
            };

            recognition.onsoundend = function (e) {
                console.log('sound ended');
                console.log(e);
            };

            recognition.onend = function (e) {
                console.log('disconnected');
                console.log(e);
                document.getElementById("onair_button").className = "btn btn-default";
            };

            recognition.onnomatch = function (e) {
                console.log('no match');
                console.log(e);
            };
        }
    }
}

startDictation()


    // Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    // Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

console.log('Opera ' + isOpera);
console.log('Firefox ' + isFirefox);
console.log('Safari ' + isSafari);
console.log('IE ' + isIE);
console.log('Edge ' + isEdge);
console.log('Chrome ' + isChrome);
console.log('Blink ' + isBlink);

console.log(navigator.userAgent.match(/Vivaldi/) == null);
console.log(navigator.userAgent.match(/(Vivaldi|Safari|Opera)/) == null)