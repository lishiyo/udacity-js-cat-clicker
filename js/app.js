
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
