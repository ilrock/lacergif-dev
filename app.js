
$(document).ready(function(){
    var searchButton = $('#search-gif-btn');
    var searchInput = $('#search-gif-input');
    var favoriteCategories = $('.favorite-category');

    searchButton.on('click', function(event){
        console.log(event);
    });

    searchInput.on('keyup', function(event){
        console.log(event);
    });

    for(var i=0; i<favoriteCategories.length; i++){
        $(favoriteCategories[i]).on('click', function(){
            console.log("hai cliccato su una categoria");
        });
        
        $(favoriteCategories[i]).find('.delete').on('click', function(e){
            console.log("Hai cliccato il bottone delete");
            e.stopPropagation();
        });
    }

    var html = "";

    $.getJSON({
        url: "http://api.giphy.com/v1/gifs/trending?api_key=CGGDuOAsCtV9rzV4ONMfLRO33ymDbHWe",
        success: function(response){
            console.log(response);
            var gifs = response.data;
            gifs.forEach(function(gif){
                var gif = gif.images.downsized_large;
                var gifHtml = "";
                gifHtml+= '<div class="column is-one-quarter">'
                gifHtml+= '<img src='+ gif.url +' height=' + gif.height + ' widgth='+ gif.width +'>'
                gifHtml+= '</div>'
                html += gifHtml;
            });
            $("#gifs-container").html(html);
        }
    })
});