
$(document).ready(function(){
    var searchButton = $('#search-gif-btn');
    var searchInput = $('#search-gif-input');
    var favoriteCategories = $('.favorite-category');
    var displayedGifs = [];

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
            category = $(this).parent().text().trim().toLowerCase();
            displayedGifs = displayedGifs.filter(function(gif){
                return gif.category != category;
            });
            updateGifs();
            $(this).parent().remove();
            e.stopPropagation();
        });
    }

    $.getJSON({
        url: "http://api.giphy.com/v1/gifs/trending?api_key=CGGDuOAsCtV9rzV4ONMfLRO33ymDbHWe",
        success: function(response){
            var gifs = response.data;
            var gifsWithCategory = gifs.map(function(gif){
                var gifWithCategory = gif;
                gif.category = "trending";
                return gifWithCategory;
            });
            displayedGifs = displayedGifs.concat(gifsWithCategory);
            updateGifs();
        }
    })

    function updateGifs(){
        var html = "";

        displayedGifs.forEach(function(gif){
            var gif = gif.images.downsized_large;
            var gifHtml = "";
            gifHtml+= '<div class="column is-one-quarter">'
            gifHtml+= '<img src='+ gif.url +' height=' + gif.height + ' widgth='+ gif.width +'>'
            gifHtml+= '</div>'
            html += gifHtml;
        });

        $("#gifs-container").html(html);
    }
});