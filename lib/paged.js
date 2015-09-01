'use strict';

function attach(admin) {
    function paged(fn) {
        function pagedFn(options, callback) {
            var page = 0,
                results = [],
                channel;

            // passed without options
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            options.page = page;

            function processResponse(res) {
                var errors = res.errors,
                    data = res.data,
                    keys = Object.keys(data),
                    arrayProp;

                // for any errors stop and return them
                if (errors.length > 0) {
                    return callback(errors);
                }

                // find the property in the response that is an Array
                keys.some(function (key) {
                    var prop = data[key],
                        type = typeof prop;
                    if (type === 'object' && Array.isArray(prop)) {
                        arrayProp = prop;
                        return true;
                    }
                });

                // special case for admin.availableFunctions
                // where this has the functions and their models in an object
                if (data.availableFunctions !== undefined) {
                    keys = Object.keys(data.availableFunctions);
                    keys.forEach(function (key) {
                        var func = key,
                            model = data.availableFunctions[key];
                        results.push({
                            func: func,
                            model: model
                        });
                    });
                }

                // if there is an Array then put its contents into results
                // i don't know why concat didn't work for me earlier
                if (arrayProp !== undefined) {
                    arrayProp.forEach(function (item) {
                        results.push(item);
                    });
                }

                // process more results or return
                if (data.more === 1) {
                    options.page += 1;
                    channel = fn(options);
                    admin.once(channel, processResponse);
                } else {
                    callback(undefined, results);
                }
            }

            channel = fn(options);
            admin.once(channel, processResponse);
        }
        return pagedFn;
    }
    return paged;
}

module.exports = attach;
