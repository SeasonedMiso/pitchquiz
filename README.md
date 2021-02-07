Pitch accent quiz and stuff

Web interface for them for cross platform, host from github.io

interface:
https://materializecss.com/

steps:
make web interface

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
    Add audio? [http://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=%E7%8A%AC&kana=%E3%81%84%E3%81%AC 　 for the word 犬]
    Fix display for ultrawide
    correct and fail sfx
    difficulty buttons centred (flexbox? https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

Footer and header styling guide: https://css-tricks.com/snippets/css/complete-guide-grid/

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
