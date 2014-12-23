
/*
	1.) gets a lists of admin functions from the cjdns node
	2.) writes functions.json
	3.) writes functions2.json
*/

var fs = require('fs'),
	Admin = require('../lib/admin'),
	admin,
	timer,
	pagenum = 0,
	list = [],
	channel;

admin = new Admin({
	password: process.env.CJDNS_ADMIN_PASSWORD
});

/*channel = admin.AdminLog_subscribe();

admin.on(channel, function() {
	console.log('AdminLog_subscribe');
	console.log('arguments', arguments);
})
*/

timer = setInterval(function () {
	var channel = admin.availableFunctions({ page: pagenum });
	console.log('req', pagenum);
	admin.on(channel, function(res) {
		// console.log('availableFunctions');
		// console.log('arguments', arguments);
		// console.log('res.data', res.data);
		console.log('res', pagenum);
		if (res) {
			if (res.data) {
				if (res.data.availableFunctions) {
					Object.keys(res.data.availableFunctions).forEach(function(key) {
						var item = { func: key, args: res.data.availableFunctions[key] };
						// list[key] = res.data.availableFunctions[key];
						list.push(item);
					});
				}
				if (res.data.more === 1) {
					pagenum += 1;
				} else {
					console.log('cleared');
					clearInterval(timer);
					list.sort(function(a, b) {
						var a1,
							b1;
						a1 = a.func.toLowerCase();
						b1 = b.func.toLowerCase();
						if (a1 < b1) {
							return -1;
						}
						if (a1 > b1) {
							return 1;
						}
						return 0;
					});
					list = {
						generated: Date().toString(),
						functions: list
					};
					fs.writeFileSync('./functions.json', JSON.stringify(list, null, '\t'));
					list = list.functions.map(function(item) {
						return item.func;
					});
					list = {
						generated: Date().toString(),
						functions: list
					};
					fs.writeFileSync('./functions2.json', JSON.stringify(list, null, '\t'));
				}
			}
		}
	});
}, 100);
