{
	// Function to find modal close button for current hash
	const findModalClose = () => {
		// Get hash without the # symbol
		const hash = location.hash.slice(1);
		
		if (hash) {
			// Find element by hash
			const element = document.getElementById(hash);
			
			// Check if element exists and has class 'modal'
			if (element?.classList.contains('modal')) {
				// Find and return the modal close button
				return element.querySelector('a.modalClose');
			}
		}
		
		return null;
	};

	// Handle keydown events
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			const closeButton = findModalClose();
			if (closeButton) {
				closeButton.click();
			}
		}
	});
}