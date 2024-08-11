document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggle-button').addEventListener('click', function() {
        var leftSidebar = document.querySelector('.left');
        var mainContent = document.querySelector('main');
        
        if (leftSidebar.style.display === 'none' || leftSidebar.style.display === '') {
            leftSidebar.style.display = 'block';
            mainContent.style.display = 'none';
            this.textContent = '隐藏左侧欄';
        } else {
            leftSidebar.style.display = 'none';
            mainContent.style.display = 'block';
            this.textContent = '顯示左側欄';
        }
    });
});
