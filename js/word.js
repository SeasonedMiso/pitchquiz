let linesEasy;
let linesMed;
let linesHard;
let linesTest;
let lines;
let difficulty;
let randomNumber = 0;
let lastRandomNumber = 0;
let score = 0;
let wordNow = { word, reading, pitch };
const displayThing = document.getElementById("atamadaka").style.display;
let verb = false;
let tot = 0;
let failedWords = "Failed Words:\n \n";
document.getElementById("failList").innerHTML = failedWords;
let correctAns;
let audioUrl;

function loadList(para) {
  if (para == "medium") {
    lines = linesMed;
    document.getElementById("medium").classList.add("disabled");
    document.getElementById("hard").classList.remove("disabled");
    document.getElementById("easy").classList.remove("disabled");
  } else if (para == "hard") {
    lines = linesHard;
    document.getElementById("hard").classList.add("disabled");
    document.getElementById("easy").classList.remove("disabled");
    document.getElementById("medium").classList.remove("disabled");
  } else {
    lines = linesEasy;
    document.getElementById("easy").classList.add("disabled");
    document.getElementById("medium").classList.remove("disabled");
    document.getElementById("hard").classList.remove("disabled");
  }

  //lines = linesTest;
  setWord();
}

function setWord() {
  while (randomNumber === lastRandomNumber) {
    randomNumber = parseInt(Math.random() * lines.length);
    // check to prevent infinite loop
    if (lines.length === 1) {
      break;
    }
  }
  console.log(randomNumber, lastRandomNumber);
  // keep track of the last random number
  lastRandomNumber = randomNumber;

  //parse reading and pitch accent
  wordNow = {
    word: lines[randomNumber].replace(/ *\[[^\]]*]/, ""),
    reading: (reading = lines[randomNumber].split(";")[0].split("[")[1]),
    pitch: lines[randomNumber].split(";")[1].split("]")[0],
  };
  verb = false;
  if (wordNow.reading.split(";")[0].includes(",")) {
    wordNow.reading = wordNow.reading.split(",")[1];
    verb = true;
  }
  if (!verb) {
    console.log(wordNow.word.split("]"));
    wordNow.reading += lines[randomNumber].split("]")[1];
  }

  if (verb) {
    if (!/([一-龯])/.test(wordNow.word)) {
      wordNow.reading = "";
    }
  }
  if (wordNow.reading.length === 1) {
    if (wordNow.pitch.includes("o") && !wordNow.pitch.includes("a")) {
      wordNow.pitch += "a";
    }

    if (wordNow.pitch.includes("a") && !wordNow.pitch.includes("o")) {
      wordNow.pitch += "o";
    }
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
    linesTest = content
      .replace(/\r\n|\r/g, "\n")
      .trim()
      .split("\n");
    //console.log(lines);
  });
  $.ajax({ url: "wordlistEasy.txt" }).done(function (content) {
    // normalize the line breaks, then split into lines
    linesEasy = content
      .replace(/\r\n|\r/g, "\n")
      .trim()
      .split("\n");
    //console.log(lines);
    loadList("easy");
  });
  $.ajax({ url: "wordlistMed.txt" }).done(function (content) {
    // normalize the line breaks, then split into lines
    linesMed = content
      .replace(/\r\n|\r/g, "\n")
      .trim()
      .split("\n");
    //console.log(lines);
    //setWord();
  });
  $.ajax({ url: "wordlistHard.txt" }).done(function (content) {
    // normalize the line breaks, then split into lines
    linesHard = content
      .replace(/\r\n|\r/g, "\n")
      .trim()
      .split("\n");
    //console.log(lines);
    //setWord();
  });
});

function scrollToBottom() {
  $("#failList").scrollTop($("#failList")[0].scrollHeight);
}
function answer(pitch) {
  getAudio(wordNow.reading, wordNow.word);
  if (wordNow.pitch.includes(pitch)) {
    score += 1;
    tot += 1;
    document.getElementById("score").innerHTML = "Score: " + score + "/" + tot;
    console.log(score);
    document.getElementById("prevWord").innerHTML =
      "Last word: " + wordNow.word;
    /* if (wordNow.pitch.includes("h")) {
      document.getElementById("prevWord").style.color = "blue";
    } else if (wordNow.pitch.includes("a")) {
      document.getElementById("prevWord").style.color = "red";
    } else if (wordNow.pitch.includes("n")) {
      document.getElementById("prevWord").style.color = "orange";
    } else if (wordNow.pitch.includes("o")) {
      document.getElementById("prevWord").style.color = "green";
    } else if (wordNow.pitch.includes("k")) {
      document.getElementById("prevWord").style.color = "purple";
    } */
    setWord();
    document.getElementById("correct").innerHTML = "O";
    document.getElementById("correct").style.color = "green";
    //reset
  } else {
    tot += 1;
    ansNow = "";
    document.getElementById("score").innerHTML = "Score: " + score + "/" + tot;
    console.log(score);
    correctAns = "　";
    if (pitch.includes("h")) {
      ansNow += "<span style='color:blue'>平板</span>　";
    }
    if (pitch.includes("a")) {
      ansNow += "<span style='color:red'>頭高</span>　";
    }
    if (pitch.includes("n")) {
      ansNow += "<span style='color:orange'>中高</span>　";
    }
    if (pitch.includes("o")) {
      ansNow += "<span style='color:green'>尾高</span>　";
    }
    if (pitch.includes("k")) {
      ansNow += "<span style='color:purple'>起伏</span>　";
    }

    if (wordNow.pitch.includes("h")) {
      correctAns += "<span style='color:blue'>平板</span>　";
    }
    if (wordNow.pitch.includes("a")) {
      correctAns += "<span style='color:red'>頭高</span>　";
    }
    if (wordNow.pitch.includes("n")) {
      correctAns += "<span style='color:orange'>中高</span>　";
    }
    if (wordNow.pitch.includes("o")) {
      correctAns += "<span style='color:green'>尾高</span>　";
    }
    if (wordNow.pitch.includes("k")) {
      correctAns += "<span style='color:purple'>起伏</span>　";
    }
    document.getElementById("prevWord").innerHTML =
      "Last word: " +
      wordNow.word +
      "　(" +
      correctAns +
      ")" +
      "<br>" +
      "You answered: " +
      ansNow;
    document.getElementById("correct").innerHTML = "x";
    document.getElementById("correct").style.color = "red";

    failedWords += wordNow.word + "\n";
    document.getElementById("failList").innerHTML = failedWords;
    console.log(wordNow.word);
    scrollToBottom();
    setWord();
  }
}

// http://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=kana=
function getAudio(kana, kanji) {
  if (!/([一-龯])/.test(wordNow.word)) {
    audioUrl =
      "http://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=" +
      "&kana=" +
      kanji;
  } else {
    audioUrl =
      "http://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=" +
      kanji +
      "&kana=" +
      kana;
  }
  let wordAudio = new Audio(audioUrl);

  //console.log(audioUrl);
  //console.log("searching for:" + wordNow.word + "(" + wordNow.reading + ")");
  $(wordAudio).on("loadedmetadata", function () {
    //  console.log(wordAudio.duration);
    if (wordAudio.duration < 5) {
      wordAudio.play();
    }
  });
}
// getAudio(wordNow.reading, wordNow.word);
もしや;
