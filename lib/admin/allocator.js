
module.exports = function(admin) {
	var request = admin.request,
		bytesAllocated,
		snapshot;

	bytesAllocated = request.auto({
		restricted: true,
		func: 'Allocator_bytesAllocated'
	});

	snapshot = request.auto({
		restricted: true,
		func: 'Allocator_snapshot',
		args: {
			includeAllocations: {
				required: false,
				type: 'int'
			}
		}
	});

	// original
	admin.Allocator_bytesAllocated = bytesAllocated;
	admin.Allocator_snapshot = snapshot;

	// alternate
	admin.allocator = {
		bytesAllocated: bytesAllocated,
		snapshot: snapshot
	};
};
