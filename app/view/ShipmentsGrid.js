Ext.define('My.view.ShipmentsGrid', {
	extend: 'Ext.grid.Panel',

	alias: 'widget.shipmentsgrid',

	store: 'Shipments',

	columns: [{
        text: "Quantity",
        dataIndex: "quantity",
        width: 100,
        editor: {
        	xtype: 'textfield'
        }
    }, {
    	text: "Contact",
    	dataIndex: "fk_contact",
    	width: 200,
        editor :
        {
            xtype : 'selectionfield'
        },
        renderer: function(value) {
            var store = Ext.getStore('Contacts');
            var row = store.getById(parseInt(value));
            return row ? row.get('name') : "";
        }
    }],

    plugins: [{
        ptype: 'cellediting',
        pluginId: 'celledit',
        clicksToEdit: 1
    }]
});