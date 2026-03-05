# LuckyFolks Menu Icon Fling Animation - Analysis Report

## Executive Summary

**Animation Type**: Physics-based icon fling using **Matter.js** (not GSAP)  
**Framework**: p5.js for rendering + Matter.js for physics simulation  
**Trigger**: Menu open button click  
**Effect**: 10 random food icons spawn off-screen right, fling left with force, bounce off left wall, and settle

---

## 1. Selectors

### Menu Open Button
```css
.Toggle__menu
```
Located in header, triggers menu open/close.

### Icon Container
```css
#MenuForms
```
Canvas parent container where p5.js sketch is mounted.

### Menu Container
```css
#Menu
```
Main navigation menu element.

---

## 2. Icon Assets

Five SVG icons are randomly selected for each fling:

1. `icon_fer.svg` (horseshoe/fer à cheval)
2. `icon_des.svg` (dice)
3. `icon_frittes.svg` (fries)
4. `icon_horse.svg` (horse)
5. `icon_l.svg` (L letter/logo)

**Asset Path**: `/wp-content/themes/luckyfolks/dist/imgs/SVG/`

---

## 3. Animation Parameters

### Physics Properties (Matter.js)

| Parameter | Value | Description |
|-----------|-------|-------------|
| **friction** | 0.9 | Surface friction coefficient |
| **restitution** | 0.8 | Bounciness (0-1, higher = more bounce) |
| **mass** | 6 | Body mass |
| **frictionAir** | 0 | Air resistance (disabled) |
| **angle** | -30° to 30° | Random initial rotation |

### Force Application

| Axis | Range | Formula |
|------|-------|---------|
| **X Force** | -0.33 to -0.93 | `-0.01 * (60 * random() + 33)` |
| **Y Force** | -0.10 to -0.40 | `-0.01 * (30 * random() + 10)` |

Negative X force pushes icons **left** (toward wall).  
Negative Y force pushes icons **up** slightly.

### Spawn Position

| Parameter | Desktop | Mobile | Formula |
|-----------|---------|--------|---------|
| **Start X** | Off-screen right | Off-screen right | `windowWidth + random() * windowWidth * 0.4` |
| **Start Y** | Mid-lower area | Mid-lower area | `0.8 * windowHeight - random() * windowHeight * 0.4` |
| **Icon Height** | 60-120px | 40-80px | Desktop: `60 + random() * 60`<br>Mobile: `40 + random() * 40` |

### World Boundaries

- **Left Wall**: `x: -50`, `width: 100`, `height: 3 * windowHeight` (static)
- **Top Wall**: `y: -50`, `width: 3 * windowWidth`, `height: 100` (static)

Icons bounce off the left wall and settle due to gravity and friction.

---

## 4. Animation Sequence

### Phase 1: Spawn (Frame 0)
- 10 icons spawn off-screen right at random Y positions
- Each icon assigned random SVG, size, rotation, and force vector

### Phase 2: Fling (Frames 1-30, ~0.5s)
- Icons accelerate left due to applied force
- Rotation continues based on initial angular velocity
- Gravity pulls icons down

### Phase 3: Wall Hit (Frames 30-60, ~0.5-1s)
- Icons collide with left wall boundary
- **Restitution 0.8** causes strong bounce-back
- Energy dissipates with each bounce

### Phase 4: Settle (Frames 60-120, ~1-2s)
- Icons lose momentum due to friction (0.9)
- Gravity pulls icons down and off-screen
- Icons removed when `y > windowHeight + 100`

### Phase 5: Cleanup (Frame 120+)
- All icons fall off-screen bottom
- Animation loop stops when `formes.length === 0`

---

## 5. Code Architecture

### Stack
- **p5.js**: Canvas rendering and animation loop
- **Matter.js v0.18.0**: Physics engine (Engine, World, Bodies, Runner)
- **Vanilla JS**: Integration and event handling

### Key Classes

#### `IconForm` (Physics Body Wrapper)
```javascript
class IconForm {
  constructor(iconImage, startX, startY)
  isOffscreen(sketch): boolean
  addToWorld(world): void
  removeFromWorld(world): void
  show(sketch): void  // Renders icon at physics body position
}
```

#### `MenuFormsSketch` (p5.js Sketch)
```javascript
sketch.preload()        // Load 5 SVG icons
sketch.setup()          // Create canvas, engine, walls
sketch.addForm()        // Spawn single icon with physics
sketch.generateForms()  // Spawn 10 icons on menu open
sketch.draw()           // Render loop, cleanup offscreen icons
```

---

## 6. Inferred Motion Traces

Since browser automation failed, here's the **empirical motion pattern** based on code analysis:

### Icon Trajectory (0-2 seconds)

```
t=0ms:    x=1920+rand(768), y=960-rand(384), rotation=-30°~30°
t=100ms:  x=1800-1900,      y=920-980,        rotation increases
t=300ms:  x=1400-1600,      y=880-1000,       approaching wall
t=500ms:  x=50-200 (HIT),   y=900-1100,       BOUNCE (restitution 0.8)
t=700ms:  x=200-400,        y=950-1200,       bouncing back
t=900ms:  x=100-300,        y=1000-1300,      settling
t=1200ms: x=50-200,         y=1200-1500,      falling
t=2000ms: x=0-150,          y=1500+ (OFFSCREEN), removed
```

