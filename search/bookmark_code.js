javascript:(function(){if (typeof(window.dkr) == "undefined" || typeof(window.dkr.searchEngines) == "undefined"){var scr = document.createElement('script');scr.type = "text/javascript";scr.src = "https://cdn.jsdelivr.net/gh/Daniel-Krueger/js_snippets@0.5-beta/search/dkr_search.js?engine=google";scr.async = true;document.getElementsByTagName('head')[0].appendChild(scr);} else{window.dkr.searchFunction();}})();