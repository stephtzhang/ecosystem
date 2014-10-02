function Game(deerNum, treeNum) {
  this.$world = $('#world');
  // this.tigers = this.createBeings(Tiger, tigerNum);
  this.deer = this.createBeings(Deer, deerNum);
  this.trees = this.createBeings(Tree, treeNum);
  this.interval = setInterval(this.process.bind(this), 50);
  this.score = 0;
}

Game.prototype.process = function() {
  this.score += 1;
  this.deer.forEach(function(deer) {
    deer.move();
  })
  treeCollisions = this.detectCollision();
  this.handleCollisions(treeCollisions);
  if (this.checkGameover()) {
    clearInterval(this.interval);
    alert("Game over! You scored " + this.score + ".");
    $("#score_val").attr("value", this.score.toString());
    $("#score_game").trigger("submit");
    this.clearDeer();
  }
}

Game.prototype.clearDeer = function() {
  var deers = this.deer;
  deers.forEach(function(deer) {
    deer.$html.css('display','none');
  });
  deers = [];
}

Game.prototype.checkGameover = function() {
  return this.trees.length == 0;
}

Game.prototype.handleCollisions = function(collisions) {
  var trees = this.trees;
  collisions.forEach(function(collision) {
    collision.$html.css('display','none');
    collisionIndex = trees.indexOf(collision);
    trees.splice(collisionIndex, 1);
  });
}

Game.prototype.detectCollision = function() {
  var trees = this.trees;
  collisions = []
  this.deer.forEach(function(deer) {
    trees.forEach(function(tree) {
      treeCenter = [(tree.width - tree.x) + ((tree.width - tree.x) / 2), (tree.height - tree.y) + ((tree.height - tree.y) / 2)]
      deerCenter = [(deer.width - deer.x) + ((deer.width - deer.x)/ 2), (deer.height - deer.y) + ((deer.height - deer.y) / 2) ]
      var collision = ( Math.abs(treeCenter[0] - deerCenter[0]) <= tree.width / 2 + deer.width / 2 &&
                        Math.abs(treeCenter[1] - deerCenter[1]) <= tree.height / 2 + deer.height / 2
                      )
      if (collision == true) {
        collisions.push(tree)
      }
    })
  })
  return collisions;
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
