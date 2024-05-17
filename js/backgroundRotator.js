const backgrounds = [
    "/images/background/BG_MainOffice_Night.jpg",
    "/images/background/BG_MainOffice_Night2.jpg",
    "/images/background/BG_MainOffice_Table.png",
    "/images/background/BG_MainOffice_Table2.png",
    "/images/background/BG_MainOffice_Table3.png"
];

const bgImg1 = document.querySelector('.bg_img_1');
const bgImg2 = document.querySelector('.bg_img_2');

let currentIndex = 1;
const interval = 60; // seconds
const transitionDuration = 3; // seconds

const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
};

const switchBackground = () => {
    const newBackground = backgrounds[currentIndex];
    const fadingInImg = (bgImg1.classList.contains('fade-in')) ? bgImg2 : bgImg1;
    const fadingOutImg = (bgImg1.classList.contains('fade-in')) ? bgImg1 : bgImg2;

    fadingInImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${newBackground}")`;

    fadingOutImg.classList.remove('fade-in');
    fadingOutImg.classList.add('fade-out');

    fadingInImg.classList.remove('fade-out');
    fadingInImg.classList.add('fade-in');

    currentIndex = (currentIndex + 1) % backgrounds.length;
    preloadImage(backgrounds[currentIndex]);

    setTimeout(switchBackground, interval * 1000);
};

// Set initial images
bgImg1.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${backgrounds[0]}")`;
bgImg2.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${backgrounds[1]}")`;

// Start the background switcher
setTimeout(switchBackground, interval * 1000);