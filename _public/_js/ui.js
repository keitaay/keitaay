// Define relevant elements and variables
let transit = 500; // transition duration in milliseconds
const anchors = document.querySelectorAll('a:not(.noFX)');
const UIload = document.querySelector(".UIload");

// Show the loading screen if the page is not fully loaded yet so that
// .UIload is hidden until window.load. While the HTML header will
// display the loading screen, this function will ensure that it is
// visible until window.load so that it may be hidden.
//
// The mechanism to show/hide the loading screen is based on the
// tutorial presented by Tyler Potts at:
//     https://github.com/TylerPottsDev/js-page-transitions-basic
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        UIload.style.visibility = "visible";
        document.querySelector("main,footer").style.visibility = "hidden";
    }
};

// Transition-out and hide the loading screen once the page is fully loaded,
// and make it reappear wheen a link is clicked. This ensures a smooth
// transition effect when the user navigates between pages. However,
// it requires the browser to halt its default rendering in the meantime.
//
// Remember that the loading screen is initially shown while the main
// page content is hidden. That behavior is controlled in the page header.
window.onpageshow = function () {
    console.log('onpageshow triggered');
    // Hide the loading screen, and make the rest of the page visible.
    UIload.style.transitionDuration = transit.toString() + "ms";
    UIload.style.transform = "scaleX(0)";
    document.querySelector("main,footer").style.visibility = "visible";
    // When the loading screen finishes retreating, change the transform-origin
    // of .UIload so that a link click will cause the loading screen to expand
    // from the right side of the window. Since .UIload's transform-origin
    // is set to the left, the loading screen will appear as if it's sliding
    // across the viewport from the right to the left.
    UIload.ontransitionend = function () {
        UIload.style.visibility = "hidden";
        UIload.style.transformOrigin = "right";
    };
    // For every anchor, add a listener for click events. This causes any
    // relevant link and submit-button clicks to be followed by navAway.
    for (let i = 0; i < anchors.length; i++) {
        if (anchors[i].hostname !== window.location.hostname ||
            anchors[i].pathname === window.location.pathname) {
            // Ignore external links and in-page anchors
            continue;
        } else {
            // Otherwise, add listener for clicks
            anchors[i].addEventListener('click', navAway);
        };
    };
}

// (Un)freeze scrolling. This will be triggered whenever the navbar gets toggled
// as well as when the loading screen is re-activated.
function scrollFreeze() {
    var chkbox = document.querySelector("#showMenu"); // get checkbox to toggle navbar
    var cntnt_body = document.querySelector("body");
    if (chkbox.checked) {
        cntnt_body.style.overflow = "hidden";
    } else {
        cntnt_body.style.overflow = "visible";
    }
};

// Re-activate the loading screen after it has retreated following window.onload.
function reviveLoader(e) {
    UIload.style.transform = "scaleX(1)";
    UIload.style.visibility = "visible";
    setTimeout(function () { UIload.style.transformOrigin = "left"; }, transit);
};

// Reactivate the loading screen's animation, then navigate to the next page
function navAway(e) {
    const destination = e.target.href;
    // Ensure menubar is retracted and scrolling is enabled
    document.querySelector("#showMenu").checked = false;
    scrollFreeze();
    // Bring back loading screen animation to begin the transition effect
    reviveLoader();
    // Prevent default behavior (i.e. immediately loading next page)
    e.preventDefault();
    // Load next page after the loading screen has returned
    console.log(destination)
    setTimeout(function () { window.location.href = destination; }, transit);
    return destination;
};

// Briefly apply a time delay before a form's action is triggered. This was initially
// intended to allow the loading screen's animation to occur before a form is submitted.
function pauseForm() {
    this.disabled = true;
    reviveLoader();
    setTimeout(function () { this.disabled = false; }, transit);
}

// Reactivate the loading screen's animation, then go back one page in the browser history
function pauseGoBack() {
    reviveLoader();
    setTimeout(function () { history.back(); }, transit);
}