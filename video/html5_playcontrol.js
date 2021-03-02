window.dkr = {};
window.dkr.speedChange = 0.25;
window.dkr.playing = true;
window.dkr.videos = document.querySelectorAll('video');

if (window.dkr.videos == null){
    alert("No videos found; Play control not loaded");
}
else{
    alert("Play control loaded:\r\n w: normal speed \r\n a: slower ; s: toggle play/pause; d: faster \r\n x: pause and 5 seconds backward ");
    document.addEventListener ('keydown', function (event) {
        if ((new URLSearchParams(document.location.search)).get("debug") == 1) {
            debugger;
        }

        //a: slower
        if (event.which == 65) {    
            window.dkr.videos[0].playbackRate -= window.dkr.speedChange;
        }

        //d: faster
        if (event.which == 68) {
            window.dkr.videos[0].playbackRate += window.dkr.speedChange;
        }

        // s: toggle pause/play
        if (event.which == 83) {
            if (window.dkr.playing)      {
                //Stops and five seconds backward
                window.dkr.videos[0].pause();        
            }
            else{
                window.dkr.videos[0].play()
            }
            window.dkr.playing = !window.dkr.playing;
        }

        // x: stop and 5 seconds backwards
        if (event.which == 88) {
            window.dkr.playing = !window.dkr.playing;
            window.dkr.videos[0].pause();
            window.dkr.videos[0].currentTime -= 5;  
            window.dkr.videos[0].playbackRate = 1;                      
        }
        // w: stop and 5 seconds backwards
        if (event.which == 87) {
            window.dkr.videos[0].playbackRate = 1;                    
        }
    });
}