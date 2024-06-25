let roles = [];
let state_maps = [];
let filters = { Main: false, Support: false };

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

    document.getElementById('filter-main').addEventListener('click', function() {
        filters.Main = !filters.Main;
        this.classList.toggle('btn-primary', filters.Main);
        this.classList.toggle('btn-secondary', !filters.Main);
        updateButtonVisibility(roles, buttonContainer);
    });

    document.getElementById('filter-support').addEventListener('click', function() {
        filters.Support = !filters.Support;
        this.classList.toggle('btn-primary', filters.Support);
        this.classList.toggle('btn-secondary', !filters.Support);
        updateButtonVisibility(roles, buttonContainer);
    });

    updateButtonStates(roles, state_maps, buttonContainer);
    window.onhashchange = () => updateButtonStates(roles, state_maps, buttonContainer);
}

function updateButtonStates(roles, state_maps, buttonContainer) {
    const hash = window.location.hash.substring(1);
    const state = hash ? decodeState(hash) : '';

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

    updateButtonVisibility(roles, buttonContainer);
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
    const encode_state = encodeState(state);
    window.location.hash = encode_state;
}

function encodeState(state) {
    const padZero = 36 - state.length % 36;
    state = state.padEnd(state.length + padZero, '0');

    let result = [padZero.toString()];
    for (let i = 0;i < state.length;i += 36) {
        let chunk = state.slice(i, i+36);
        let byte = parseInt(chunk, 2).toString(36);
        result.push(byte);
    }
    let output = result.join(',');

    output = btoa(output);
    return output;
}

function decodeState(hash) {
    const decoded_state = atob(hash);
    const stateArray = decoded_state.split(',');
    const padZero = parseInt(stateArray[0], 10);

    let result = '';

    for (let i = 1; i < stateArray.length; i++) {
        const binary = parseInt(stateArray[i], 36).toString(2);
        const paddedBinary = binary.padStart(36, '0');
        result += paddedBinary;
    }
    result = result.slice(0, result.length - padZero);

    return result;
}

function updateButtonVisibility(roles, buttonContainer) {
    roles.forEach(role => {
        const button = buttonContainer.querySelector(`[data-role-id="${role.Id}"]`);
        if (button) {
            if ((filters.Main && role.SquadType === 'Main') || 
                (filters.Support && role.SquadType === 'Support') || 
                (!filters.Main && !filters.Support)) {
                button.style.display = '';
            } else {
                button.style.display = 'none';
            }
        }
    });
}