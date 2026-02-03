const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240;
const images = [];
let loadedImages = 0;
let currentFrame = 0;

// Resize handling
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  const frameNumber = String(i).padStart(3, "0");
  img.src = `images/ezgif-frame-${frameNumber}.jpg`;
  img.onload = () => {
    loadedImages++;
    if (loadedImages === frameCount) {
      render();
    }
  };
  images.push(img);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = images[currentFrame];
  if (!img) return;

  // Keep image centered & scaled
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = canvas.width / 2 - (img.width * scale) / 2;
  const y = canvas.height / 2 - (img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// Scroll-based animation
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  currentFrame = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(render);
});
