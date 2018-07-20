<!DOCTYPE html>
<html>
<head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>COLON LIVE EDITOR</title>
        <link href="include/metro/css/metro.css" rel="stylesheet">
        <link href="include/metro/css/metro-icons.css" rel="stylesheet">
        <link href="include/metro/css/docs.css" rel="stylesheet">
        <script src="include/metro/js/jquery-2.1.3.min.js"></script>
        <script src="include/metro/js/metro.js"></script>
        <script src="include/metro/js/docs.js"></script>
        <script src="include/metro/js/prettify/run_prettify.js"></script>
        <script src="include/metro/js/ga.js"></script>
        <style type="text/css" rel="stylesheet">
          body{
            overflow: hidden;
            background: black;
            margin: auto;
            color: white;
            background-size: cover;
            background-color: rgb(65, 34, 90);
          }
          .layer{
            background-color: white ;
            opacity: 0.2;
            width: 100%;
            height: 10000px;
            overflow: hidden;
            margin-top: -500px;
            position: absolute;
            z-index: 0px;
          }
          .center{
            margin: 200px 100px 500px 100px;
          }
          .tombol{
            margin: 200px 100px 100px 5px;
          }
        </style>
</head>
<body>
  <div class="center">
    <h1>What do you want to create?</h1>
    <div class="tile-wide fg-white bg-yellow " data-role="tile" data-effect="slideLeftRight">
      <div class="tile-content slide-down-2">
        <div class="live-slide"><img src="img/web.png" data-role="fitImage" data-format="fill"></div>
        <div class="live-slide"><img src="img/web2.png" data-role="fitImage" data-format="fill"></div>
        <div class="live-slide"><img src="img/web3.png" data-role="fitImage" data-format="fill"></div>
        <div class="live-slide"><img src="img/web4.png" data-role="fitImage" data-format="fill"></div>
        <div class="live-slide"><img src="img/web5.png" data-role="fitImage" data-format="fill"></div>
        <div class="slide-over op-cyan text-small padding10 ">
          Text Editor with included frameworks, usefull feature and beautiful themes
        </div>
        <div class="tile-label">Website</div>
      </div>
    </div>

    <div class="tile-wide fg-white bg-indigo " data-role="tile" data-effect="slideUpDown">
      <div class="tile-content slide-down-2">
        <div class="live-slide"><img src="img/present.png" data-role="fitImage" data-format="fill"></div>
        <div class="live-slide"><img src="img/present2.png" data-role="fitImage" data-format="fill"></div>
        <div class="live-slide"><img src="img/present3.png" data-role="fitImage" data-format="fill"></div>
        <div class="live-slide"><img src="img/present4.png" data-role="fitImage" data-format="fill"></div>
        <div class="live-slide"><img src="img/present5.png" data-role="fitImage" data-format="fill"></div>
        <div class="slide-over op-red text-small padding10 ">
          Make a beautiful, fast, light and cool presentation with code
        </div>
        <div class="tile-label">Presentation</div>
      </div>
    </div>

    <div class="tombol">
    <button class="button primary"><a href="webdesign.php">Create Website</a></button>
    <button class="button primary"><a href="presentation.php">Create Presentation</a></button>
    </div>
  </div>
</body>
</html>