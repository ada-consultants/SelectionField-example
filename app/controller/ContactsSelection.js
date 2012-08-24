Ext.define('My.controller.ContactsSelection', {
    extend: 'Ext.app.Controller',

    views: [
        'SelectionWindow'
    ],

    stores: [
        'Contacts'
    ],

    refs: [{
        ref: 'select',
        selector: 'selectionwindow #select'
    }, {
        ref: 'cancel',
        selector: 'selectionwindow #cancel'
    }, {
        ref: 'window',
        selector: 'selectionwindow'
    }, {
        ref: 'grid',
        selector: 'selectiongrid'
    }],

    init: function() {
        var me = this;

        this.control({
            'selectionwindow': {
                'beforerender': this.onWindowBeforeRender
            },
            'selectionwindow selectiongrid': {
                'selectionchange': this.onGridSelectionChange,
                'itemdblclick': this.onItemDblClick
            },
            'selectionwindow #select': {
                'click': this.onSelectClick
            },
            'selectionwindow #cancel': {
                'click': this.onCancelClick
            }
        });

        this.getStore('Contacts').load();
    },

    onWindowBeforeRender: function(window, options) {
        var store = this.getStore('Contacts');

        if (store.totalCount == undefined) {
            store.load();
        }

        var grid = window.down('selectiongrid');
        var sm = grid.getSelectionModel();

        this.onGridSelectionChange(sm);
    },

    onGridSelectionChange: function(selModel) {
        var disabled = true;
        if (selModel.getCount() > 0) {
            disabled = false;
        }
        this.getSelect().setDisabled(disabled);
    },

    onItemDblClick: function(grid, model) {
        this.selectItemAndClose(model);
    },

    onSelectClick: function() {
        var item = this.getGrid().getSelectionModel().getLastSelected();
        this.selectItemAndClose(item);
    },

    onCancelClick: function() {
        this.getWindow().hide();
    },

    selectItemAndClose: function(item) {
        var win = this.getWindow();
        win.fireEvent('itemselection', win, item);
        win.hide();
    }
});