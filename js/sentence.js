const containerId = "button-container";
//let sentence = "これ[;h] は ペン[;a] です ";
let sentence =
  "アルゴリズム[;n4] と データ構造[でーたこうぞう;n4] の 定義[ていぎ;a] を 理解[りかい;a] する[,する;h]";
//expected: 4,11,16,20
let sentenceDrop;
let mora = 0;
let accentMora = 0;
let senAcc = [];
splitSentence = sentence.split(" ");
var splitSentence = splitSentence.filter(function (el) {
  return el.length != 0;
});
let kanjiSent = sentence.replaceAll(/ *\[[^\]]*]/g, "").replaceAll(" ", "");
let kanaSent = "";
let wordsInSen = [{ word: "", reading: "", pitch: "", drop: "" }];

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
let i;
for (i = 0; i < splitSentence.length; i++) {
  console.log("total mora=" + mora);
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
    console.log("word drop=" + eval(wordsInSen[i].drop));
    accentMora += mora + eval(wordsInSen[i].drop);
    //console.log("Sentence accent=" + accentMora);
    senAcc.push(accentMora);
    accentMora = 0;
    console.log(senAcc);
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
}
console.log("expected: 4,11,16,20");
//parse drops into sentence location

//Display sentence
document.getElementById("sentenceBox").innerHTML = kanjiSent + "</br>";

//generate a button for each character in sentence
let btnCount = 1;
for (const character of kanaSent) {
  if (senAcc.includes(btnCount)) {
    document.getElementById("sentenceBtn").innerHTML +=
      "<button class='red'>" + character + "</button>";
  } else {
    document.getElementById("sentenceBtn").innerHTML +=
      "<button class='blue'>" + character + "</button>";
  }
  btnCount += 1;
}
