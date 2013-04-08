Ext.define('Foodbank_v1.view.About', {
	extend: 'Ext.navigation.View', 
	xtype: 'about',

	config: {
		title: 'About',
		iconCls: 'info',
		
		items: {
			xtype: 'list',
			itemTpl: '<bold>{dateTime}</bold><br/>{title}',
			title: 'About',
			
			store: {
				autoLoad: true,
				fields: ['id', 'title', 'content'],
				
				proxy: {
					type: 'jsonp',
					url: 'http://foodbank.redemptionmedia.co.uk/about.php',
					 reader:{
                    type:'json',
                    rootProperty:''
               		 }
				}
			}
		}
	}
});