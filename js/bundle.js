(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mainController = require('../controller');

function AdminController() {

}

AdminController.prototype = {
    save: function() {
        // get the current values in the form

    }
}
},{"../controller":5}],2:[function(require,module,exports){
var view = require('./view');

module.exports = {
    view: view
}

},{"./view":3}],3:[function(require,module,exports){
/**
 * ADMIN View Layer
 */

var mainController = require('../controller');
var adminController = require('./controller');

// Constructor with initial state
function AdminView(options) {
    var defaults = {};
    var options = $.extend({}, defaults, (options || {}));

    // BUTTONS
    this.openBtn = $('button#admin-open');
    this.cancelBtn = $('button#cancel');
    this.saveBtn = $('button#save');

    // FORM
    this.formEl = $('form#admin');
    this.nameEl = $('input#name');
    this.urlEl = $('input#url');
    this.clicksEl = $('input#click-count');
}

// instance methods
AdminView.prototype = {
    init: function() {
        this.formEl.hide();
        this._setupListeners();
    },
    render: function() {
        this.formEl.show();
        // populate with current cat data
        var currentCat = mainController.getCurrentCat();
        this.nameEl.val(currentCat.name);
        this.urlEl.val(currentCat.imgSrc);
        this.clicksEl.val(currentCat.clickCount);
    },
    _setupListeners: function() {
        this.openBtn.on('click', function() {
            this.render();
        }.bind(this));

        this.saveBtn.click(function() {
            adminController.save();
            this.formEl.hide();
        }.bind(this));

        this.cancelBtn.click(function() {
            this.formEl.hide();
        }.bind(this))
    }
}

// Object.Create does NOT go through constructor
// var adminView = Object.create(AdminView.prototype, {
//     form: {
//         value: $('form#admin')
//     }
// });

var adminView = new AdminView();

module.exports = adminView;

},{"../controller":5,"./controller":1}],4:[function(require,module,exports){

/* ======= Model ======= */

var model = require('./data');

/* ======= View Layer ======= */

var views = require('./views');
var catView = views.catView;
var catListView = views.catListView;

/* ======= ADMIN ======= */

var admin = require('./admin');

/* ======= Octopus ======= */

var app = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize and render
        catListView.init();
        catView.init();

        admin.view.init();
    },

};

// make it go!
app.init();

module.exports = app;

},{"./admin":2,"./data":6,"./views":8}],5:[function(require,module,exports){
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

},{"./data":6}],6:[function(require,module,exports){
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};

module.exports = model; // single item

},{}],7:[function(require,module,exports){
var controller = require('./controller');
var app = require('./app');
var admin = require('./admin');

},{"./admin":2,"./app":4,"./controller":5}],8:[function(require,module,exports){
// VIEW LAYER CANNOT TOUCH MODEL DIRECTLY
//
var octopus = require('./controller');

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
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
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
                    console.log("clicked cat in list! ", catCopy, currentIdx);
                    octopus.setCurrentCat(catCopy, currentIdx);
                    catView.render();
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

},{"./controller":5}]},{},[7])