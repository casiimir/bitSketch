import { pencilTool, rubberTool, clearTool, showGridTool, fillTool, screenshootTool } from "./tools.js";

function setCanvas (dimSquare) {
  const numOfSquares = ((dimGrid/dimSquare)**2);
  for (let x = 1; x <= numOfSquares; x++) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('square');
    mainContainer.appendChild(newDiv);
  }
}

function setSquares (dimSquare) {
  const squaresInDOM = document.querySelectorAll('.square');
  squaresInDOM.forEach(square => {
    square.classList.add('square-grid');
    square.style.width = `${dimSquare}px`;
    square.style.height = `${dimSquare}px`;
  })
}

function init () {
  clearTool();
  setCanvas(dimSquare);
  setSquares(dimSquare);
  pencilTool();
}

let dimGrid = 256, dimSquare = 32;
const mainContainer = document.querySelector('.canvas');

const buttonPencil = document.querySelector('.btn-pencil');
buttonPencil.addEventListener('click', () => pencilTool());

const buttonRubber = document.querySelector('.btn-rubber');
buttonRubber.addEventListener('click', () => rubberTool());

const buttonGrid = document.querySelector('.btn-grid');
buttonGrid.addEventListener('click', () => showGridTool());

const buttonFill = document.querySelector('.btn-fill');
buttonFill.addEventListener('click', () => fillTool());

const buttonClear = document.querySelector('.btn-clear');
buttonClear.addEventListener('click', () => {
  const confirmCleanPage = confirm("Are you sure? You'll lose your drawing...");
  if (confirmCleanPage) clearTool();
});

const buttonTakeScreen = document.querySelector('.btn-take-screen');
buttonTakeScreen.addEventListener('click', () => screenshootTool());

// Choiche a grid from the right panel and init the sketchpad
const buttonSelectGrid = document.querySelectorAll('.btn-select-grid');
buttonSelectGrid.forEach(button => {
  button.addEventListener('click', (e) => {
    const eventButtonName = e.target.name;
    const confirmResetGrid = confirm("Are you sure? You'll lose your drawing...");
    
    if (confirmResetGrid) {
      // It needs for removing the present divs (it resets the number or squares):
      const divsInDOM = document.querySelectorAll('.square');
      divsInDOM.forEach(div => div.remove());
      dimSquare = (dimGrid/eventButtonName);
      init();
    }
  })
});

init();