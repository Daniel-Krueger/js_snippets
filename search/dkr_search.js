// sample queries
//https://www.bing.com/search?q=api+site%3Dcommunity.webcon.com
//https://www.google.com/search?q=api+site%3Acommunity.webcon.com
//https://duckduckgo.com/?q=api+site%3Acommunity.webcon.com
//https://search.yahoo.com/search?p=api+site%3Acommunity.webcon.com

// bookmark for local testing
// javascript:(function(){if (typeof(window.dkr) == "undefined" || typeof(window.dkr.search) == "undefined"){var scr = document.createElement('script');scr.type = "text/javascript";scr.src = "http://localhost:4000/assets/scripts/dkr_search.js?engine=google";scr.async = true;document.getElementsByTagName('head')[0].appendChild(scr);} else{window.dkr.search.searchFunction();}})();
// debugger
window.dkr = window.dkr || {}
window.dkr.search = {}
window.dkr.search.searchEngines = {
    bing: {
        url: 'https://www.bing.com/search',
        queryParameter: 'q'
    },
    duckduckgo: {
        url: 'https://duckduckgo.com',
        queryParameter: 'q'
    },
    google: {
        url: 'https://www.google.com/search',
        queryParameter: 'q'
    },
    yahoo: {
        url: 'https://search.yahoo.com/search',
        queryParameter: 'p'
    }
}

window.dkr.search.openSearchModal = function () {
    let searchPhraseLabel = "Search phrase"
        , searchLocationLabel = "Search URLs starts with"
        , searchButtonLabel = "Search"
        , userLang = navigator.language || navigator.userLanguage

    if (userLang === 'de') {
        searchPhraseLabel = "Suchbegriff";
        searchLocationLabel = "URL beginnt mit";
        searchButtonLabel = "Suchen";
    }

    let currentPath = document.location.origin
        , optionValues = '';
    optionValues += '<option value="' + currentPath + '">' + currentPath + '</option>';
    var pathElements = document.location.pathname.split("/");
    for (var i = 1; i < pathElements.length; i++) {
        currentPath += "/" + pathElements[i];
        optionValues += '<option value="' + currentPath + '">' + currentPath + '</option>';
    }
    window.dkr.search.modalClose = window.dkr.search.createModal(`
    <label for="externalSearchLocation" id="externalSearchLocationLabel">`+ searchLocationLabel + `</label>
<br/><select id="externalSearchLocation" >`+ optionValues + `
</select>
<br/>
<label for="externalSearchPhrase" id="externalSearchLocationLabel">`+ searchPhraseLabel + `</label>
<br/>
    <input type="text" id="externalSearchPhrase"> 
<br/>   <div style="text-align:center;"> <button id="startExternalSearch" onClick="window.dkr.search.startSearch()">`+ searchButtonLabel + `</button></div>
`);

    var input = document.getElementById("externalSearchPhrase");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("startExternalSearch").click();
        }
    });
}

window.dkr.search.startSearch = function () {
    // debugger;
    var searchPhrase = document.getElementById("externalSearchPhrase").value;
    var searchLocation = document.getElementById("externalSearchLocation").value;
    if (searchPhrase != null && searchPhrase != '') {
        var scripts = document.head.getElementsByTagName("script");
        var scriptSrcText = ""
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf("dkr_search.js") > -1) {
                scriptSrcText = scripts[i].src;
                break;
            }
        }
        var scriptSrc = new URL(scriptSrcText);
        var engine = scriptSrc.searchParams.get("engine");
        var targetEngine = window.dkr.search.searchEngines[engine];
        if (targetEngine == null) {
            targetEngine = window.dkr.search.searchEngines["bing"];
        }

        var url = new URL(targetEngine.url);
        url.searchParams.append(targetEngine.queryParameter, searchPhrase + " site:" + searchLocation);
        open(url.toString(), "_blank")
    }
    window.dkr.search.modalClose.click();
}

// copied from https://w3bits.com/javascript-modal/
window.dkr.search.createModal = (modalContent) => {
    // Definitions
    let modal = document.createElement("div"),
        modalStyle = document.createElement("style"),
        modalCSS = '.js-modal { position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: white;border-radius: 10px;border-color: black;border-width: 5px;border-style: inset;} .js-modal img, .js-modal iframe, .js-modal video{ max-width: 100%; } .js-modal-inner{ position: relative; padding: 10px; } .js-modal-close{ position: absolute; top: -10px; right: -10px; background-color: black; color: #eee; border-width: 0; font-size: 10px; height: 24px; width: 24px; border-radius: 100%; text-align: center; }',
        modalClose = '<button class="js-modal-close" id="js_modal_close">X</button>',
        theBody = document.getElementsByTagName('body')[0],
        theHead = document.getElementsByTagName('head')[0];

    // Add content and attributes to the modal
    modal.setAttribute("class", "js-modal");
    modal.innerHTML = '<div class="js-modal-inner">' + modalContent + modalClose + '</div>';
    theBody.appendChild(modal);

    modalClose = document.querySelector("#js_modal_close");

    // Add the modal styles dynamically
    if (modalStyle.styleSheet) {
        modalStyle.styleSheet.cssText = modalCSS;
    } else {
        modalStyle.appendChild(document.createTextNode(modalCSS));
    }
    theHead.appendChild(modalStyle);

    // Close the modal on button-click
    if (modalClose) {
        modalClose.addEventListener('click', function () {
            modal.remove();
            modalStyle.remove();
        });
    }
    return modalClose;
}
window.dkr.search.openSearchModal();


