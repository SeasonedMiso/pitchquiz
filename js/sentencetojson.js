let lines;

let writeObject = {
  sentences: [],
};

$(document.body).ready(function () {
  // load the trivia from the server
  $.ajax({ url: "sentencelist.txt" }).done(function (content) {
    // normalize the line breaks, then split into lines
    content =
      "初[はじ;n2]めて 動[うご,うごく;k2]く し ヒーロー[;a] は 遅[おく,おくれる;h]れて やって[,やる;h] くる[,くる;k1] の が 定石[じょうせき;h] です";
    lines = content
      .replace(/\r\n|\r/g, "\n")
      .trim()
      .split("\n");

    //console.log(lines);

    for (i in lines) {
      writeObject.sentences.push({
        sentence: "",
        kana: "",
        drops: [],
        audio: "",
      });

      let splitSentence = lines[i].split(" ");
      splitSentence = splitSentence.filter(function (el) {
        return el.length != 0;
      });
      let kanaSent = "";
      let sentenceDrop;
      let mora = 0;
      let accentMora = 0;
      let senAcc = [];
      let wordsInSen = [{ word: "", reading: "", pitch: "", drop: "" }];

      //Kanji sentence
      let sentenceKanji = lines[i]
        .replaceAll(/ *\[[^\]]*]/g, "")
        .replaceAll(" ", "");
      console.log("kanji: " + sentenceKanji);
      writeObject.sentences[i].sentence = sentenceKanji;

      //kana sentence
      for (word in splitSentence) {
        let temp;
        if (splitSentence[word].includes("[")) {
          if (!/([一-龯])/.test(splitSentence[word])) {
            temp = splitSentence[word].split(";")[0].split("[")[0];
          } else {
            temp = splitSentence[word].split(";")[0].split("[")[1];
          }
          console.log(splitSentence[word]);
          console.log(temp);
          //起[お,おきる;k2]きて
          //お,おきる
          if (temp.includes(",")) {
            temp = temp.split(",")[0] + splitSentence[word].split("]")[1];
            kanaSent += temp;
          } else {
            temp = splitSentence[word].split("[")[1].split(";")[0];
            kanaSent += temp;
          }
        } else {
          kanaSent += splitSentence[word];
        }
      }
      console.log("kana: " + kanaSent);
      writeObject.sentences[i].kana = kanaSent;

      ///////
    }
    console.log(writeObject);
    let json = JSON.stringify(writeObject);
    //let json = JSON.stringify(writeObject.sentences);
    console.log(json);

    //////////
  });
});
