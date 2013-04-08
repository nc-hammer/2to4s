Ext.define('Foodbank_v1.view.Blog', {
	extend: 'Ext.navigation.View', 
	xtype: 'blog',

	config: {
		title: 'Blog',
		iconCls: 'star',
		
		items: {
			xtype: 'list',
			itemTpl: '{title}',
			title: 'Recent Posts',
			
			store: {
				autoLoad: true,
				fields: ['title', 'author', 'content'],
				
				proxy: {
					type: 'jsonp',
					url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://www.redemptionmedia.co.uk/feed/',
					reader: {
						type: 'json',
						rootProperty: 'responseData.feed.entries'	
					}
				}
			}
		}
	}
});