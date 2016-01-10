// VIEW LAYER CANNOT TOUCH MODEL DIRECTLY

var octopus = require('./controller');
var events = require('./constants');
var Emitter = require('./emitter');

/* ======= View Layer ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
            // re-render the view
            this.render();
        }.bind(this));

        // render this view (update the DOM elements with the right values)
        this.render();

        // add listeners
        Emitter.subscribe(events.CURRENT_CAT_SET, this, function() {
            this.render();
        });
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        console.log("catView render!", currentCat);
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            //  without the IIFE, the 'cat' param will always be the MouseEvent
            elem.addEventListener('click', (function(catCopy, currentIdx) {
                return function() {
                    // CURRENT_CAT_SET event gets triggered
                    octopus.setCurrentCat(catCopy, currentIdx);
                };
            })(cat, i));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

module.exports = {
    catView: catView,
    catListView: catListView
};
