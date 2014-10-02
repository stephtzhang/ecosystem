$(function() {
  $('#game_info > input[type=button]').click(function(event) {
    // tigers = $('#tiger').val();
    deer = $('#deer').val();
    trees = $('#tree').val();

    game = new Game(deer, trees);
  })

  $('#score_game').submit(function(event) {
    event.preventDefault();
    var url = $(this).attr("action");
    var data = $(this).serialize();
    $.post(url, data).done(function(response) {
      $('#game_info')[0].reset();
    })
  })
});

