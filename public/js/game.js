// should I put setInterval in Game class or in doc ready?
// setInterval(game.process.bind(game), 20); // 50 FPS
function Game(tigerNum, deerNum, treeNum) {
  this.$world = $('#world');
  this.tigers = this.createBeings(Tiger, tigerNum);
  this.deer = this.createBeings(Deer, deerNum);
  this.trees = this.createBeings(Tree, treeNum);
  setInterval(this.process.bind(this), 50);
}

Game.prototype.process = function() {
  this.deer.forEach(function(deer) {
    deer.move();
  })
  this.detectCollision();
}

Game.prototype.detectCollision = function() {
  var trees = this.trees;
  // convert to map using a boolean return for collision
  this.deer.forEach(function(deer) {
    trees.forEach(function(tree) {

      tree.x >= deer.x && tree.x <= deer.x + deer.width
      && tree.y >= deer.y && tree.y <= deer.y + deer.height ||
      tree.x >= deer.x && tree.x <= deer.x + deer.width
      && tree.y + tree.height >= deer.y && tree.y + tree.height >= deer.y + deer.height ||
      tree.x + tree.width >= deer.x && deer.x <= deer.width
      && tree.y >= deer.y && tree.y <= deer.y + deer.height ||
      tree.x + tree.width is bw deer.x &&  deer.x + deer.width
      && tree.y + tree.height >= deer.y &&  tree.y + tree.height <= deer.y + deer.height

      // tree.x
      // tree.y
      // tree.x + tree.width
      // tree.y + tree.height

      // deer.x
      // deer.y
      // deer.x + tree.width
      // deer.y + tree.height

      // check if tree x, y, x2, y2 is within
      // deer x1 => x2, y1 => y2 range
      // return array of collided trees and kill
    })
  })
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
  this.width = this.$html.width();
  this.height = this.$html.height();
  this.x = Math.floor( Math.random() * ($world.width() - this.$html.width() ) );
  this.y = Math.floor( Math.random() * ($world.height() - this.$html.height() ) );
  this.updatePosition();
}

////////////////// Deer //////////////////

function Deer($world) {
  this.$world = $world;
  this.$html = $("<div class='deer'></div>");
  this.$world.append(this.$html);
  this.width = this.$html.width();
  this.height = this.$html.height();
  this.x = Math.floor( Math.random() * ($world.width() - this.$html.width() ) );
  this.y = Math.floor( Math.random() * ($world.height() - this.$html.height() ) );
  this.updatePosition();
  this.dir = this.setDirection();
  this.speed = 10;
  // setInterval(this.move.bind(this), 50);
}

Deer.prototype.setDirection = function() {
  return Math.floor( Math.random() * 360 + 1 );
}

Deer.prototype.move = function() {
  var oldX = this.x;
  var oldY = this.y;
  // convert degrees to radians
  var xSpeed = Math.cos( (this.dir / 180) * Math.PI ) * this.speed;
  var ySpeed = Math.sin( (this.dir / 180) * Math.PI ) * this.speed;
  this.x += xSpeed;
  this.y += ySpeed;

  if (this.inBounds()) {
    this.updatePosition();
    // change direction slightly for natural movement
    this.dir += (Math.random() * 20 - 10);
  } else {
    this.x = oldX;
    this.y = oldY;
    if (this.dir > 180 ) {
      this.dir -= 180;
    } else {
      this.dir += 180;
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
  this.width = this.$html.width();
  this.height = this.$html.height();
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
