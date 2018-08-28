
$(document).ready(function(){
    var searchButton = $('#search-gif-btn');
    var searchInput = $('#search-gif-input');
    var favoriteCategories = $('.favorite-category');
    var displayedGifs = [];

    searchButton.on('click', function(event){
        var query = searchInput.val();
        
        $.getJSON({
            url: "//api.giphy.com/v1/gifs/search?api_key=CGGDuOAsCtV9rzV4ONMfLRO33ymDbHWe&q=" + query,
            success: function(response){
                var gifs = response.data;
                var gifsWithCategory = gifs.map(function(gif){
                    var gifWithCategory = gif;
                    gif.category = query;
                    return gifWithCategory;
                });
                displayedGifs = displayedGifs.concat(gifsWithCategory);

                updateGifs();
                addCategoryBadge(query);
                searchInput.val("");
            }
        })
    });

    $('body').on('click', '.delete', function(e) {
        category = $(this).parent().text().trim().toLowerCase();
        displayedGifs = displayedGifs.filter(function(gif){
            return gif.category != category;
        });
        updateGifs();
        $(this).parent().remove();
        e.stopPropagation();
    });

    $.getJSON({
        url: "//api.giphy.com/v1/gifs/trending?api_key=CGGDuOAsCtV9rzV4ONMfLRO33ymDbHWe",
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

        displayedGifs = shuffle(displayedGifs);

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

    function addCategoryBadge(category){
        html = "";
        html += '<span class="tag is-success is-large favorite-category">';
        html += category;
        html += '<button class="delete is-small"></button>';
        html += '</span>';

        $($('.tags')[0]).append(html);
    }

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    
});