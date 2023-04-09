var audioExt = '.mp3' //Extension for audio files
var defaultVol = {'bgm': 0.15, 'sfx': 0.13, 'voice': 0.27} //Default volumes for tracks. Ranges from 0 to 1
var soundDelay = 300; //How quickly the song updates when a new page loads

var scripts = {} //Will contain all the scripts from all the episodes
var enabled = {'audio': false, 'bgm': false, 'sfx': false, 'voice': false, 'names': false} //Which options are enabled
var timestamps = {} //Saves the last three BGM timestamps when we switch to a new song
var threeSaved = [] //Indicates which BGMs have their timestamps saved
var BGMnameTimeout; //This is used to fade out BGM names 5 seconds after they appear
var BGMnames = {'001': 'Sukashiyuri', '002': 'Doorway of Summer', '003': 'Feathers [HANE]', '004': 'Ride on', '005': 'sea', '006': 'Hour of Darkness', '007': 'Novelette', '008': 'hope', '009': 'White Shadow', '010': 'Steady Pace', '011': 'Towering cloud in summer', '012': 'Moonlit Night', '013': 'Rose', '014': "At Death's Door", '015': "Corridor of Purgatory's Sands", '016': 'Fortitude', '017': 'witch in gold(cembalo)', '018': 'Lure', '019': 'Fishy Aroma', '020': 'stupefaction', '021': 'Praise', '022': 'Pass', '023': 'Swallowtail butterfly [ageha]', '024': 'goldenslaughterer', '025': 'worldend(bp)', '026': 'Witch of the Painting', '027': 'suspicion', '028': 'Scar Sound', '029': 'Core', '030': 'Minute darkness', '031': 'nighteyes', '032': 'Closed My Heart', '033': 'Requiem', '034': 'mind', '035': 'Worldend', '036': 'play', '037': 'System 0', '038': 'Voiceless', '039': 'dead angle', '040': 'Organ Short #600 Million in C Minor', '041': 'Prison Strip', '042': 'String Quartet #1 in G Major - I. Allegro', '043': 'cage', '044': 'Golden Sneer', '045': 'Scorpion Entrails', '046': "Life's End", '047': 'Answer', '048': 'Answer short', '049': 'Melody inst.ver', '050': 'Red Dread', '051': 'moon', '052': 'where', '053': 'Dread of the grave', '054': 'Worldend dominator', '055': 'Black Liliana', '056': 'Rest', '057': "Daydream's End", '058': 'Melody', '059': 'Over the Sky', '060': 'In the Sun', '061': 'The Candles Dance', '062': 'Distant [Haruka]', '063': 'psy-chorus', '064': 'far', '065': 'Fake Red Shoes', '066': 'mother', '067': 'haze', '068': 'Dancing Pipe', '069': 'Dread of the grave-More fear-', '070': 'Organ Short #200 Million in C Minor', '071': 'rhythm-changer', '072': 'happiness of marionette(short)', '073': 'happiness of marionette', '074': 'Dance of the Moon Rabbits', '075': 'Melting away', '076': 'soul of soul', '077': 'miragecoordinator', '078': 'prison', '079': 'Thanks for Being Born', '080': 'Wings', '081': 'Lost Paradise', '082': 'wingless', '083': 'activepain', '084': 'Dread of the grave-rhythm ver-', '085': 'Eternity', '086': 'over', '087': 'Like the gale', '088': 'F Style', '089': 'Monochrome Clock', '090': 'apathy', '091': 'Mystic Forest', '092': "Sakutarou's Adventure", '093': 'Parallel', '094': 'Tsuru Pettan (short.ver)', '095': '599 million ruins', '096': 'Happy Maria!(Instrumental)', '097': 'Surrounding', '098': 'Launch [HIBUTA]', '099': 'death (from stupefaction)', '100': 'mortal stampede', '101': 'Victima propiciatoria', '102': 'Revolt', '103': 'The Dark and Crazed Requiem of Purgatory', '104': 'Happy Maria!', '105': 'dive to emergency', '106': 'dir', '107': 'Endless Nine', '108': 'dreamenddischarger', '109': 'discode', '110': 'About Face', '111': 'Future', '112': 'Deep Blue Jeer', '113': 'The Great Detective Knows', '114': 'Smile-less Soiree', '115': 'one', '116': 'Spiral', '117': 'String Trio #600 Million in F# Minor', '118': 'Toten Blume', '119': 'JUSTICE', '120': 'ACI-L', '121': 'Kuina', '122': 'Proud-dust', '123': 'hello your dream', '124': 'Solitary Deep Sea Fish', '125': "The Girls' Witch Hunt", '126': 'Patchwork Chimera', '127': 'discolor', '128': 'resurrectedreplayer', '129': 'Final Answer', '130': 'Light [hikari]', '131': 'Bread of Life', '132': 'Promise', '133': 'Tomorrow', '134': 'Wings [TSUBASA](Ver hope)', '135': 'Gray Empty Smile', '136': 'Eternal Chains', '137': 'Love Examination', '138': 'A Single Moment', '139': 'Look Back', '140': 'Blue Butterfly', '141': 'my dear', '142': 'Kina no Kaori', '143': 'rog-limitation', '144': 'Waltz Op.34', '145': 'ALIVE', '146': 'birth of new witch(inst)', '147': 'ruriair', '148': 'Engage of marionette', '149': 'Life', '150': 'Loreley', '151': 'The Sin', '152': 'The first and The last', '153': 'Anti-Demon Sequentia', '154': 'battle field', '155': 'Rebirth', '156': 'Path', '157': 'liberatedliberator', '158': 'Thanks for all People', '159': 'Infant Queen Bee', '160': 'birth of new witch (Short Ver)', '161': 'Fishy Aroma', '162': 'le4-octobre', '163': 'l&d-circulation', '164': 'reflection-call', '165': 'rain', '166': '7-weights', '167': 'fall', '168': 'bore-ral', '169': 'ballade-continuer', '170': 'Song Without a Name ver.2007 inst', '171': 'lie-alaia', '172': 'Golden Nocturne (inst)', '173': 'far (flat)', '174': 'Toy Box', '175': 'terminal entrance', '176': 'Puppet Show', '177': 's/he-end', '178': 'Bring The Fate', '179': 'Song Without a Name full-inst', '180': 'The End Of The World', '181': 'goddess-gardena', '183': 'ridicule', '184': 'Yomitsu Hirasaka Corruption', '185': 'the executioner', '186': 'Song Without a Name ver.sakura ED size', '187': 'Stuffed Animal', '188': 'Bizarre Divertimento', '189': 'Dread of the grave -more fear-(remake)', '190': 'en-counse', '191': 'lixAxil', '192': 'Revelations(inst)', '193': 'Soar', '194': 'lastendconductor', '195': 'Revelations', '240': 'White Dream Cocoon -Ricordando il passato-', '241': 'When the Seagulls Cry', '346': 'Unknown', '550': 'Unknown', '767': 'Unknown', '777': 'Wings [TSUBASA]', '888': 'White Dream Cocoon -Ricordando il passato-', '891': 'Unknown', '892': 'Unknown', '893': 'Unknown', '894': 'Unknown', '895': 'Unknown', '896': 'Unknown', '897': 'When the Seagulls Cry', '898': 'Unknown', '899': 'Unknown', '900': 'entreat', '901': 'The End Of The World -Sekai no Owari ni Shukufuku no Kane wa Naru-', '902': 'Moshimo Boku ga -hope-', '903': 'Thanks for Being Born', '904': 'Unknown', '905': 'Golden Nocturne', '908': 'Unknown', '910': 'Unknown', '935': 'Inanna\'s Dream', '950': 'Revelations', '976': 'hope (Ver0.5)', '980': 'birth of a new witch', '999': 'Gloria in excelsis Dea', '1000': 'Swee-Swee☆Sweets', 'bring_the_fate': 'Bring The Fate'}

