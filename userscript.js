// ==UserScript==
// @name         Guess Hack
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The app will answer it self
// @author       Amine
// @match        https://guessthiscode.com/
//@run-at document-end
// ==/UserScript==
points = 50*75

//Change hide forever

var changeHide = $('<style>.hide { visibility: visible; }</style>');
$('html > head').append(changeHide);

//
pre_hack_html = $("<h4 class='hack'><b>Hack suggestion: </b> Better to skip 4 the first time </h4>");
$(".points-container").append(pre_hack_html);

hack_html_selector = $(".hack");


refreshUI = function refreshUI(){
    clearButtons()

    if (gistIndex == gistObjectArray.length) {
        fetchGists()
        return
    }

    let gistObject = gistObjectArray[gistIndex]
    rightLanguage = gistObject["language"]

    let randomAnswers = []
    while (randomAnswers.length != 4) {
        var randomAns = randomLanguages[getRandomInt(randomLanguages.length-1)]
        if (!randomAnswers.includes(randomAns) && randomAns != rightLanguage) {
            randomAnswers.push(randomAns)
        }
    }

    rightNumberIndex = getRandomInt(randomAnswers.length-1)
    randomAnswers[rightNumberIndex] = rightLanguage

    for (var i = 0; i < randomAnswers.length; i++) {
        $(".btn"+i).text(randomAnswers[i])
    }

    $( "#coding-block" ).empty();
    $(".lds-ripple").css("display", "none");
    postscribe('#coding-block', "<script class='gist-code' src='"+gistObject['embed_url']+"'><\/script>");

    //hacking stuff

    hack_html_selector.html("<b>Hack suggestion: </b>"+rightLanguage);




}
