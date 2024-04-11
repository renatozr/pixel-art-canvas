// ============== variables ==============
let selectedColor = "black";
const RANDOM_COLORS_QUANTITY = 4;
const DEFAULT_CANVAS_SIZE = 16;

// ============== utils ==============
function generateRandomRgb() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

// ============== events ==============
function selectColor(e) {
  selectedColor = window
    .getComputedStyle(e.target)
    .getPropertyValue("background-color");
}

function paintPixelMousemove(e) {
  // paint if the mouse is pressed while moving
  if (e.buttons === 1) {
    e.target.style.backgroundColor = selectedColor;
  }
}

function paintPixelClick(e) {
  e.target.style.backgroundColor = selectedColor;
}

function clearCanvas() {
  const pixels = document.getElementsByClassName("pixel");

  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];

    pixel.style.backgroundColor = "white";
  }
}

function selectEraser() {
  selectedColor = "white";
}

function changeRandomColors() {
  removeRandomColors();
  renderRandomColors();
}

function changeCanvasSize(e) {
  removeCanvas();
  renderCanvas(e.target.value);
}

// ============== renders ==============
function renderRandomColor() {
  const randomColor = document.createElement("div");
  randomColor.classList.add("color");
  randomColor.style.backgroundColor = generateRandomRgb();
  randomColor.addEventListener("click", selectColor);

  return randomColor;
}

function renderRandomColors() {
  const randomColors = document.getElementById("random-colors");

  for (let i = 0; i < RANDOM_COLORS_QUANTITY; i++) {
    const randomColor = renderRandomColor();

    randomColors.appendChild(randomColor);
  }
}

function removeRandomColors() {
  const randomColors = document.getElementById("random-colors");

  randomColors.innerHTML = "";
}

function renderPixel() {
  const pixel = document.createElement("div");
  pixel.draggable = false;
  pixel.classList.add("pixel");
  pixel.addEventListener("mousemove", paintPixelMousemove);
  pixel.addEventListener("click", paintPixelClick);

  return pixel;
}

function renderRow(length) {
  const row = document.createElement("div");
  row.draggable = false;
  row.classList.add("row");

  for (let i = 0; i < length; i++) {
    const pixel = renderPixel();

    row.appendChild(pixel);
  }

  return row;
}

function renderCanvas(size = DEFAULT_CANVAS_SIZE) {
  const canvas = document.getElementById("canvas");
  canvas.draggable = false;

  for (let i = 0; i < size; i++) {
    const row = renderRow(size);

    canvas.appendChild(row);
  }
}

function removeCanvas() {
  const canvas = document.getElementById("canvas");

  canvas.innerHTML = "";
}

// ============== add events ==============
function addClearIconEvent() {
  const clearIcon = document.getElementById("clear-icon");

  clearIcon.addEventListener("click", clearCanvas);
}

function addEraserIconEvent() {
  const eraserIcon = document.getElementById("eraser-icon");

  eraserIcon.addEventListener("click", selectEraser);
}

function addDefaultColorsEvent() {
  const defaultColors = document.getElementById("default-colors");
  const colors = defaultColors.children;

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];

    color.addEventListener("click", selectColor);
  }
}

function addReloadIconEvent() {
  const reloadIcon = document.getElementById("reload-icon");

  reloadIcon.addEventListener("click", changeRandomColors);
}

function addSizeSelectEvent() {
  const sizeSelect = document.getElementById("size-select");

  sizeSelect.addEventListener("change", changeCanvasSize);
}

// ============== start ==============
window.onload = () => {
  renderRandomColors();
  renderCanvas();
  addClearIconEvent();
  addEraserIconEvent();
  addDefaultColorsEvent();
  addReloadIconEvent();
  addSizeSelectEvent();
};
