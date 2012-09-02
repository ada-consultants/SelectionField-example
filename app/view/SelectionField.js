Ext.define('My.view.SelectionField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.selectionfield',
    requires: [
        'My.view.SelectionWindow'
    ],

    triggerCls: 'x-form-trigger-ellipsis',
    
    cls: 'trigger-window',

    emptyText: 'empty...',

    fieldSubTpl: [
        '<div id="{id}" type="{type}" ',
            '<tpl if="name">name="{name}" </tpl>',
            '<tpl if="tabIdx">tabIndex="{tabIdx}" </tpl>',
            'class="selectionfield {fieldCls} {typeCls}" role="presentation">',
            '{value}',
        '</div>',
        '<div id="{cmpId}-triggerWrap" class="{triggerWrapCls}" role="presentation">',
            '{triggerEl}',
            '<div class="{clearCls}" role="presentation"></div>',
        '</div>',
        {
            compiled: true,
            disableFormats: true
        }
    ],

    getRawValue: function() {
        var v = this.callParent();

        if (undefined === v) {
            v = '';
        }

        return v;
    },

    onTriggerClick: function(e) {
        var me = this;
        var win = this.getSelectionWindow();
        var value = this.getValue();

        if (value) {
            win.setSelectedItem(value);
        }

        var itemSelectionCallback = function(win, item) {
            me.setValue(item.get('id'));

            // Enter the selected value in the div
            me.getEl().down('#' + me.id + '-inputEl').setHTML(item.get('name'));
        };

        this.onFocus();

        win.on('itemselection', itemSelectionCallback);
        // When closing the window, you want to unregister the event because
        // another field might want to use the same window instance.
        win.on('hide', function() {
            win.un('itemselection', itemSelectionCallback);
        });

        win.show();
    },

    listeners: {
        show: function() {
            var store = Ext.getStore('Contacts');
            var row = store.getById(parseInt(this.getValue()));
            var to_show = row ? row.get('name') : "";

            this.getEl().down('#' + this.id + '-inputEl').setHTML(to_show);

            return to_show;
        },
        change: function(field, newValue) {
            this.updateDisplayValue(newValue);
        }
    },

    validateBlur: function(e) {
        var win = this.getSelectionWindow();

        if (win.isVisible()) {
            return false;
        } else {
            return this.callParent(arguments);
        }
    },

    /**
     * Updates the text value of the field
     */
    updateDisplayValue: function(id) {
        if (undefined === this.getEl()) {
            return;
        }

        var store = Ext.getStore('Contacts');
        var row = store.getById(parseInt(this.getValue()));
        var to_show = row ? row.get('name') : "";

        this.getEl().down('#' + this.id + '-inputEl').setHTML(to_show);
    },

    setValue: function(value) {
        this.callParent(arguments);
        this.updateDisplayValue(this.getValue());

        return this;
    },

    /**
     * Returns the window selecting the cooperating partner
     *
     * Attempt to get the window with a component query. If it fails, creates
     * it.
     *
     * @return {Comet.view.cooperatingpartner.SelectionWindow}
     */
    getSelectionWindow: function() {
        var itemId = 'triggerselection';

        var components = Ext.ComponentQuery.query('selectionwindow#' + itemId);
        if (components.length == 1) {
            var win = components.pop();
        } else {
            var win = Ext.create('My.view.SelectionWindow', {
                itemId: 'triggerselection'
            });
        }

        return win;
    }
});