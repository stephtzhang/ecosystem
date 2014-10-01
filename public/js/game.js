// in Game class or in doc ready
// setInterval(game.process.bind(game), 20); // 50 FPS
function Game(tigerNum, deerNum, treeNum) {
  this.$world = $('#world');
  this.tigers = this.createBeings(Tiger, tigerNum);
  this.deer = this.createBeings(Deer, deerNum);
  this.tree = this.createBeings(Tree, treeNum);
}

Game.prototype.createBeings = function(beingClass, beingNum) {
  var beings = []
  for(var i = 0; i < beingNum; i++) {
      beings.push(new beingClass(this.$world));
  }
  return beings;
}

function Tiger($world) {
  this.$world = $world;
  this.$html = $("<div class='tiger'></div>");
  this.$world.append(this.$html);
}

function Deer($world) {
  this.$world = $world;
  this.$html = $("<div class='deer'></div>");
  this.$world.append(this.$html);

}

function Tree($world) {
  this.$world = $world;
  this.$html = $("<div class='tree'></div>");
  this.$world.append(this.$html);
}
