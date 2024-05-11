let roles = [];
let state_maps = [];

Promise.all([
    fetch('data/jp/students.json')
        .then(response => response.json())
        .then(data => roles = data.map(role => ({...role, active: false})))
        .catch(error => console.error('Error fetching roles: ', error)),

    fetch('data/state_maps.json')
        .then(response => response.json())
        .then(data => state_maps = data)
        .catch(error => console.error('Error fetching state maps: ', error))
])
.then(() => initializeApp(roles, state_maps));

function initializeApp(roles, state_maps) {
    const buttonTemplate = Handlebars.compile(document.getElementById('button-template').innerHTML);
    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = buttonTemplate({ roles });
    
    buttonContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('button')) {
            const roleId = parseInt(event.target.dataset.roleId);
            toggleButton(event.target, roleId, roles, state_maps);
        }
    });

    updateButtonStates(roles, state_maps, buttonContainer);
    window.onhashchange = () => updateButtonStates(roles, state_maps, buttonContainer);
}

function updateButtonStates(roles, state_maps, buttonContainer) {
    const hash = window.location.hash.substring(1);
    const state = hash ? decodeURIComponent(atob(hash)) : '';

    const maxLength = Math.max(state.length, roles.length);
    const stateArray = state.split('').concat(Array(maxLength - state.length).fill('0'));

    roles.forEach((role) => {
        const index = state_maps.indexOf(role.Id);
        if (index !== -1) {
            role.active = stateArray[index] === '1';
            const button = buttonContainer.querySelector(`[data-role-id="${role.Id}"]`);
            if (button) {
                button.classList.toggle('active', role.active);
            }
        }
    });
}  

function toggleButton(button, roleId, roles, state_maps) {
    const role = roles.find(role => role.Id === roleId);
    if (!role) {
        console.error('Invalid role ID:', roleId);
        return;
    }

    role.active = !role.active;
    button.classList.toggle('active');
    updateURL(roles, state_maps);
}
  
function updateURL(roles, state_maps) {
    const state = state_maps
    .map(map => roles.find(role => role.Id === map)?.active ? '1' : '0')
    .join('');
    const encodeState = btoa(encodeURIComponent(state));
    window.location.hash = encodeState;
}