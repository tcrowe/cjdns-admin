
module.exports = function(admin) {
	var request = admin.request,
		showActiveSearch;

	showActiveSearch = request.auto({
		restricted: false,
		func: 'SearchRunner_showActiveSearch',
		args: {
			number: {
				required: true,
				type: 'int'
			}
		}
	});

	admin.SearchRunner_showActiveSearch = showActiveSearch;

	admin.searchRunner = {
		showActiveSearch: showActiveSearch
	};

};
