let sentenceDrop;
let mora = 0;
let accentMora = 0;
let score = 0;
let tot = 0;
let btnCount = 1;
let senAcc = [];
var splitSentence = splitSentence.filter(function (el) {
  return el.length != 0;
});
let kanjiSent = sentence.replaceAll(/ *\[[^\]]*]/g, "").replaceAll(" ", "");
let kanaSent = "";
let i;
let ans = [];
let wordsInSen = [{ word: "", reading: "", pitch: "", drop: "" }];
splitSentence = sentence.split(" ");
let writeObject = [
  {
    sentence: "",
    kana: "",
    drops: [],
    audio: "",
  },
];

$(document.body).ready(function () {
  // load the trivia from the server
  $.ajax({ url: "sentencelist.txt" }).done(function (content) {
    // normalize the line breaks, then split into lines
    lines = content
      .replace(/\r\n|\r/g, "\n")
      .trim()
      .split("\n");
    //console.log(lines);
  });
  $.ajax({ url: "sentences.json" }).done(function (json) {});
  console.log(content);
  for (sentences in content) {
  }
});

//generate kana sentence
for (word in splitSentence) {
  let temp;
  if (splitSentence[word].includes("[")) {
    if (!/([一-龯])/.test(splitSentence[word])) {
      temp = splitSentence[word].split(";")[0].split("[")[0];
    } else {
      temp = splitSentence[word].split(";")[0].split("[")[1];
    }
    if (temp.includes(",")) {
      temp = temp.split(",")[1];
    }
    kanaSent += temp;
  } else {
    kanaSent += splitSentence[word];
  }
}

//parse each word in sentence
for (i = 0; i < splitSentence.length; i++) {
  //console.log("total mora=" + mora);
  if (splitSentence[i].includes("[")) {
    wordsInSen[i] = {
      word: splitSentence[i].replace(/ *\[[^\]]*]/, ""),
      reading: splitSentence[i].split(";")[0].split("[")[1],
      pitch: splitSentence[i].split(";")[1].split("]")[0],
    };

    if (wordsInSen[i].reading.includes(",")) {
      wordsInSen[i].reading.split(",")[1];
    }
    wordsInSen[i].drop = "";
    if (wordsInSen[i].pitch.includes("h")) {
      // wordsInSen[i].drop += wordsInSen[i].pitch.replaceAll("h", "0");
      //if we make the drop of heiban 0, then it will place an accent at the index
      //while blank, becomes undefined in heiban only words, which may cause problems in future
      wordsInSen[i].drop += wordsInSen[i].pitch.replaceAll("h", "");
    }
    if (wordsInSen[i].pitch.includes("a")) {
      wordsInSen[i].drop += wordsInSen[i].pitch.replaceAll("a", "1");
    }
    if (wordsInSen[i].pitch.includes("o")) {
      wordsInSen[i].drop += wordsInSen[i].pitch.replaceAll(
        "o",
        wordsInSen[i].word.length
      );
    }
    if (wordsInSen[i].pitch.includes("n")) {
      //get the character after n
      wordsInSen[i].drop += wordsInSen[i].pitch.replaceAll("n", "");
    }
    if (wordsInSen[i].pitch.includes("k")) {
      //get the character after n
      wordsInSen[i].drop += wordsInSen[i].pitch.replaceAll("k", "");
    }
    //console.log("word drop=" + eval(wordsInSen[i].drop));
    accentMora += mora + eval(wordsInSen[i].drop);
    //console.log("Sentence accent=" + accentMora);
    senAcc.push(accentMora);
    accentMora = 0;
    //console.log(senAcc);
    if (wordsInSen[i].reading.length > 0) {
      mora += wordsInSen[i].reading.length;
    } else {
      mora += wordsInSen[i].word.length;
    }
  } else {
    wordsInSen[i] = {
      word: splitSentence[i],
      reading: "",
      pitch: "",
    };
    mora += wordsInSen[i].word.length;
  }
  senAcc = senAcc.filter(Boolean);
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function numbersOnly(value) {
  if (typeof value === "number") {
    return value;
  }
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
}

console.log(kanaSent);
console.log(senAcc);

//
