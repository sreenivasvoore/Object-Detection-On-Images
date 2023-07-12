img = "";
cocoStatus = "";
objects = [];
function preload() {
    img = loadImage('Bedroom.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 380, 380);
    if (cocoStatus != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected" + objects.length;
            text(objects[i].label + objects[i].confidence, objects[i].x, objects[i].y);
            fill('#ff0000');
            stroke("red");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded Successfully!");
    objectDetector.detect(img, gotResult);
    cocoStatus = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}