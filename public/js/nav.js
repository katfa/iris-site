(function () {
    window.addEventListener("DOMContentLoaded", addNavListeners);

    var homeContent = document.getElementById('home-content');
    var menuList = document.getElementById('menu-list');
    var menuIcon = document.getElementById('menu-icon');
    var showingMenuList = true;
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
        if (isMenuIconVisible()) {
            hideMenuList();
        }
    }

    function isMenuIconVisible() {
        var style = window.getComputedStyle(menuIcon);
        return style.display === 'block';
    }

    function showHomeContent () {
        homeContent.classList.remove('hidden');
    }

    function hideHomeContent () {
        homeContent.classList.add('hidden');
    }

    function showMenuList () {
        menuList.style.display = "block";
        showingMenuList = true;
    }

    function hideMenuList () {
        menuList.style.display = "none";
        showingMenuList = false;
    }

    function toggleMenuList () {

        if (showingMenuList) {
            hideMenuList();
        } else {
            showMenuList();
        }
    }

    function addNavListeners() {
        var as = document.querySelectorAll('nav > ul > li > a');
        [].forEach.call(as, function (a) {
            a.addEventListener('click', function (ev) {
                var targ = ev.target;

                if (currentActive && currentActive !== targ) {
                    removeActive(currentActive);
                    addActive(targ);
                } else {
                    addActive(targ);
                }
                hideHomeContent();
                ev.preventDefault();
            });
        });

        if (isMenuIconVisible()) {
            hideMenuList();
            menuIcon.addEventListener('click', toggleMenuList);
        }
    }

    window.addEventListener('resize', function () {
        if (!isMenuIconVisible()) {
            showMenuList();
            menuIcon.removeEventListener('click', toggleMenuList);
        }
        if (isMenuIconVisible()) {
            hideMenuList();
            menuIcon.addEventListener('click', toggleMenuList);
        }
    });


})();