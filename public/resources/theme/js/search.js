// This script requires an array named headers with all the header ids.
$(document).ready(() => {
    let title = document.getElementsByClassName("title")[0];
    let div = document.createElement("div");
    div.setAttribute("class", "search-bar");
    title.append(div);
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "search");
    input.setAttribute("onkeyup", "searchHeaders(headerIds)");
    input.setAttribute("placeholder", "Search...");
    div.appendChild(input);
})

function searchHeaders (headers) {
    var input, filter, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    for (let i = 0; i < headers.length; i++) {
        txtValue = document.getElementById(headers[i].getAttribute("id")).innerText;
        if (txtValue == null){
            continue;
        }
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            headers[i].style.display = "";
        } 
        else {
            headers[i].style.display = "none";
        }
    }
}