$(document).ready(function() {
	var JSONloaded = [];
	
	//Load in the episode scripts
	for (let i = 1; i < 9; i++) {
		JSONloaded.push($.getJSON('assets/umineko-ep-' + i + '/script.json', function(info) {scripts[i] = info}))
	}
	
	//The current episode is saved in the local storage
	$.when(JSONloaded).then(function() {
		var episode = localStorage.getItem('ep')
		if (episode != undefined) {
			document.getElementById("episode").value = episode //Update the episode number button
			updateEp(firstLoad = true)
		}
		else {
			updateEp()
		}
	})

	//Set BGM to default volume if it's not present in local storage
	if (localStorage.getItem('bgmVol') == undefined) {
		$('.bgm.off')[0].volume = defaultVol['bgm']
	}
	else {
		$('.bgm.off')[0].volume = localStorage.getItem('bgmVol') / 100
	}
	
	//Do the same for SFX
	for (let i = 0; i < $('.sfx.off').length; i++) { //There are more audio elements for SFX than BGM, since multiple SFX can play simultaneously
		if (localStorage.getItem('sfxVol') == undefined) {
			$('.sfx.off')[i].volume = defaultVol['sfx']
		}
		else {
			$('.sfx.off')[i].volume = localStorage.getItem('sfxVol') / 100
		}
	}
});

