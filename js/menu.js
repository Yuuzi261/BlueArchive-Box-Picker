document.getElementById('more-vert-button').addEventListener('click', function() {
    const menu = document.getElementById('settings-dropdown-menu');
    const button = document.getElementById('more-vert-button');
    
    // Toggle the display property between 'none' and 'block'
    if (menu.style.display === 'none' || menu.style.display === '') {
        const rect = button.getBoundingClientRect();
        
        // Set the position of the menu
        menu.style.top = `${rect.bottom}px`;
        
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

document.addEventListener('click', function(event) {
    const menu = document.getElementById('settings-dropdown-menu');
    const moreVertButton = document.getElementById('more-vert-button');
    if (!menu.contains(event.target) && !moreVertButton.contains(event.target)) {
        menu.style.display = 'none';
    }
});

document.addEventListener('keydown', function(event) {
    const menu = document.getElementById('settings-dropdown-menu');
    if (event.key === 'Escape') {
        menu.style.display = 'none';
    }
});