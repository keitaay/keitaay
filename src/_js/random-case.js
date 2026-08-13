// Picks a random case study and navigates to it via navAway() (ui.js),
// keeping the site's standard page-transition animation. Kept as its own
// external file - unlike the CSS-preload activation in header.html, this
// isn't on the critical initial-paint path, so it doesn't need to be inline.
// Case URLs are read from the #case-urls JSON script tag in cases.html,
// which stays inline there: CSP's script-src only restricts *executable*
// script, and type="application/json" isn't executable either way.
document.addEventListener('DOMContentLoaded', function () {
    var caseUrlsEl = document.getElementById('case-urls');
    var btn = document.getElementById('random-case-btn');
    if (!caseUrlsEl || !btn) return;

    var caseUrls = JSON.parse(caseUrlsEl.textContent);
    btn.addEventListener('click', function (e) {
        if (caseUrls && caseUrls.length > 0) {
            e.preventDefault();
            var idx = Math.floor(Math.random() * caseUrls.length);
            var randomUrl = new URL(caseUrls[idx], window.location.origin).href;
            navAway(e, { href: randomUrl });
        }
    });
});
