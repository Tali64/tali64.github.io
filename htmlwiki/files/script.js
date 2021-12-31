window.onload = function () {
    var x = document.getElementById("editor");
    x.style.display = "none";
    document.getElementById("editbox").value = document.getElementById("content").innerHTML;
}
function addSpecialText() {
    var txt = document.getElementById("editbox").value;
    var txtype = document.getElementById("texttype").innerHTML;
    var addtxt = document.getElementById("specialtext").value;
    var select = document.querySelector("#texttype");
    var output = select.value;
    if (output == "bold") {
        document.getElementById("editbox").value = txt + "<b>" + addtxt + "</b>";
    } else if (output == "italic") {
        document.getElementById("editbox").value = txt + "<i>" + addtxt + "</i>";
    } else if (output == "underline") {
        document.getElementById("editbox").value = txt + "<u>" + addtxt + "</u>";
    }
}
function readJSON() {
    const fileSystem = require("browserify-fs")
    fileSystem.readFile("https://tali64.github.io/htmlwiki/files/data.json", (err, data) => {
     if(err) {
       console.log("File can't be read", err)
       return
     }
     try{
       const client = JSON.parse(data)
       console.log("client data is:", client)
     }
     catch(err) {
       console.log("Error parsing JSON string:", err)
     }
    })
}
var support = (function() {
    if (!window.DOMParser) return false;
    var parser = new DOMParser();
    try {
        parser.parseFromString('x', 'text/html');
    } catch(err) {
        return false;
    }
    return true;
})();
var textToHTML= function(str) {
    // check for DOMParser support
    if (support) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body.innerHTML;
    }

    // Otherwise, create div and append HTML
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;

};
function submit() {
    var txt = document.getElementById("editbox").value;
    document.getElementById("content").innerHTML = textToHTML(txt);
    hideEditArea();
}
function hideEditArea() {
    var x = document.getElementById("editor");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}
function showEditArea() {
    var x = document.getElementById("editor");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
