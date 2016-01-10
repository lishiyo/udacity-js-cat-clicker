
/* ======= Model ======= */

var model = require('./data');

/* ======= View Layer ======= */

var views = require('./views');
var catView = views.catView;
var catListView = views.catListView;

/* ======= Octopus ======= */

module.exports = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize and render
        catListView.init();
        catView.init();
    },

};

// make it go!
app.init();
