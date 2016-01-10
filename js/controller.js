/* ======= Model ======= */

var model = require('./data');

/* ======= Controller ======= */

var octopus = {

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        // catView.render();
    }
};

module.exports = octopus;
