var trivia = {
  Q1: {
    question:
      "Mark Zuckerberg was one of the founders of which social networking site?",
    choice: ["Snapchat", "Facebook", "Instagram", "Twitter"],
    answer: "Facebook",
    picture: "assets/images/answer1.png"
  },
  Q2: {
    question:
      "What was the first console video game that allowed the game to be saved?",
    choice: ["Legend of Zelda", "Mario", "Pokemon", "Megaman"],
    answer: "Legend of Zelda",
    picture: "assets/images/answer2.png"
  },
  Q3: {
    question:
      "What do you call the small image icons used to express emotions or ideas in digital communication?",
    choice: ["Stickers", "Memes", "GIFs", "Emojis"],
    answer: "Emojis",
    picture: "assets/images/answer3.gif"
  },
  Q4: {
    question:
      "In what year did Nintendo release its first game console in North America?",
    choice: ["1980", "1983", "1985", "1987"],
    answer: "1985",
    picture: "assets/images/answer4.png"
  },
  Q5: {
    question: "Apple (the company), was founded in 1976 by whom?",
    choice: ["Steve Jobs", "Steve Wozniak", "Ronald Wayne", "All of the Above"],
    answer: "All of the above",
    picture: "assets/images/answer5.png"
  }
};

var stats = {
  correct: 0,
  incorrect: 0
};

var timer = {
  intervalId: "",
  time: 5,
  timeReset: 0
};

let quizCount = 1;

$("button").on("click", function run() {
  //Hides the button and starts the game
  $("#preStart").css("display", "none");
  $("#postStart").css("display", "block");

function timeKeeper() {
  if(timer.time > 0 && timer.reset === 0) {
    timer.intervalId = setInterval(function() {
      timer.time -=1;
      $("#timeLeft").html(timer.time);
    }, 1000) } else if(timer.time <= 0) {
      
    } else {
      clearInterval(timer.intervalId);
      timer.reset = 0;
      timer.time = 5;
      timeKeeper();
    }
  }

  timer.intervalId = setInterval(function () {
    timer.time -= 1;
    $("#timeLeft").html(timer.time);
    if (timer.time === 0) {
      clearInterval(timer.intervalId);
    } else if(timer.reset === 1) {
      clearInterval(timer.intervalId);
      timer.reset = 0;
      timer.time = 5;
      timer.intervalId;
    }
  }, 1000);

  //Runs through the array of questions and dynamically generates the question and choices
  let count = "Q" + quizCount;

  if (quizCount === 6) {
    endResult();
  }

  console.log(count);
  console.log(trivia[count].question);
  $(".question").text(trivia[count].question);

  let i = 0;
  $.each(trivia[count].choice, function () {
    let choice = $("<div>");
    $(choice).addClass("mt-4 choice");
    $(choice).text(trivia[count].choice[i]);
    $(".answers").append(choice);
    i++;
  });

  //Evaluates the user's choice and listens for a button click to reset for next question
  $(".answers").on("click", ".choice", function () {
    let result = $("<div>");
    $(result).addClass("mb-4");

    setTimeout(nextQuestion, 4000);
    $(".question").html("<img src=" + trivia[count].picture + ' alt="' + trivia[count].answer + '" width="450px" />');
    $(".answers").html("<button>Click to continue</button>");
    if ($(this).text() === trivia[count].answer) {
      $(result).html("You're right!");
      stats.correct++;
      $(".answers").prepend(result);
    } else if ($(this).text() !== trivia[count].answer) {
      $(result).html("You're wrong. The correct answer is: " + trivia[count].answer);
      stats.incorrect++;
      $(".answers").prepend(result);
    }

    //Resets the quiz and increases quizCount by one for next question
    function nextQuestion() {
      quizCount++;
      timer.reset = 1;
      $(".question").empty();
      $(".answers").remove(".choice");
      $(".answers").empty();
      run();
    }
  });

});

function endResult() {
  $(".question").append(
    "<div>Questions answered correctly:" + stats.correct + "</div>"
  );
  $(".question").append(
    "<div>Questions answered incorrectly:" + stats.incorrect + "</div>"
  );
  $(".answers").html("<button>Click to try again</button>");
  $("button").on("click", function () {
    quizCount = 1;
    stats.correct = 0;
    stats.incorrect = 0;
    $(".question").empty();
    $(".answers").empty();
    run();
  });
};