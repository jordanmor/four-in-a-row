const game = new Game();

$('#begin-game').on('click', function() {
  game.startGame();
  $(this).hide();
  $('#play-area').css('opacity', '1');
});

$('body').on('keydown', e => game.handleKeyDown(e));