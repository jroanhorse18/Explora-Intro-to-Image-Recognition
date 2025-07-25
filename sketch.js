let classifier;
let prediction = "Drop an image to classify";
let img;
let modelURL="https://teachablemachine.withgoogle.com/models/NhkA5RCVY/model.json";
// Load the model
function preload() {
  classifier = ml5.imageClassifier(modelURL, modelLoaded);
}

function modelLoaded() {
  console.log("Model loaded");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  canvas.drop(handleFile);
  background(220);
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(0);
  text(prediction, width / 2, height / 2);
  textLeading(20);
}

function handleFile(file) {
  if (file.type === "image") {
    loadImage(file.data, (loadedImage) => {
      img = loadedImage;
      //image(img, 0, 0, width, height);
      classifyImage(img);
    });
  } else {
    prediction = "Please drop an image file.";
  }
}

function classifyImage(image) {
  classifier.classify(image, (results) => {
    if (results && results.length >= 3 ) {
      console.log("Results:", results);
      prediction = results[0].label + " (" + nf(results[0].confidence * 100, 2, 1) + "%)";
    } 
    else {
      console.warn("No results returned:", results);
      prediction = "No results returned";
    }
  });
}


function draw() {
  background(220);

  if (img) {
    image(img, 0, 0, width, height);
  }

  fill(0);
  noStroke();
  rect(0, height - 60, width, 60);

  fill(220);
  textAlign(CENTER, CENTER);
  text(prediction, width / 2, height - 30);
}




