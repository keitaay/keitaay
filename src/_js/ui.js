// Define relevant elements and variables
let transit = 500; // transition duration in milliseconds
var UIload = document.querySelector(".UIload");

// Toggle screen changes and event listeners when the page is fully loaded.
document.onreadystatechange = function () {
    // Show the loading screen so that .UIload is hidden until window.load.
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
    if (chkbox && chkbox.checked) {
        cntnt_body.style.overflow = "hidden";
    } else {
        cntnt_body.style.overflow = "visible";
    }
};

// Update the URL to the current page based on where the user is scrolling.
// Throttled via requestAnimationFrame, and only touches history when the
// current section actually changes - history.replaceState(null, null, ...)
// always sets history.state to null, so comparing "current !== history.state"
// was true on nearly every scroll tick regardless of whether the section had
// changed, which could exhaust the browser's history-mutation rate limit
// (Chrome: ~100 calls/10s) during a single scroll gesture and leave the hash
// stuck at whatever value was last applied before hitting it.
//
// Uses getBoundingClientRect() rather than offsetTop: offsetTop is relative
// to the section's offsetParent (here, <main>, since it's position:relative),
// not the true document top - and <main> itself is pushed down by the sticky
// <nav>, which occupies real space above it in normal flow. That mismatch
// between offsetTop's coordinate space and window.scrollY's meant the
// comparison below was never quite right. getBoundingClientRect().top is
// always viewport-relative, sidestepping the offsetParent chain entirely.
const sections = document.querySelectorAll('section');
let lastSectionId = null;
let scrollSpyTicking = false;
window.addEventListener('scroll', () => {
  if (scrollSpyTicking) return;
  scrollSpyTicking = true;
  requestAnimationFrame(() => {
    let current = 'pgtop';
    sections.forEach(section => {
      const id = section.getAttribute('id');
      if (!id) return; // nothing meaningful to link to
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY >= sectionTop) {
        current = id;
      }
    });

    if (current !== lastSectionId) {
      lastSectionId = current;
      history.replaceState(null, null, `#${current}`);
    }
    scrollSpyTicking = false;
  });
});

// Attach listeners to "mark" elements; conditionally animate highlighting
const markElements = document.querySelectorAll('mark');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // threshold for animating higlighting
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.backgroundPositionX = '0%';
        } else {
            entry.target.style.backgroundPositionX = '100%';
        }
    });
}, observerOptions);
markElements.forEach(el => observer.observe(el));

// Fade+rise ".reveal" elements into view once, the first time they scroll
// into the viewport (unlike the "mark" observer above, which toggles both
// directions for a repeatable highlight - a one-shot entrance reads as
// considered, a repeatedly toggling one reads as a gimmick). The hidden
// state itself only ever applies via the "js-reveal" class below, which is
// added here and only here - so content with no JS, no IntersectionObserver
// support, or prefers-reduced-motion set stays fully visible by default,
// with no flash and no separate noscript override needed.
if ('IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
}

// Close the mobile nav panel if the viewport grows into desktop width
// mid-interaction (e.g. hamburger opened, then window resized wider) - this
// query must match the desktop breakpoint in main.scss ($min_desktop: 1000px).
const desktopNavQuery = window.matchMedia('(orientation: landscape) and (min-width: 1000px)');
function closeMobileNavOnDesktop(e) {
    if (!e.matches) return;
    const menuCheckbox = document.querySelector('#showMenu');
    if (menuCheckbox) menuCheckbox.checked = false;
}
desktopNavQuery.addEventListener('change', closeMobileNavOnDesktop);

// Wire up the top nav's dropdown menus (e.g. "What I Do", "Services").
// Click toggles open/closed; outside-click and Escape close it. Shared by
// every ".topnav-dropdown-toggle" button so a future addition doesn't need
// new wiring.
document.querySelectorAll('.topnav-dropdown-toggle').forEach(function (toggle) {
    const menu = toggle.nextElementSibling;
    if (!menu) return;

    function closeDropdown() {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
    }

    toggle.addEventListener('click', function (e) {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        // Close any other open dropdowns before opening this one.
        document.querySelectorAll('.topnav-dropdown-toggle').forEach(function (other) {
            if (other !== toggle) {
                other.setAttribute('aria-expanded', 'false');
                if (other.nextElementSibling) other.nextElementSibling.classList.remove('is-open');
            }
        });
        toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        menu.classList.toggle('is-open', !isOpen);
        e.stopPropagation();
    });

    document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) closeDropdown();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDropdown();
    });
});

