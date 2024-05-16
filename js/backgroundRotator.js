// // 定义背景图像列表
// const backgrounds = [
//     "/images/background/BG_MainOffice_Night2.jpg",
//     "/images/background/BG_MainOffice_Table.png",
//     "/images/background/BG_MainOffice_Table2.png",
//     "/images/background/BG_MainOffice_Table3.png",
//     "/images/background/BG_MainOffice_Night.jpg"
// ];

// const body = document.querySelector('body');

// let currentIndex = 0;
// const interval = 7; // unit: second

// const preloadImage = (src) => {
//     const img = new Image();
//     img.src = src;
// };

// const switchBackground = () => {
//     const newBackground = backgrounds[currentIndex];
//     body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${newBackground}")`;
//     currentIndex = (currentIndex + 1) % backgrounds.length;
//     preloadImage(backgrounds[currentIndex]);
// };

// // preload first image
// preloadImage(backgrounds[currentIndex]);

// setInterval(() => {
//     switchBackground();
// }, interval * 1000);


const backgrounds = [
    "/images/background/BG_MainOffice_Night2.jpg",
    "/images/background/BG_MainOffice_Table.png",
    "/images/background/BG_MainOffice_Table2.png",
    "/images/background/BG_MainOffice_Table3.png",
    "/images/background/BG_MainOffice_Night.jpg"
];

const body = document.querySelector('body');
const overlay = document.querySelector('.background-overlay');

let currentIndex = 0;
const interval = 10; // unit: second

const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
};

const switchBackground = () => {
    overlay.style.opacity = 0;

    setTimeout(() => {
        const newBackground = backgrounds[currentIndex];
        overlay.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${newBackground}")`;
        overlay.style.opacity = 1;
    }, 1000); // Duration of fade out transition (1 second)

    setTimeout(() => {
        const newBackground = backgrounds[currentIndex];
        body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${newBackground}")`;
        overlay.style.opacity = 0;
        currentIndex = (currentIndex + 1) % backgrounds.length;
        preloadImage(backgrounds[currentIndex]);
    }, 2000)

};

// preload first image
preloadImage(backgrounds[currentIndex]);

setInterval(() => {
    switchBackground();
}, interval * 1000);
