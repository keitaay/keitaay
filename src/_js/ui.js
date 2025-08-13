// Define relevant elements and variables
let transit = 500; // transition duration in milliseconds
var anchors = document.querySelectorAll('a:not(.noFX)');
var UIload = document.querySelector(".UIload");

// Toggle screen changes and event listeners when the page is fully loaded.
document.onreadystatechange = function () {
    // Show the loading screen so that .UIload is hidden until window.load.
    if (document.readyState !== "complete") {
        UIload.style.visibility = "visible";
        document.querySelector("main,footer").style.visibility = "hidden";
    }

    // For every anchor, add a listener for click events. Only clicks on
    // internal links and submit buttons will trigger the navAway event.
    // External links and in-page anchors, on the other hand, will be exempt
    // from this behavior, and will follow the browser's default behavior.
    if (document.readyState === "interactive") {
        anchors.forEach(function (a) {
            a.addEventListener('click', e => {
                var hrefDest = e.currentTarget.href;
                if (
                    !hrefDest ||
                    hrefDest == window.location.href ||
                    e.currentTarget.host != window.location.host
                ) {
                    return;
                }
                navAway(e);
            });
        });
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
    // Hide the loading screen, and make the rest of the page visible.
    UIload.style.transitionDuration = transit.toString() + "ms";
    UIload.style.transform = "scaleX(0)";
    document.querySelector("main,footer").style.visibility = "visible";
    // By changing the transform-origin of .UIload, a link click will cause
    // the loading screen to expand from the right side of the window.
    // Since .UIload's transform-origin is set to the left, the loading
    // screen will appear as if it's sliding from the right to the left.
    // across the viewport from the right to the left.
    UIload.ontransitionend = function () {
        UIload.style.visibility = "hidden";
        UIload.style.transformOrigin = "right";
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

// Update the URL to the current page based on where the user is scrolling
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    // Get ID of the section that is currently in view
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  // Update URL hash based on current section
  if (current !== history.state) {
    history.replaceState(null, null, `#${current}`);
  }
});

// Emulate the behavior of "has" selectors to dynamically expand
// the width of "content" in desktop views
document.addEventListener('DOMContentLoaded', function() {
    if (!CSS.supports('selector(:has(*))')) {
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
        const sections = content.querySelectorAll('.content-section');
        if (sections.length > 1) {
            content.classList.add('multiple-sections');
        }
        });
    }
});

// Re-activate the loading screen after it has retreated following window.onload.
function reviveLoader(e) {
    UIload.style.transform = "scaleX(1)";
    UIload.style.visibility = "visible";
    setTimeout(function () { UIload.style.transformOrigin = "left"; }, transit);
};

// Reactivate the loading screen's animation, then navigate to the next page
function navAway(e) {
    const destination = e.currentTarget.href;
    // Ensure menubar is retracted and scrolling is enabled
    document.querySelector("#showMenu").checked = false;
    scrollFreeze();
    // Bring back loading screen animation to begin the transition effect
    reviveLoader();
    // Prevent default behavior (i.e. immediately loading next page)
    e.preventDefault();
    // After the loading screen is visible, load the next page
    setTimeout(function () { window.location.href = destination; }, transit);
    return destination;
};

// Store the current page in sessionStorage history stack
(function manageHistoryStack() {
    const stackKey = 'visitedPagesStack';
    let stack = JSON.parse(sessionStorage.getItem(stackKey)) || [];
    const currentUrl = window.location.href;

    // Only push if not the same as the last entry
    if (stack.length === 0 || stack[stack.length - 1] !== currentUrl) {
        stack.push(currentUrl);
        sessionStorage.setItem(stackKey, JSON.stringify(stack));
    }
})();

// Obfuscate email address to deter bots
// see https://spencermortensen.com/articles/email-obfuscation
document.addEventListener('DOMContentLoaded', function ()
{
    const a = document.getElementById('conversion');
    a.setAttribute('href', a.getAttribute('href')
        .replace('now', '@keitaay.com')
        .replace('email-', 'hello')
        .replace('to-', 'mailto:')
        .replaceAll('keita-', '+website')
    );
});

// Reactivate the loading screen's animation, then go back to the first previous page that is not the current page
function pauseGoBack() {
    reviveLoader();
    setTimeout(function () {
        const stackKey = 'visitedPagesStack';
        let stack = JSON.parse(sessionStorage.getItem(stackKey)) || [];
        const currentUrl = window.location.href;

        // Remove current page from the top of the stack
        while (stack.length > 0 && stack[stack.length - 1] === currentUrl) {
            stack.pop();
        }

        // Find the first previous page that is not the current page
        let targetUrl = null;
        while (stack.length > 0) {
            targetUrl = stack.pop();
            if (targetUrl !== currentUrl) break;
        }

        // Save the updated stack
        sessionStorage.setItem(stackKey, JSON.stringify(stack));
        if (targetUrl && targetUrl !== currentUrl) {
            window.location.href = targetUrl;
        } else {
            // Fallback: just go back one step if no other page found
            history.back();
        }
    }, transit);
}