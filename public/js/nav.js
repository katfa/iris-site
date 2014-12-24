(function () {
    window.addEventListener("DOMContentLoaded", addNavListeners);

    var homeContent = document.getElementById('home-content');
    var currentActive;
    var purple = '#A204E0';
    var darkGrey = '#383838';

    function removeActive (el) {
        el.classList.remove('active');
        el.style.borderBottom = "2px solid " + darkGrey;
        document.querySelector(currentActive.hash).classList.add('hidden');
        currentActive = null;
    }

    function addActive (el) {
        el.classList.add('active');
        el.style.borderBottom = "2px solid " + purple;
        currentActive = el;
        document.querySelector(currentActive.hash).classList.remove('hidden');
    }

    function showHomeContent () {
        homeContent.classList.remove('hidden');
    }

    function hideHomeContent () {
        homeContent.classList.add('hidden');
    }

    function addNavListeners() {
        var lis = document.querySelectorAll('nav > ul > li');
        [].forEach.call(lis, function (l) {
            l.addEventListener('click', function (ev) {
                var a = ev.target;

                if (currentActive && currentActive !== a) {
                    removeActive(currentActive);
                    addActive(a);
                } else {
                    addActive(a);
                }
                hideHomeContent();
            });
        });
    }

})();