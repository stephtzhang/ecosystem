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

// reset to be a degree from 0 - 360
Deer.prototype.setDirection = function(currentVal) {
  var dir = Math.floor( Math.random() * 9 + 1 );
  while (dir == 5 || dir == currentVal) {
    dir = Math.floor( Math.random() * 9 + 1 );
  }
  return dir;
}


// redo case statement to take angles into account

// update this.speed for diagonal movement
// maybe change both x and y in diag mvment
// to sqrt(speed/2) ??
Deer.prototype.move = function() {
    console.log("in Deer.prototype.move");
    console.log("this.dir: "+this.dir);
    switch(this.dir) {
    case 1:
      this.x -= this.speed;
      this.y += this.speed;
      break;
    case 2:
      this.y += this.speed;
      break;
    case 3:
      this.x += this.speed;
      this.y += this.speed;
      break;
    case 4:
      this.x -= this.speed;
      break;
    case 6:
      this.x += this.speed;
      break;
    case 7:
      this.x -= this.speed;
      this.y += this.speed;
      break;
    case 8:
      this.y -= this.speed;
      break;
    case 9:
      this.x += this.speed;
      this.y += this.speed;
      break;
  }
  if (this.inBounds()) {
    this.updatePosition();
  } else {
    // change this set this.dir to 180
    this.dir = this.setDirection();
  }
}

Deer.prototype.inBounds = function() {
  // debugger;
  console.log("in inBounds!!!!!");
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