function updateEp(firstLoad = false) {
	//I keep all the episodes and chapters on the same webpage, simply swapping out the images based on which ep/chap is selected
	//This function will update the episode when the page first loads up, or when a new ep is selected from the button

    ep = document.getElementById("episode").value;
    var epLength = Object.keys(scripts[ep].chapters).length //Total number of chapters in the episode

	//We'll get the chapters contained in this episode, and replace the chapter select options with these
	document.getElementById("chapter").innerHTML = '';
	chapStr = '' //Will contain the code for the updated chapter select button
	if (ep != 8) {
		for (var i = 1; i <= epLength; i++) {
			chapStr += '<option value="' + i + '">Chapter ' + i + '</option>'
		}
	}
	else { //Episode 8 has chapters with unique names (e.g. "Chapter 24c1")
		for (var i = 1; i <= 24; i++) {
			chapStr += '<option value="' + i + '">Chapter ' + i + '</option>'
		}
		chapStr += '<option value="24b">Chapter 24b</option><option value="24c1">Chapter 24c1</option><option value="24c2">Chapter 24c2</option><option value="24c3">Chapter 24c3</option>'
		for (var i = 25; i <= 38; i++) {
			chapStr += '<option value="' + i + '">Chapter ' + i + '</option>'
		}
	}
    document.getElementById("chapter").innerHTML = chapStr;
    
    if (firstLoad) { //On our first load, just set the chapter number to what's saved in the local storage
		document.getElementById("chapter").value = localStorage.getItem('chap')
    }

	updateChap() //Actual page loading, etc. is handled here
}

