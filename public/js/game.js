// should I put setInterval in Game class or in doc ready?
// setInterval(game.process.bind(game), 20); // 50 FPS
function Game(tigerNum, deerNum, treeNum) {
  this.$world = $('#world');
  this.tigers = this.createBeings(Tiger, tigerNum, tiger);
  this.deer = this.createBeings(Deer, deerNum, tiger);
  this.trees = this.createBeings(Tree, treeNum, tree);
}

Game.prototype.createBeings = function(beingClass, beingNum, divName) {
  var beings = []
  for(var i = 0; i < beingNum; i++) {
      beings.push(new beingClass(this.$world, divName));
  }
  return beings;
}

////////////////// Tiger //////////////////

function Tiger($world) {
  this.$world = $world;
  this.$html = $("<div class='tiger'></div>");
  this.$world.append(this.$html);
  this.x = Math.floor( Math.random() * ($world.width() - this.$html.width() ) );
  this.y = Math.floor( Math.random() * ($world.height() - this.$html.height() ) );
  this.updatePosition();
}

////////////////// Deer //////////////////

function Deer($world) {
  this.$world = $world;
  this.$html = $("<div class='deer'></div>");
  this.$world.append(this.$html);
  this.x = Math.floor( Math.random() * ($world.width() - this.$html.width() ) );
  this.y = Math.floor( Math.random() * ($world.height() - this.$html.height() ) );
  this.updatePosition();
  this.dir = this.setDirection();
  this.speed = 10;
  setInterval(this.move.bind(this), 50);
}

// rand num bw 1 and 360
Deer.prototype.setDirection = function() {
  return Math.floor( Math.random() * 360 + 1 );
}

Deer.prototype.move = function() {
  if (this.dir > 0 && this.dir <= 90) {
    // if in quadrant I: add to x and y
    this.x += this.speed;
    this.y += this.speed;
  } else if (this.dir > 90 && this.dir <= 180) {
    // if in quadrant II: add to x and subtract from y
    this.x += this.speed;
    this.y -= this.speed;
  } else if (this.dir > 180 && this.dir <= 270) {
    // if in quadrant III: subtract from x and y
    this.x -= this.speed;
    this.y -= this.speed;
  } else if (this.dir > 270 && this.dir <= 360) {
    // if in quadrant IV: subtract from x and add to y
    this.x -= this.speed;
    this.y += this.speed;
  }

  if (this.inBounds()) {
    this.updatePosition();
  } else {
    if (this.dir > 180) {
      this.dir = this.dir - 180;
    } else {
      this.dir = this.dir + 180;
    }
  }
}

Deer.prototype.inBounds = function() {
  return (this.x > 0 &&
          this.x < (this.$world.width() - this.$html.width()) &&
          this.y > 0 &&
          this.y < (this.$world.height() - this.$html.height())
         )
}

////////////////// Tree //////////////////

function Tree($world) {
  this.$world = $world;
  this.$html = $("<div class='tree'></div>");
  this.$world.append(this.$html);
  this.x = Math.floor( Math.random() * ($world.width() - this.$html.width() ) );
  this.y = Math.floor( Math.random() * ($world.height() - this.$html.height() ) );
  this.updatePosition();
}

Tree.prototype.updatePosition = function() {
  this.$html.css('left', this.x);
  this.$html.css('top', this.y);
}

Tiger.prototype.updatePosition = Tree.prototype.updatePosition;
Deer.prototype.updatePosition = Tree.prototype.updatePosition;
