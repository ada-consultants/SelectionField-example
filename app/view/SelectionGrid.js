Ext.define('My.view.SelectionGrid', {
	extend: "Ext.grid.Panel",
    alias: "widget.selectiongrid",

    requires: [
        "My.store.Contacts"
    ],

    store: "Contacts",

    columns: [{
        text: "Name",
        dataIndex: "name",
        flex: 1
    }],

    listeners: {
        render: function(p){
            p.setLoading({
                store: p.getStore()
            }).hide();
        }
    }
});