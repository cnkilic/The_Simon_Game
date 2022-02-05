var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function () {
  if (gamePattern.length === 0)
    nextsequence();
})


$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //Playing Sound when Click happend
  playSound(userChosenColour);
  //Animation Affect when Click happend
  animatePress(userChosenColour);

  /****  The Checking part if the user's clicks are correct or wrong  *****/

  for (var i = 0; i < userClickedPattern.length; i++) {

    if (gamePattern[i] === userClickedPattern[i]) {
      if (i === gamePattern.length - 1) {
        setTimeout(function () {
          nextsequence();
        }, 1000);
      }
    } else { //Game Over
      /*  Sound  */
      playSound("wrong")

      /*  Body Style */
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200)

      /*  h1 */
      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
    }

  }

})


/* Function to choose color for each level */
function nextsequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Animation Affect for the random cohosen color
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  //Playing sound when new sequence start
  playSound(randomChosenColor);

  level = level + 1;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];
}

/*****  Playing SOUND for the ınput Color *****/
function playSound(name) {
  var randomChosenColorSound = new Audio("sounds/" + name + ".mp3");
  randomChosenColorSound.play();
}

/***** ANİMATİON Affect for the Clicked Color *****/
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    document.querySelector("#" + currentColor).classList.remove("pressed");
  }, 100)

}

/* Restart Function */
function startOver() {
  level = 0;
  gamePattern = [];

}