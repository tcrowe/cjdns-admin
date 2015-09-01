'use strict';

function attach(admin) {
    var request = admin.request,
        search,
        showActiveSearch;

    search = request.auto({
        func: 'SearchRunner_search',
        args: {
            ipv6: {
                required: true,
                type: 'string'
            },
            maxRequests: {
                required: false,
                type: 'int'
            }
        }
    });

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

    admin.SearchRunner_search = search;
    admin.SearchRunner_showActiveSearch = showActiveSearch;

    admin.searchRunner = {
        search: search,
        showActiveSearch: showActiveSearch
    };
}

module.exports = attach;
