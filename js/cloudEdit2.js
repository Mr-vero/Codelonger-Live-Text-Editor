/*global $:false, ace:false, htmlField:false, cssField:false, jsField:false, jqconsole:false*/
(function cloudEdit() {
  "use strict";
  // Globals
  // ---
  // For buildOutput() creation. Toggle includes in html output.
  var use = {
    Autoprefixer: false,
    Less: false,
    Sass: false,
    Modernizr: false,
    Normalize: false,
    Bootstrap: false,
    Foundation: false,
    liveEdit : false
  };

  // ---
  // End Globals

   // Check if a new appcache is available on page load. If so, ask to load it.
  window.addEventListener("load", function(e) {
    window.applicationCache.addEventListener("updateready", function(e) {
      if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        // Browser downloaded a new app cache.
        if (confirm("A new version of this site is available. Load it?")) {
          window.location.reload();
        }
      } else {
        // Manifest didn't changed. Do NOTHING!
      }
    }, false);
  }, false);

  // Create Text Area panes
  // Init ACE Editor and set options;
  (function initAce() {
    var aceTheme;
    if (localStorage.getItem("theme")) {
      aceTheme = localStorage.getItem("theme");
    } else {
      aceTheme = "ace/theme/monokai";
    };

    // HTML Editor
    ace.require("ace/ext/language_tools");
    window.htmlField = ace.edit("html");
    htmlField.setOptions({
      useWorker: true,
      theme: aceTheme,
      displayIndentGuides: true,
      mode: "ace/mode/html",
      tabSize: 4,
      fontSize: 14,
      useSoftTabs: true,
      showPrintMargin: false,
      indentedSoftWrap: true,
      enableEmmet: false,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    });


    // CSS Editor
    window.cssField = ace.edit("css");
    cssField.setOptions({
      theme: aceTheme,
      displayIndentGuides: true,
      mode: "ace/mode/css",
      tabSize: 2,
      useSoftTabs: true,
      showPrintMargin: false,
      enableEmmet: false,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    });

    // JS Editor
    window.jsField = ace.edit("js");
    jsField.setOptions({
      theme: aceTheme,
      displayIndentGuides: true,
      mode: "ace/mode/javascript",
      tabSize: 2,
      useSoftTabs: true,
      showPrintMargin: false,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    });

    // Retrieve values from sessionStorage if set
    (function sessionStorageGet() {
      if (sessionStorage.getItem("html")) {
        htmlField.setValue(sessionStorage.getItem("html"));
        htmlField.clearSelection();
      } else {
        htmlField.setValue("Let's Rock");
        htmlField.clearSelection();
        $(".html").one("touchstart click", function() {
          htmlField.setValue("");
        });
      }
      if (sessionStorage.getItem("css")) {
        cssField.setValue(sessionStorage.getItem("css"));
        cssField.clearSelection();
      }
      if (sessionStorage.getItem("js")) {
        jsField.setValue(sessionStorage.getItem("js"));
        jsField.clearSelection();
      }
      if (sessionStorage.getItem("use")) {
        use = JSON.parse(sessionStorage.getItem("use"));
      }
      if (sessionStorage.getItem("cssMode")) {
        cssField.getSession().setMode(sessionStorage.getItem("cssMode"));
      }
    })();

  })();
  // END ACE Editor

  // init jqConsole
  (function initConsole() {
    var header = "Ctrl+C: abort command, Ctrl+A: start of Line, Ctrl+E: end of line.\n";

    // Creating the console.
    window.jqconsole = $("#console").jqconsole(header);
    jqconsole.SetIndentWidth(2);

    // Abort prompt on Ctrl+C.
    jqconsole.RegisterShortcut("C", function() {
      jqconsole.AbortPrompt();
      handler();
    });
    // Move to line start Ctrl+A.
    jqconsole.RegisterShortcut("A", function() {
      jqconsole.MoveToStart();
      handler();
    });
    // Move to line end Ctrl+E.
    jqconsole.RegisterShortcut("E", function() {
      jqconsole.MoveToEnd();
      handler();
    });
    jqconsole.RegisterMatching("{", "}", "brace");
    jqconsole.RegisterMatching("(", ")", "paran");
    jqconsole.RegisterMatching("[", "]", "bracket");

    // console.log implementation
    window.log = function(message) {
      var data = "";
      if (typeof message == "object") {
        data = JSON && JSON.stringify ? JSON.stringify(message) : String(message);
      } else {
        data = message;
      }
      jqconsole.Write("==> " + data + "\n");
    };

    // Handle a command.
    var handler = function(command) {
      if (command) {
        if (command.search("console.log" !== -1)) {
          command = command.replace("console.log", "log");
        }
        try {
          jqconsole.Write("==> " + window.eval(command) + "\n");
        } catch (e) {
          jqconsole.Write("ReferenceError: " + e.message + "\n");
        }
      }
      jqconsole.Prompt(true, handler, function(command) {
        // Continue line if can't compile the command.
        try {
          new Function(command);
        } catch (e) {
          if (/[\[\{\(]$/.test(command)) {
            return 1;
          } else {
            return 0;
          }
        }
        return false;
      });
    };
    // Initiate the first prompt.
    handler();
  })();
  // END jqconsole

  // Toggle Text Areas from Displaying
  $(".togglePane").on("click", function() {
    panes.close(this);
  });
  $("#consoleToggle").on("click", function() {
    $(this).toggleClass("btn-active");
    $(".console").toggle();
  });
  $("#previewToggle, #iframeClose").on("click", function() {
    $("#previewToggle").toggleClass("btn-active");
    $("html").toggleClass("modal-open");
  });

  var panes = {
    // Return the number of editor panes displayed
    count: function() {
      var count = 3;
      var items = $(".windowGroup .column-33");
      items.each(function(el) {
        if ($(items[el]).css("display") === "none") count -= 1;
      });
      return count;
    },
    // Resize panes based upon number currently toggled ON
    resize: function() {
      var count = this.count();
      var win = $(".windowGroup .column-33");
      if (count === 3 || count === 0) {
        win.css("width", "33%");
      } else if (count === 2) {
        win.css("width", "49.5%");
      } else if (count === 1) {
        win.css("width", "100%");
      }
    },
    // On toggling an editor pane resize remaining and toggle button class
    close: function(el) {
      var name = el.dataset.editor;
      var count = this.count();
      if (count > 1 || $(el).hasClass("btn-active")) {
        $(el).toggleClass("btn-active");
        $(".window." + name).parent().toggle();
        this.resize();
      } else {
        alert("You Must Have at least one Editor open");
      }
    }
  };

  // Used by preview and download to compile editor panes and "Imports" into valid html
  function buildOutput(consoleJS) {

    var content = {
      html: htmlField.getValue(),
      style: cssField.getValue(),
      js: jsField.getValue()
    };

    // If using Autoprefixer, load it first via XMLHTTPRequest but do so only once.
    if (use.Autoprefixer && typeof autoprefixer === "undefined") {
      (function loadAutoprefixer() {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://rawgit.com/ai/autoprefixer-rails/master/vendor/autoprefixer.js", false);
        xmlHttp.send(null);
        var ap = document.createElement("script");
        ap.type ="text/javascript";
        ap.text = xmlHttp.responseText;
        document.getElementsByTagName("head")[0].appendChild(ap);
      })();
    }

    // If using Sass, load it first via XMLHTTPRequest but do so only once.
    // We don't want to include it from the get-go as it's 2 Megabytes!!
    if (use.Sass && typeof Sass === "undefined") {
      (function loadSass() {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://rawgit.com/medialize/sass.js/master/dist/sass.min.js", false);
        xmlHttp.send(null);
        var sass = document.createElement("script");
        sass.id = "sass";
        sass.type = "text/javascript";
        sass.text = xmlHttp.responseText;
        document.getElementsByTagName("head")[0].appendChild(sass);
      })();
    }

    // String to hold elements to build HTML output
    var html = '';
    html += '<!--Made with Code Longer V.1.2-->\n';
    html += '<!DOCTYPE html>\n';
    html += '<html lang="en">\n';
    html += '<head>\n';
    html += '<meta charset="UTF-8">\n';
    if (use.Yes) {
      html += '<link rel="stylesheet" href="include/reveal/css/reveal.css">\n';
      html += '<link rel="stylesheet" href="include/reveal/lib/css/zenburn.css">\n';
      html += '<script src="include/reveal/print.js"></script>\n';
    }
    html += '<link href="include/Animated/animate.css" rel="stylesheet">\n';
    if (use.Black) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/black.css" id="theme">\n';
    }
    if (use.White) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/white.css" id="theme">\n';
    }
    if (use.League) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/league.css" id="theme">\n';
    }
    if (use.Sky) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/sky.css" id="theme">\n';
    }
    if (use.Beige) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/Beige.css" id="theme">\n';
    }
    if (use.Simple) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/simple.css" id="theme">\n';
    }
    if (use.Serif) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/serif.css" id="theme">\n';
    }
    if (use.Blood) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/blood.css" id="theme">\n';
    }
    if (use.Night) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/night.css" id="theme">\n';
    }
    if (use.Moon) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/moon.css" id="theme">\n';
    }
    if (use.Solarized) {
      html += '<link rel="stylesheet" href="include/reveal/css/theme/solarized.css" id="theme">\n';
    }
    if (use.Less) {
      html += '<style type="text/less">\n';
    } else {
      html += '<style type="text/css">\n';
    }
    if (use.Autoprefixer) {
      html += autoprefixer({ cascade: true }).process(content.style).css;
    } else if (use.Sass) {
      html += Sass.compile(content.style);
    } else {
      html += content.style;
    }
    html += '\n</style>\n';
    html += '</head>\n';
    html += '<body>\n';
    html += '<div class="reveal">\n';
    html += '<div class="slides">\n';
    html += content.html;
    html += '</div>\n';
    html += '</div>\n';
    // true if previewing in the preview pane; false if called by download function.
    if (consoleJS) {
      html += '\n<script src="js/console.min.js"></script>\n';
    }
    html += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>\n';
    html += '<script src="include/Jquery/jquery-ui.min.js"></script>\n';
    if (use.Yes) {
      html += '<script src="include/reveal/lib/js/head.min.js"></script>\n';
      html += '<script src="include/reveal/js/reveal.js"></script>\n';
      html += '<script src="include/reveal/point-slide.js"></script>\n';
    }
    if (use.Slide){
      html += '<script src="include/reveal/point-slide.js"></script>\n';
    }
    if (use.Zoom){
      html += '<script src="include/reveal/point-zoom.js"></script>\n';
    }
    if (use.Fade){
      html += '<script src="include/reveal/point-fade.js"></script>\n';
    }
    if (use.Concave){
      html += '<script src="include/reveal/point-concave.js"></script>\n';
    }
    if (use.Convex){
      html += '<script src="include/reveal/point-convex.js"></script>\n';
    }
    html += '\n<script>\n';
    html += 'Reveal.initialize({\n';
    html += 'dependencies: [\n';
    html += '{ src: "include/reveal/lib/js/classList.js", condition: function() { return !document.body.classList; } },\n';
    html += '{ src: "include/reveal/plugin/markdown/marked.js", condition: function() { return !!document.querySelector( "[data-markdown]" ); } },\n';
    html += '{ src: "include/reveal/plugin/markdown/markdown.js", condition: function() { return !!document.querySelector( "[data-markdown]"" ); } },\n';
    html += '{ src: "include/reveal/plugin/highlight/highlight.js", async: true, condition: function() { return !!document.querySelector( "pre code" ); }, callback: function() { hljs.initHighlightingOnLoad(); } },\n';
    html += '{ src: "include/reveal/plugin/zoom-js/zoom.js", async: true },\n';
    html += '{ src: "include/reveal/plugin/notes/notes.js", async: true }\n';
    html += ']\n';
    html += '});\n';
    html += content.js;
    html += '\n</script>\n';
    html += '</body>\n';
    html += '</html>';

    return html;
  }

  // Toggle live edit/preview mode. It's sometimes slow or doesn't react well.
  $("#liveEdit").on("click", function() {
    use.liveEdit ? use.liveEdit = false:use.liveEdit = true;
    $(this).toggleClass("btn-active");
  });

  // Publish output from HTML, CSS, and JS textareas in the iframe below
  // after given keyup delay if "use.liveEdit: true".
  htmlField.getSession().on("change", function(e) {
    if (use.liveEdit) preview(1000);
  });
  cssField.getSession().on("change", function(e) {
    if (use.liveEdit) preview(2000);
  });

  // Update preview window AND js console on click of "Run" button
  $("#run").on("click", function() {
    preview();
  });

  function preview(delay) {
    delay = delay || 0;
    var timer = null;
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(function() {
      timer = null;
      // pass true as we want the pseudo console.js script
      //console.time('buildOutput'); // start timer for debugging
      var textToWrite = buildOutput(true);

      (document.getElementById("iframe").contentWindow.document).write(textToWrite);
      (document.getElementById("iframe").contentWindow.document).close();
      //console.timeEnd('buildOutput'); // end timer for debugging
    }, delay);
  }

  // Download HTML/CSS/JS
  // Source: http://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
  $("#download").on("click", function() {

    function destroyClickedElement(event) {
      document.body.removeChild(event.target);
    }

    var $download = document.createElement("a");

    // pass false as we don't want the pseudo console.js script
    var textToWrite = buildOutput(false);
    var textFileAsBlob = new Blob([textToWrite], {type: "text/plain"});
    var fileNameToSaveAs = "index.html";

    $download.download = fileNameToSaveAs;

    if (typeof window.webkitURL === "function") {
      // Chrome
      $download.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      // Firefox
      $download.href = window.URL.createObjectURL(textFileAsBlob);
    }
    $download.onclick = destroyClickedElement;
    $download.style.display = "none";
    document.body.appendChild($download);
    $download.click();
  });

  // Clear editors with "Clear" button
  $("#clear").on("click", function() {
    htmlField.setValue("");
    cssField.setValue("");
    jsField.setValue("");
    sessionStorage.clear();
    (document.getElementById("iframe").contentWindow.document).write("");
    (document.getElementById("iframe").contentWindow.document).close();
  });

  // Save current editor panes to localStorage
  $("#save").on("click", function() {
    var store = {
      html: htmlField.getValue(),
      css: cssField.getValue(),
      js: jsField.getValue()
    };
    localStorage.setItem("cloudEdit", JSON.stringify(store));
  });

  // Load into editors from localStorage if exists
  $("#load").on("click", function() {
    var store;
    if (localStorage.cloudEdit) {
      store = JSON.parse(localStorage.cloudEdit);
      cssField.setValue(store.css);
      cssField.clearSelection();
      htmlField.setValue(store.html);
      htmlField.clearSelection();
      jsField.setValue(store.js);
      jsField.clearSelection();
    } else {
      alert("No previous session found...");
    }
  });

  // ContextMenu
  // This is going to get VERY unruly BUT.. it minifies well.
  (function contextMenu() {
    $.contextMenu({
      selector: ".windowGroup",
      "items": {
        "framework": {
          "name": "Presentation",
          "items": {
            "yes": {
              "name": "Yes",
              "type": "radio",
              "radio": "framework",
              "value": "yes",
              "selected": false
            },
            "no": {
              "name": "No",
              "type": "radio",
              "radio": "framework",
              "value": "no",
              "selected": true
            }
          }
        },
        "Presentation_Mode" :{
          "name" : "Mode",
          "items":{
            "none":{
              "name": "None",
              "type": "radio",
              "radio": "mode",
              "value": "none",
              "selected": true
            },
            "black":{
              "name": "Black",
              "type": "radio",
              "radio": "mode",
              "value": "black",
              "selected": false
            },
            "white": {
              "name": "White",
              "type": "radio",
              "radio": "mode",
              "value": "white",
              "selected": false
            },
            "league": {
              "name": "League",
              "type": "radio",
              "radio": "mode",
              "value": "league",
              "selected": false
            },
            "sky": {
              "name": "Sky",
              "type": "radio",
              "radio": "mode",
              "value": "sky",
              "selected": false
            },
            "beige": {
              "name": "Beige",
              "type": "radio",
              "radio": "mode",
              "value": "beige",
              "selected": false
            },
            "simple": {
              "name": "Simple",
              "type": "radio",
              "radio": "mode",
              "value": "simple",
              "selected": false
            },
            "serif": {
              "name": "Serif",
              "type": "radio",
              "radio": "mode",
              "value": "serif",
              "selected": false
            },
            "blood": {
              "name": "Blood",
              "type": "radio",
              "radio": "mode",
              "value": "blood",
              "selected": false
            },
            "night": {
              "name": "Night",
              "type": "radio",
              "radio": "mode",
              "value": "night",
              "selected": false
            },
            "moon": {
              "name": "Moon",
              "type": "radio",
              "radio": "mode",
              "value": "moon",
              "selected": false
            },
            "solarized": {
              "name": "Solarized",
              "type": "radio",
              "radio": "mode",
              "value": "solarized",
              "selected": false
            },
          }
        },
        "Transition" :{
          "name" : "Effect",
          "items":{
            "none":{
              "name": "None",
              "type": "radio",
              "radio": "transition",
              "value": "none",
              "selected": true
            },
            "fade": {
              "name": "Fade",
              "type": "radio",
              "radio": "transition",
              "value": "fade",
              "selected": false
            },
            "slide": {
              "name": "Slide",
              "type": "radio",
              "radio": "transition",
              "value": "slide",
              "selected": false
            },
            "concave": {
              "name": "Concave",
              "type": "radio",
              "radio": "transition",
              "value": "concave",
              "selected": false
            },
            "convex": {
              "name": "Convex",
              "type": "radio",
              "radio": "transition",
              "value": "convex",
              "selected": false
            },
            "zoom": {
              "name": "Zoom",
              "type": "radio",
              "radio": "transition",
              "value": "zoom",
              "selected": false
            }
          }
        },
        "themes": {
          "name": "Editor Themes",
          "items": {
            "light": {
              "name": "Light",
              "items": {
                "chrome": {
                  "name": "Chrome",
                  "callback": function() {
                    updateTheme("chrome");
                  }
                },
                "dreamweaver": {
                  "name": "Dreamweaver",
                  "callback": function() {
                    updateTheme("dreamweaver");
                  }
                },
                "dawn": {
                  "name": "Dawn",
                  "callback": function() {
                    updateTheme("dawn");
                  }
                },
                "tomorrow": {
                  "name": "Tomorow",
                  "callback": function() {
                    updateTheme("tomorrow");
                  }
                },
                "xcode": {
                  "name": "XCode",
                  "callback": function() {
                    updateTheme("xcode");
                  }
                },
                "kuroir": {
                  "name": "Kuroir",
                  "callback": function() {
                    updateTheme("kuroir");
                  }
                },
                "katzenmilch": {
                  "name": "KatzenMilch",
                  "callback": function() {
                    updateTheme("katzenmilch");
                  }
                }
              }
            },
            "dark": {
              "name": "Dark",
              "items": {
                "ambiance": {
                  "name": "Ambiance",
                  "callback": function() {
                    updateTheme("ambiance");
                  }
                },
                "chaos": {
                  "name": "Chaos",
                  "callback": function() {
                    updateTheme("chaos");
                  }
                },
                "cobalt": {
                  "name": "Cobalt",
                  "callback": function() {
                    updateTheme("cobalt");
                  }
                },
                "vibrant ink": {
                  "name": "Vibrant Ink",
                  "callback": function() {
                    updateTheme("vibrant_ink");
                  }
                },
                "cloudsmidnight": {
                  "name": "Clouds Midight",
                  "callback": function() {
                    updateTheme("clouds_midnight");
                  }
                },
                "idlefingers": {
                  "name": "Idle Fingers",
                  "callback": function() {
                    updateTheme("idle_fingers");
                  }
                },
                "merbivore": {
                  "name": "Merbivore",
                  "callback": function() {
                    updateTheme("merbivore");
                  }
                },
                "merbivoresoft": {
                  "name": "Merbivore Soft",
                  "callback": function() {
                    updateTheme("merbivore_soft");
                  }
                },
                "monokai": {
                  "name": "Monokai [Default]",
                  "callback": function() {
                    updateTheme("monokai");
                  }
                },
                "tomorrownight": {
                  "name": "Tomorrow Night",
                  "callback": function() {
                    updateTheme("tomorrow_night");
                  }
                },
                "twilight": {
                  "name": "Twilight",
                  "callback": function() {
                    updateTheme("twilight");
                  }
                }
              }
            },
            "default": {
              "name": "Default",
              "callback": function() {
                updateTheme("monokai");
              }
            }
          }
        }
      },
      events: {
        show: function(opt) {
          // this is the trigger element
          var $this = this;
          // import states from data store IF set. If we don't check this
          // then default selected items get cleared on initial load
          if ($.contextMenu.getInputValues(opt, $this.data())) {
            $.contextMenu.setInputValues(opt, $this.data());
          }
        },
        hide: function(opt) {
          // this is the trigger element
          var $this = this;
          // export states to data store
          $.contextMenu.getInputValues(opt, $this.data());
        }
      }
    });
  })();

  // Get checkbox values from context-menu-input-*
  // and update "global" variable "use" in order to build
  // preview window
  // $("input[name*='context-menu-input']").on("click", function() {
  $(".context-menu-list").on("click", "input[name*='context-menu-input']", function() {
    var val = $(this).val();
    if (val) {
      switch (val) {
        // CSS Pre-Processor
        case "plaincss":
          $("#cssLabel").text("CSS");
          cssField.getSession().setMode("ace/mode/css");
          use.Autoprefixer = false;
          use.Less = false;
          use.Sass = false;
          break;
        case "autoprefixer":
          $("#cssLabel").text("CSS");
          cssField.getSession().setMode("ace/mode/css");
          use.Autoprefixer = true;
          use.Less = false;
          use.Sass = false;
          break;
        case "less":
          $("#cssLabel").text("LESS");
          cssField.getSession().setMode("ace/mode/less");
          use.Less = true;
          use.Sass = false;
          use.Autoprefixer = false;
          break;
        case "sass":
          $("#cssLabel").text("SASS");
          cssField.getSession().setMode("ace/mode/sass");
          use.Sass = true;
          use.Less = false;
          use.Autoprefixer = false;
          break;


        // Transisi
        case "none":
          use.Zoom = false;
          use.Fade = false;
          use.Slide = false;
          use.Convex = false;
          use.Concave= false
          break;
        case "zoom":
          use.Zoom = true;
          use.Fade = false;
          use.Slide = false;
          use.Convex = false;
          use.Concave= false
          break;
        case "fade":
          use.Zoom = false;
          use.Fade = true;
          use.Slide = false;
          use.Convex = false;
          use.Concave= false
          break;
        case "slide":
          use.Zoom = false;
          use.Fade = false;
          use.Slide = true;
          use.Convex = false;
          use.Concave= false
          break;
        case "convex":
          use.Zoom = false;
          use.Fade = false;
          use.Slide = false;
          use.Convex = true;
          use.Concave= false
          break;
        case "concave":
          use.Zoom = false;
          use.Fade = false;
          use.Slide = false;
          use.Convex = false;
          use.Concave= true
          break;
        //Transisi
        // CSS Frameworks
        case "no":
          use.Yes = false;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
          break;
        case "yes":
          use.Yes = true;
          use.Black = true;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
          break;
        case "black":
          use.Yes = true;
          use.Black = true;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
          break;
        case "white":
          use.Yes = true;
          use.Black = false;
          use.White = true;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
          break;
        case "league":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = true;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
        break;
        case "sky":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = true;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
        break;
        case "beige":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = true;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
        break;
        case "simple":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = true;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
        break;
        case "serif":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = true;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
        break;
        case "blood":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = true;
          use.Night = false;
          use.Moon = false;
          use.Solarized = false
        break;
        case "night":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = true;
          use.Moon = false;
          use.Solarized = false
        break;
        case "moon":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = true;
          use.Solarized = false
        break;
        case "solarized":
          use.Yes = true;
          use.Black = false;
          use.White = false;
          use.League = false;
          use.Sky = false;
          use.Simple = false;
          use.Serif = false;
          use.Beige = false;
          use.Blood = false;
          use.Night = false;
          use.Moon = false;
          use.Solarized = true
        break;
      }
    } else {
      var checked = $(this).is(":checked");
      var item = event.target.name; //$(this)[0].name;
      switch (item) {
        case "context-menu-input-modernizr":
          use.Modernizr = checked;
          break;
        case "context-menu-input-normalize":
          use.Normalize = checked;
          break;
        case "context-menu-input-animate":
          use.Animate = checked;
          break;
      }
    }
  });

  // Apply theme and save to localStorage
  function updateTheme(theme) {
    theme = "ace/theme/" + theme;
    htmlField.setTheme(theme);
    cssField.setTheme(theme);
    jsField.setTheme(theme);
    // Uncomment below if you want the page/body background to follow the set theme colour.
    // we delay obtaining the css colour by 1s as it takes a moment to propagate
    /*
    setTimeout(function() {
      $("body, section").css("background-color", $("#html").css("background-color"));
    }, 1000);
    */
    localStorage.setItem("theme", theme);
  }

  // Detect a user leaving a page and display a message
 

    // Save current buffers into sessionStorage
    sessionStorage.setItem("html", htmlField.getValue());
    sessionStorage.setItem("css", cssField.getValue());
    sessionStorage.setItem("js", jsField.getValue());

    // save selected imports into sessionStorage
    sessionStorage.setItem("use", JSON.stringify(use));
    // and if using LESS/Sass make sure the editor mode is saved as well
    sessionStorage.setItem("cssMode", cssField.getSession().getMode().$id);

    // If we haven't been passed the event get the window.event
    e = e || window.event;
    var message = "Your current session may be lost..";
    // // For IE6-8 and Firefox prior to version 4
    if (e) e.returnValue = message;
    // // For Chrome, Safari, IE8+ and Opera 12+
    return message;
  
})();
