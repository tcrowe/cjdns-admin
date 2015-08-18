module.exports = function(admin) {
	var request = admin.request,
		dumpRumorMill;

	dumpRumorMill = request.auto({
		restricted: true,
		func: 'Janitor_dumpRumorMill',
		args: {
			mill: {
				required: true,
				type: 'string'
			},
			page: {
				required: true,
				type: 'int'
			}
		}
	});

	admin.Janitor_dumpRumorMill = dumpRumorMill;

	admin.janitor = {
		dumpRumorMill: dumpRumorMill
	};
};
