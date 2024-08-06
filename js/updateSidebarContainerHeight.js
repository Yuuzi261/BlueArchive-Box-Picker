function updateSidebarContainerHeight() {
    const headerHeight = document.querySelector('header').offsetHeight;
    // const leftHeight = document.querySelector('.left').offsetHeight;
    const sidebarContainer = document.querySelector('.sidebar');
    
    sidebarContainer.style.height = `calc(100vh - ${headerHeight}px)`;
}

function handleResize() {
    const mediaQuery = window.matchMedia('(max-width: 992px)');
    if (mediaQuery.matches) {
        updateSidebarContainerHeight();
    } else {
        document.querySelector('.sidebar').style.height = '';
    }
}

window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);