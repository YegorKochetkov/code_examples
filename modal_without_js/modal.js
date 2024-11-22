document.addEventListener('DOMContentLoaded', () => {
    // Function to check if any modal is currently targeted
    const isModalTargeted = () => {
        const modal = document.querySelector('.modal:target');
        return !!modal;
    };

    // Handle keydown events
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isModalTargeted()) {
            history.back();
        }
    });
});
