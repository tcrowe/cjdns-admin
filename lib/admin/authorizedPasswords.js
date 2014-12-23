
module.exports = function(admin) {
	var request = admin.request,
		list,
		add,
		remove;

	add = request.auto({
		restricted: true,
		func: 'AuthorizedPasswords_add',
		args: {
			authType: {
				required: false,
				type: 'int'
			},
			ipv6: {
				required: false,
				type: 'string'
			},
			password: {
				required: true,
				type: 'string'
			},
			user: {
				required: true,
				type: 'string'
			}
		}
	});

	list = request.auto({
		restricted: true,
		func: 'AuthorizedPasswords_list'
	});

	remove = request.auto({
		restricted: true,
		func: 'AuthorizedPasswords_remove',
		args: {
			user: {
				required: true,
				type: 'string'
			}
		}
	});

	// original
	admin.AuthorizedPasswords_list = list;
	admin.AuthorizedPasswords_add = add;
	admin.AuthorizedPasswords_remove = remove;

	// alternate
	admin.authorizedPasswords = {
		list: list,
		add: add,
		remove: remove
	};
};
