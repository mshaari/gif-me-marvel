// define variables and arrays to store API data
var characterList = [];
var characterDescription = [];
var characterImage = [];
var characterUrl = [];
var favoriteGifs = [];
var characterIndex = "";

// style the main/initial page
function init() {
    // hide all elements except header
    $('header').attr("style", "display: block");
    $('.searchBar').attr("style", "display: block");
    $('.loadingPage').attr("style", "display: none");
    $('.characterPage').attr("style", "display: none");
    $('.favoriteGifsPage').attr("style", "display: none");
    // style header to fill the page and add subtitle
    $('h1').css({ "font-size": "100px" });
    $('header').css({ "height": "800px", "padding-top": "200px" });
    $('header').children('p').remove();
    $('<p>Look up descriptions of your favorite MARVEL character.</p>').insertBefore('.searchBar');
    $('<p>Find and favorite related GIFs!</p>').insertBefore('.searchBar');
    // retrieve data from local storage
    var storedFavorites = JSON.parse(localStorage.getItem("favoriteGifs"));
    if (storedFavorites !== null) {
        favoriteGifs = storedFavorites;
    };
};

// calls function upon page load/initialize
init();

// return to man/initial page by clicking on heading
$('h1').on('click', function () {
    init();
});

// eventlistener for #searchCharacterBtn button
$('#searchCharacterBtn').on('click', function () {
    // check that input is not blank otherwise show error modal
    if (!$('input').val()) {
        $('#selectedGif').empty();
        $('.modal-card-title').text("ERROR: ");
        $('<p>Must enter a valid Marvel character.</p>').appendTo('#selectedGif');
        $('#addFavorite').hide();
        $('#deleteFavorite').hide();
        $('.modal-card-foot').children('.is-warning').text('OK');
        $('.modal').addClass('is-active');
    } else {
        // check to see if MARVEL API have been loaded
        if (!$.isEmptyObject(characterList)) {
            // MARVEL API loaded, proceed to load character
            loadCharacter();
        } else {
            // MARVEL API not loaded, display loading page
            $('header').attr("style", "display: none");
            $('.searchBar').attr("style", "display: none");
            $('.characterPage').attr("style", "display: none");
            $('.favoriteGifsPage').attr("style", "display: none");
            $('h1').css({ "font-size": "50px" });
            $('.loadingPage').attr("style", "display: block");
            // after loading page is displayed, call function to fetch MARVEL API data
            setTimeout(function() {
                fetchMarvelAPI();
                setTimeout(function(){
                    // MARVEL API loaded, proceed to load character
                    loadCharacter();
                }, 100);
            }, 100);
        };
    };
});

// eventlistener for keypress on the input form
$('input').keypress(function (e) {
    // check that the 'enter' key was pressed
    if (e.which === 13) {
        // check that input is not blank otherwise show error modal
        if (!$('input').val()) {
            $('#selectedGif').empty();
            $('.modal-card-title').text("ERROR: ");
            $('<p>Must enter a valid Marvel character.</p>').appendTo('#selectedGif');
            $('#addFavorite').hide();
            $('#deleteFavorite').hide();
            $('.modal-card-foot').children('.is-warning').text('OK');
            $('.modal').addClass('is-active');
        } else {
            // check to see if MARVEL API have been loaded
            if (!$.isEmptyObject(characterList)) {
                // MARVEL API loaded, proceed to load character
                loadCharacter();
            } else {
                // MARVEL API not loaded, display loading page
                $('header').attr("style", "display: none");
                $('.searchBar').attr("style", "display: none");
                $('.characterPage').attr("style", "display: none");
                $('.favoriteGifsPage').attr("style", "display: none");
                $('h1').css({ "font-size": "50px" });
                $('.loadingPage').attr("style", "display: block");
                // after loading page is displayed, call function to fetch MARVEL API data
                setTimeout(function() {
                    fetchMarvelAPI();
                    setTimeout(function(){
                        // MARVEL API loaded, proceed to load character
                        loadCharacter();
                    }, 100);
                }, 100);
            };
        };
    };
});

