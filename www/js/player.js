function loadStream(liveurl) {

    if (!isNaN( $.cookie('volume') )) { var player_volume = $.cookie('volume'); } else { var player_volume = 0.75; }

    if (liveurl!='') { var live = liveurl; } else { var live = "http://stream.shiza.fm:8000/live"; }

    var stream = {
            title: "SHIZAнутое Радио",
            mp3: live
    },
    ready = false;
    $("#shiza-player").jPlayer({
            ready: function (event) {
                    ready = true;
                    $(this).jPlayer("setMedia", stream);
            },
            pause: function() {
                    $(this).jPlayer("clearMedia");
            },
            error: function(event) {
                    if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                            $(this).jPlayer("setMedia", stream).jPlayer("play");
                    }
            },
            swfPath: "../assets/swf",
            supplied: "mp3",
            preload: "none",
            volume: player_volume,
            wmode: "window" //,errorAlerts:true
    })
    .jPlayer("option", "cssSelectorAncestor", "#player-controls");

    $('#volume-bar').click(function(){
            $.cookie('volume', $('#shiza-player').data('jPlayer').options.volume, { expires: 7 });
    });
    console.log(live);
}
function js_audioPlayer(file,location) {
    jQuery("#jquery_jplayer_" + location).jPlayer( {
        ready: function () {
          jQuery(this).jPlayer("setMedia", {
        mp3: file
          });
        },
        cssSelectorAncestor: "#jp_interface_" + location,
        swfPath: "../assets/swf",
        supplied: "mp3",
        preload: "none",
        volume: player_volume,
        wmode: "window" //,errorAlerts:true
    });
        return;
}
$(document).ready(function() {
    loadStream("http://stream.shiza.fm:8000/live");
    var item = "<li class=''><a target='blank' title='Найти эту песню ВКонтакте' href='http://vk.com/audio?q={title}'>{title}</a></li>";
    $.getJSON( "/api/radio/recent_tracks", function( data ) {
        $.each( data.items, function( key, value ) {
            $("#track-list").append( item.replace(/{title}/g, value.title) );
        });
    });
    reloadSong();
        function reloadSong()
        {
            $("#track-list li").first().addClass("plays");

            $.getJSON('http://shiza.switch-blog.ru/api/json/radio/status/', function(json)
            {
              if(json.response % 2)
              {
                name = json.data.artist+' - '+json.data.title;

                if(json.data.rj == 'auto')
                {
                  $('#shiza-track-list, .download-traklist').show();
                  $('#shiza-stream').hide();

                  if($('#track-list li:first a').html() != name)
                  {
                    $("#track-list li").first().removeClass("plays");
                    $("#track-list").prepend(item.replace(/{title}/g, name));
                    $("#track-list li").first().addClass("plays");
                    $("#track-list li").last().remove();
                  }
                }
                else {
                  $('#shiza-stream').show();
                  $('#shiza-track-list, .download-traklist').hide();

                  $('#shiza-stream img').attr('src', json.data.avatar);
                  $('#shiza-stream div').html('В Эфире: '+ json.data.rj);
                  $('#shiza-stream a').attr('href', 'http://vk.com/audio?q='+json.data.title).html(json.data.title);
                }
              }
            });
            setTimeout(reloadSong, 9000);
        }
    $('#mute').click(function(){
      $("#shiza-player").jPlayer("mute", !$('#shiza-player').data('jPlayer').options.muted);
    });
});