module.exports = function(requestResponse, admin) {

	//
	// InterfaceController_disconnectPeer
	//
	// TODO come up with a good test case for this
	/*requestResponse('InterfaceController_disconnectPeer',
		admin.InterfaceController_disconnectPeer,
		{ pubkey: '???' });*/

	//
	// InterfaceController_peerStats
	//
	requestResponse({
		name: 'InterfaceController_peerStats',
		member: admin.InterfaceController_peerStats
	});

	requestResponse({
		name: 'InterfaceController_peerStats, with arguments',
		member: admin.InterfaceController_peerStats,
		options: {
			page: 0
		}
	});

	requestResponse({
		name: 'interfaceController.peerStats',
		member: admin.interfaceController.peerStats
	});

	requestResponse({
		name: 'interfaceController.peerStats',
		member: admin.interfaceController.peerStats,
		options: {
			page: 0
		}
	});
	
};
