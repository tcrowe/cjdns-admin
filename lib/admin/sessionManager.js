module.exports = function(admin) {
	var request = admin.request,
		getHandles,
		sessionStats;

	getHandles = request.auto({
		restricted: false,
		func: 'SessionManager_getHandles',
		args: {
			page: {
				required: false,
				type: 'int'
			}
		}
	});

	sessionStats = request.auto({
		restricted: false,
		func: 'SessionManager_sessionStats',
		args: {
			handle: {
				required: true,
				type: 'int'
			}
		}
	});

	admin.SessionManager_getHandles = getHandles;
	admin.SessionManager_sessionStats = sessionStats;

	admin.sessionManager = {
		getHandles: getHandles,
		sessionStats: sessionStats
	};

};
