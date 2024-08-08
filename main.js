const filtersMap = {
    'filter-main': 'SquadType.Main',
    'filter-support': 'SquadType.Support',
    'filter-tanker': 'TacticRole.Tanker',
    'filter-damage-dealer': 'TacticRole.DamageDealer',
    'filter-healer': 'TacticRole.Healer',
    'filter-supporter': 'TacticRole.Supporter',
    'filter-vehicle': 'TacticRole.Vehicle',
    'filter-star-grade-3': 'StarGrade.2',
    'filter-star-grade-2': 'StarGrade.1',
    'filter-star-grade-1': 'StarGrade.0',
    'filter-is-limited-1': 'IsLimited.1',
    'filter-is-limited-2': 'IsLimited.2',
    'filter-is-limited-0': 'IsLimited.0',
    'filter-explosion': 'BulletType.Explosion',
    'filter-pierce': 'BulletType.Pierce',
    'filter-mystic': 'BulletType.Mystic',
    'filter-sonic': 'BulletType.Sonic',
    'filter-light-armor': 'ArmorType.LightArmor',
    'filter-heavy-armor': 'ArmorType.HeavyArmor',
    'filter-unarmored': 'ArmorType.Unarmed',
    'filter-elastic-armor': 'ArmorType.ElasticArmor',
    'filter-front': 'Position.Front',
    'filter-middle': 'Position.Middle',
    'filter-back': 'Position.Back',
    'filter-abydos': 'School.Abydos',
    'filter-arius': 'School.Arius',
    'filter-gehenna': 'School.Gehenna',
    'filter-hyakkiyako': 'School.Hyakkiyako',
    'filter-millennium': 'School.Millennium',
    'filter-red-winter': 'School.RedWinter',
    'filter-shanhaijing': 'School.Shanhaijing',
    'filter-srt': 'School.SRT',
    'filter-trinity': 'School.Trinity',
    'filter-valkyrie': 'School.Valkyrie',
    'filter-etc': 'School.ETC',
    'filter-tokiwadai': 'School.Tokiwadai',
    'filter-sakugawa': 'School.Sakugawa',
    'filter-sg': 'WeaponType.SG',
    'filter-smg': 'WeaponType.SMG',
    'filter-ar': 'WeaponType.AR',
    'filter-gl': 'WeaponType.GL',
    'filter-hg': 'WeaponType.HG',
    'filter-rl': 'WeaponType.RL',
    'filter-sr': 'WeaponType.SR',
    'filter-rg': 'WeaponType.RG',
    'filter-mg': 'WeaponType.MG',
    'filter-mt': 'WeaponType.MT',
    'filter-ft': 'WeaponType.FT',
};
const AFF = {ALL: 0, AFFILIATED: 1, UNAFFILIATED: 2} 

