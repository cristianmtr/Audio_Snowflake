// Bind Processing to JavaScript to get access to snowflake.pde script
$(document).ready(function() {   
    setTimeout(function() {
        var patterns = $("#patterns").data().patterns;    
        bindDataToProcessing(patterns); 
    }, 1000);
});

function bindDataToProcessing(patterns) {
    var pjs = Processing.getInstanceById('snowflake');
    pjs.setup();
    for (var i=0; i < patterns.length; i++) {
        pattern = patterns[i];
        pjs.setUpHypotrochoid(pattern.a, pattern.b, pattern.h, pattern.hue, pattern.saturation, pattern.brightness, pattern.transparency);
    }
}

// Fades in/out legend on canvas enter/leave
$( "canvas" ).hover(function() {  
  $( "#box1" ).stop().show( "slow" );
  }, function() {        
  $( "#box1" ).hide( "slow" );
});

// Adds snapshot of current canvas state to gallery
$( "#add_button" ).click(function(event) {
    event.preventDefault();
    var canvas = document.getElementById("snowflake");
    var song_id = $("#song_id2").val();
    var artist_name = $("#artist_name2").val();
    var title = $("#title2").val();
    var csrf_token = $("#csrf_token").val();

    $.ajax({
        type: "POST", 
        url: "/add_snowflake",
        data: { img : canvas.toDataURL("image/png"),
                song_id : song_id,
                artist_name : artist_name,
                title: title,
                csrf_token: csrf_token
              },
        success: function() {
            alert("Image saved to gallery.");
        }
    });
  });

// Convert canvas to an image
// function convertCanvasToImage(canvas) {
//   var image = new Image();
//   image.src = canvas.toDataURL('image/png');
//   return image
// }
