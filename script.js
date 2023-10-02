var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var drawing = false; // Indicates whether drawing is in progress
var penMode = true;

// Set initial canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementsByTagName("footer").width = window.innerWidth;

// Set the initial stroke color to black (pen)
ctx.strokeStyle = "black";
ctx.lineWidth = 2;

// Event listeners for mouse events:
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Event listners for touch events:
canvas.addEventListener("touchstart", startDrawingTouch);
canvas.addEventListener("touchmove", drawTouch);
canvas.addEventListener("touchend", stopDrawingTouch);

// Button click event listeners
// Pen Event
document.getElementById("penButton").addEventListener("click", function () {
    penMode = true;
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    canvas.style.cursor = "auto"; // Set pen cursor
});

// Pen color change Event:
document.getElementById("colorPicker").addEventListener("change", function () {
    penMode = true;
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    document.getElementById("penButton").style.color = document.getElementById(
        "colorPicker"
    ).value;
    canvas.style.cursor = "auto"; // Set pen cursor
});

// Background color change Event:
document.getElementById("bg-picker").addEventListener("change", function () {
    document.getElementById(
        "myCanvas"
    ).style.background = document.getElementById("bg-picker").value;
    document.getElementById("BG").style.color = document.getElementById(
        "bg-picker"
    ).value;
});

// Eraser Event:
document.getElementById("eraserButton").addEventListener("click", function () {
    penMode = false;
    ctx.strokeStyle = document.getElementById("bg-picker").value; // Set color to white for eraser
    canvas.classList.add("eraser-mode");
});

// Pointer size changable Event:
document.getElementById("pointer-size").addEventListener("change", function () {
    ctx.lineWidth = document.getElementById("pointer-size").value;
    canvas.style.cursor = "auto"; // Set pen cursor
});

// Functions for Desktop:
function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(
        e.clientX - canvas.getBoundingClientRect().left,
        e.clientY - canvas.getBoundingClientRect().top
    );
}

function draw(e) {
    if (!drawing) return;
    ctx.lineTo(
        e.clientX - canvas.getBoundingClientRect().left,
        e.clientY - canvas.getBoundingClientRect().top
    );
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Functions for Mobile:
function startDrawingTouch(e) {
    e.preventDefault();
    drawing = true;
    var touch = e.touches[0];
    ctx.beginPath();
    ctx.moveTo(
        touch.clientX - canvas.getBoundingClientRect().left,
        touch.clientY - canvas.getBoundingClientRect().top
    );
}

function drawTouch(e) {
    if (!drawing) return;
    var touch = e.touches[0];
    ctx.lineTo(
        touch.clientX - canvas.getBoundingClientRect().left,
        touch.clientY - canvas.getBoundingClientRect().top
    );
    ctx.stroke();
}

function stopDrawingTouch() {
    drawing = false;
    ctx.closePath();
}

// Clear the canvas:
document.getElementById("clearCanvas").addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.cursor = "auto"; // Set pen cursor
    ctx.strokeStyle = document.getElementById("colorPicker").value;
});
