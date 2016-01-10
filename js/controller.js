/* ======= Model ======= */

var model = require('./data');
var events = require('./constants');
var Emitter = require('./emitter');

/* ======= Main Controller ======= */

function MainController() {
    this.currentCatIdx = null;
}

MainController.prototype = {

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat, catIdx) {
        model.currentCat = cat;
        this.currentCatIdx = catIdx;

        // emit event
        Emitter.trigger(events.CURRENT_CAT_SET, []);
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
    },

    // update current cat with new properties
    updateCat: function(newCatObj) {
        var currentCat = this.getCurrentCat();
        for (var key in newCatObj) {
            if (currentCat.hasOwnProperty(key)) {
                currentCat[key] = newCatObj[key];
            }
        }

        console.log("updateCat! props, idx", newCatObj, this.currentCatIdx);
        console.log("newCat updated in place", currentCat);
        // update currentCat
        // model.currentCat = newCat;
        // update the same cat in the list
        var cats = this.getCats();
        cats[this.currentCatIdx] = currentCat;
    }
};


var mainController = new MainController();

module.exports = mainController;
