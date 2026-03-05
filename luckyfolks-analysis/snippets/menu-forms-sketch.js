/**
 * MenuFormsSketch - p5.js Sketch with Matter.js Physics
 * Extracted from LuckyFolks app.4a09.js
 */

var MenuFormsSketch = function(sketch) {
    var Engine = Matter.Engine;
    var Runner = Matter.Runner;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    
    // Configuration
    sketch.nbr = 10;              // Number of icons to spawn
    sketch.formes = [];           // Active icon instances
    sketch.shapes = [];           // Loaded SVG images
    sketch.isLoaded = false;      // Preload status
    sketch.isActive = false;      // Animation active status
    
    /**
     * Preload icon assets
     */
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
    
    /**
     * Setup canvas and physics world
     */
    sketch.setup = function() {
        // Create canvas
        sketch.sketch = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.noLoop();
        sketch.sketch.parent("MenuForms");
        
        // Resize to parent container
        sketch.resizeCanvas(
            sketch.sketch.canvas.parentNode.offsetWidth,
            sketch.sketch.canvas.parentNode.offsetHeight
        );
        
        // Create Matter.js physics engine
        sketch.engine = Engine.create();
        sketch.world = sketch.engine.world;
        Runner.run(sketch.engine);
        
        // Create boundary walls
        // Left wall: Icons bounce off this
        sketch.wallLeft = Bodies.rectangle(
            -50,                          // x position (off-screen left)
            0.5 * sketch.windowHeight,    // y position (center)
            100,                          // width
            3 * sketch.windowHeight,      // height (covers full viewport)
            { isStatic: true }
        );
        
        // Top wall: Prevents icons from flying up
        sketch.wallTop = Bodies.rectangle(
            0.5 * sketch.windowWidth,     // x position (center)
            -50,                          // y position (off-screen top)
            3 * sketch.windowWidth,       // width (covers full viewport)
            100,                          // height
            { isStatic: true }
        );
        
        World.add(sketch.world, [sketch.wallLeft, sketch.wallTop]);
    };
    
    /**
     * Add single icon with random properties
     */
    sketch.addForm = function() {
        // Select random icon
        var randomShape = sketch.shapes[Math.floor(Math.random() * sketch.shapes.length)];
        
        // Spawn position: off-screen right, mid-lower area
        var startX = sketch.windowWidth + Math.random() * sketch.windowWidth * 0.4;
        var startY = 0.8 * sketch.windowHeight - Math.random() * sketch.windowHeight * 0.4;
        
        // Create icon instance
        var form = new IconForm(randomShape, startX, startY, 0);
        form.addToWorld(sketch.world);
        sketch.formes.push(form);
    };
    
    /**
     * Generate all icons (called on menu open)
     */
    sketch.generateForms = function() {
        if (sketch.isLoaded) {
            sketch.loop();
            
            // Spawn all icons
            for (var i = 0; i < sketch.nbr; i++) {
                sketch.addForm();
            }
            
            if (!sketch.isActive) {
                sketch.loop();
            }
        }
    };
    
    /**
     * Draw loop - render and cleanup
     */
    sketch.draw = function() {
        sketch.clear();
        sketch.noStroke();
        sketch.rectMode(sketch.CENTER);
        
        // Render each icon and check if offscreen
        sketch.formes.forEach(function(form, index) {
            form.show(sketch);
            
            // Remove if fallen off-screen
            if (form.isOffscreen(sketch)) {
                form.removeFromWorld(sketch.world);
                sketch.formes.splice(index, 1);
            }
        });
        
        // Stop animation when all icons are gone
        if (sketch.formes.length === 0) {
            sketch.noLoop();
        }
    };
};

/**
 * Initialize sketch
 * Usage: new p5(MenuFormsSketch);
 */
