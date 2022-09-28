function collapse_toc_elements_on_click (nav_li_a){
    /*
      When an `a' element in the TOC is clicked, its parent
      `li' element's active attribute is toggled.  This causes
      the element to toggle between minimized and maximized
      states.  The active attribute is documented in bootstrap.
      https://getbootstrap.com/docs/4.0/components/navbar/#nav
    */
    $(nav_li_a).parent().toggleClass("active");
}

$( document ).ready(function() {
    // When the document is loaded and ready, bind the
    // function `collapse_toc_elements_on_click' to the
    // `a' elements in the table of contents.
    $("#text-table-of-contents a").click(function() {
        collapse_toc_elements_on_click(this);
    });
});

/**
 * Prepends the org div home and up to the body.
 * Exit early if null.
 */
$( document ).ready(function () {
    let home = document.getElementById("org-div-home-and-up");
    if (home === null){
        return 0;
    }
    document.getElementById("content").prepend(home);
})

$(function() {
    function replace_admonition (tag, readable) {
        $(`.${tag}:not(#table-of-contents *)`)        
        .replaceWith(function() {
            //id='${this.id}' 
            return`
            <h3 class='admon-title ${tag}-title'>${readable}</h3>
            <div class='admon-body ${tag}-body'>
            ${this.innerHTML}
            </div>`
        });
    }
    replace_admonition('note', 'Note');
    replace_admonition('seealso', 'See also');
    replace_admonition('warning', 'Warning');
    replace_admonition('caution', 'Caution');
    replace_admonition('attention', 'Attention');
    replace_admonition('tip', 'Tip');
    replace_admonition('important', 'Important');
    replace_admonition('hint', 'Hint');
    replace_admonition('error', 'Error');
    replace_admonition('danger', 'Danger');
});

$(function(){
    function replace_source (tag){
        $(`.${tag}:not(#table-of-contents *)`)
        .replaceWith(function () {
            let readable = this.className.replace("src src-", "");
            return `<div class='src-lang'>
            <a onclick="copySource(this.parentElement.parentElement)">${readable}</a>
            </div>
            <pre class='${this.className}'>${this.innerHTML}</pre>`
        })
    }
    replace_source("src");
});

$(function(){
    function replace_name (tag){
        $(`.${tag}:not(#table-of-contents *)`)
        .replaceWith(function () {
            let srcName = getSourceName(this);
            let idName = `src-${srcName}`;
            this.nextElementSibling.setAttribute("id", idName);
            this.nextElementSibling.prepend(this);
            return `<div class="src-name">
            <a href="${window.location.href.replace(/(#.*)/g, "")}#${idName}">${srcName}</a>
            </div>`
        });
    }
    replace_name('src-name');
});

/**
 * Get the string name of a div, if it has none, generate it based on
 * the name of the header and the index of the given div.
 * @param {*} e div to get the name from.
 * @returns string with the name, can't be empty.
 */
function getSourceName(e) {
    let name = e.getElementsByTagName("p")[0]
    if (name.innerHTML.trim() === ""){
        name.innerHTML = `${getFirstSiblingId(e)}`;
        return `${limitString(name.innerHTML)}-${(indexInClass(e)) + 1}`;
    }
    name.innerHTML = replaceSubs(name.innerHTML);
    return limitString(name.innerHTML);
}

/**
 * Cut the string at given maxLength if it goes over it.
 * @param {*} string 
 * @param {*} maxLength 
 * @returns 
 */
function limitString(string, maxLength = 20){
    if (string.length > maxLength){
        string = string.substring(0, maxLength);
    }
    return string;
}

/**
 * Replace all <sub> tags with underscores and trim the string.
 * @param {*} string 
 * @returns 
 */
function replaceSubs(string){
    return string.replaceAll("<sub>", "_").replaceAll("</sub>", "").trim();
}

/**
 * Get the first child of grand-parent element, then it's id.
 * @param {*} e 
 * @returns 
 */
function getFirstSiblingId(e){
    return e.parentElement.parentElement.children[0].getAttribute("id");
}

/**
 * Returns the index of given element within all elements of the same class.
 * According to its parent.
 * @param {*} e Element to get index of.
 * @returns Zero-based index of element based on parent's children with the same class.
 */
function indexInClass(e) {
    let collection = e.parentElement.getElementsByClassName(e.className);
    for (let i = 0; i < collection.length; i++) {
      if (collection[i] === e){
        return i;
      }
    }
    return -1;
  }  

/**
 * Copy the all the contents of a given element. 
 * Delay selection removal for a few milliseconds as user feedback.
 * @param {*} e
 */
function copySource(e) {  
    window.getSelection().selectAllChildren(e);
    navigator.clipboard.writeText(window.getSelection());
    setTimeout(() => { window.getSelection().removeAllRanges(); }, 100);
}

$( document ).ready(function() {

    // Shift nav in mobile when clicking the menu.
    $(document).on('click', "[data-toggle='wy-nav-top']", function() {
      $("[data-toggle='wy-nav-shift']").toggleClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    // Close menu when you click a link.
    $(document).on('click', ".wy-menu-vertical .current ul li a", function() {
      $("[data-toggle='wy-nav-shift']").removeClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    $(document).on('click', "[data-toggle='rst-current-version']", function() {
      $("[data-toggle='rst-versions']").toggleClass("shift-up");
    });
    // Make tables responsive
    $("table.docutils:not(.field-list)").wrap("<div class='wy-table-responsive'></div>");
});

$( document ).ready(function() {
    $('#text-table-of-contents ul').first().addClass('nav');
                                        // ScrollSpy also requires that we use
                                        // a Bootstrap nav component.
    $('body').scrollspy({target: '#text-table-of-contents'});

    // DON'T add sticky table headers (Fix issue #69?)
    // $('table').stickyTableHeaders();

    // set the height of tableOfContents
    var $postamble = $('#postamble');
    var $tableOfContents = $('#table-of-contents');
    $tableOfContents.css({paddingBottom: $postamble.outerHeight()});

    // add TOC button
    var toggleSidebar = $('<div id="toggle-sidebar"><a href="#table-of-contents"><h2>Table of Contents</h2></a></div>');
    $('#content').prepend(toggleSidebar);

    // add close button when sidebar showed in mobile screen
    var closeBtn = $('<a class="close-sidebar" href="#">Close</a>');
    var tocTitle = $('#table-of-contents').find('h2');
    tocTitle.append(closeBtn);
});

window.SphinxRtdTheme = (function (jquery) {
    var stickyNav = (function () {
        var navBar,
            win,
            stickyNavCssClass = 'stickynav',
            applyStickNav = function () {
                if (navBar.height() <= win.height()) {
                    navBar.addClass(stickyNavCssClass);
                } else {
                    navBar.removeClass(stickyNavCssClass);
                }
            },
            enable = function () {
                applyStickNav();
                win.on('resize', applyStickNav);
            },
            init = function () {
                navBar = jquery('nav.wy-nav-side:first');
                win    = jquery(window);
            };
        jquery(init);
        return {
            enable : enable
        };
    }());
    return {
        StickyNav : stickyNav
    };
}($));
