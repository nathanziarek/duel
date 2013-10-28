var isOut = false;
var newData = "";

$(eventHolder).bind("newData", tagUpLinks);
$(window).bind("statechange", getData);

function tagUpLinks() {
    $("a").each( function(i, d) {
        if (d.hostname == document.location.hostname) {
            $(d).click( function() {
                console.log(d.pathname);
                History.pushState(null, null, d.pathname);
                return false;
            });
        }
    });
}

function getData() {
    var d = document.location;
    sendOut();
    $.ajax({
        url: d.pathname,
        dataType: "html",
        success: function(data) {
            var wrapper = document.createElement('div');
            wrapper.innerHTML = data;
            var title = $("title", wrapper).text();
            newData = $(wrapper).find('.pageChrome > *').addClass("onWayOut");
            //History.pushState(null, title, d.pathname);
            sendIn();
        }
    });
}

/*function sendOut(d) {
    l = $(".pageChrome > *").each( function(i, d) {
        //$(d).delay(i*50).animate({opacity: 0}, 100).addClass("onWayOut");
        $(d).delay(i*50).addClass("onWayOut");
    }).length;
    setTimeout("isOut=true;", l * 50 + 100);
}*/

function sendOut() {
    //console.log("sendOut2");
    var l = $(".pageChrome > *:not(.isOut)")[0];
    //console.log(l);
    if(l == undefined) { isOut = true; return; }
    var et = $(l).offset().top;
    var eh = $(l).outerHeight();
    var eb = et + eh;
    var wt = $(window).scrollTop();
    var wh = $(window).height();
    var wb = wt + wh;
    //console.log("(" + et + ">=" + wt + "&&" + et + "<=" + wb +") || (" + eb + "<=" + wt + "&&" + eb + ">=" + wb+")");
    if((et >= wt && et <= wb) || (eb >= wt && eb <= wb)) {
        $(l).addClass("onWayOut isOut");
        setTimeout("sendOut()", 50);
    } else {
        $(l).addClass("isOut");
        sendOut();
    }
}

function sendIn() {
    if(!isOut) { setTimeout(sendIn, 100); return; }
    isOut = false;
    $(".isOut").remove();
    $(newData).each( function(i,d){
        $(d).appendTo(".pageChrome");
    });
    $(eventHolder).trigger("newData");
    fadeIn();
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

function fadeIn() {
    var l = $(".pageChrome > *.onWayOut")[0];
    if(l == undefined) { return; }
    var et = $(l).offset().top;
    var eh = $(l).outerHeight();
    var eb = et + eh;
    var wt = $(window).scrollTop();
    var wh = $(window).height();
    var wb = wt + wh;
    if((et >= wt && et <= wb) || (eb >= wt && eb <= wb)) {
        $(l).removeClass("onWayOut");
        setTimeout("fadeIn()", 50);
    } else {
        $(l).removeClass("onWayOut");
        fadeIn();
    }
}