// Extracted from app.4a09.js - Menu Icon Fling Animation

// Icon Form Class (Matter.js physics body wrapper)
var IconForm = function() {
    function e(iconImage, startX, startY) {
        this.bounds = {
            shape: iconImage,
            height: window.innerWidth > 768 ? Math.round(60 * Math.random() + 60) : Math.round(40 * Math.random() + 40),
            ratio: iconImage.width / iconImage.height,
            position: { x: startX, y: startY }
        };
        
        var forceX = 60 * Math.random() + 33;
        var forceY = 30 * Math.random() + 10;
        var randomAngle = Math.floor(Math.random() * (30 - (-30) + 1) + (-30));
        
        this.options = {
            friction: 0.9,
            restitution: 0.8,
            mass: 6,
            frictionAir: 0,
            angle: randomAngle,
            force: { x: -0.01 * forceX, y: -0.01 * forceY }
        };
        
        this.body = Matter.Bodies.rectangle(
            this.bounds.position.x,
            this.bounds.position.y,
            this.bounds.height * this.bounds.ratio,
            this.bounds.height,
            this.options
        );
    }
    
    e.prototype.isOffscreen = function(sketch) {
        return this.body.position.y > sketch.windowHeight + 100;
    };
    
    e.prototype.addToWorld = function(world) {
        Matter.World.add(world, this.body);
    };
    
    e.prototype.removeFromWorld = function(world) {
        Matter.World.remove(world, this.body);
    };
    
    e.prototype.show = function(sketch) {
        var pos = this.body.position;
        var x = pos.x;
        var y = pos.y;
        var shape = this.bounds.shape;
        var height = this.bounds.height;
        var ratio = this.bounds.ratio;
        var angle = this.body.angle;
        
        sketch.push();
        sketch.translate(x, y);
        sketch.rotate(angle);
        sketch.imageMode(sketch.CENTER);
        sketch.image(shape, 0, 0, height * ratio, height);
        sketch.pop();
    };
    
    return e;
}();

// Menu Forms Animation (p5.js sketch with Matter.js)
var MenuFormsSketch = function(sketch) {
    var Engine = Matter.Engine;
    var Runner = Matter.Runner;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    
    sketch.nbr = 10;
    sketch.formes = [];
    sketch.shapes = [];
    sketch.isLoaded = false;
    sketch.isActive = false;
    
    sketch.preload = function() {
        var themeUrl = "/wp-content/themes/luckyfolks";
        var icon1 = sketch.loadImage(themeUrl + "/dist/imgs/SVG/icon_fer.svg");
        var icon2 = sketch.loadImage(themeUrl + "/dist/imgs/SVG/icon_des.svg");
        var icon3 = sketch.loadImage(themeUrl + "/dist/imgs/SVG/icon_frittes.svg");
        var icon4 = sketch.loadImage(themeUrl + "/dist/imgs/SVG/icon_horse.svg");
        var icon5 = sketch.loadImage(themeUrl + "/dist/imgs/SVG/icon_l.svg");
        
        sketch.shapes.push(icon1);
        sketch.shapes.push(icon2);
        sketch.shapes.push(icon3);
        sketch.shapes.push(icon4);
        sketch.shapes.push(icon5);
        sketch.isLoaded = true;
    };
    
    sketch.setup = function() {
        sketch.sketch = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.noLoop();
        sketch.sketch.parent("MenuForms");
        sketch.resizeCanvas(
            sketch.sketch.canvas.parentNode.offsetWidth,
            sketch.sketch.canvas.parentNode.offsetHeight
        );
        
        sketch.engine = Engine.create();
        sketch.world = sketch.engine.world;
        Runner.run(sketch.engine);
        
        // Left wall (icons bounce off this)
        sketch.wallLeft = Bodies.rectangle(-50, 0.5 * sketch.windowHeight, 100, 3 * sketch.windowHeight, { isStatic: true });
        // Top wall
        sketch.wallTop = Bodies.rectangle(0.5 * sketch.windowWidth, -50, 3 * sketch.windowWidth, 100, { isStatic: true });
        
        World.add(sketch.world, [sketch.wallLeft, sketch.wallTop]);
    };
    
    sketch.addForm = function() {
        var randomShape = sketch.shapes[Math.floor(Math.random() * sketch.shapes.length)];
        var startX = sketch.windowWidth + Math.random() * sketch.windowWidth * 0.4;
        var startY = 0.8 * sketch.windowHeight - Math.random() * sketch.windowHeight * 0.4;
        var form = new IconForm(randomShape, startX, startY, 0);
        form.addToWorld(sketch.world);
        sketch.formes.push(form);
    };
    
    sketch.generateForms = function() {
        if (sketch.isLoaded) {
            sketch.loop();
            for (var i = 0; i < sketch.nbr; i++) {
                sketch.addForm();
            }
            if (!sketch.isActive) {
                sketch.loop();
            }
        }
    };
    
    sketch.draw = function() {
        sketch.clear();
        sketch.noStroke();
        sketch.rectMode(sketch.CENTER);
        
        sketch.formes.forEach(function(form, index) {
            form.show(sketch);
            if (form.isOffscreen(sketch)) {
                form.removeFromWorld(sketch.world);
                sketch.formes.splice(index, 1);
            }
        });
        
        if (sketch.formes.length === 0) {
            sketch.noLoop();
        }
    };
};
