module.exports = function(admin) {
	var request = admin.request,
		checkPermissions,
		chroot,
		getUser,
		nofiles,
		noforks,
		seccomp,
		setupComplete,
		setUser;

	checkPermissions = request.auto({
		restricted: true,
		func: 'Security_checkPermissions'
	});

	chroot = request.auto({
		restricted: true,
		func: 'Security_chroot',
		args: {
			root: {
				required: true,
				type: 'string'
			}
		}
	});

	getUser = request.auto({
		restricted: true,
		func: 'Security_getUser',
		args: {
			user: {
				required: false,
				type: 'string'
			}
		}
	});

	nofiles = request.auto({
		restricted: true,
		func: 'Security_nofiles'
	});

	noforks = request.auto({
		restricted: true,
		func: 'Security_noforks'
	});

	seccomp = request.auto({
		restricted: true,
		func: 'Security_seccomp'
	});

	setupComplete = request.auto({
		restricted: true,
		func: 'Security_setupComplete'
	});

	setUser = request.auto({
		restricted: true,
		func: 'Security_setUser',
		args: {
			keepNetAdmin: {
				required: true,
				type: 'int'
			},
			uid: {
				required: true,
				type: 'int'
			}
		}
	});

	admin.Security_checkPermissions = checkPermissions;
	admin.Security_chroot = chroot;
	admin.Security_getUser = getUser;
	admin.Security_nofiles = nofiles;
	admin.Security_noforks = noforks;
	admin.Security_seccomp = seccomp;
	admin.Security_setupComplete = setupComplete;
	admin.Security_setUser = setUser;

	admin.security = {
		checkPermissions: checkPermissions,
		chroot: chroot,
		getUser: getUser,
		nofiles: nofiles,
		noforks: noforks,
		seccomp: seccomp,
		setupComplete: setupComplete,
		setUser: setUser
	};
};
