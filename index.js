//variables
userSeq = [];
givenSeq = [];
highestScore = 5;
var started = false;
var arrayOfSequences = ["red", "blue", "green", "yellow"];
var score = 0;
var lives = 3;
var colourClicked = null;

$(document).ready(function() {
  //this function sets out the sequence and time intervals for the flashes in the boxes
  var showingSequenceEvent = function() {
    givenSeq.forEach(function(elem, index) {
      setTimeout(function() {
        $("#" + elem).css("background-color", elem);
      }, 500 + 1000 * index);

      setTimeout(function() {
        $("#" + elem).css("background-color", "white");
      }, 1000 * (index + 1));
    });
  };
  //the following five lines fire off a click function when start button is clicked, fter which the start button is made to hide
  $("#startButton").click(function() {
    $("#startButton").hide();
    $("#resetButton").show();
    $("#highestScoreContainer").hide();
    started = true; //boolean
    updateLivesText(); //these two functions are then fired off
    getCurrentSequence();
  });
  $("#resetButton").click(function() {
    userSeq = [];
    givenSeq = [];
    score = 0;
    lives = 3;
    colourClicked = null;
    started = true;
    $("#gameOver").hide();
    updateLivesText();
    updateScoresText();
    getCurrentSequence();

    $("#startButton").hide();
    $("#resetButton").show();
    $("#highestScoreContainer").hide();
  });

  $(".box").click(function() {
    //when anything in the box class is clicked, alongside a conditional, an array is compiled
    if (started) {
      colourClicked = $(this).attr("id");
      userSeq.push(colourClicked);
      checkUserPlay();
    } else {
      console.log("Game not started...");
    }
  });

  $("#playAgain").click(function() {
    $("#highestScoreContainer").hide();
    userSeq = [];
    givenSeq = [];
    score = 0;
    lives = 3;
    colourClicked = null;
    started = true;
    $("#gameOver").hide();
    updateLivesText();
    updateScoresText();
    getCurrentSequence();

    $("#startButton").hide();
    $("#resetButton").show();
    $("#highestScoreContainer").hide();
  });

  function getCurrentSequence() {
    for (var i = 0; i <= score; i++) {
      aChoice = arrayOfSequences[Math.floor(Math.random() * 4)];
      givenSeq.push(aChoice);
    }
    //this is possible becasue score is same same as sequence number/index. this randomised logic is fine but I cant resolve a bug on line 58.
    // also, the game should now continue until player has completely lost
    showingSequenceEvent();
  }
  function checkUserPlay() {
    if (!isCorrectSeq()) {
      wrongPlay();
      if (lives == 0) {
        gameOver();
      } else {
        showingSequenceEvent();
      }
    } else {
      if (userSeq.length == givenSeq.length) {
        nextRound();
      }
    }
  }
  function isCorrectSeq() {
    for (var i = 0; i < userSeq.length; i++) {
      if (userSeq[i] != givenSeq[i]) {
        return false;
      }
    }
    return true;
  }

  function wrongPlay() {
    userSeq = [];
    lives--;
    updateLivesText();
  }

  function updateLivesText() {
    $("#lives").text(lives.toString());
  }
  function updateScoresText() {
    $("#score").text(score.toString());
  }
  function updateHighestScoresText() {
    if (score > highestScore) {
      highestScore == score;
    }
    $("#highestScore").text(highestScore.toString());
  }

  function gameOver() {
    started = false;
    $("#gameOver").show();
    $("#highestScoreContainer").show();
  }

  function nextRound() {
    score++;
    givenSeq = [];
    // localStorage.setItem(highestScore)
    // however, above line in no way knows the highest score
    updateScoresText();
    userSeq = [];
    getCurrentSequence();
  }
});

// score is a variable to capture highest result. capture hughts one using if else statement
// use localstorage.setitem(score) to remember highest score and then get item
