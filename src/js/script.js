const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songListItems = document.querySelectorAll('.song-list-item');

let content = [];
let bandArt = "";

// Keep track of song
let songIndex = 0;

function getAlbumImg() {
    let i = 0;

    for (let albumCount = 0; albumCount < content.length; albumCount++) {
        for (let songCount = 0; songCount < content[albumCount].songs.length; songCount++) {
            if (i == songIndex) {
                return "img/" + preText(content[albumCount].songs[songCount]) + content[albumCount].title + ".png";
            }

            i++;
        }
    }
}

function coverSrc(src) {
    const s = "img/" + src + ".png";

    if (fileExists(s)) {
        return s;
    }
    else if (fileExists(getAlbumImg())) {
        return getAlbumImg();
    }
    else if (fileExists(bandArt)) {
        return bandArt;
    }
}

// Update song details
function loadSong(song) {
  //create programmatically
  const cover = document.getElementById('cover');

  title.innerText = sanitiseText(song);
  audio.src = "music/" + song + ".mp3";
  cover.src = coverSrc(song);
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function loadAndPlaySong(song) {
    loadSong(song);
    playSong();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadAndPlaySong(songs[songIndex]);
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadAndPlaySong(songs[songIndex]);
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + "%";
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function loadAndPlayFromListItem(e) {
    const li = e.target;

    if (li !== null) {
        if (li.dataset.index !== null && li.dataset.index !== undefined) {
            songIndex = li.dataset.index;
            loadAndPlaySong(songs[songIndex]);
        }
    }
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration, currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime == null) ? 0 : Math.floor(currentTime/60);
	min = min < 10 ? '0' + min : min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	}

	get_sec (currentTime, sec);

	// change currentTime DOM
    if (currTime !== null) {
       currTime.innerHTML = min +':'+ sec;
    }

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	}

	// define seconds duration
	get_sec_d (duration);

	// change duration DOM
	if (durTime !== null) {
	       durTime.innerHTML = min_d +':'+ sec_d;
    }
};

function openBand(evt) {
    let i, tabcontent, tablinks;

    const e = evt.srcElement;

    if (e) {
        //stop current song
        pauseSong();

        //hide all
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        //reset song index
        songIndex = 0;

        //load content
        const name = e.innerText;
        const img = "img/" + e.dataset.img;
        const blurb = JSON.parse(e.dataset.blurb);
        content = JSON.parse(e.dataset.content);

        log(e);
        log(img);
        log(name);
        log(content);
        log(blurb);

        //load songs
        songs = [];

        //setup backup cover image
        bandArt = img;

        for (let albumCount = 0; albumCount < content.length; albumCount++) {
            for (let songCount = 0; songCount < content[albumCount].songs.length; songCount++) {
                songs.push(content[albumCount].songs[songCount]);
            }
        }

        log(songs);

        //blurb contents
        const blurbContainer = document.getElementById("blurb-container");
        blurbContainer.innerHTML = "";

        //band image
        const blurbImg = document.createElement("img");
        //blurbImg.classList.add("img-responsive");
        blurbImg.classList.add("band-img");
        blurbImg.src = img;
        blurbImg.alt = name;
        blurbContainer.appendChild(blurbImg);

        //blurb text
        for (let i = 0; i < blurb.length; i++) {
            var p = document.createElement('p');
            var text = document.createTextNode(blurb[i]);
            p.appendChild(text);
            blurbContainer.appendChild(p);
        }

        //title
        const h1 = document.getElementById('band-name');
        h1.innerText = name;

        //song image
        const songImgContainer = document.getElementById("song-img-container");
        songImgContainer.innerHTML = "";

        const songImg = document.createElement("img");
        songImg.id = "cover";
        songImg.src = coverSrc(content[0].songs[0]);
        songImg.alt = sanitiseText(content[0].songs[0]);
        songImgContainer.appendChild(songImg);

        //track listing
        const contentTblContainer = document.getElementById("track-listing-container");
        contentTblContainer.classList.remove("scroll-it");

        if (songs.length > 10) {
            contentTblContainer.classList.add("scroll-it");
        }

        const contentTbl = document.getElementById("track-listing");
        contentTbl.innerHTML = "";

        let totalSongCount = 0;

        for (let albumCount = 0; albumCount < content.length; albumCount++) {
            //Album title
            const row = document.createElement("tr");
            const td = document.createElement("td");
            td.colspan = 2;
            td.style["padding-top"] = "10px";
            td.style["padding-bottom"] = "5px";
            td.innerHTML = "<b>" + content[albumCount].title + "</b>";
            row.appendChild(td);
            contentTbl.appendChild(row);

            for (let songCount = 0; songCount < content[albumCount].songs.length; songCount++) {
                //Album title
                const row = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");

                row.classList.add("hover-it");

                td1.dataset.index = totalSongCount;
                totalSongCount++;

                td1.classList.add("song-list-item");
                td1.innerHTML = (songCount + 1) + ". " + sanitiseText(content[albumCount].songs[songCount]);
                td1.addEventListener('click', loadAndPlayFromListItem);

                const download = document.createElement("a");
                download.href = "music/" + content[albumCount].songs[songCount] + ".mp3";
                download.innerHTML = "Download";
                download.download = "music/" + content[albumCount].songs[songCount] + ".mp3";
                td2.appendChild(download);

                row.appendChild(td1);
                row.appendChild(td2);
                contentTbl.appendChild(row);
            }
        }

        //show player
        document.getElementById("band-container").style.display = "block";
        evt.currentTarget.className += " active";

        //add cache breaker to all all images
        addCacheBreaker();

        //load song
        loadSong(songs[songIndex]);
    }
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);

//load defaults
document.getElementById("defaultOpen").click();
