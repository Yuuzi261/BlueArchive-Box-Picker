document.addEventListener('DOMContentLoaded', function() {
    var leftSidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('main');
    var rateContainer = document.querySelector(".rate-container");
    var toggleButton = document.getElementById('toggle-button');

    function updateSidebarVisibility() {
        if (window.innerWidth >= 1000) {
            leftSidebar.style.display = 'block';
            leftSidebar.style.maxHeight = 'none';
            showMainAndRate(false);
        } else {
            leftSidebar.style.display = 'none';
            leftSidebar.style.maxHeight = '0px';
            showMainAndRate(false);
        }
    }

    function showMainAndRate(withAnimation) {
        mainContent.style.display = 'block';
        rateContainer.style.display = 'block';
        if (withAnimation) {
            mainContent.style.opacity = '0';
            rateContainer.style.opacity = '0';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                rateContainer.style.opacity = '1';
            }, 10);
        } else {
            mainContent.style.opacity = '1';
            rateContainer.style.opacity = '1';
        }
    }

    toggleButton.addEventListener('click', function() {
        if (window.innerWidth < 1000) {
            if (leftSidebar.style.display === 'none') {
                mainContent.style.display = 'none';
                rateContainer.style.display = 'none';
                leftSidebar.style.display = 'block';
                leftSidebar.style.maxHeight = '0px';
                setTimeout(function() {
                    leftSidebar.style.maxHeight = '120dvh';
                }, 10);
            } else {
                leftSidebar.style.maxHeight = '0px';
                setTimeout(function() {
                    leftSidebar.style.display = 'none';
                    showMainAndRate(true);
                }, 300);
            }
        }
    });

    updateSidebarVisibility();
    window.addEventListener('resize', updateSidebarVisibility);
});