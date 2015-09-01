'use strict';

function attach(admin) {
    var request = admin.request,
        dumpRumorMill,
        dumpRumorMillPaged;

    dumpRumorMill = request.auto({
        restricted: true,
        func: 'Janitor_dumpRumorMill',
        args: {
            mill: {
                required: true,
                type: 'string'
            },
            page: {
                required: true,
                type: 'int'
            }
        }
    });

    dumpRumorMillPaged = admin.paged(dumpRumorMill);

    admin.Janitor_dumpRumorMill = dumpRumorMill;

    admin.janitor = {
        dumpRumorMill: dumpRumorMill,
        dumpRumorMillPaged: dumpRumorMillPaged
    };
}

module.exports = attach;
