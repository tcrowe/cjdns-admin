'use strict';

function attach(admin) {
    var request = admin.request,
        disconnectPeer,
        peerStats,
        peerStatsPaged;

    disconnectPeer = request.auto({
        restricted: true,
        func: 'InterfaceController_disconnectPeer',
        args: {
            pubkey: {
                required: true,
                type: 'string'
            }
        }
    });

    peerStats = request.auto({
        restricted: true,
        func: 'InterfaceController_peerStats',
        args: {
            page: {
                required: false,
                type: 'int'
            }
        }
    });

    peerStatsPaged = admin.paged(peerStats);

    admin.InterfaceController_disconnectPeer = disconnectPeer;
    admin.InterfaceController_peerStats = peerStats;

    admin.interfaceController = {
        disconnectPeer: disconnectPeer,
        peerStats: peerStats,
        peerStatsPaged: peerStatsPaged
    };
}

module.exports = attach;
