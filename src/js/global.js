const _DEBUG = false;
const _EXPLICIT_DEBUG = true;
const _CACHE_BREAKER = "?v1.00";

let songs = [];

function log(log, marker) {
    if (_DEBUG) {
        if (_EXPLICIT_DEBUG) {
            if (marker) {
                console.log(marker, log);
            }
        }
        else {
            if (!marker) {
                console.log(log);
            }
            else {
                console.log(marker, log);
            }
        }
    }
}

function sanitiseText(text) {
    return text.split('/').pop();
}

function preText(text) {
    return text.replace(sanitiseText(text), "");
}

function fileExists(url) {
    if(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);

        req.send();

        if (req.status == 200) {
            return true;
        }
        else {
            if (!_DEBUG) {
                //I'M A NAUGHTY LITTLE BOY
                console.clear();
            }

            return false;
        }
        return req.status == 200;
    }

    return false;
}

function addCacheBreaker() {
    const allImages = document.getElementsByTagName('img');

    for(var i = 0; i < allImages.length ; i++) {
        if (allImages[i].src.indexOf(_CACHE_BREAKER) == -1) {
            allImages[i].src += _CACHE_BREAKER;
        }
    }
}
