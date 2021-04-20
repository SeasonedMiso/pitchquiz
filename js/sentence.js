const containerId = "button-container";
let score = 0;
let tot = 0;
let i;
let randomNumber;
let lastRandomNumber;
let lines;
let sentenceNow = {
  sentence: "これはペンです ",
  kana: "これはペンです ",
  drops: [4],
  audio: "",
};
let content = [];
let ans = [];
nowAudio = new Audio();
//let json;

//main method
$(document.body).ready(function () {
  //   $.ajax({ url: "sentences.json" }).done(function (json) {
  //     content = json.sentences;
  //     setWord();
  //     console.log(sentenceNow.drops);
  // });

  fetch("https://pitchy-backend-git-master-seasonedmiso.vercel.app/").then(function (response) {
    response.json().then((json) => {
      content = json.sentences;
      setWord();
      console.log(sentenceNow.drops);
    });
  });
});
/////////////////

//accept user input
function evaluateAns(prsdBtn) {
  prsdBtn.classList.toggle("red");
  let pos = eval(prsdBtn.dataset.post);
  if (ans.includes(pos)) {
    ans = arrayRemove(ans, pos);
  } else {
    ans.push(pos);
  }
  console.log(ans);
}
//finalize selection
function gradeSen() {
  tot += 1;
  if (
    ans.length === sentenceNow.drops.length &&
    ans.every(function (value, index) {
      return value === sentenceNow.drops[index];
    })
  ) {
    console.log("pass");
    score += 1;
    console.log(score);
  } else {
    console.log("fail");
  }
  document.getElementById("score").innerHTML = "Score: " + score + "/" + tot;
  setWord();
  ans = [];
  //btnCount = 1;
  //i = 0;
}

function setWord() {
  if (content && content.length) {
    while (randomNumber === lastRandomNumber) {
      randomNumber = parseInt(Math.random() * content.length);
      console.log("rand" + randomNumber);
    }
    //console.log(randomNumber, lastRandomNumber);
    // keep track of the last random number
    lastRandomNumber = randomNumber;
    //console.log(json.sentence)
    sentenceNow = content[randomNumber];
    buildSentence();
    //playaudio
    playAudio();
  }
}
function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function buildSentence() {
  let btnCount = 1;
  //character = 1;
  document.getElementById("sentenceBox").innerHTML =
    sentenceNow.sentence + "</br>";
  document.getElementById("sentenceBtn").innerHTML = "";
  //generate a button for each character in sentence
  for (const character of sentenceNow.kana) {
    if (sentenceNow.drops.includes(btnCount)) {
      //drop mora
      document.getElementById(
        "sentenceBtn"
      ).innerHTML += `<button onclick="evaluateAns(this)" class="ans mora" data-post="${btnCount}">${character}</button>`;
    } else {
      document.getElementById(
        "sentenceBtn"
      ).innerHTML += `<button onclick="evaluateAns(this)" class="notAns mora" data-post="${btnCount}">${character}</button>`;
    }
    btnCount += 1;
  }
  console.log(sentenceNow.drops);
}

function playAudio() {
  nowAudio.pause();
  nowAudio.currentTime = 0;
  nowAudio = new Audio("resources/" + sentenceNow.audio);
  $(nowAudio).on("loadedmetadata", function () {
    //  console.log(wordAudio.duration);
    nowAudio.play();
  });
}
