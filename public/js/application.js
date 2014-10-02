$(function() {
  $('#game_info > input[type=button]').click(function(event) {
    tigers = $('#tiger').val();
    deer = $('#deer').val();
    trees = $('#tree').val();

    game = new Game(tigers, deer, trees);
  })

  $('#score_game').submit(function(event) {
    event.preventDefault();
    console.log("yayyyy");
  })


});


