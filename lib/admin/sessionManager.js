'use strict';

function attach(admin) {
    var request = admin.request,
        getHandles,
        getHandlesPaged,
        sessionStats;

    getHandles = request.auto({
        restricted: true,
        func: 'SessionManager_getHandles',
        args: {
            page: {
                required: false,
                type: 'int'
            }
        }
    });

    getHandlesPaged = admin.paged(getHandles);

    sessionStats = request.auto({
        restricted: true,
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
        getHandlesPaged: getHandlesPaged,
        sessionStats: sessionStats
    };
}

module.exports = attach;