// fetch data from server-side MARVEL API
function fetchMarvelAPI () {
    // pick a random number (0/1/2)
    var randomI = Math.floor(Math.random() * 3);
    // define url based on random number
    if (randomI === 0) {
        var marvelUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b4cf87a8867f352c532cbf6b1548a717&hash=0c0886ca5bcf5b7a6ab7cf772bc6995a&limit=100&offset=`;
    } else if (randomI === 1) {
        var marvelUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=e504bca68a98973035de00e2c0fe0f16&hash=cb63b4d43307c792ab1e0126166855c4&limit=100&offset=`;
    } else {
        var marvelUrl = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=22cfa02cd52325c33f215b6da7bd306b&hash=b0713e165311f9c1c5fdb62f227f71f5&limit=100&offset=`;
    };
    // set offset value for looping multiple fetch
    var offsetValue = 0;
    for (var x = 0; x < 16; x++) {
        // update loading page before running ajax
        setTimeout(function() {
            $('#loadingProgress').text('Progress: ' + (((offsetValue+100)/1600)*100).toFixed() + '%');
            $('.progress').attr("value",((offsetValue+100)/1600)*100);
            // run ajax asynchronously so data is in order
            $.ajax({
                url: marvelUrl + offsetValue,
                method: 'GET',
                async: false,
            }).done(function (response) {
                // push response data parameters to arrays
                for (var i = 0; i < response.data.results.length; i++) {
                    characterList.push(response.data.results[i].name.toUpperCase());
                    characterDescription.push(response.data.results[i].description);
                    characterImage.push(response.data.results[i].thumbnail.path + "." + response.data.results[i].thumbnail.extension);
                    characterUrl.push(response.data.results[i].urls[0].url);
                
                };
            });
            // increment offset for next loop
            offsetValue = offsetValue + 100;
        }, 100);
    };
};

// populate the character page
function loadCharacter() {
    // define the character
    var character = $('input').val().toUpperCase();
    // find exact match index of character in characterList array
    if (characterList.includes(character)) {
        var characterIndex = characterList.indexOf(character);
    // find beginning partial match index of character in characterList array
    } else if (characterList.filter(str => str.startsWith(character))) {
        var characterIndex = characterList.findIndex(str => str.startsWith(character));
    }
    // if no match is found style and toggle error modal
    if (characterIndex === '' || characterIndex === -1 || typeof characterIndex === "undefined") {
        $('#selectedGif').empty();
        $('.modal-card-title').text("ERROR: ");
        if ($('input').val()==="") {
            $('<p>Invalid blank input. Please enter a valid Marvel character.</p>').appendTo('#selectedGif');
        } else {
            $('<p>' + $('input').val() + ' is not a valid Marvel character.</p>').appendTo('#selectedGif');
        }
        $('#addFavorite').hide();
        $('#deleteFavorite').hide();
        $('.modal-card-foot').children('.is-warning').text('OK');
        $('.modal').addClass('is-active');
        $('input').val("");
    // if match is found, populate character card
    } else {
        $('#characterName').text(characterList[characterIndex]);
        // if description is blank, use default message
        if (characterDescription[characterIndex] != "") {
            $('#characterDescription').text(characterDescription[characterIndex]);
        } else {
            $('#characterDescription').text("No character description available. Click on link below for more information.");
        };
        $('#marvelLink').attr("href", (characterUrl[characterIndex]));
        $("#characterImage").attr("src", characterImage[characterIndex]);
        $("#characterImage").attr("alt", characterList[characterIndex]);
        // clear index for next search
        characterIndex = "";
        // style page
        $('header').attr("style", "display: block");
        $('.searchBar').attr("style", "display: block");
        $('.loadingPage').attr("style", "display: none");
        $('.characterPage').attr("style", "display: inline-flexbox");
        $('header').css({ "height": "200px", "padding-top": "25px" });
        $('header').children('p').remove();
        $('h1').css({ "font-size": "50px" });
        // load GIFs
        loadGifs();
    };
};

// fetch data from server-side MARVEL API and populate GIFs section
function loadGifs() {
    // clear previous GIFS from section
    $('.gifs').empty();
    // define the character
    var character = $('input').val().toUpperCase();
    // define the GIPHY API url
    var giphyUrl = `https://api.giphy.com/v1/gifs/search?q=${character}&apikey=pYOXbtrExM145EIidmGN2JB89VuG71Pj&offset=`;
    // set offset value for looping multiple fetch
    offsetValue = 0;
    // loop through twice for 100 total items
    for (var x = 0; x < 2; x++) {
        // run ajax to get GIPHY data
        $.ajax({
            url: giphyUrl + offsetValue,
            method: 'GET',
            async: false,
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                // define data and append GIF url to element
                url = response.data[i].images.fixed_height_downsampled.url;
                // if GIF already saved, append additional star img
                if (favoriteGifs.includes(url)) {
                    $(`<div class="gifGroup"><img src='${url}' class=gifItem><img src="./assets/images/star.png" class="starItem"></div>`).appendTo('.gifs');
                // append just the gif to the section
                } else {
                $(`<div class="gifGroup"><img src='${url}' class=gifItem></div>`).appendTo('.gifs');
                };
            };
        });
        // increment offset for next loop
        offsetValue = offsetValue + 50;
    };
    // clear section and add GIPHY attribution footer
    $("footer").remove();
    $('<footer"><img src="./assets/images/PoweredBy_200_Horizontal_Light-Backgrounds_With_Logo.gif"></footer>').insertAfter('.gifs');
    // clear input for next search
    $('input').val("");
};

