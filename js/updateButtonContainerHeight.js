function updateButtonContainerHeight() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const leftHeight = document.querySelector('.left').offsetHeight;
    const buttonContainer = document.querySelector('.button-container-scrollbar');
    
    buttonContainer.style.height = `calc(100vh - ${headerHeight}px - ${leftHeight}px)`;
}

function handleSizeChange() {
    const mediaQuery = window.matchMedia('(max-width: 992px)');
    if (mediaQuery.matches) {
        updateButtonContainerHeight();
    } else {
        document.querySelector('.button-container-scrollbar').style.height = '';
    }
}

function handleOrientationChange() {
    setTimeout(() => {
        const angle = screen.orientation.angle;
        const type = screen.orientation.type;
        handleSizeChange();
    }, 100);
}

window.addEventListener('load', handleSizeChange);
window.addEventListener('resize', handleSizeChange);

if (screen.orientation) {
    screen.orientation.addEventListener("change", handleOrientationChange);
} else {
    window.addEventListener('orientationchange', handleOrientationChange);
}