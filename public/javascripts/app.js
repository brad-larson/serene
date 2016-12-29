console.log('I got that green');

var updateDiv = function() {
  $.get('/api/v1/example', function(resp) {
    console.log(resp);
    var newDiv = ['<div id="sereneDisplay">'];
    resp.forEach(function(item, index) {
      var newElement;
      if (index % 2 === 0) {
        newElement = ('<p><b>' + item.text + '</b></p>');
      }
      else {
        newElement = ('<p>' + item.text + '</p>');
      }
      newDiv.push(newElement);
    })
    newDiv.push('</div>');
    $('#sereneDisplay').replaceWith(newDiv.join('\n'));
  });
}

$(document).ready(function() {
  updateDiv();
  $('#examplePost').click(function() {
    var post = $.post("/api/v1/example", { text: "User input", time: new Date() } );
    post.done(updateDiv);
  });
});
