/**
 * Menu Open Handler - GSAP Timeline Integration
 * Extracted from LuckyFolks app.4a09.js
 * 
 * Shows how menu navigation items animate with GSAP while icons fling with Matter.js
 */

// Menu class with open/close handlers
var Menu = function() {
    function Menu() {
        this.DOM = {
            el: document.getElementById("Header"),
            toggle: document.querySelector(".Toggle__menu"),
            menuContainer: document.getElementById("Menu"),
            menuNavItems: document.querySelectorAll(".Nav__item"),
            menuNavLinks: document.querySelectorAll(".Nav__link"),
            menuFade: document.querySelector(".Menu__fade")
        };
        
        this.init();
        this.addEvents();
    }
    
    Menu.prototype.init = function() {
        // Initialization logic
    };
    
    Menu.prototype.addEvents = function() {
        var self = this;
        
        // Toggle button click
        this.DOM.toggle.addEventListener("click", function(e) {
            e.preventDefault();
            
            if (window.app.menuOpen === true) {
                self.close();
            } else {
                self.open();
            }
        });
        
        // Fade overlay click
        this.DOM.menuFade.addEventListener("click", function(e) {
            e.preventDefault();
            self.close();
        });
    };
    
    /**
     * Open menu with GSAP timeline + Matter.js icon fling
     */
    Menu.prototype.open = function() {
        var self = this;
        
        return new Promise(function(resolve, reject) {
            var isMobile = window.app.isMobile;
            
            // Set menu state
            window.app.menuOpen = true;
            document.body.classList.add("showMenu");
            document.body.style.overflow = "hidden";
            
            // GSAP timeline for menu items
            var timeline = gsap.timeline({
                paused: true,
                defaults: { duration: 1 },
                onStart: function() {
                    // Trigger Matter.js icon fling animation
                    window.menuForms.generateForms();
                }
            });
            
            // Animate menu items from right
            timeline.fromTo(
                self.DOM.menuNavItems,
                { xPercent: 100 },
                { 
                    xPercent: 0, 
                    ease: "power3.out", 
                    stagger: 0.03,  // 30ms stagger between items
                    clearProps: "transform" 
                },
                0
            );
            
            // Animate index numbers
            timeline.fromTo(
                document.querySelectorAll(".Menu .index"),
                { 
                    xPercent: isMobile ? -10 : -100, 
                    opacity: 0 
                },
                { 
                    xPercent: 0, 
                    opacity: 1, 
                    ease: "power3.out", 
                    stagger: 0.03,
                    clearProps: "transform, opacity" 
                },
                0.6
            );
            
            // Animate CTA button
            timeline.fromTo(
                document.querySelector(".Menu .Btn"),
                { xPercent: 100, opacity: 0 },
                { 
                    xPercent: 0, 
                    opacity: 1, 
                    ease: "power3.out",
                    clearProps: "transform opacity" 
                },
                0.4
            );
            
            timeline.play();
        });
    };
    
    /**
     * Close menu
     */
    Menu.prototype.close = function() {
        return new Promise(function(resolve, reject) {
            window.app.menuOpen = false;
            document.body.classList.remove("showMenu");
            document.body.style.overflow = "";
            
            resolve();
        });
    };
    
    return Menu;
}();

/**
 * Page transition that triggers icon fling
 */
var PageTransition = {
    out: function(e) {
        var from = e.from;
        var trigger = e.trigger;
        var done = e.done;
        
        // Update page title
        if (trigger.dataset && trigger.dataset.pageTitle) {
            document.querySelector(".Page__title").innerHTML = trigger.dataset.pageTitle + ".";
        } else {
            document.querySelector(".Page__title").innerHTML = "Lucky Folks.";
        }
        
        // GSAP timeline for page transition
        var timeline = gsap.timeline({
            paused: true,
            defaults: { duration: 1.2, ease: "expo.inOut" },
            onStart: function() {
                document.body.classList.add("is--loading");
                document.body.classList.add("is--animating");
            },
            onComplete: function() {
                from.parentNode.removeChild(from);
                done();
            }
        });
        
        // Slide out current page
        timeline.to(from, { xPercent: -50 }, 0);
        
        // Trigger icon fling at 0.5s
        timeline.call(window.menuForms.generateForms, null, 0.5);
        
        // Slide in page loader
        timeline.to(document.getElementById("PageLoader"), { x: 0 }, 0);
        
        // Animate title with elastic easing
        var titleSplit = new SplitText(document.querySelector(".Page__title"), { 
            type: "words, chars" 
        });
        
        timeline.from(
            titleSplit.chars,
            {
                rotation: 20,
                x: 240,
                ease: "elastic.out(0.9, 0.6)",
                clearProps: "all",
                stagger: 0.05
            },
            0.3
        );
        
        timeline.play();
    }
};
