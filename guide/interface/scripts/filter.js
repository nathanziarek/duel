/**
 * Created with JetBrains WebStorm.
 * User: nathanziarek
 * Date: 2/14/13
 * Time: 9:43 AM
 * To change this template use File | Settings | File Templates.
 */

var filterAr = [];
var filterObjs = {};

function parsePageForFilters() {
    filterObjs = $("[data-filter]");
    $(".filter").keyup(filterData).click(filterData);
    $(filterObjs).each( function(i, d){
        filterAr.push($(d).text() + " " + ($(d).attr("data-keywords") || ""));
    });
}

$(eventHolder).bind("newData", parsePageForFilters);

function filterData() {
    var val = new RegExp($(this).val(), "i");
    for(i = 0; i<filterAr.length; i++) {
        if(filterAr[i].match(val)) {
            if($(filterObjs[i]).hasClass("isHidden")){
                $(filterObjs[i]).animate({
                    width: $(filterObjs[i]).attr("data-width"),
                    height: $(filterObjs[i]).attr("data-height"),
                    "margin-right": 20 }).removeClass("isHidden");
            }
        } else {
            if(!$(filterObjs[i]).hasClass("isHidden")){
                $(filterObjs[i]).attr({
                    "data-height": $(filterObjs[i]).height(),
                    "data-width": $(filterObjs[i]).width()
                }).animate({ width: 0, height: 0, "margin-right": 0 })
                    .addClass("isHidden");
            }
        }
    }
}