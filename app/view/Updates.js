Ext.define('Foodbank_v1.view.Updates', {
	extend: 'Ext.navigation.View', 
	xtype: 'updates',

	config: {
		title: 'Updates',
		iconCls: 'star',
		
		items: {
			xtype: 'list',
			itemTpl: '<bold>{dateTime}</bold><br/>{content}',
			title: 'Updates',
			
			store: {
				autoLoad: true,
				fields: ['id', 'content', 'dateTime'],
				
				proxy: {
					type: 'jsonp',
					url: 'http://foodbank.redemptionmedia.co.uk/updates.php',
					 reader:{
                    type:'json',
                    rootProperty:''
               		 }
				}
			}
		}
	}
});