function updateChap() {	
	chap = document.getElementById("chapter").value; //Obtained from chapter button
	ep = document.getElementById("episode").value;
	document.querySelector('title').textContent = 'Ep. ' + ep + ': Ch. ' + chap; //Says chap num in browser title
	window.scrollTo(0, 0);
	
	//We'll replace the code for the pages like we did for the chapter select options
	document.getElementById("pages").innerHTML = '';
	pageStr = ''
	
	chapInfo = scripts[ep].chapters[chap].pages
	bgm = [0] //Will contain the pages at which the bgm should change
	bgmTracks = [chapInfo[0].bgm] //The list of bgm tracks at each of those pages
	se = [0] //The pages at which the sound effect changes
	seTracks = [chapInfo[0].se] //The list of sound effect tracks
	voice = []
	voiceTracks = []
	
	//Load pages
	for (var i = 0; i < chapInfo.length; i++) {
		var page = chapInfo[i].page
		var src = "assets/umineko-ep-" + ep + "/img/ch-" + chap + "/" + page + ".jpg"
		var marginBottom = '5px'
		var maxWidth = '50%'
		
		if (page.includes('a')) { //For pages that are split, there shouldn't be a margin space between them
			marginBottom = '0px'
		}
		else if (page.includes('-')) { //Double pages should be made larger
			maxWidth = '100%'
		}
		pageStr += "<img src='" + src + "' onerror='this.style.display=\"none\";alert(\"oh no\")' style='max-width: " + maxWidth + "; display: block; margin-bottom: " + marginBottom + "'></img>"
		
		//Find pages on which the BGM should change
		if (i > 0 && chapInfo[i].bgm != chapInfo[i-1].bgm) {
			bgm.push(i)
			bgmTracks.push(chapInfo[i].bgm)
		}
		
		//Same with SFX and voices
		if (!(i > 0 && chapInfo[i].se.length == chapInfo[i-1].se.length && chapInfo[i].se.slice().sort().every(function(element, index) { return element === chapInfo[i-1].se.slice().sort()[index]; }))) {
			se.push(i)
			seTracks.push(chapInfo[i].se)
		}
		
		voice.push(i)
		if (chapInfo[i].voice) {
			voiceTracks.push(chapInfo[i].page)
		}
		else {
			voiceTracks.push(null)
		}
	}
    document.getElementById("pages").innerHTML = pageStr;
    
    //Repeatedly check if there's any images that failed to load
	setTimeout(function () {		
		expectedPages = scripts[ep].chapters[chap].pages.length
		loadedPages = $('img:visible').length
		
		diff = expectedPages - loadedPages
	    if (loadedPages != expectedPages) {
	        alert('missing ' + (expectedPages - loadedPages) + ' images');
	    }
	}, 5000);

	var sounds = ['bgm', 'sfx', 'voice', 'names']
	var soundInterval;
	
	//Code to enable or disable a given type of sound
	function toggleSound(sound, toggle) {
		if (toggle == 'enable') {
			enabled[sound] = true
			localStorage.setItem(sound, 'on')

			//Update the button after toggling it. Note we won't update the "BGM names" button if the BGM itself is disabled (since the "BGM names" button is hidden in that case)
			if (sound != 'names' || enabled['bgm']) {
				document.getElementById(sound + "On").style.display = "none";
				document.getElementById(sound + "Off").style.display = "";
			}
			
			//Show the "BGM names" button if we enable the BGM
			if (sound == 'bgm') {
				if (enabled['names']) {
					document.getElementById("namesOn").style.display = "none";
					document.getElementById("namesOff").style.display = "";
				}
				else {
					document.getElementById("namesOff").style.display = "none";
					document.getElementById("namesOn").style.display = "";
				}
			}
			
			//Only relevant for the BGM, SFX and voice buttons:
			if (sound != 'names') {
				document.getElementById(sound + "Vol").style.display = ""; //Show the volume slider when we've enabled this sound
				
				//Play the sound that we've enabled
				if (!enabled['audio']) {
					enabled['audio'] = true //"Audio" simply tells us if any of the BGM, SFX or voice options are enabled
					
					//We'll check after every "soundDelay" whether we need to update the music
					soundInterval = setInterval(function () {playSound(bgm, bgmTracks, se, seTracks, voice, voiceTracks)}, soundDelay)
				}
			}
		}
		else if (toggle == 'disable') {
			enabled[sound] = false
			localStorage.setItem(sound, 'off')
			document.getElementById(sound + "Off").style.display = "none";
			document.getElementById(sound + "On").style.display = "";
			
			//Hide the BGM names button if we've disabled the BGM
			if (sound == 'bgm') {
				document.getElementById("namesOn").style.display = "none";
				document.getElementById("namesOff").style.display = "none";
			}
			
			//Only relevant for the BGM, SFX and voice buttons:
			if (sound != 'names') {
				document.getElementById(sound + "Vol").style.display = "none"; //Hide the volume slider
				
				//Stop playing the song and reset the timestamp
				$('audio.' + sound).each(function() {
					this.pause()
					this.currentTime = 0
					if (sound == 'bgm') {
						this.src = 'assets/umineko-sound/bgm/000' + audioExt //000 is a placeholder I use when no audio is playing
					}
					else if (sound == 'sfx' || sound == 'voice') {
						this.src = 'assets/umineko-sound/se/000' + audioExt
					}
				})
				
				if ($("button.enable").length == 1) {
					enabled['audio'] = false
					clearInterval(soundInterval)
				}
			}
		}
	}
	
	//When we've changed the chapter, toggle the sounds based on what's in the local storage
	for (var i = 0; i < sounds.length; i++) {
		sound = sounds[i]
		if (localStorage.getItem(sound) == 'on') {
			toggleSound(sound, 'enable')
		}
	}
	
	//Toggle sounds when we've clicked the enable/disable buttons
	$("button").on("click", function(){
		var toggle = this.className.split(' ').filter(function(e) { return e == 'enable' || e == 'disable' })[0]
		var sound = this.className.split(' ').filter(function(e) { return e !== toggle })[0]
		toggleSound(sound, toggle)
		
		if (sound == 'names') { //Show or hide the track name when we click the "BGM names" button
			clearTimeout(BGMnameTimeout);
			if (toggle == 'enable') {
				$("#BGMname").fadeIn('slow', function() {
					BGMnameTimeout = setTimeout(function() {
						$("#BGMname").fadeOut('slow')
					}, 5000);
				})
			}
			else {
				$('#BGMname').hide()
			}
		}
    })
    
    //Store the user's volume preferences, and update them if they're in the local storage
    function updateVolume(sound) {
		if (localStorage.getItem(sound + 'Vol') != undefined) {
			document.getElementById(sound + "Vol").value = localStorage.getItem(sound + 'Vol')
		}
	    document.getElementById(sound + "Vol").addEventListener("change", function(e) {
		    volume = e.currentTarget.value
			$('audio.' + sound + ':not(.off)').each(function() {this.volume = volume / 100})
			localStorage.setItem(sound + 'Vol', volume)
		})
	}
	
	updateVolume('bgm')
	updateVolume('sfx')
	updateVolume('voice')

	//Store current ep and chapter numbers
	localStorage.setItem('ep', ep)
    localStorage.setItem('chap', chap)
}

