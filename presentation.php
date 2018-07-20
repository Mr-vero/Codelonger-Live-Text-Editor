<!DOCTYPE html>
<html manifest="cloudEdit.appcache">
<!--<html>-->
<head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>COLON LIVE EDITOR(HTML)</title>
        <link href="include/metro/css/metro.css" rel="stylesheet">
        <link href="include/metro/css/metro-icons.css" rel="stylesheet">
        <link href="include/metro/css/docs.css" rel="stylesheet">
        <script src="include/metro/js/jquery-2.1.3.min.js"></script>
        <script src="include/metro/js/metro.js"></script>
        <script src="include/metro/js/docs.js"></script>
        <script src="include/metro/js/prettify/run_prettify.js"></script>
        <script src="include/metro/js/ga.js"></script>
        <link href="css/cloudEdit2.css" rel="stylesheet">
        <link href="css/contextMenu.min.css" rel="stylesheet">
        <style type="text/css" rel="stylesheet">
        section{
                font-size: 14px;
        }
        nav{
                width: 100%;
                height: 30%;
    font-family: roboto;
    font-size: 14px;
    font-weight: bold;
}
  nav > ul > h1{
    font-size: 14px;
    color: black;
  }
  nav > ul > li{
    display: inline-block;
  }
  .rendah{
    width: 75%;
  }
  .noborder{
    border: none;
  }
  </style>     
</head>
<body>
        <div class="app-bar darcula" data-role="appbar">
          <div class="app-bar-element place-left">
                        <a class="dropdown-toggle fg-white"><span class="mif-wrench"></span> ToolBox</a>
                        <div class="app-bar-drop-container place-center" data-role="dropdown" data-no-close="false" style="width: 324px;">
                          <div class="tile-container bg-dark">
                            <div class="tile-small bg-lightGreen">
                              <div class="tile-content iconic">
                                <span class="icon mif-cloud-download ani-bounce" id="download" title="download to your computer"></span>
                              </div>
                            </div>
                            <div class="tile-small bg-blue">
                              <div class="tile-content iconic">
                                <span class="icon mif-floppy-disk" id="save" title="save temporary in your localstorage"></span>
                              </div>
                            </div>
                            <div class="tile-small bg-lighterBlue">
                              <div class="tile-content iconic">
                                <span class="icon mif-upload" id="load" title="load from your localstorage"></span>
                              </div>
                            </div>
                            <div class="tile-small bg-yellow">
                              <div class="tile-content iconic">
                                <span class="icon mif-bin" id="clear" title="clear all work panes"></span>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                    </div>
                    <div class="app-bar-divider"></div>
                    <div class="app-bar-element place-left">
                      <button class="button bg-transparent fg-white noborder"><a href="index.php"><span class="mif-display"> Start Screen</span></a></button>
                    </div>

                    <div class="app-bar-element place-left">
                    <button class="button bg-transparent fg-white noborder"><a href="webdesign.php"><span class="mif-earth"> Build Website</span></a></button>
                    </div>

                    <div class="app-bar-element place-right">
                      <div class="app-bar-menu" style="width: 600px;" onclick="panes()" id="preview">
                        <div class="row preview">
            <iframe id="iframe" name="CloudEdit" sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-forms" allowtransparency="true"></iframe>
            <span class="windowLabel" id="iframeLabel">Preview</span>
            <span id="iframeClose">x</span>
          </div>
          
                      </div>
                    </div>
                    <div class="app-bar-element place-right">
                      <button class="button bg-transparent fg-white noborder"><a id="previewToggle"><span class="mif-layers"></span> Test</span></a></button>
                    </div>
                    <div class="app-bar-element place-right">
                      <button class="button bg-transparent fg-white noborder"><a id="run"><span class="mif-play"></span> Build</span></a></button>
                    </div>
                    </ul>
                </div>
  

  <section>
    <div class="row windowGroup">
            <div class="column-50">
              <div class="window html">
                <pre id="html"></pre>
                <span class="windowLabel" id="htmlLabel">presentation</span>
              </div>
            </div>
          </div>
          </div>
          </div>

    <div class="accordion" data-role="accordion">          
      <div class="frame disabled">
        <div class="heading">CSS<span class="mif-wrench icon"></span></div>
        <div class="content">
          <div class="row windowGroup">
            <div class="column-100">
              <div class="window css">
                <pre id="css"></pre>
                <span class="windowLabel" id="cssLabel">CSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame disabled">
        <div class="heading">JavaSccript/JQuery<span class="mif-cog icon"></span></div>
        <div class="content">
          <div class="row windowGroup">                            
            <div class="column-100">
              <div class="window js">
                <pre id="js"></pre>
                <span class="windowLabel" id="jsLabel">JavaScript/jQuery 1.x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame disabled">
        <div class="heading">Console<span class="mif-keyboard icon"></span></div>
        <div class="content">
          <div class="row console">
            <pre id="console"></pre>
            <span class="windowLabel" id="consoleLabel">Console</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>  
<!-- load ace -->
<!-- load ace language tools -->
  <script src="js/ace/ace.js"></script>
  <script src="js/ace/ext-language_tools.js"></script>
  <script src="js/ace/ext-emmet.js" type="text/javascript" charset="utf-8"></script>
  <script src="js/ace/emmet.js" type="text/javascript" charset="utf-8"></script>
  <script src="js/jquery.ui.position.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="js/contextMenu.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="js/jqconsole.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="js/cloudEdit2.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>