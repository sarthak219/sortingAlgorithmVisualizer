
// global constants and variables
const MAX_BAR_HEIGHT = 500;
const RED = "red";
const GREEN = "green";
const YELLOW = "yellow";
var deviceWidth = $(".barsContainer").width();  // since the width fo the bars container is always 100%;
var numBars = 100;
var barWidth = (deviceWidth / numBars);
var arr = [];


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
// changes colour of the bars at position a, b and c to col1, col2 and col3 respectively
async function renderColouredBars(a, b, c, col1, col2, col3) {
    let str = "";
    for (var i = 0; i < numBars; ++i) {
        let barHeight = arr[i];
        if (i === a) {
            str += `<div class="bar ${col1}Bar" style="width:${barWidth}px; height: ${barHeight}px "> </div>`;
        } else if (i === b) {
            str += `<div class="bar ${col2}Bar" style="width:${barWidth}px; height: ${barHeight}px "> </div>`;
        } else if (i === c) {
            str += `<div class="bar ${col3}Bar" style="width:${barWidth}px; height: ${barHeight}px "> </div>`;
        } else {
            str += `<div class="bar" style="width:${barWidth}px; height: ${barHeight}px "> </div>`;
        }
    }
    $(".barsContainer").html(str);
}


// renders the bars on the screen with height corresponding to values in arr, 
// changes colour of the bars at position a and b to red
async function render2RedBars(a, b) {
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

/////////////////////////////////// Event Listeners  ///////////////////////////////////

// click listener to generate random array
$("#numGenerator").on("click", displayRandomBars);
$("#sortBtn").on("click", () => {
    const option = $("#sortType").val();
    switch (option) {
        case "bubble":
            bubbleSort();
            break;
        case "insertion":
            insertionSort();
            break;
        case "selection":
            selectionSort();
            break;
        default: alert("Please select a sorting option");
    }
});

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


// renders all the bars in red colour then changes them back to white after 600ms
async function animateBars() {
    let str = "";
    for (var i = 0; i < numBars; ++i) {
        let barHeight = arr[i];
        str += `<div class="bar redBar" style="width:${barWidth}px; height: ${barHeight}px "></div>`;
        $(".barsContainer").html(str);
        await timer(0);
    }
    await timer(600);
    renderBars();
}


// To colour each bar red one by one

// async function animateBars() {
//     for (var i = 0; i < numBars; ++i) {
//         let str = "";
//         for (let j = 0; j <= i; ++j) {
//             let barHeight = arr[j];
//             str += `<div class="bar redBar" style="width:${barWidth}px; height: ${barHeight}px "></div>`;
//             $(".barsContainer").html(str);
//         }
//         for (let k = i + 1; k < numBars; ++k) {
//             let barHeight = arr[k];
//             str += `<div class="bar" style="width:${barWidth}px; height: ${barHeight}px "></div>`;
//             $(".barsContainer").html(str);
//         }
//         await timer(0);
//     }
//     await timer(600);
//     renderBars();
// }


///////////////////////////// Sorting Algorithms ////////////////////////////

// sorts arr in descending order using bubble sort
async function bubbleSort() {
    let t = 0;
    for (var i = 0; i < numBars; ++i) {
        for (var j = 0; j < numBars - 1; ++j) {
            if (arr[j] < arr[j + 1]) {
                await timer(0);
                render2RedBars(j, j + 1);
                t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
                await timer(0);
                render2RedBars(j, j + 1);
            }
        }
    }
    animateBars();
}


// sorts arr in descending order using insertion sort
async function insertionSort() {
    for (let i = 1; i < numBars; ++i) {
        let x = arr[i];
        let j = i;
        while (x > arr[j - 1] && (j > 0)) {
            arr[j] = arr[j - 1];
            arr[j - 1] = x;
            j--;
            await timer(0);
            renderColouredBars(i, i, j, YELLOW, YELLOW, RED);
        }
        arr[j] = x;
    }
    animateBars();
}

// sorts arr in descending order using selection sort
async function selectionSort() {
    for (let i = 0; i < numBars - 1; ++i) {
        let x = i;
        let j = i;
        for (j = i + 1; j < numBars; ++j) {
            if (arr[j] > arr[x]) {
                x = j;
            }
            await timer(0);
            renderColouredBars(i, x, j, YELLOW, GREEN, RED);
        }
        let t = arr[x];
        arr[x] = arr[i];
        arr[i] = t;
    }
    animateBars();
}

// adds delay of given milliseconds
function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}