// eventlistener for clicking on the gifs section
$('.gifs').on('click', function (event) {
    // check that the item clicked is an img element
    if ($(event.target).is('img')) {
        // style, populate, and toggle modal
        $('#selectedGif').empty();
        $('.modal-card-title').text('Would you like to favorite this GIF?');
        $('#addFavorite').show();
        $('#deleteFavorite').hide();
        $('.modal-card-foot').children('.is-warning').text('No');
        // append selected gif to modal
        $('<img src=' + $(event.target).attr('src') + '>').appendTo('#selectedGif');
        $('.modal').addClass('is-active');
    };
});

// eventlistener for favorite page button
$('#favoriteGifs').on('click', function () {
    loadFavorites();
});

// style and load the favorites page
function loadFavorites() {
    $('header').css({ "height": "125px", "padding-top": "25px" });
    $('header').children('p').remove();
    $('h1').css({ "font-size": "50px" });
    // hide all elements except favorites page
    $('.searchBar').attr("style", "display: none");
    $('.loadingPage').attr("style", "display: none");
    $('.characterPage').attr("style", "display: none");
    $('.favoriteGifsPage').attr("style", "display: block");
    // clear the page
    $('.favoriteGifsPage').empty();
    // loop through favoriteGifs array and append GIFs to page
    for (var i = 0; i < favoriteGifs.length; i++) {
        $('<img src=' + favoriteGifs[i] + ' class="gifItem">').appendTo('.favoriteGifsPage');
    };
    // append GIPHY footer attribution
    $('<footer><img src="./assets/images/PoweredBy_200_Horizontal_Light-Backgrounds_With_Logo.gif"></footer>').appendTo('.favoriteGifsPage');
};

// eventlistener for clicking on the favorites page
$('.favoriteGifsPage').on('click', function (event) {
    // check that the item clicked is an img element
    if ($(event.target).is('img')) {
        // style, populate, and toggle modal
        $('#selectedGif').empty();
        $('.modal-card-title').text('Remove this GIF from favorites?');
        $('#addFavorite').hide();
        $('#deleteFavorite').show();
        $('.modal-card-foot').children('.is-warning').text('No');
        // append selected gif to modal
        $('<img src=' + $(event.target).attr('src') + '>').appendTo('#selectedGif');
        $('.modal').addClass('is-active');
    };
});

// eventlistener for the Yes #addFavorite button on the modal
$('#addFavorite').on('click', function () {
    // check if the GIF exist in the favoriteGifs array
    if (!favoriteGifs.includes($('#selectedGif').children('img').attr('src'))) {
        // if not, add GIF url to array and append star item under selected GIF element
        favoriteGifs.push($('#selectedGif').children('img').attr('src'));
        // update local storage
        localStorage.setItem("favoriteGifs", JSON.stringify(favoriteGifs));
        $('<img src="./assets/images/star.png" class="starItem"></img>').insertAfter($('.gifGroup').children('[src="' + $('#selectedGif').children('img').attr('src') + '"]'));
        $('.modal').removeClass('is-active');
    // if already in the array, style and toggle error modal
    } else {
        $('.modal-card-title').text("ERROR: Already favorited GIF");
        $('<p>Remove this GIF from favorites?</p><br>').prependTo('#selectedGif');
        $('#addFavorite').hide();
        $('#deleteFavorite').show();
        $('.modal').addClass('is-active');
    };
});

// eventlistener for the Yes #deleteFavorite button on the modal
$('#deleteFavorite').on('click', function () {
    // remove the GIF url from the array
    favoriteGifs = jQuery.grep(favoriteGifs, function (value) {
        return value != $('#selectedGif').children('img').attr('src');
    });
    // update local storage
    localStorage.setItem("favoriteGifs", JSON.stringify(favoriteGifs));
    // if on the favorite gifs page then reload the page
    if ($('.favoriteGifsPage').is(":visible")) {
        loadFavorites();
    // on the character page, remove the star item element
    } else {
        $('[src="' + $('#selectedGif').children('img').attr('src') + '"]').siblings().remove();
    };
    $('.modal').removeClass('is-active');
});

// eventlistener for the No and close button on the modal
$('.close-modal').on('click', function () {
    // if pages are visible then just close the modal
    if ($('.favoriteGifsPage').is(":visible") || $('.characterPage').is(":visible")) {
        $('.modal').removeClass('is-active');
    // if main/initial page is visible then re-initalize/style the main page and close the modal
    } else {
        init();
        $('.modal').removeClass('is-active');
    };
});