
module.exports = function(admin) {
	var request = admin.request,
		checkPermissions,
		dropPermissions,
		setUser;

	checkPermissions = request.auto({
		restricted: false,
		func: 'Security_checkPermissions'
	});

	dropPermissions = request.auto({
		restricted: false,
		func: 'Security_dropPermissions'
	});

	setUser = request.auto({
		restricted: false,
		func: 'Security_setUser',
		args: {
			user: {
				required: true,
				type: 'string'
			}
		}
	});

	admin.Security_checkPermissions = checkPermissions;
	admin.Security_dropPermissions = dropPermissions;
	admin.Security_setUser = setUser;

	admin.security = {
		checkPermissions: checkPermissions,
		dropPermissions: dropPermissions,
		setUser: setUser
	};

};
