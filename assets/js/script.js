var marvelUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b4cf87a8867f352c532cbf6b1548a717&hash=0c0886ca5bcf5b7a6ab7cf772bc6995a&limit=100&offset=`;
offsetValue = 0

for  (var i=0; i <81; i++) {
  $.ajax({
  url: marvelUrl + offsetValue,
  method: 'GET',
  }).then(function (response) {
    console.log(response);
  });
  offsetValue = offsetValue + 100
}

$('#searchGifBtn').on('click', function () {
    var giphyUrl = `https://api.giphy.com/v1/gifs/search?q=${term}&apikey=pYOXbtrExM145EIidmGN2JB89VuG71Pj`;
    var term = $('input').val();

    $.ajax({
    url: giphyUrl,
    method: 'GET',
    }).then(function (response) {
        console.log(response);
    });
});