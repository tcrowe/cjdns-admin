'use strict';

function attach(admin) {
    var request = admin.request,
        exit,
        initTunnel,
        pid;

    exit = request.auto({
        restricted: true,
        func: 'Core_exit'
    });

    initTunnel = request.auto({
        restricted: true,
        func: 'Core_initTunnel',
        args: {
            desiredTunName: {
                required: false,
                type: 'string'
            }
        }
    });

    pid = request.auto({
        restricted: false,
        func: 'Core_pid'
    });

    admin.Core_exit = exit;
    admin.Core_initTunnel = initTunnel;
    admin.Core_pid = pid;

    admin.core = {
        exit: exit,
        initTunnel: initTunnel,
        pid: pid
    };
}

module.exports = attach;
