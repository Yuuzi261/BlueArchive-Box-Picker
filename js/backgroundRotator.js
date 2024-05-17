const backgrounds = [
    "/images/background/BG_MainOffice_Night2.jpg",
    "/images/background/BG_MainOffice_Table.png",
    "/images/background/BG_MainOffice_Table2.png",
    "/images/background/BG_MainOffice_Table3.png",
    "/images/background/BG_MainOffice_Night.jpg"
];

const body = document.querySelector('.bg_img');

let currentIndex = 0;
const interval = 7; // unit: second
const transitionDuration = 1; // unit: second

const preloadImage = (src) =>{
    const img = new Image();
    img.src = src;
};

const switchBackground = () => {
    body.classList.add('fade-out');
    
    setTimeout(() => {
        const newBackground = backgrounds[currentIndex];
        body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${newBackground}")`;
        currentIndex = (currentIndex + 1) % backgrounds.length;
        preloadImage(backgrounds[currentIndex]);

        body.classList.remove('fade-out');
        body.classList.add('fade-in');

        setTimeout(() => {
            body.classList.remove('fade-in');
            setTimeout(switchBackground, (interval - transitionDuration) * 1000);
        }, transitionDuration * 1000); // same as opacity transition time in css
    }, transitionDuration * 1000); // switch background after fade-out
};

// preload first image
preloadImage(backgrounds[currentIndex]);

setTimeout(switchBackground, interval * 1000);