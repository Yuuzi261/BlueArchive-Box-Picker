const backgrounds = [
    "/images/background/BG_MainOffice_Night2.jpg",
    "/images/background/BG_MainOffice_Table.png",
    "/images/background/BG_MainOffice_Table2.png",
    "/images/background/BG_MainOffice_Table3.png",
    "/images/background/BG_MainOffice_Night.jpg"
];

const overlay_p = document.querySelector('#bo-p');
const overlay_a = document.querySelector('#bo-a');

let currentIndex = 0;
const interval = 30; // unit: second

const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
};

const switchBackground = () => {
    overlay_a.style.opacity = 0;

    setTimeout(() => {
        const newBackground = backgrounds[currentIndex];
        overlay_a.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${newBackground}")`;
        overlay_a.style.opacity = 1;
    }, 1000); // Duration of fade out transition (1 second)

    setTimeout(() => {
        const newBackground = backgrounds[currentIndex];
        overlay_p.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${newBackground}")`;
        overlay_a.style.opacity = 0;
        currentIndex = (currentIndex + 1) % backgrounds.length;
        preloadImage(backgrounds[currentIndex]);
    }, 2000)

};

// preload first image
preloadImage(backgrounds[currentIndex]);

setInterval(() => {
    switchBackground();
}, interval * 1000);
