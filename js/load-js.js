function loadScript(url, callback) {
    var container = document.getElementById('js-container');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;

    container.appendChild(script);
}
window.onload = function () {
    loadScript('js/min/main.min.js');
}