let roles = [];
let state_maps = [];
let filters = { 
    SquadType: { Main: false, Support: false },
    TacticRole: { Tanker: false, DamageDealer: false, Healer: false, Supporter: false, Vehicle: false },
    StarGrade: [ false, false, false ],
    IsLimited: [ false, false, false ],
    BulletType: { Explosion: false, Pierce: false, Mystic: false, Sonic: false },
    ArmorType: { LightArmor: false, HeavyArmor: false, Unarmed: false, ElasticArmor: false },
    Position: { Front: false, Middle: false, Back: false },
    School: { Abydos: false, Arius: false, Gehenna: false, Hyakkiyako: false, Millennium: false, RedWinter: false, Shanhaijing: false, SRT: false, Trinity: false, Valkyrie: false, ETC: false, Tokiwadai: false, Sakugawa: false },
    WeaponType: { SG: false, SMG: false, AR: false, GL: false, HG: false, RL: false, SR: false, RG: false, MG: false, MT: false, FT: false }
};
let is_affiliated = AFF.ALL;

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
            calculatePossessionRate();
        }
    });

    Object.keys(filtersMap).forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            const keys = filtersMap[id].split('.');
            filters[keys[0]][keys[1]] = !filters[keys[0]][keys[1]];
            this.classList.toggle('btn-primary', filters[keys[0]][keys[1]]);
            this.classList.toggle('btn-secondary', !filters[keys[0]][keys[1]]);
            updateButtonVisibility(roles, buttonContainer);
            calculatePossessionRate();
        });
    });

    document.getElementById('select-all').addEventListener('click', function() {
        const buttons = document.querySelectorAll('.button');
    
        buttons.forEach(button => {
            selectAll(button, true);
        });
    
        updateURL(roles, state_maps);
        calculatePossessionRate();
    });

    document.getElementById('deselect-all').addEventListener('click', function() {
        const buttons = document.querySelectorAll('.button');
    
        buttons.forEach(button => {
            selectAll(button, false);
        });
    
        updateURL(roles, state_maps);
        calculatePossessionRate();
    });    

    document.getElementById('filter-clear').addEventListener('click', function() {
        resetFilters(filters);
        filter_btns = document.querySelectorAll('.filter');
        
        filter_btns.forEach(button => {
            if (button.classList.contains('btn-primary')) {
                button.classList.remove('btn-primary');
                button.classList.add('btn-secondary');
            }
        });

        updateButtonVisibility(roles, buttonContainer);
        calculatePossessionRate();
    });  

    document.getElementById('filter-affiliated').addEventListener('click', function() {
        this.classList.toggle('btn-primary');
        this.classList.toggle('btn-secondary');
        document.getElementById('filter-unaffiliated').classList.remove('btn-primary');
        document.getElementById('filter-unaffiliated').classList.add('btn-secondary');
        updateAffiliation();
        updateButtonVisibility(roles, buttonContainer);
        calculatePossessionRate();
    });
    
    document.getElementById('filter-unaffiliated').addEventListener('click', function() {
        this.classList.toggle('btn-primary');
        this.classList.toggle('btn-secondary');
        document.getElementById('filter-affiliated').classList.remove('btn-primary');
        document.getElementById('filter-affiliated').classList.add('btn-secondary');
        updateAffiliation();
        updateButtonVisibility(roles, buttonContainer);
        calculatePossessionRate();
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
            const isVisible = Object.keys(filters).every(category => {
                const filter = filters[category];
                if (Array.isArray(filter)) {
                    const allFalse = filter.every(selected => !selected);
                    if (category === 'StarGrade') return allFalse || filter.some((selected, index) => selected && role[category] === index + 1);
                    else return allFalse || filter.some((selected, index) => selected && role[category] === index);
                } else {
                    const allFalse = Object.values(filter).every(selected => !selected);
                    return allFalse || Object.keys(filter).some(key => filter[key] && role[category] === key);
                }
            }) && (is_affiliated === AFF.ALL || is_affiliated === (button.classList.contains('active') ? AFF.AFFILIATED : AFF.UNAFFILIATED));
            button.style.display = isVisible ? '' : 'none';
        }
    });
}

function calculatePossessionRate() {
    const buttons = document.querySelectorAll('.button');
    let possession = 0, total = 0;

    document.getElementById('possession-rate').innerText = (() => {
        if (is_affiliated !== AFF.ALL) return '－.－%';
        else {
            buttons.forEach(button => {
                if (button.style.display != 'none') {
                    total++;
                    if (button.classList.contains('active')) possession++;
                }
            });
            return (possession / total * 100).toFixed(2) + '%';
        }
    })();
    
}

function selectAll(button, bool) {
    if (button.style.display !== 'none') {
        const roleId = parseInt(button.dataset.roleId);
        const role = roles.find(role => role.Id === roleId);
        if (!role) {
            console.error('Invalid role ID:', roleId);
            return;
        }

        role.active = bool;
        button.classList.toggle('active', bool);
    }
}

function resetFilters(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            resetFilters(obj[key]);
        } else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map(value => value === true ? false : value);
        } else if (obj[key] === true) {
            obj[key] = false;
        }
    }
}

function updateAffiliation() {
    if (document.getElementById('filter-affiliated').classList.contains('btn-primary')) is_affiliated = AFF.AFFILIATED;
    else if (document.getElementById('filter-unaffiliated').classList.contains('btn-primary')) is_affiliated = AFF.UNAFFILIATED;
    else is_affiliated = AFF.ALL;
}