function playSound(bgm, bgmTracks, sfx, sfxTracks, voice, voiceTracks) {
	if (enabled['bgm']) {
		playBGM(bgm, bgmTracks)
	}
	if (enabled['sfx']) {
		playSFX(sfx, sfxTracks)
	}
	if (enabled['voice']) {
		playVoice(voice, voiceTracks)
	}
}

function playBGM(bgm, bgmTracks) {
	//To crossfade the track, I use two audio elements. One will contain the new song, and the other contains the old song
	var currentTrack = $('.bgm.on') //Element for old song (currently playing at the moment the playBGM function is called)
	var backupTrack = $('.bgm.off') //Element for new song (which we'll start playing)
	var volume = $('#bgmVol')[0].value / 100
	
	var currentSongLink = currentTrack[0].src //Get the url of the current song's audio file
	var currentSong = currentSongLink.substring(currentSongLink.lastIndexOf('/') + 1, currentSongLink.length - 4) //Get the ID of the song (e.g. 001)
	
	var newSong = findSong(bgm, bgmTracks) //Determines the new song based on how far we've scrolled
	if (newSong == null) {
		newSong = '000' //Placeholder when no music is playing
	}
	
	//If the current page has a different song than what we've been playing
	if (currentSong != newSong) {
		currentTrack.animate({volume: 0}, soundDelay*3) //Fade out the current song
		backupTrack[0].src = 'assets/umineko-sound/bgm/' + newSong + audioExt; //Place the new song in the backup track
		
		//"timestamps" contains the timestamps of the last three played tracks.
		timestamps[currentSong] = currentTrack[0].currentTime + soundDelay/500; //We add the timestamp of the old song (adding a small push forward to account for the fadeout)
		
		//"threeSaved" contains the IDs of the last three played tracks
		if (threeSaved.indexOf(currentSong) !== -1) { //Add our old song to this array, or place it at the front if it's already in the array
			threeSaved.splice(threeSaved.indexOf(currentSong), 1);
		}
		threeSaved.push(currentSong)
		if (threeSaved.length > 3) {
			delete timestamps[threeSaved[0]]
			threeSaved.shift()
		}
		
		if (newSong != '000') { //Play the new track if it's a valid song
			backupTrack[0].load()
			backupTrack.animate({volume: volume}, soundDelay*3) //Fade it in
			
			//Update the timestamp if it's saved
			if (newSong in timestamps) {
				backupTrack[0].currentTime = timestamps[newSong]
			}
			backupTrack[0].play()
			
			//Show the new BGM name if that option is enabled
			document.getElementById('BGMname').textContent = '♪ ' + BGMnames[newSong]
			if (enabled['names']) {
				$("#BGMname").fadeIn('slow', function() {
					clearTimeout(BGMnameTimeout);
					BGMnameTimeout = setTimeout(function() {
						$("#BGMname").fadeOut('slow')
					}, 5000);
				})
			}
			
		}
		//Now we effectively make it so this "backupTrack" will become the "currentTrack" next time playBGM is called
		currentTrack[0].className = 'bgm off'
		backupTrack[0].className = 'bgm on'
	}
}

