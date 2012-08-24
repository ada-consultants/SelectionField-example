Ext.Loader.setConfig({
     enabled: true
});

Ext.application({
    name: 'My',
    appFolder: '/app',

    requires: [
    	'My.view.SelectionField',
    	'My.store.Contacts',
    	'My.view.ShipmentsGrid'
    ],

    controllers: [
        'ContactsSelection'
    ],

    stores: [
        'Contacts',
        'Shipments'
    ],

    models: [
        'Contact',
        'Shipment'
    ],

    launch: function() {
    	Ext.create('Ext.panel.Panel', {
    		renderTo: 'main',
    		items: [{
    			xtype: 'shipmentsgrid'
    		}]
    	});
    }
});