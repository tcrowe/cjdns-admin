'use strict';

function attach(admin) {
    var request = admin.request,
        beginConnection,
        funcNew;

    beginConnection = request.auto({
        restricted: true,
        func: 'UDPInterface_beginConnection',
        args: {
            address: {
                required: true,
                type: 'string'
            },
            interfaceNumber: {
                required: false,
                type: 'int'
            },
            password: {
                required: false,
                type: 'string'
            },
            publicKey: {
                required: true,
                type: 'string'
            }
        }
    });

    funcNew = request.auto({
        restricted: false,
        func: 'UDPInterface_new',
        args: {
            bindAddress: {
                required: false,
                type: 'string'
            }
        }
    });

    admin.UDPInterface_beginConnection = beginConnection;
    admin.UDPInterface_new = funcNew;

    admin.udpInterface = {
        beginConnection: beginConnection,
        new: funcNew
    };
}

module.exports = attach;
