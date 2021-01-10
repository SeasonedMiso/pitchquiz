let lines;
let randomNumber;
let lastRandomNumber;
let score = 0;
let wordNow = { word, reading, pitch };
const displayThing = document.getElementById("atamadaka").style.display;
let verb = false;
let tot = 0;

function setWord() {
  while (randomNumber === lastRandomNumber) {
    randomNumber = parseInt(Math.random() * lines.length);
    // check to prevent infinite loop
    if (lines.length === 1) {
      break;
    }
  }
  // keep track of the last random number
  lastRandomNumber = randomNumber;

  //parse reading and pitch accent
  //console.log(lines[randomNumber]);
  //console.log(word);

  wordNow = {
    word: lines[randomNumber].replace(/ *\[[^\]]*]/, ""),
    reading: (reading = lines[randomNumber].split(";")[0].split("[")[1]),
    pitch: lines[randomNumber].split(";")[1].split("]")[0],
  };
  verb = false;
  if (wordNow.reading.includes(",")) {
    wordNow.reading = wordNow.reading.split(",")[1];
    verb = true;
  }
  console.log(verb);
  if (verb) {
    document.getElementById("atamadaka").style.display = "none";
    document.getElementById("odaka").style.display = "none";
    document.getElementById("nakadaka").style.display = "none";
    document.getElementById("kifuku").style.display = displayThing;
  } else {
    document.getElementById("atamadaka").style.display = displayThing;
    document.getElementById("odaka").style.display = displayThing;
    document.getElementById("nakadaka").style.display = displayThing;
    document.getElementById("kifuku").style.display = "none";
  }
  $("#word").text(wordNow.word);
  $("#reading").text(wordNow.reading);
  //$("#pitch").text(wordNow.pitch);
}

$(document.body).ready(function () {
  // load the trivia from the server
  $.ajax({ url: "wordlist.txt" }).done(function (content) {
    // normalize the line breaks, then split into lines
    lines = content
      .replace(/\r\n|\r/g, "\n")
      .trim()
      .split("\n");
    //console.log(lines);

    setWord();
  });
});

function answer(pitch) {
  if (wordNow.pitch.includes(pitch)) {
    score += 1;
    tot += 1;
    document.getElementById("score").innerHTML = "Score: " + score + "/" + tot;
    console.log(score);
    document.getElementById("prevWord").innerHTML =
      "Last word: " + wordNow.word;
    if (wordNow.pitch.includes("h")) {
      document.getElementById("prevWord").style.color = "blue";
    } else if (wordNow.pitch.includes("a")) {
      document.getElementById("prevWord").style.color = "red";
    } else if (wordNow.pitch.includes("n")) {
      document.getElementById("prevWord").style.color = "orange";
    } else if (wordNow.pitch.includes("o")) {
      document.getElementById("prevWord").style.color = "green";
    } else if (wordNow.pitch.includes("k")) {
      document.getElementById("prevWord").style.color = "purple";
    }
    setWord();
    document.getElementById("correct").innerHTML = "O";
    document.getElementById("correct").style.color = "green";
    //reset
  } else {
    tot += 1;
    document.getElementById("score").innerHTML = "Score: " + score + "/" + tot;
    console.log(score);
    document.getElementById("prevWord").innerHTML =
      "Last word: " + wordNow.word + "   You answered: " + pitch;
    if (wordNow.pitch.includes("h")) {
      document.getElementById("prevWord").style.color = "blue";
    } else if (wordNow.pitch.includes("a")) {
      document.getElementById("prevWord").style.color = "red";
    } else if (wordNow.pitch.includes("n")) {
      document.getElementById("prevWord").style.color = "orange";
    } else if (wordNow.pitch.includes("o")) {
      document.getElementById("prevWord").style.color = "green";
    } else if (wordNow.pitch.includes("k")) {
      document.getElementById("prevWord").style.color = "purple";
    }
    document.getElementById("correct").innerHTML = "x";
    document.getElementById("correct").style.color = "red";

    setWord();
  }
}
