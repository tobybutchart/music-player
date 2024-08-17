function sanitiseBandName(name) {
    return name.replace(' ', '');
}

const cont = document.getElementById('main-container');
const musicPlayers = document.querySelectorAll('.music-player');

for (const musicPlayer of musicPlayers) {
    console.log(musicPlayer);

    const name = musicPlayer.dataset.name;
    const tracks = JSON.parse(musicPlayer.dataset.tracks);
    const blurb = JSON.parse(musicPlayer.dataset.blurb);

    console.log(name);
    console.log(tracks);
    console.log(blurb);

    const divOuter = document.createElement("div");
    divOuter.classList.add("tabcontent");
    divOuter.id = sanitiseBandName(name);
    cont.appendChild(divOuter);

    const divBlurb = document.createElement("div");
    divBlurb.classList.add("hidden-xs");
    divBlurb.classList.add("col-sm-4");
    const mainImg = document.createElement("img");
    mainImg.classList.add("img-responsive");
    mainImg.src = "img/" + name + ".png";
    mainImg.alt = name;
    divBlurb.appendChild(mainImg);
    const br = document.createElement('br');
    divBlurb.appendChild(br);
    for (let i = 0; i < blurb.length; i++) {
        var p = document.createElement('p');
        var text = document.createTextNode(blurb[i]);
        p.appendChild(text);
        divBlurb.appendChild(p);
    }
    divOuter.appendChild(divBlurb);

    const divPlayer = document.createElement("div");
    divPlayer.classList.add("col-xs-12");
    divPlayer.classList.add("col-sm-8");

    const h1Title = document.createElement("h1");
    h1Title.innerHTML = name;
    divPlayer.appendChild(h1Title);
    divMusicCont = document.createElement("div");
    divMusicCont.id = "music-container";
    divPlayer.appendChild(divMusicCont);

    const divMusicInfo = document.createElement("div");
    const h4Title = document.createElement("h4");
    h4Title.id = "title";
    divMusicInfo.appendChild(h4Title);
    const divTimeSpans = document.createElement("div");
    const spanCurrTime = document.createElement("span");
    spanCurrTime.id = "currTime";
    divTimeSpans.appendChild(spanCurrTime);
    const spanDurTime = document.createElement("span");
    spanDurTime.id = "durTime";
    divTimeSpans.appendChild(spanDurTime);
    divMusicInfo.appendChild(divTimeSpans);

    const divProgressCont = document.createElement("div");
    divProgressCont.classList.add("progress-container");
    divProgressCont.id = "progress-container";
    const divProgress = document.createElement("div");
    divProgress.classList.add("progress");
    divProgress.id = "progress";
    divProgressCont.appendChild(divProgress);
    divMusicInfo.appendChild(divProgressCont);
    divOuter.appendChild(divMusicInfo);

    const audio = document.createElement("audio");
    audio.src = "music/" + tracks[0].tracks[0] + ".mp3";
    audio.id = "audio";
    divMusicCont.appendChild(audio);

    const divImgCont = document.createElement("div");
    divImgCont.classList.add("img-container");
    const imgSong = document.createElement("img");
    imgSong.id = "cover";
    imgSong.alt = tracks[0].tracks[0];
    imgSong.src = "img/" + tracks[0].tracks[0] + ".png"
    divImgCont.appendChild(imgSong);
    divMusicCont.appendChild(divImgCont);

    const divNav = document.createElement("div");
    divNav.classList.add("navigation");
    divMusicCont.appendChild(divNav);

    const btnPrev = document.createElement("button");
    btnPrev.id = "prev";
    btnPrev.classList.add("action-btn");
    const iPrev = document.createElement("i");
    iPrev.classList.add("fas");
    iPrev.classList.add("fa-backward");
    btnPrev.appendChild(iPrev);

    const btnPlay = document.createElement("button");
    btnPlay.id = "play";
    btnPlay.classList.add("action-btn");
    const iPlay = document.createElement("i");
    iPlay.classList.add("fas");
    iPlay.classList.add("fa-play");
    btnPlay.appendChild(iPlay);

    const btnNext = document.createElement("button");
    btnNext.id = "next";
    btnNext.classList.add("action-btn");
    const iNext = document.createElement("i");
    iNext.classList.add("fas");
    iNext.classList.add("fa-forward");
    btnNext.appendChild(iNext);

    divNav.appendChild(btnPrev);
    divNav.appendChild(btnPlay);
    divNav.appendChild(btnNext);

    const divMusicInfoBtm = document.createElement("div");
    divMusicInfoBtm.classList.add("music-info-btm");
    const tblTracks = document.createElement("table");
    tblTracks.style.width = "100%";

    for (let i = 0; i < tracks.length; i++) {
        //Album title
        const row = document.createElement("tr");
        const td = document.createElement("td");
        td.colspan = 2;
        td.style["padding-top"] = "10px";
        td.style["padding-bottom"] = "5px";
        td.innerHTML = "<b>" + tracks[i].title + "</b>";
        row.appendChild(td);
        tblTracks.appendChild(row);

        for (let j = 0; j < tracks[i].tracks; j++) {
            //Album title
            const row = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");

            td1.dataset.index = j;
            td1.classList.add("song-list-item");
            td1.innerHTML = j + ". " + tracks[i].tracks[j];

            if (!musicPlayer.dataset.disableDownload) {
                const download = document.createElement("a");
                download.href = "music/" + tracks[i].tracks[j] + ".mp3";
                download.innerHTML = "Download";
                download.download = "music/" + tracks[i].tracks[j] + ".mp3";
                td2.appendChild(download);
            }

            row.appendChild(td1);
            row.appendChild(td2);
            tblTracks.appendChild(row);
        }
    }

    divMusicInfoBtm.appendChild(tblTracks);
    divMusicCont.appendChild(divMusicInfoBtm);
    divOuter.appendChild(divMusicCont);
}
