var characterList = [];
var characterDescription = [];
var characterImage = [];
var characterUrl = [];
var characterIndex = "";
var favoriteGifs = [];

function loadCharacter() {
    $('header').css({"height": "200px", "padding-top": "25px"});
    $('header').children('p').remove();
    $('h1').css({"font-size": "50px"});
    $('.characterPage').attr("style", "display: inline-flexbox")
    var character = $('input').val().toUpperCase();
    if (characterList.includes(character)) {
        var characterIndex = characterList.indexOf(character);
    } else if (characterList.filter(str => str.includes(character)).length) {
        var characterIndex = characterList.findIndex(str => str.includes(character));
    }
    if (characterIndex != "") {
        $('#characterName').text(characterList[characterIndex]);
        if (characterDescription[characterIndex] != "") {
            $('#characterDescription').text(characterDescription[characterIndex]);
        } else {
            $('#characterDescription').text("No character description available. Click on link below for more information.")
        }
        $('#marvelLink').attr("href",(characterUrl[characterIndex]));
        $("#characterImage").attr("src", characterImage[characterIndex]);
        $("#characterImage").attr("alt", characterList[characterIndex]);
        var giphyUrl = `https://api.giphy.com/v1/gifs/search?q=${character}&apikey=pYOXbtrExM145EIidmGN2JB89VuG71Pj&offset=`;
        offsetValue = 0
        for (var x=0; x <2; x++) {
            $.ajax({
            url: giphyUrl + offsetValue,
            method: 'GET',
            }).then(function (response) {
                for (var i=0; i<response.data.length; i++) {
                    url = response.data[i].images.fixed_height_downsampled.url;
                    $(`<img src='${url}'>`).appendTo('.gifs');
                };
            });
            offsetValue = offsetValue + 50
        };
        characterIndex = "";
        loadGifs();
    } else {
        $('#selectedGif').empty();
        $('.modal-card-title').text("ERROR: ");
        $('<p>' + $('input').val() + ' is not a valid Marvel character.</p>').appendTo('#selectedGif');
        $('#addFavorite').hide();
        $('#deleteFavorite').hide();
        $('.modal-card-foot').children('.is-warning').text('OK');
        $('.modal').addClass('is-active');
        $('input').val("");
    };
};

function loadGifs() {
    $('.gifs').empty();
    var term = $('input').val();
    var giphyUrl = `https://api.giphy.com/v1/gifs/search?q=${term}&apikey=pYOXbtrExM145EIidmGN2JB89VuG71Pj`;
    $(".gifs").empty();
    $.ajax({
    url: giphyUrl,
    method: 'GET',
    }).then(function (response) {
        console.log(response);
        for (var i=0; i<100; i++) {
            url = response.data[i].images.fixed_height_downsampled.url;
            $(`<img src='${url}'>`).appendTo('.gifs');
        };
    });
    $('input').val("");
};

function loadFavorites() {
    $('header').css({"height": "200px", "padding-top": "25px"});
    $('header').children('p').remove();
    $('h1').css({"font-size": "50px"});
    $('.searchBar').attr("style", "display: none")
    $('.characterPage').attr("style", "display: none")
    $('.favoriteGifsPage').attr("style", "display: block")
    $('.favoriteGifsPage').empty();
    for (var i=0; i<favoriteGifs.length; i++) {
        $('<img src=' + favoriteGifs[i] + '>').appendTo('.favoriteGifsPage');
    };
}

$('.gifs').on('click', function(event) {
    if ($(event.target).is('img')) {
        $('#selectedGif').empty();
        $('.modal-card-title').text('Would you like to favorite this GIF?');
        $('#addFavorite').show();
        $('#deleteFavorite').hide();
        $('.modal-card-foot').children('.is-warning').text('No');
        $('<img src=' + $(event.target).attr('src') + '>').appendTo('#selectedGif');
        $('.modal').addClass('is-active');
    };
});

$('.favoriteGifsPage').on('click', function(event) {
    if ($(event.target).is('img')) {
        $('#selectedGif').empty();
        $('.modal-card-title').text('Would you like to delete this GIF from favorites?');
        $('#addFavorite').hide();
        $('#deleteFavorite').show();
        $('.modal-card-foot').children('.is-warning').text('No');
        $('<img src=' + $(event.target).attr('src') + '>').appendTo('#selectedGif');
        $('.modal').addClass('is-active');
    };
});

$('#deleteFavorite').on('click', function() {
    favoriteGifs = jQuery.grep(favoriteGifs, function(value) {
        return value != $('#selectedGif').children('img').attr('src');
    });
    localStorage.setItem("favoriteGifs", JSON.stringify(favoriteGifs));
    loadFavorites();
    $('.modal').removeClass('is-active');
});

$('#addFavorite').on('click', function() {
    if (!favoriteGifs.includes($('#selectedGif').children('img').attr('src'))) {
        favoriteGifs.push($('#selectedGif').children('img').attr('src'));
        localStorage.setItem("favoriteGifs", JSON.stringify(favoriteGifs));
        $('.modal').removeClass('is-active');
    } else {
        $('.modal-card-title').text("ERROR: Already favorited GIF");
        $('#addFavorite').hide();
        $('#deleteFavorite').hide();
        $('.modal-card-foot').children('.is-warning').text('OK');
        $('.modal').addClass('is-active');
    }
});

$('.close-modal').on('click', function() {
    $('.modal').removeClass('is-active');
});

$('#favoriteGifs').on('click', function() {
    loadFavorites();
});

$('h1').on('click', function() {
    location.reload();
});

$('#searchCharacterBtn').on('click', function() {
    loadCharacter();
});

$('input').keypress(function(e) {
    if(e.which === 13){
		loadCharacter();
	}
})

function init() {
    $('.characterPage').attr("style", "display: none")
    $('.favoriteGifsPage').attr("style", "display: none")
    var storedFavorites = JSON.parse(localStorage.getItem("favoriteGifs"));
    if (storedFavorites !== null) {
        favoriteGifs = storedFavorites;
    };
    // var marvelUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b4cf87a8867f352c532cbf6b1548a717&hash=0c0886ca5bcf5b7a6ab7cf772bc6995a&limit=100&offset=`;
    // var marvelUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=e504bca68a98973035de00e2c0fe0f16&hash=cb63b4d43307c792ab1e0126166855c4&limit=100&offset=`;
    var marvelUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=22cfa02cd52325c33f215b6da7bd306b&hash=b0713e165311f9c1c5fdb62f227f71f5&limit=50&offset=`;
    offsetValue = 0
    for (var x=0; x <25; x++) {
        $.ajax({
        url: marvelUrl + offsetValue,
        method: 'GET',
        }).then(function (response) {
            for (var i=0; i<response.data.results.length; i++) {
                characterList.push(response.data.results[i].name.toUpperCase());
                characterDescription.push(response.data.results[i].description);
                characterImage.push(response.data.results[i].thumbnail.path + "." + response.data.results[i].thumbnail.extension);
                characterUrl.push(response.data.results[i].urls[0].url);
            };
        });
        offsetValue = offsetValue + 100
    };
};

init()