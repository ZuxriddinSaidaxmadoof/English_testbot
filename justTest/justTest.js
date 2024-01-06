const { createCanvas, loadImage } = require("canvas");
const path = require("path");
const fs = require("fs");


async function getImage(){

  try {
    const text = "salom" || "RealCoderUz";

    // console.log(pathURL);

    // Create a canvas
    const canvas = createCanvas(640, 640);
    const ctx = canvas.getContext("2d");

    // Load an image (you can replace the URL with your image URL)
    const image =  await loadImage(
      path.join(__dirname, "./png1.png")
    ).then();

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Set font properties
    ctx.font = "50px";
    ctx.fillStyle = "white";

    // Draw the text on the canvas using the provided text parameter

    const olchamX = 280;

    if (text.length >= 12) {
      ctx.fillText(text, olchamX - 95, 400);
      console.log("0iffda");
    }
    if (text.length === 10 || text.length === 11) {
      ctx.fillText(text, olchamX - 75, 400);
      console.log("iffda");
    }

    if (text.length === 9) {
      ctx.fillText(text, olchamX - 50, 400);
      console.log("iffffffda");
    }
    if (text.length === 6 || text.length === 7 || text.length === 8) {
      ctx.fillText(text, olchamX - 40, 400);
      console.log("2 iffda");
    }

    if (text.length === 3 || text.length === 4 || text.length === 5) {
      ctx.fillText(text, olchamX, 400);
      console.log("3 iffda");
    }

    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL();

    // Convert data URL to a buffer
    const buffer = Buffer.from(
      dataUrl.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    // Save the buffer as an image file
    fs.writeFileSync(
      path.join(__dirname, "./ppp.png"),
      buffer,
      (err) => {
        if (err) {
          console.error("Error writing image file:", err);
          return("Internal Server Error");
        }
        console.log("File has been written");
      }
    );
    const resultImage = path.join(__dirname, "./ppp.png");

    console.log(resultImage);
  } catch (error) {
    console.error(error);
    return("Internal Server Error");
  }
}
getImage()
