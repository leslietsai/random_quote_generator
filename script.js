function getQuote() {
  $.ajax(
    {
      url: "http://en.wikiquote.org/w/api.php",
      dataType: "jsonp",
      data: {
        format: 'json',
        action: 'parse',
        page: 'Wikiquote:Quote_of_the_day/' + randomDate( new Date(2007, 01, 01), new Date())
      },
      success: function(data) {
        var quoteData = $(data.parse.text['*']).text().split('~');
        var quote = quoteData[0]
        var author = quoteData[1].split('Past months')[0];
        if (quote.startsWith("Redirectto:")) {
          quote="happy days";
        }
        $('.quote').text(quote);
        $('.author').text(author);
      }
    }
  );
  newSettings();
};

$(document).ready(function () {
  getQuote();
  var randomQuote = $('p.quote').text()
  console.log(randomQuote);
});

function randomDate(start, end) {
    var date =  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).replace(/\s/g, "_");
};

$('.new-quote').click(function() {
  getQuote();
});

function newSettings() {
  $('body').css('background-color', randomColor({luminosity: 'dark'}));
}