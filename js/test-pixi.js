
var backgroundColor = 0x0000CC;
var canvas = $("#js-game-field");
var options = {
    view:canvas[0],
    resolution:1,
    backgroundColor:backgroundColor
};
var canvasSize = canvas.parent().css("width").split("px")[0];
// create a renderer instance
var renderer = PIXI.autoDetectRenderer(canvasSize, canvasSize, options);
// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage("images/match3.png");
/*
var boxOuterTexture = PIXI.Texture.fromImage("images/match_box_outer.png");
var boxInnerTexture = PIXI.Texture.fromImage("images/match_box_inner.png");

var matchBoxOuterSprite = new PIXI.Sprite(boxOuterTexture);
var matchBoxInnerSprite = new PIXI.Sprite(boxInnerTexture);

matchBoxOuterSprite.position.x = 10;
matchBoxOuterSprite.position.y = 50;
matchBoxInnerSprite.position.x = 12;
matchBoxInnerSprite.position.y = 10;

matchBoxOuterSprite.scale.x = 0.5;
matchBoxOuterSprite.scale.y = 0.5;

matchBoxInnerSprite.scale.x = 0.5;
matchBoxInnerSprite.scale.y = 0.5;
*/

//stage.addChild(matchBoxInnerSprite);
for (var u = 0;u < 3;u++){
    for (var i = 0; i < 30; i++) {
        createBunny(10+(i * 5),(u*8)+65);
    }
}


//stage.addChild(matchBoxOuterSprite);

function createBunny(x, y) {
    // create our little match friend..
    var match = new PIXI.Sprite(texture);
    //	match.width = 300;
    // enable the match to be interactive.. this will allow it to respond to mouse and touch events
    match.interactive = true;
    // this button mode will mean the hand cursor appears when you rollover the match with your mouse
    match.buttonMode = true;

    // center the bunnys anchor point
    match.anchor.x = 0.5;
    match.anchor.y = 0.5;
    // make it a bit bigger, so its easier to touch
    //match.scale.x = match..y = 4;
    match.scale.y = 0.4;
    match.scale.x = 0.5;
    //match.rotation = Math.PI / 1.5;
    // use the mousedown and touchstart
    match.mousedown = match.touchstart = function (event) {
        //		data.originalEvent.preventDefault()
        // store a refference to the data
        // The reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.9;
        this.dragging = true;
        //console.log(event);


        if (this.data.getLocalPosition(this).y > 21) {
            this.rotateThis = true;
            this.sx = this.data.global.x;
            this.sy = this.data.global.y;
        } else {
            this.dragging = true;
            this.sx = this.data.global.x - this.position.x;
            this.sy = this.data.global.y - this.position.y;
        }

        //this.sx = this.data.getLocalPosition(match).x * match.scale.x;
        //this.sy = this.data.getLocalPosition(match).y * match.scale.y;
    };

    // set the events for when the mouse is released or a touch is released
    match.mouseup = match.mouseupoutside = match.touchend = match.touchendoutside = function (data) {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
        this.rotateThis = false;
    };

    // set the callbacks for when the mouse or a touch moves
    match.mousemove = match.touchmove = function (data) {
        if (this.rotateThis) {
            var lp = this.data.getLocalPosition(this);
            this.rotation += Math.atan2(lp.y, lp.x) - Math.PI /2;
        } else if (this.dragging) {
            // need to get parent coords..
            var newPosition = this.data.global;//this.data.getLocalPosition(this.parent);
            // this.position.x = newPosition.x;
            // this.position.y = newPosition.y;
            this.position.x = newPosition.x - this.sx;
            this.position.y = newPosition.y - this.sy;
        }
    };

    // move the sprite to its designated position
    match.position.x = x;
    match.position.y = y;

/*    var line = new PIXI.Graphics();

    line.lineStyle(1, 0x0000FF);
    var p = match.toGlobal(new PIXI.Point(0, 0));
    line.moveTo(p.x, p.y);

    p = match.toGlobal(new PIXI.Point(0, 20));
    line.lineTo(p.x, p.y);

    line.lineStyle(1, 0xFF0000);
    p = match.toGlobal(new PIXI.Point(0, 0));
    line.moveTo(p.x, p.y);

    p = match.toGlobal(new PIXI.Point(20, 0));
    line.lineTo(p.x, p.y);
    line.endFill();*/
    // add it to the stage
    //match.addChild(line);
    stage.addChild(match);
    //stage.addChild(line);
}

animate();
function animate() {

    requestAnimationFrame(animate);


    renderer.render(stage);
}
