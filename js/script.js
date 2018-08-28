
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var gMapsUrl ='http://maps.googleapis.com/maps/api/streetview?size=600x400&location='
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;
    $body.append('<img class="bgimg" src="' + gMapsUrl + address +'">');
    // YOUR CODE GOES HERE!

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "e34e96f934f3468b8c0b13c129256892",
        'q': address
    });

    $.getJSON(url, function( data ) {

        $nytHeaderElem.text('New York Times Articles about ' + cityStr);
        var articles =  data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
            '<a href="'+article.web_url+'">'+article.headline.main+'</a>'
            +'<p>'+article.snippet+ '</p>'
            +'</li>');
        }
    });

    return false;
};

$('#form-container').submit(loadData);