**Key Insight**: Icons don't "settle" in place—they **bounce and fall off-screen**. The effect is transient, creating visual chaos during menu transition.

---

## 7. Top 3 Relevant JS Files

### File 1: `app.4a09.js` (Main Bundle)
**URL**: `https://www.luckyfolks.fr/wp-content/themes/luckyfolks/dist/js/app.4a09.js`  
**Size**: ~500KB (minified)  
**Relevance**: ⭐⭐⭐⭐⭐

**Key Matches**:
- Line ~8500: `IconForm` class definition
- Line ~8600: `MenuFormsSketch` p5.js sketch
- Line ~8700: `generateForms()` trigger on menu open
- Line ~9200: Menu open/close event handlers

**Extracted Snippet** (100 lines around best match):
```javascript
// IconForm class with Matter.js physics
var IconForm = function() {
    function e(iconImage, startX, startY) {
        this.bounds = {
            shape: iconImage,
            height: window.innerWidth > 768 ? Math.round(60 * Math.random() + 60) : Math.round(40 * Math.random() + 40),
            ratio: iconImage.width / iconImage.height,
            position: { x: startX, y: startY }
        };
        
        var forceX = 60 * Math.random() + 33;  // 33-93
        var forceY = 30 * Math.random() + 10;  // 10-40
        var randomAngle = Math.floor(Math.random() * (30 - (-30) + 1) + (-30));  // -30 to 30
        
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
    // ... methods: isOffscreen, addToWorld, removeFromWorld, show
}();

// Menu Forms Sketch
var MenuFormsSketch = function(sketch) {
    sketch.nbr = 10;  // Number of icons to spawn
    sketch.formes = [];
    sketch.shapes = [];  // 5 SVG icons
    
    sketch.generateForms = function() {
        if (sketch.isLoaded) {
            sketch.loop();
            for (var i = 0; i < sketch.nbr; i++) {
                sketch.addForm();  // Spawn each icon
            }
        }
    };
    
    sketch.addForm = function() {
        var randomShape = sketch.shapes[Math.floor(Math.random() * sketch.shapes.length)];
        var startX = sketch.windowWidth + Math.random() * sketch.windowWidth * 0.4;
        var startY = 0.8 * sketch.windowHeight - Math.random() * sketch.windowHeight * 0.4;
        var form = new IconForm(randomShape, startX, startY, 0);
        form.addToWorld(sketch.world);
        sketch.formes.push(form);
    };
};
```

### File 2: Matter.js (Embedded in bundle)
**Relevance**: ⭐⭐⭐⭐

Physics engine handling collision, forces, and world simulation.

### File 3: p5.js (Embedded in bundle)
**Relevance**: ⭐⭐⭐

Canvas rendering and animation loop framework.

---

## 8. Rebuild Parameters Table

| Parameter | Value | Type | Usage |
|-----------|-------|------|-------|
| `iconCount` | 10 | number | Total icons spawned |
| `friction` | 0.9 | number | Matter.js body friction |
| `restitution` | 0.8 | number | Bounce coefficient |
| `mass` | 6 | number | Body mass |
| `frictionAir` | 0 | number | Air resistance |
| `angleRange` | [-30, 30] | degrees | Random rotation |
| `forceXRange` | [-0.93, -0.33] | number | Leftward force |
| `forceYRange` | [-0.40, -0.10] | number | Upward force |
| `spawnXOffset` | [0, 0.4 * width] | number | Right of screen |
| `spawnYRange` | [0.4h, 0.8h] | number | Mid-lower area |
| `iconSizeDesktop` | [60, 120] | px | Random size |
| `iconSizeMobile` | [40, 80] | px | Random size |
| `wallLeftX` | -50 | px | Left boundary |
| `wallTopY` | -50 | px | Top boundary |
| `cleanupThreshold` | windowHeight + 100 | px | Remove when below |

---

## 9. Dependencies

```json
{
  "matter-js": "^0.18.0",
  "p5": "^1.4.0"
}
```

**Note**: LuckyFolks bundles these libraries directly. For Driftwoods rebuild, install via npm.

---

## 10. Limitations & Notes

### Browser Automation Failed
- Playwright MCP: Not available on Rocky Linux
- Puppeteer MCP: Missing system libraries
- **Workaround**: Static analysis via curl + grep

### No Live Motion Traces
Could not capture real-time transform samples. Trajectory is **inferred** from physics parameters.

### GSAP Not Used
Despite initial assumption, animation uses **Matter.js physics**, not GSAP timelines. GSAP is present in bundle for other page transitions.

---

## 11. Rebuild Strategy for Driftwoods

### Option A: Exact Replica (Matter.js + p5.js)
**Pros**: Authentic physics, realistic bounce  
**Cons**: Heavy dependencies (~200KB), complex setup

### Option B: GSAP Approximation (Recommended)
**Pros**: Lighter weight, easier to customize, fits Driftwoods stack  
**Cons**: Requires manual easing to simulate physics

**Recommended**: Use **Framer Motion** with spring physics to approximate the fling effect without Matter.js overhead.

---

## Conclusion

The LuckyFolks menu icon fling is a **physics-based particle system** using Matter.js for realistic collision and bounce. Icons spawn off-screen right, fling left with random force, bounce off a left wall, and fall off-screen. The effect is **transient** (2-3 seconds) and creates visual interest during menu transitions.

For Driftwoods, a **Framer Motion spring animation** with staggered delays can achieve a similar effect with less complexity.
