characterList = [];
characterDescription = [];
characterImage = [];
characterUrl = [];

function loadCharacter() {
    $('header').css({"height": "200px", "padding-top": "25px"});
    $('h1').css({"font-size": "50px"});
    $('header').children('p').remove();
    $('.gifs').empty();
    $('.characterPage').attr("style", "display: inline-flexbox")
    var character = $('input').val().toUpperCase();
    if (characterList.includes(character)) {
        var characterIndex = characterList.indexOf(character);
        $('#characterName').text(characterList[characterIndex]);
        $('#characterDescription').text(characterDescription[characterIndex]);
        $('#marvelLink').attr("href",(characterUrl[characterIndex]));
        $("#characterImage").attr("src", characterImage[characterIndex]);
        $("#characterImage").attr("alt", characterList[characterIndex]);
    };
    var giphyUrl = `https://api.giphy.com/v1/gifs/search?q=${character}&apikey=pYOXbtrExM145EIidmGN2JB89VuG71Pj&offset=`;
    offsetValue = 0
    for (var x=0; x <2; x++) {
        $.ajax({
        url: giphyUrl + offsetValue,
        method: 'GET',
        }).then(function (response) {
            console.log(response);
            for (var i=0; i<response.data.length; i++) {
                url = response.data[i].images.fixed_height_downsampled.url;
                $(`<img src='${url}'>`).appendTo('.gifs');
            };
        });
        offsetValue = offsetValue + 50
    };
}

$('#searchCharacterBtn').on('click', loadCharacter);
$('input').keypress(function(e) {
    if(e.which === 13){
		loadCharacter();	
	}
})

$('#searchCharacterBtn').on('click', function () {
    $('.gifs').empty();
    var term = $('input').val();
    var giphyUrl = `https://api.giphy.com/v1/gifs/search?q=${term}&apikey=pYOXbtrExM145EIidmGN2JB89VuG71Pj`;
    
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
});

function init() {
    $('.characterPage').attr("style", "display: none")
    var marvelUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b4cf87a8867f352c532cbf6b1548a717&hash=0c0886ca5bcf5b7a6ab7cf772bc6995a&limit=100&offset=`;
    offsetValue = 0
    for (var x=0; x <16; x++) {
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
    }
}

init()