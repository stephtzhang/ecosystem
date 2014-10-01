function Game() {
  this.$arena = $('#arena');
  // this.tigers = [new Tiger(this.$arena)];
  // this.deer = [new Deer(this.$arena)];
  // this.tree = [new Tree(this.$arena)];
}

$(document).ready(function() {
  game = new Game();

  // setInterval(game.process.bind(game), 20); // 50 FPS
});
