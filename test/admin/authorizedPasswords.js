module.exports = function(requestResponse, admin) {

	//
	// AuthorizedPasswords_add
	//
	var testUser1 = 'testuser' + Math.random().toString().substring(2, 8),
		testUser2 = 'testuser' + Math.random().toString().substring(2, 8);

	requestResponse({
		name: 'AuthorizedPasswords_add',
		member: admin.AuthorizedPasswords_add,
		options: {
			user: testUser1,
			password: testUser1
		}
	});

	// TODO figure out why this one crashes cjdroute
	requestResponse({
		name: 'authorizedPasswords.add',
		member: admin.authorizedPasswords.add,
		options: {
			user: testUser2,
			password: testUser2
		}
	});

	//
	// AuthorizedPasswords_list
	//
	requestResponse({
		name: 'AuthorizedPasswords_list',
		member: admin.AuthorizedPasswords_list
	});

	requestResponse({
		name: 'authorizedPasswords.list',
		member: admin.authorizedPasswords.list
	});

	//
	// AuthorizedPasswords_remove
	//
	requestResponse({
		name: 'AuthorizedPasswords_remove',
		member: admin.AuthorizedPasswords_remove,
		options: {
			user: testUser1
		},
		logResponse: true,
		skip: true
	});

	// TODO figure out why this one crashes cjdroute
	requestResponse({
		name: 'authorizedPasswords.remove',
		member: admin.authorizedPasswords.remove,
		options: {
			user: testUser2
		},
		logResponse: true,
		skip: true
	});
	
};
