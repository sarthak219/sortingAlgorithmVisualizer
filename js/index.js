
// global constants and variables
const MAX_BAR_HEIGHT = 500;
let deviceWidth = $(".barsContainer").width();
let numBars = 100;
let barWidth = (deviceWidth / numBars);
let arr = [];


displayRandomBars();


// fills random values in arr
function populateArray() {
    arr = [];
    for (var i = 0; i < numBars; ++i) {
        arr[i] = Math.floor(Math.random() * MAX_BAR_HEIGHT);
    }
}

// renders the bars on the screen with height corresponding to values in arr
async function renderBars() {
    let str = "";
    for (var i = 0; i < numBars; ++i) {
        let barHeight = arr[i];
        str += `<div class="bar" style="width:${barWidth}px; height: ${barHeight}px "> </div>`;
    }
    $(".barsContainer").html(str);
}

// renders the bars on the screen with height corresponding to values in arr, 
// makes the bars at position a and b red
async function renderBars(a, b) {
    let str = "";
    for (var i = 0; i < numBars; ++i) {
        let barHeight = arr[i];
        if (i === a || i === b) {
            str += `<div class="bar redBar" style="width:${barWidth}px; height: ${barHeight}px "> </div>`;
        } else {
            str += `<div class="bar" style="width:${barWidth}px; height: ${barHeight}px "> </div>`;
        }
    }
    $(".barsContainer").html(str);
}


// populates the array with fresh random values and then renders the bars with corresponding heights
function displayRandomBars() {
    populateArray();
    renderBars();
}


// Event Listeners

// click listener to generate random array
$("#numGenerator").on("click", displayRandomBars);
$("#sortBtn").on("click", bubbleSort);

// changes the number of bars according to the given input
$("#barCount").on("change", () => {
    numBars = $("#barCount").val();
    $("#numBarLabel").text(numBars);
    // $("#numBarLabel").html();
    barWidth = (deviceWidth / numBars);
    displayRandomBars();
});

// adjusts the bar widths when the screen is resized
$(window).resize(function () {
    deviceWidth = $(".barsContainer").width();
    barWidth = (deviceWidth / numBars);
    renderBars();
});

// sorts arr in descending order using bubble sort
async function bubbleSort() {
    let t = 0;
    for (var i = 0; i < numBars; ++i) {
        for (var j = 0; j < numBars - 1; ++j) {
            if (arr[j] < arr[j + 1]) {
                await timer(0);
                renderBars(j, j + 1);
                t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
                await timer(0);
                renderBars(j, j + 1);
            }
        }
    }
    animateBars();
}

// adds delay of given milliseconds
function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// renders all the bars in red colour then changes them back to white after 600ms
async function animateBars() {
    let str = "";
    for (var i = 0; i < numBars; ++i) {
        let barHeight = arr[i];
        str += `<div class="bar redBar" style="width:${barWidth}px; height: ${barHeight}px "></div>`;
        $(".barsContainer").html(str);
        await timer(10);
    }
    await timer(600);
    renderBars();
}