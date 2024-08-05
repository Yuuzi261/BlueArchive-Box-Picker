function updateButtonContainerHeight() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const leftHeight = document.querySelector('.left').offsetHeight;
    const buttonContainer = document.querySelector('.button-container-scrollbar');
    
    buttonContainer.style.height = `calc(100vh - ${headerHeight}px - ${leftHeight}px)`;
}

function handleResize() {
    const mediaQuery = window.matchMedia('(max-width: 992px)');
    if (mediaQuery.matches) {
        updateButtonContainerHeight();
    } else {
        document.querySelector('.button-container-scrollbar').style.height = '';
    }
}

window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);