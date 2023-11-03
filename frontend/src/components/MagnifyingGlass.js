import React, { useEffect } from "react";

const SCALE = 1.3; // Magnification
const SIZE = 150; // Diameter
const LENS_OFFSET_X = SIZE / 10.2;
const LENS_OFFSET_Y = SIZE / 10.2;

document.documentElement.style.setProperty("--scale", SCALE);
document.documentElement.style.setProperty("--size", SIZE + "px");

const MagnifyingGlass = () => {
  const addMagnifyingGlass = () => {
    const bodyClone = document.body.cloneNode(true);
    bodyClone.classList.add("body-clone");
    bodyClone.style.top = "0px";
    bodyClone.style.left = "0px";

    const handle = document.createElement("div");
    handle.classList.add("handle");

    const magnifyingGlass = document.createElement("div");
    magnifyingGlass.classList.add("magnifying-glass");
    magnifyingGlass.style.top = LENS_OFFSET_Y + "px";
    magnifyingGlass.style.left = LENS_OFFSET_X + "px";

    handle.append(magnifyingGlass);

    magnifyingGlass.append(bodyClone);
    document.body.append(handle);

    const moveMagnifyingGlass = (event) => {
      let pointerX = event.pageX;
      let pointerY = event.pageY;

      // Move the magnifying glass with the cursor
      handle.style.left = pointerX - SIZE / 1.7 + "px";
      handle.style.top = pointerY - SIZE / 1.7 + "px";

      if (magnifyingGlass.children[0]) {
        // Align the magnified document
        let offsetX = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerX * SCALE;
        let offsetY = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerY * SCALE;
        magnifyingGlass.children[0].style.left = offsetX + "px";
        magnifyingGlass.children[0].style.top = offsetY + "px";
      }
    };

    document.addEventListener("pointermove", moveMagnifyingGlass);

    const removeMagnifyingGlass = () => {
      if (magnifyingGlass) {
        magnifyingGlass.children[0].remove();
        handle.remove();
      }
    };

    magnifyingGlass.addEventListener("dblclick", removeMagnifyingGlass);
  };

  useEffect(() => {
    const magnifyButton = document.getElementById("magnify");

    if (magnifyButton) {
      magnifyButton.addEventListener("click", addMagnifyingGlass);
    }

    return () => {
      if (magnifyButton) {
        magnifyButton.removeEventListener("click", addMagnifyingGlass);
      }
    };
  }, []);

  return null;
};

export default MagnifyingGlass;
