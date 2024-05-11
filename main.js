let roles = [];

fetch('data/jp/students.json')
    .then(response => response.json())
    .then(data => {
        const roles = data.map(role => ({...role, active: false}));
        initializeApp(roles);
    })
    .catch(error => console.error('Error fetching roles:', error));

function initializeApp(roles) {
    const buttonTemplate = Handlebars.compile(document.getElementById('button-template').innerHTML);
    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = buttonTemplate({ roles });
    
    buttonContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('button')) {
            const roleId = parseInt(event.target.dataset.roleId);
            toggleButton(event.target, roleId, roles);
        }
    });

    updateButtonStates(roles, buttonContainer);
    window.onhashchange = () => updateButtonStates(roles, buttonContainer);
}

function updateButtonStates(roles, buttonContainer) {
    const hash = window.location.hash.substring(1);
    const state = hash ? decodeURIComponent(atob(hash)) : '';

    const maxLength = Math.max(state.length, roles.length);
    const stateArray = state.split('').concat(Array(maxLength - state.length).fill('0'));

    roles.sort((a, b) => a.Id - b.Id).forEach((role, index) => {
        role.active = stateArray[index] === '1';
        const button = buttonContainer.querySelector(`[data-role-id="${role.Id}"]`);
        if (button) {
            button.classList.toggle('active', role.active);
        }
    });
}  

function toggleButton(button, roleId, roles) {
    const role = roles.find(role => role.Id === roleId);
    if (!role) {
        console.error('Invalid role ID:', roleId);
        return;
    }

    role.active = !role.active;
    button.classList.toggle('active');
    updateURL(roles);
}
  
function updateURL(roles) {
    const state = roles
        .sort((a, b) => a.Id - b.Id)
        .map(role => role.active ? '1' : '0')
        .join('');
    const encodeState = btoa(encodeURIComponent(state));
    window.location.hash = encodeState;
}