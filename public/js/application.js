$(function() {
  $('#game_info > input[type=button]').click(function(event) {
    tigers = $('#tiger').val();
    deer = $('#deer').val();
    trees = $('#tree').val();

    game = new Game(tigers, deer, trees);
    // setInterval(game.process.bind(game), 50);
  })
});


