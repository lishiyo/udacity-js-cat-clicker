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
