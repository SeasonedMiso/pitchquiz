let lines;
let randomNumber;
let lastRandomNumber;
let score;

$(document.body).ready(function () {
  // load the trivia from the server
  $.ajax({ url: "wordlist.txt" }).done(function (content) {
    // normalize the line breaks, then split into lines
    lines = content
      .replace(/\r\n|\r/g, "\n")
      .trim()
      .split("\n");
    //console.log(lines);
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
      console.log(lines[randomNumber]);
      let reading = lines[randomNumber].split(";")[0].split("[")[1];
      /* if (reading.includes(",")) {
      reading = reading.split(",")[1];
    }*/

      //console.log(word);
      let wordNow = {
        word: lines[randomNumber].replace(/ *\[[^\]]*]/, ""),
        reading: (reading = lines[randomNumber].split(";")[0].split("[")[1]),
        pitch: lines[randomNumber].split(";")[1].split("]")[0],
      };
      let verb = false;
      if (wordNow.reading.includes(",")) {
        wordNow.reading = wordNow.reading.split(",")[1];
        verb = true;
      }
      if (wordNow.reading == "") {
        wordNow.reading = wordNow.word;
        wordNow.word = "";
      }
      displayThing = document.getElementById("atamadaka").style.display;
      if (verb == true) {
        document.getElementById("atamadaka").style.display = "none";
        document.getElementById("odaka").style.display = "none";
        document.getElementById("nakadaka").style.display = "none";
        document.getElementById("kifuku").style.display = "displayThing";
      } else {
        document.getElementById("atamadaka").style.display = "displayThing";
        document.getElementById("odaka").style.display = "displayThing";
        document.getElementById("kifuku").style.display = "none";
      }
      $("#word").text(wordNow.word);
      $("#reading").text(wordNow.reading);
      //$("#pitch").text(wordNow.pitch);
    }
    setWord();
  });
});
function answer(pitch) {
  if (wordNow.pitch.includes(pitch)) {
    score += 1;
    console.log(score);
    setWord();
    //reset
  }
}
