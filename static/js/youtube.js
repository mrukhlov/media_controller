var player,
    time_update_interval = 0;

function onPlayerReady(event) {
    event.target.playVideo();
}



function renderPlayer(){
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'HZI0KyBjaGs',
        playerVars: {
            color: 'white',
            playlist: 'WnPahoXwWJ8,fGl1ItUFPaU,PL72Tyxe1rc,kuoFiIFkdAA',
            //controls: 0,
        },
        events : {
            'onReady': onPlayerReady,
        }
    });
}

$('#render').on('click', function () {
    renderPlayer()
});

// Playback

$('#play').on('click', function () {
    player.playVideo();
});


$('#pause').on('click', function () {
    player.pauseVideo();
});


// Sound volume


$('#mute-toggle').on('click', function() {
    var mute_toggle = $(this);

    if(player.isMuted()){
        player.unMute();
        mute_toggle.text('volume_up');
    }
    else{
        player.mute();
        mute_toggle.text('volume_off');
    }
});

$('#volume-input').on('change', function () {
    player.setVolume($(this).val());
});


// Other options


$('#speed').on('change', function () {
    player.setPlaybackRate($(this).val());
});

$('#quality').on('change', function () {
    player.setPlaybackQuality($(this).val());
});


// Playlist

$('#next').on('click', function () {
    player.nextVideo()
});

$('#prev').on('click', function () {
    player.previousVideo()
});


// Seek

$('#plus').on('click', function () {
    player.seekTo(player.getCurrentTime() + 10)
});

$('#minus').on('click', function () {
    player.seekTo(player.getCurrentTime() -10)
});

function request_to_api(){
    var request = $('#request').val();
    if (request == 'play') {request = 'play Terrible Lie by Nine Inch Nails'};
    $('#request').val('');
    var bearer = 'Bearer beb7d0fee0d74e40b433198c861e9d9a';
    $.ajax({
        headers: {'Authorization': bearer},
        url: "https://api.api.ai/api/query?v=20150910",
        data: {
            'query':request,
            'lang':'en',
            'sessionId':'0000',
            contexts: [''],
        },
        success: function(data){
            console.log(data);
            console.log(data.result.action);
            $('p').html(data.result.fulfillment.speech);
            switch (data.result.action) {
                case 'music.play':
                    var ytplayer = document.getElementById("video-placeholder");
                    if (ytplayer.tagName == 'DIV'){
                        console.log('i w0rk');
                        if (data.result.parameters.artist == 'Nine Inch Nails'){
                            renderPlayer()
                        }
                    }
                    break;
                case 'media_control.play':
                    player.playVideo();
                    break;
                case 'media_control.pause':
                    player.pauseVideo();
                    break;
                case 'media_control.skip_backward':
                    player.previousVideo();
                    break;
                case 'media_control.skip_forward':
                    player.nextVideo();
                    break;
                case 'media_control.shuffle':
                    player.setShuffle(true);
                    break;
            }
        },
        error: function(data){
            console.log(data.responseText);
        },
    });
}

$('#send_button').click(function(){
    request_to_api();
});

$('#request').on('keydown', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        request_to_api()
    }
});