Ext.define('Foodbank_v1.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                xtype: 'homepanel'
            },
			{
				xtype: 'shoppinglist'	
			},
			{
				xtype: 'updates'	
			},
			{
				xtype: 'about'	
			}
        ]
    }
});
