/**
 * IconForm Class - Matter.js Physics Body Wrapper
 * Extracted from LuckyFolks app.4a09.js
 */

var IconForm = function() {
    function IconForm(iconImage, startX, startY) {
        // Bounds configuration
        this.bounds = {
            shape: iconImage,
            height: window.innerWidth > 768 
                ? Math.round(60 * Math.random() + 60)  // Desktop: 60-120px
                : Math.round(40 * Math.random() + 40), // Mobile: 40-80px
            ratio: iconImage.width / iconImage.height,
            position: { x: startX, y: startY }
        };
        
        // Random force application
        var forceX = 60 * Math.random() + 33;  // Range: 33-93
        var forceY = 30 * Math.random() + 10;  // Range: 10-40
        var randomAngle = Math.floor(Math.random() * (30 - (-30) + 1) + (-30)); // -30° to 30°
        
        // Matter.js body options
        this.options = {
            friction: 0.9,        // Surface friction
            restitution: 0.8,     // Bounciness (80% energy retention)
            mass: 6,              // Body mass
            frictionAir: 0,       // No air resistance
            angle: randomAngle,   // Initial rotation
            force: { 
                x: -0.01 * forceX,  // Leftward force: -0.33 to -0.93
                y: -0.01 * forceY   // Upward force: -0.10 to -0.40
            }
        };
        
        // Create Matter.js rectangle body
        this.body = Matter.Bodies.rectangle(
            this.bounds.position.x,
            this.bounds.position.y,
            this.bounds.height * this.bounds.ratio,
            this.bounds.height,
            this.options
        );
    }
    
    // Check if icon has fallen off-screen
    IconForm.prototype.isOffscreen = function(sketch) {
        return this.body.position.y > sketch.windowHeight + 100;
    };
    
    // Add physics body to Matter.js world
    IconForm.prototype.addToWorld = function(world) {
        Matter.World.add(world, this.body);
    };
    
    // Remove physics body from Matter.js world
    IconForm.prototype.removeFromWorld = function(world) {
        Matter.World.remove(world, this.body);
    };
    
    // Render icon at physics body position
    IconForm.prototype.show = function(sketch) {
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
    
    return IconForm;
}();
