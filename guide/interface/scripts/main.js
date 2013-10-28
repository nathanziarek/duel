var eventHolder = {};
var scripts = [
    "interface/scripts/pretty-print.js",
    "interface/scripts/filter.js",
    "interface/scripts/jquery.history.js",
    "interface/scripts/history.js",
    "interface/lib/prettify/prettify.js"
];

function getScripts() {
    if(scripts.length < 1) { $(eventHolder).trigger("newData"); return; }
    var s = scripts.pop();
    $.getScript(s, getScripts);
}

$(eventHolder).bind("newData", updatePageHeight);

function updatePageHeight() {
    $(".pageChrome").css("min-height", window.innerHeight);
}

getScripts();
