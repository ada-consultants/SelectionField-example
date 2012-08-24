Ext.define('My.store.Shipments', {
	extend: 'Ext.data.Store',

	model: 'My.model.Shipment',

	data: [{
		id: 1,
		quantity: "100",
		fk_contact: 1
	}, {
		id: 2,
		quantity: "120",
		fk_contact: 2
	}, {
		id: 3,
		quantity: "",
		fk_contact: null
	}]
});