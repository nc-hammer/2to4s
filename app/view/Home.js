Ext.define('Foodbank_v1.view.Home', {
		extend: 'Ext.Panel',
		xtype: 'homepanel',
		
		config:{
			title: 'Home',
			iconCls: 'home',
			cls: 'home',
			scrollable: true,
			styleHtmlContent: true,
			
			html: [
				'<h1>FOODBANK</h1>',
				'<p>Welcome to the foodbank</p>'
			].join(""),
			
			
			store: {
				autoLoad: true,
				fields: ['text'],
				
				proxy: {
					type: 'jsonp',
					url: 'http://foodbank.redemptionmedia.co.uk/homeData.php',
					 reader:{
                    type:'json',
                    rootProperty:''
               		 }
				}
			}
		}
});