function playSFX(sfx, sfxTracks) {
	//Same premise as playBGM, except to implement the crossfade I need two audio elements *per sound effect*.
	//Since there are at most three SFXs playing simultaneously, this means we have 6 audio elements to work with.
	
	var onTracks = $('.sfx.on')
	var offTracks = $('.sfx.off')
	var volume = $('#sfxVol')[0].value / 100
	var oldSFX = [] //Current SFXs that we're going to replace
	var newSFX = findSong(sfx, sfxTracks) //New SFXs based on our location
	
	for (var i = 0; i < onTracks.length; i++) {
		var currentSongLink = onTracks[i].src
		var currentSong = currentSongLink.substring(currentSongLink.lastIndexOf('/') + 1, currentSongLink.length - 4)
		oldSFX.push(currentSong)
	}
	var filteredNewSFX = newSFX.filter(function(val) { //Don't update a SFX track if it'll still be used on the new page
		return oldSFX.indexOf(val) == -1;
	});
	
	if (newSFX.length == 0 && onTracks.length > 0) {
		for (var i = 0; i < onTracks.length; i++) {
			onTracks[i].className = 'sfx off'
			onTracks.eq(i).animate({volume: 0}, soundDelay*3)
		}
	}
	
	var continueFrom = 0; //Here we'll save the timestamp. This is only ever used to smoothly transition the two versions of Maria singing in Ep 1 Chap 20

	if (filteredNewSFX.length) {
		if (onTracks.length) { //Stop the current track
			for (var i = 0; i < onTracks.length; i++) {
				if (!newSFX.includes(oldSFX[i])) {
					onTracks[i].className = 'sfx off'
					onTracks.eq(i).animate({volume: 0}, soundDelay*3)
					
					if (oldSFX[i].includes("maria_v")) {
						continueFrom = onTracks[i].currentTime
					}
					else {
						continueFrom = 0;
					}
				}
			}
		}
		
		for (var i = 0; i < filteredNewSFX.length; i++) { //Play the next track
			offTracks[i].src = 'assets/umineko-sound/se/' + filteredNewSFX[i] + audioExt
			offTracks[i].load()
			if (filteredNewSFX[i].includes("maria_v")) { //Transition Maria's singing
				offTracks[i].currentTime = continueFrom + soundDelay*0.2/500 //Theres a delay between both versions
			}
			offTracks[i].play()
			offTracks.eq(i).animate({volume: volume}, soundDelay*3)
			offTracks[i].className = 'sfx on'
		}
	}
}

function playVoice(voice, voiceTracks) {
	//No point to crossfading sounds. So here we only use one audio element
	
	var ep = document.getElementById("episode").value;
	var chap = document.getElementById("chapter").value;
	var currentTrack = $('audio.voice')
	var volume = $('#voiceVol')[0].value / 100
	var newSong = findSong(voice, voiceTracks)
	
	var currentLink = currentTrack[0].src.substring(currentTrack[0].src.indexOf('assets/'), currentTrack[0].src.length)
	var newLink = 'assets/umineko-ep-' + ep + '/voice/ch-' + chap + '/' + newSong + audioExt
	
	if (currentLink != newLink) {
		currentTrack[0].src = newLink
		currentTrack[0].load()
		currentTrack[0].volume = volume
		if (newSong != null) {
			currentTrack[0].play()
		}
	}
}

function findSong(bgm, bgmTracks) {
	//Finds the correct BGM track to play based on how far we've scrolled (our "location")
	var locations = []
	for (var i = 0; i < bgm.length; i++) {
		var index = bgm[i]
		locations.push($('img').eq(index).offset().top)
	}
	
	var myLoc = $(window).scrollTop() + $(window).height()/2 //Current location
	return bgmTracks[binarySearch(locations, myLoc)] //Do a binary search to find the song at our location
}

function binarySearch(sortedArray, key){
	//Binary search used in findSong function
    let start = 0;
    let end = sortedArray.length - 1;
    
    if (key < sortedArray[0]) {
	    return 0
    }
    if (key > sortedArray[end]) {
	    return end
    }

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle] <= key && sortedArray[middle + 1] > key) {
            return middle;
        } else if (sortedArray[middle + 1] <= key) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    return -1;
}
