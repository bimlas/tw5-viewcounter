/*\
title: $:/plugins/bimlas/viewcounter/startup.js
type: application/javascript
module-type: startup

Count the opening of tiddlers and store the time of the last opening

\*/

(function(){

/*jslint node: false, browser: true */
/*global $tw: true */
"use strict";

// Export name and synchronous status
exports.name = "viewcounter";
exports.platforms = ["browser"];
exports.after = ["story"];
exports.synchronous = true;

var SAVE_PREFIX = "$:/viewcounters/";

exports.startup = function() {
	// Navigating to tiddlers by clicking on its link
	$tw.hooks.addHook("th-navigating", function (event) {
		$tw.utils.nextTick(function () {
			incrementCounter(event.navigateTo);
		});
		return event;
	});
};

function incrementCounter(title) {
	if(title.startsWith(SAVE_PREFIX)) {
		return;
	}
	var stateTitle = SAVE_PREFIX + title;
	var tiddler = ($tw.wiki.getTiddler(stateTitle) || {});
	var fields = Object.assign({}, {title: stateTitle}, tiddler.fields);
	fields.count = (parseInt(fields.count || 0) + 1).toString();
	fields.last = $tw.utils.formatDateString(new Date(), "[UTC]YYYY0MM0DD0hh0mm0ssXXX");
	$tw.wiki.addTiddler(fields);
};

})();
