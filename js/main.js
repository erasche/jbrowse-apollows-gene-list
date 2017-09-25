define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/Deferred',
	'dojo/dom',
	'dojo/dom-construct',
	'dijit/MenuSeparator',
	'dijit/CheckedMenuItem',
	'dijit/form/DropDownButton',
	'dijit/DropDownMenu',
	'dijit/form/Button',
	'dijit/registry',
	'dijit/MenuItem',
	'JBrowse/Plugin',
	'./View/GeneListDialog'
], function (declare, lang, Deferred, dom, domConstruct, dijitMenuSeparator, dijitCheckedMenuItem, dijitDropDownButton, dijitDropDownMenu, dijitButton, dijitRegistry, dijitMenuItem, JBrowsePlugin, GeneListDialog) {
	return declare(JBrowsePlugin, {
		constructor: function (args) {
			this._searchTrackCount = 0;
			this._config = args;
			var searchButton;
			var thisB = this;
			var myBrowser = this.browser;
			var menu;

			console.log("GeneList plugin starting");
			myBrowser.afterMilestone('initView', function () {
				var buttontext = new dijitMenuItem({
					label: 'Gene List',
					iconClass: 'dijitIconFolder',
					onClick: lang.hitch(thisB, 'openGeneList')
				});

				myBrowser.addGlobalMenuItem('tools',buttontext);

				if(dijitRegistry.byId("dropdownmenu_tools") == undefined){
					myBrowser.renderGlobalMenu('tools',{text:'Tools'},myBrowser.menuBar);
				}
				console.log("GeneList plugin added");
			});
		},

		openGeneList: function () {
			var dialog = new GeneListDialog(this._config);
			var browser = this.browser;
			dialog.show(browser, function (searchParams) {
				if (searchParams) {
					console.log(searchParams);
				}
				return;
			});
		}
	});
});
