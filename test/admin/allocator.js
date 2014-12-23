module.exports = function(requestResponse, admin) {
	
	//
	// Allocator_bytesAllocated
	// 
	requestResponse({
		name: 'Allocator_bytesAllocated',
		member: admin.Allocator_bytesAllocated
	});

	requestResponse({
		name: 'allocator.bytesAllocated',
		member: admin.allocator.bytesAllocated
	});

	//
	// Allocator_snapshot
	// 
	requestResponse({
		name: 'Allocator_snapshot',
		member: admin.Allocator_snapshot,
		skip: true
	});

	requestResponse({
		name: 'allocator.snapshot',
		member: admin.allocator.snapshot,
		skip: true
	});

	requestResponse({
		name: 'Allocator_snapshot, with arguments',
		member: admin.Allocator_snapshot,
		options: {
			includeAllocations: 1
		},
		skip: true
	});

	requestResponse({
		name: 'allocator.snapshot, with arguments',
		member: admin.allocator.snapshot,
		options: {
			includeAllocations: 1
		},
		skip: true
	});


	//
	// memory, calls Allocator_bytesAllocated
	// memory call is depricated
	//
	requestResponse({
		name: 'memory',
		member: admin.memory
	});

};
