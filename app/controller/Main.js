Ext.define('Foodbank_v1.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            about: 'about',
			update: 'updates'
        },
        control: {
            'about list': {
				itemtap: 'showAbout'
        	},
			'updates list': {
				itemtap: 'showUpdate'
        	}
		}
    },
	
	showPost: function(list, index, element, record) {
		this.getBlog().push({
			xtype: 'panel',
			title: record.get('title'),
			html: record.get('content'),
			scrollable: true,
			styleHtmlContent: true
		});
	},
	
	showAbout: function(list, index, element, record) {
		this.getAbout().push({
			xtype: 'panel',
			title: record.get('title'),
			html: record.get('content'),
			scrollable: true,
			styleHtmlContent: true
		});
	},
	
	showUpdate: function(list, index, element, record) {
		this.getUpdate().push({
			xtype: 'panel',
			title: record.get('dateTime'),
			html: record.get('content'),
			scrollable: true,
			styleHtmlContent: true
		});
	}
   
});