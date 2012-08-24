Ext.define('My.view.SelectionWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'My.view.SelectionGrid'
    ],

    alias: 'widget.selectionwindow',

    title: 'Select an item...',
    height: 400,
    width: 400,
    layout: "fit",

    items: [{
        xtype: 'selectiongrid',
        border: false
    }],

    buttons: [{
        itemId: 'select',
        text: 'Select'
    }, {
        itemId: 'cancel',
        text: 'Cancel'
    }],

    modal: true,

    constructor: function () {
        this.addEvents(
            /**
             * @event itemselection
             * Fired when an item is selected in the grid
             * @param {Ext.window.Window} window Window owning the grid where
             * the item was selected
             * @param {Comet.model.CooperatingPartner} item The partner selected
             */
            'itemselection'
        );
        this.callParent(arguments);
    },

    setSelectedItem: function(item) {
        var grid = this.down('selectiongrid');
        var sm = grid.getSelectionModel();

        if (['number', 'string'].indexOf(typeof item) >= 0) {
            item = parseInt(item);
            item = grid.getStore().getById(item);
        }

        sm.select(item);
    }

});