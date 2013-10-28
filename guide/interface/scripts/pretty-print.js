var maxChars = 50;

$(eventHolder).bind("newData", prettyPrintSite);


function prettyPrintSite() {

    $("pre").each( function(i,d) {
        var h = $(d).html();
        $(d).html(prettyCode(h));
    });

    $("pre[data-file]").each(function (i) {
        var f = $(this).attr("data-file");
        $.ajax(f, {
            context: $(this),
            dataType: "text",
            success: function (d) {
                $(this).html(prettyCode(d));
            }
        });
    });
}

function prettyCode(d) {
    var w = "";
    var spaceFound = false;
    var baseSpace;

    if (d.match(/<!-- Sample Start -->/) !== null) {
        d = d.match(/<!-- Sample Start -->([\s\S]*?)<!-- Sample End -->/)[1];
    }
    //d = d.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\t/g, "    ");
    d = d.split("\n");

    for (i = 0; i < d.length; i++) {
        d[i] = d[i].replace(/\t/g, "    ");
        if ($.trim(d[i]) !== "") {
            if (!spaceFound) {
                baseSpace = d[i].match(/^\s*/);
                baseSpace = new RegExp("^" + baseSpace[0]);
                spaceFound = true;
            }
            d[i] = d[i].replace(baseSpace, "");
            w += breakHTMLAtChar(d[i], 89) + "\n";
        }
    }

    w = w.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    w = prettyPrintOne($.trim(w), "", 1);

    return w;
}

function breakHTMLAtChar(str, char) {
    if(str.length < char) { return str; }
    var lines = [], line = "", toRet = "";
    var baseSpace = str.match(/^\s*/);
    //str = str.replace(/^\s*/,"");
    str = str.replace(/\>\</,"> <");
    var str_split = str.split(/(\s)/);
    //console.log(str_split);
    for(var i =0; i < str_split.length; i++) {
        if(line.length + str_split[i].length > char) {
            lines.push(line);
            line = "";
        }
        line += str_split[i];
    }
    lines.push(line);
    for (var j = 0; j < lines.length; j++) {
        if(j > 0 ) { toRet += "\n  " + baseSpace; }
        //toRet += baseSpace;
        toRet += lines[j];
    }
    return toRet;
}