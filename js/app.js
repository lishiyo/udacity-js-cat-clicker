
/* ======= Model ======= */

var model = require('./data');

/* ======= Main Controller ======= */

var controller = require('./controller');

/* ======= View Layer ======= */

var views = require('./views');

/* ======= ADMIN Module ======= */

var admin = require('./admin');

/* ======= Octopus ======= */

var app = {

    init: function() {
        // set our current cat to the first one in the list
        controller.setCurrentCat(model.cats[0], 0);

        // tell our views to initialize and render
        views.catListView.init();
        views.catView.init();
        admin.view.init();
    },

};

// make it go!
app.init();

module.exports = app;
