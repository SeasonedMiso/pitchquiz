Pitch accent quiz and stuff

Web interface for them for cross platform, host from github.io

interface:
https://materializecss.com/

All:
TODO:
fix textarea styling for mobile
list of things already used/ stop repetetion

Sentence tool:
TODO:
Generate button verb conjugation
failed sentence list
xaudio replay button
0implement words with multiple accents
get rid of blue on toggle red off
x support override/to make a custom array of drops and to use that in place of parsing
make navbar display on mobile
divide sentence.js into a script to parse yoga syntax, and a script to accept an input of a text file in format of (sentence,dropArray)

Word Tool:
Errors:
X verbs being odaka etc
X nouns being kifuku
x Text color
x hiragana verbs getting furigana
x Showing same word twice
0 remove conjugated forms (細かく vs 細かい)
remove compound words that only have one word parsed (身[み;h]のまわり)
x fix furigana to be ontop of kanji, or the whole word in kana above
x Chrome testing
x Odaka 1 mora words make atamadaka valid too?

    ToDO:
    x display pitch of your guess v.s answer in a way that doesn't look bad
    x choose word list (frequency) [By loading new txt, or by having 3 different pages?]
    X list of failed words
    mobile formating
    x Show alternate pitch in case of 2+ pitches
    show specific drops in nakadaka words
    export failed words to anki deck
    X script to remove empty lines from text
    add a report error feature
    Pass/IDK button
    x Add audio? [http://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=%E7%8A%AC&kana=%E3%81%84%E3%81%AC 　 for the word 犬]
    Fix display for ultrawide
    correct and fail sfx
    difficulty buttons centred (flexbox? https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

x Footer and header styling guide: https://css-tricks.com/snippets/css/complete-guide-grid/

WordLists:
easy: 1-2k
medium:2k-5k
hard:5k-20k

regex stuff:
^._\[.+\]._\[.+\]._$  
^[\s\n]_$
^\n+$
^([^[\]]\*)$

Verbs with odaka tag
^._,._;._o._$

errors:

越し　:　こしし reading

Console dump when same word twice:

3 script.js:148:13
688 1102 script.js:49:11
Array [ "吾" ]
script.js:65:13
false script.js:83:11
Loading mixed (insecure) display content "http://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=%E6%B1%BA%E3%81%BE%E3%82%8B&kana=%E3%81%8D%E3%81%BE%E3%82%8B" on a secure page
pitchquiz-git-master.seasonedmiso.vercel.app
Cannot play media. No decoders for requested formats: audio/mpeg pitchquiz-git-master.seasonedmiso.vercel.app
14 script.js:148:13
7 688 script.js:49:11
Uncaught TypeError: lines[randomNumber].split(...)[1] is undefined
setWord https://pitchquiz-git-master.seasonedmiso.vercel.app/js/script.js:57
answer https://pitchquiz-git-master.seasonedmiso.vercel.app/js/script.js:162
onclick https://pitchquiz-git-master.seasonedmiso.vercel.app/:1
script.js:57:32
setWord https://pitchquiz-git-master.seasonedmiso.vercel.app/js/script.js:57
answer https://pitchquiz-git-master.seasonedmiso.vercel.app/js/script.js:162
onclick https://pitchquiz-git-master.seasonedmiso.vercel.app/:1

​
