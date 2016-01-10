/* ======= Model ======= */

var model = require('./data');

/* ======= Controller ======= */

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
        console.log("setCurrentCat! ", cat, catIdx)
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
    },

    // update current cat with new properties
    updateCat: function(newCatProps) {
        var newCat = $.extend({}, model.currentCat, newCatProps);
        console.log("updateCat!", newCat, newCatProps, this.currentCatIdx);
        // update currentCat
        model.currentCat = newCat;
        // update the model in the list
        var cats = this.getCats();
        cats[this.currentCatIdx] = newCat;
    }
};


var mainController = new MainController();

module.exports = mainController;
