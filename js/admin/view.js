/**
 * ADMIN View Layer
 */

var mainController = require('../controller');
var events = require('../constants');
var Emitter = require('../emitter');

// Constructor with initial state
function AdminView(options) {
    var defaults = {};
    var options = $.extend({}, defaults, (options || {}));

    // BUTTONS
    this.openBtn = $('button#admin-open');
    this.cancelBtn = $('button#admin-cancel');
    this.saveBtn = $('button#admin-save');

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

         // event listeners
        Emitter.subscribe(events.CURRENT_CAT_SET, this, function() {
            this.render();
        });
    },
    render: function() {
        // populate with current cat data
        var currentCat = mainController.getCurrentCat();
        this.nameEl.val(currentCat.name);
        this.urlEl.val(currentCat.imgAttribution);
        this.clicksEl.val(currentCat.clickCount);
    },
    _getFormValues: function() {
        // object containing current values in the form 
        return {
            name: this.nameEl.val(),
            imgAttribution: this.urlEl.val(),
            clickCount: this.clicksEl.val()
        }
    },
    _setupListeners: function() {
        this.openBtn.on('click', function(e) {
            this.render();
            this.formEl.show();
        }.bind(this));

        this.saveBtn.click(function(e) {
            e.preventDefault();
            mainController.updateCat(this._getFormValues());
            this.formEl.hide();
        }.bind(this));

        this.cancelBtn.click(function(e) {
            e.preventDefault();
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