// Add nice-to-have visual elements once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Emulate :has selector for desktop views
    if (!CSS.supports('selector(:has(*))')) {
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
            const sections = content.querySelectorAll('.content-section');
            if (sections.length > 1) {
                content.classList.add('multiple-sections');
            }
        });
    }

    // Conditionally render "go back" button
    document.body.setAttribute('data-has-prev-page', hasPrevPage());
    window.hasPrevPage = hasPrevPage;
    var goBackContainer = document.getElementById('goBackContainer');
    if (goBackContainer) {
        if (hasPrevPage()) {
            goBackContainer.innerHTML =
                '<button onclick="pauseGoBack()" class="UIbutton buttonGoBack" title="Return to Previous Page">&#8617;</button>';
        } else {
            goBackContainer.innerHTML = '';
        }
    }

    // Obfuscate email address
    // see https://spencermortensen.com/articles/email-obfuscation
    const a = document.getElementById('conversion');
    if (a) {
        a.setAttribute('href', a.getAttribute('href')
            .replace('now', '@keitaay.com')
            .replace('email-', 'hello')
            .replace('to-', 'mailto:')
            .replaceAll('keita-', '+website')
        );
    }
});

// Re-activate loading screen after it has retreated following window.onload.
function reviveLoader(e) {
    UIload.style.transform = "scaleX(1)";
    UIload.style.visibility = "visible";
    setTimeout(function () { UIload.style.transformOrigin = "left"; }, transit);
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

// Reactivate the loading screen's animation, then navigate to the next page
function navAway(e, linkElement) {
    const stackKey = 'visitedPagesStack';
    let stack = JSON.parse(sessionStorage.getItem(stackKey)) || [];
    const destination = (linkElement && linkElement.href) || (e.currentTarget && e.currentTarget.href);

    // Push destination to stack before navigating
    if (stack.length === 0 || stack[stack.length - 1] !== destination) {
        stack.push(destination);
        sessionStorage.setItem(stackKey, JSON.stringify(stack));
    }

    // Ensure menubar is retracted and scrolling is enabled
    const menuCheckbox = document.querySelector("#showMenu");
    if (menuCheckbox) menuCheckbox.checked = false;
    scrollFreeze();
    reviveLoader();
    e.preventDefault && e.preventDefault();
    setTimeout(
        function () { 
            if (destination && destination.startsWith(window.location.origin)) {
                window.location.href = destination;
            }
        }, 
        transit);
    return destination;
};

// Determine if there is a previous page in the custom history stack
function hasPrevPage() {
    const stackKey = 'visitedPagesStack';
    let stack = JSON.parse(sessionStorage.getItem(stackKey)) || [];
    const currentUrl = window.location.href;
    // Remove current page from the top of the stack
    let idx = stack.length - 1;
    while (idx >= 0 && stack[idx] === currentUrl) idx--;
    return idx >= 0;
}

// Reactivate the loading screen's animation, then go back to the first previous page that is not the current page
function pauseGoBack() {
    reviveLoader();
    setTimeout(function () {
        const stackKey = 'visitedPagesStack';
        let stack = JSON.parse(sessionStorage.getItem(stackKey)) || [];
        const currentUrl = window.location.href;

        // Define current base URL (ignoring hash)
        let currentBase;
        try {
            const url = new URL(currentUrl);
            currentBase = url.origin + url.pathname + url.search;
        } catch {
            currentBase = currentUrl.split('#')[0];
        }

        // Remove current page (ignoring hash) from top of the stack
        while (
            stack.length > 0 &&
            (function() {
                try {
                    const url = new URL(stack[stack.length - 1]);
                    return (url.origin + url.pathname + url.search) === currentBase;
                } catch {
                    return stack[stack.length - 1].split('#')[0] === currentBase;
                }
            })()
        ) {
            stack.pop();
        }

        // Find first previous page that is not current page (ignoring hash)
        let targetUrl = null;
        while (stack.length > 0) {
            try {
                const url = new URL(stack[stack.length - 1]);
                if ((url.origin + url.pathname + url.search) !== currentBase) {
                    targetUrl = stack.pop();
                    break;
                } else {
                    stack.pop();
                }
            } catch {
                if (stack[stack.length - 1].split('#')[0] !== currentBase) {
                    targetUrl = stack.pop();
                    break;
                } else {
                    stack.pop();
                }
            }
        }

        // Save the updated stack
        sessionStorage.setItem(stackKey, JSON.stringify(stack));
        if (targetUrl && targetUrl !== currentUrl) {
            // If non-self target URL is defined, go to that page
            if (
                targetUrl &&
                targetUrl !== currentUrl &&
                targetUrl.startsWith(window.location.origin)
            ) {
                window.location.href = targetUrl;
            } else {
                history.back();
            }
        } else {
            // Fallback: just go back one step if no other page found
            history.back();
        }
    }, transit);
}

// Handle clicks on links to trigger the navAway animation
document.addEventListener('click', function(e) {
    // Only handle left-clicks, not modified clicks (new tab, etc)
    if (
        e.defaultPrevented ||
        e.button !== 0 || // Only left click
        e.metaKey ||
        e.ctrlKey || 
        e.shiftKey || 
        e.altKey
    ) return;

    // Find the closest <a> ancestor
    let a = e.target.closest('a:not(.noFX)');
    if (!a) return;

    // Ignore anchor links and external links
    var hrefDest = a.href;
    if (
        !hrefDest ||
        hrefDest === window.location.href ||
        a.host !== window.location.host ||
        a.hash && a.pathname === window.location.pathname // in-page anchor
    ) {
        return;
    }

    // For appropriate links, trigger the navAway animation
    navAway(e, a);
});
