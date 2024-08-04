document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggle-button').addEventListener('click', function() {
        var leftSidebar = document.querySelector('.sidebar');
        var mainContent = document.querySelector('main');
        var rateContainer = document.querySelector(".rate-container")
        
        if (leftSidebar.style.display === 'none' || leftSidebar.style.display === '') {
            leftSidebar.style.display = 'block';
            mainContent.style.display = 'none';
            rateContainer.style.display = 'none'
        } else {
            leftSidebar.style.display = 'none';
            mainContent.style.display = 'block';
            rateContainer.style.display = 'block'
        }
    });
});
