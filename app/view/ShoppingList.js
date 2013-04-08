Ext.define('Foodbank_v1.view.ShoppingList', {
	extend: 'Ext.navigation.View', 
	xtype: 'shoppinglist',

	config: {
		title: 'Shoppinglist',
		iconCls: 'list',
		
		items: {
			xtype: 'list',
			itemTpl: '{name}',
			title: 'Shopping List',
			
			store: {
				autoLoad: true,
				fields: ['name', 'id'],
				
				proxy: {
					type: 'jsonp',
					url: 'http://foodbank.redemptionmedia.co.uk/foodItems.php',
					 reader:{
                    type:'json',
                    rootProperty:''
               		 }
				}
				
			}
		}
	}
});