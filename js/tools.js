// changeColorOnClickForEachSingle gets an elementInDOM and set the properly color
// var foreach elementInDOM (it accepts querySelectorAll) and add eventListener 
function changeColorOnClickForEachSingle(elementInDOM, color, needEventListener) {
  const elements = document.querySelectorAll(elementInDOM);
  if (needEventListener) {
    elements.forEach(el => {
      el.addEventListener('click', () => {
        el.style.backgroundColor = color;
      })
    });
  } else {
    elements.forEach(el => el.style.backgroundColor = color);
  }
}
// Set and Active the right button in the toolbar and enables his funcs.
function setButtonFocus(buttonInDOM, isActive) {
  const buttonElementClass = document.querySelector(buttonInDOM);
  (isActive) ? 
      buttonElementClass.style.backgroundColor = '#ff9a76' :
      buttonElementClass.style.backgroundColor = 'transparent';
}
function putFocusButtonIn (buttonInDOM) {
  let isActive = true;
  switch(buttonInDOM) {
    case '.btn-pencil':
      setButtonFocus('.btn-pencil', isActive);
      setButtonFocus('.btn-rubber', !isActive);
      break;
    case '.btn-rubber':    
      setButtonFocus('.btn-rubber', isActive);
      setButtonFocus('.btn-pencil', !isActive);
      break;
  }
}

// Desktop only func. that enables the 'drag-and-draw' holding down mouse r-click
function clickAndDrag (color) {
  if (!isMobile) {
    let isMouseDown = false;
    const divs = document.querySelectorAll('.square');
    divs.forEach(div => {
      div.addEventListener('mousedown', () => {
        isMouseDown = true;
        div.style.backgroundColor = color;
      })   
      div.addEventListener('mouseup', () => isMouseDown = false);
      div.addEventListener('mouseover', () => {
        if (isMouseDown) {
          div.style.backgroundColor = color;
        }
      })   
    })
    isMouseDown = false;
  }
}

function putSelectedPaletteColorIntoGeneralColor (color) {
  elementDOM.paletteBtn.forEach(element => {

    element.addEventListener('click', () => {
      const elementColor = element.getAttribute('color')

      elementDOM.colorPicker.style.backgroundColor = elementColor;
      color = elementColor;
      changeColorOnClickForEachSingle('.square', color, true);
      putFocusButtonIn('.btn-pencil');
      clickAndDrag(color);
    })
  })
}

// Tools list
function pencilTool () {
  let color = elementDOM.colorPicker.style.backgroundColor;
  // Set the first color as white
  if(!color) color = '#aaf0d1';
  putSelectedPaletteColorIntoGeneralColor(color);
  changeColorOnClickForEachSingle('.square', color, true);

  elementDOM.colorPicker.addEventListener('input', (e) => {
    elementDOM.colorPicker.style.backgroundColor = color;
    color = e.target.value;
    changeColorOnClickForEachSingle('.square', color, true);
    putFocusButtonIn('.btn-pencil');
    clickAndDrag(color);
  });

  putFocusButtonIn('.btn-pencil');
  clickAndDrag(color);
}

function rubberTool () {
  clickAndDrag('transparent');
  changeColorOnClickForEachSingle('.square', 'transparent', true);
  putFocusButtonIn('.btn-rubber');
}

function clearTool() {
  changeColorOnClickForEachSingle('.square', 'transparent', false);
}

function showGridTool() {  
  const divs = document.querySelectorAll('.square'); 
  divs.forEach(div => div.classList.toggle('square-grid'));
}

function fillTool () {  
  let color = elementDOM.colorPicker.style.backgroundColor;
  if(!color) color = 'white';
  elementDOM.colorPicker.addEventListener('change', (e) => color = e.target.value);
  changeColorOnClickForEachSingle('.square', color, false);
}

// Html2Canvas lib.
function screenshootTool () {
  let fileName = prompt("File name: ");
  
  if (!fileName) {
    fileName = 'my_bitSketch'
  }

  html2canvas(elementDOM.canvas)
  .then(canvas => {
    link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  });
}

const isMobile = /Iphone|iPad|iPod|Android|BlackBerry|IEMobile/i.test(window.navigator.userAgent);
const elementDOM = {
  paletteBtn: document.querySelectorAll('.palette-item'),
  colorPicker: document.querySelector('.color-label'),
  canvas: document.querySelector('.canvas'),
}

export { pencilTool, rubberTool, clearTool, showGridTool, fillTool, screenshootTool };