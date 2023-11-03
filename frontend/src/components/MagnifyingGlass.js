const SCALE = 1.3; //magnification
const SIZE = 150; // diameter
const LENSE_OFFSET_X = SIZE / 10.2;
const LENSE_OFFSET_Y = SIZE / 10.2;

document.documentElement.style.setProperty("--scale", SCALE);
document.documentElement.style.setProperty("--size", SIZE + "px");

//create magnifying glass (lense)
const handle = document.createElement("div");
handle.classList.add("handle");

const magnifyingGlass = document.createElement("div");
magnifyingGlass.classList.add("magnifying-glass");
magnifyingGlass.style.top = LENSE_OFFSET_Y + "px";
magnifyingGlass.style.left = LENSE_OFFSET_X + "px";

handle.append(magnifyingGlass);

const magnifyButton = document.getElementById("magnify");

const addMagnifyingGlass = () => {
  const bodyClone = document.body.cloneNode(true);
  bodyClone.classList.add("body-clone");
  bodyClone.style.top = "0px";
  bodyClone.style.left = "0px";
  magnifyingGlass.append(bodyClone);
  document.body.append(handle);
};

// magnifyButton.addEventListener("click", addMagnifyingGlass);

const moveMagnifyingGlass = (event) => {
  let pointerX = event.pageX;
  let pointerY = event.pageY;
  //move magnifying glass with cursor
  handle.style.left = pointerX - SIZE / 1.7 + "px";
  handle.style.top = pointerY - SIZE / 1.7 + "px";
  if (magnifyingGlass.children[0]) {
    //align magnified document
    let offsetX = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerX * SCALE;
    let offsetY = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerY * SCALE;
    magnifyingGlass.children[0].style.left = offsetX + "px";
    magnifyingGlass.children[0].style.top = offsetY + "px";
  }
};

document.addEventListener("pointermove", moveMagnifyingGlass);

const removeMagnifiyingGlass = (event) => {
  magnifyingGlass.children[0].remove();
  handle.remove();
};

magnifyingGlass.addEventListener("dblclick", removeMagnifiyingGlass);

export default magnifyingGlass;