Ext.define('My.store.Contacts', {
	extend: 'Ext.data.Store',

	model: 'My.model.Contact',

	proxy: {
		type: 'ajax',
		url: 'data.json'
	}
});