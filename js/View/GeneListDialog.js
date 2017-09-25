define([
	'dojo/_base/lang',
	'dojo/_base/declare',
	'dojo/_base/array',
	'dojo/dom-construct',
	'dojo/request',
	'dojo/io-query',
	'dojo/aspect',
	'dijit/Dialog',
	'dijit/focus',
	'dijit/form/Button',
	'dijit/form/TextBox',
	'dijit/form/Select',
	'JBrowse/View/Dialog/WithActionBar',
	'dojo/domReady!'
], function (lang, declare,array, dom, dojoRequest, ioQuery, aspect, dijitDialog, focus, dButton, dTextBox, dSelect, ActionBarDialog) {
	return declare(ActionBarDialog, {
		constructor: function (args) {
			var thisB = this;
			this._config = args;
			aspect.after(this, 'hide', function () {
				focus.curNode && focus.curNode.blur();
				setTimeout(function () {
					thisB.destroyRecursive();
				}, 500);
			});
		},

		_dialogContent: function () {
			var myBrowser = this.browser;
			var content = this.content = {};
			var dataRoot = this.dataRoot;
			content.selectedRows = [];
			var container = dom.create('div', { className: 'search-dialog' });

			var geneListTable = dom.create('table', {}, container);
			dom.create('thead', {
				innerHTML: '<tr><th>Name</th><th>Seq</th><th>Type</th><th>Length</th><th>Updated</th></td>'
			}, geneListTable)

			var tb = dom.create('tbody', {
			}, geneListTable)


			dojoRequest(
			    //http://localhost/apollo/annotator/findAnnotationsForSequence/?
				this._config.apollo + '/annotator/findAnnotationsForSequence/?' + ioQuery.objectToQuery({
					'sequenceName': '',
					'request': '5',
					'offset': '0',
					'max': '20',
					'annotationName': '',
					'type': '',
					'user': '',
					'clientToken': '19482518719262381191888728276',
					'sortorder': 'asc',
					'sort': 'date',
				}),
				{
					method: 'GET',
				}
			).then(
				function(resp) {
					console.log(resp);
				},
				function(err) {
					console.err(err);
				}
			);

			return container;
		},

		show: function (browser, callback) {
			this.browser = browser;
			this.callback = callback || function () {
			};
			this.set('title', 'Gene List');
			this.set('content', this._dialogContent());
			this.inherited(arguments);
			focus.focus(this.closeButtonNode);
		}
	});
});
