<?php

  $current_date = date("d-M-y");
  $list = array (
    array('Date', 'Close'),
    array($current_date, '1'),
    array('17-Jul-15', '200')
  );

  $fp = fopen('data.csv', 'w');

  foreach ($list as $fields) {
      fputcsv($fp, $fields);
  }

  fclose($fp);



?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Pellet stove usage visualization in D3 #pelletstove">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Pellet Stove Visualization Chart</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="bootstrap.css">
    <link rel="stylesheet" href="style.css">

    <!-- Latest compiled and minified JavaScript -->
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

<body>
    <div class="container">
      <img src="pellet-stoves-00.jpg" class="logo" />
      <div class="header">
        <!--
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">About</a></li>
            <li role="presentation"><a href="#">Contact</a></li>
          </ul>
        </nav>
        -->
        <h3 class="text-muted">Pellet Stove Visualization Chart</h3>
      </div>

      <div class="jumbotron" style="padding:10px; padding-left:20px; padding-right:20px;">
        <h1>The problem:</h1>
        <p class="lead">If you have a certain amount of pellets, how do you know when they will run out depending on how many bags you burn a day?</p>
      </div>

      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
       <!-- Responseive -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-9054084274942028"
           data-ad-slot="2139132796"
           data-ad-format="auto"></ins>
      <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
      </script>

      <h4><small><b>Hover</b> over the graph to show the expected run out date and how many pellets you can burn to reach that date.</small></h4>

      <div class="graph" style="margin-bottom:20px;"></div>

      <h4><small><b>(0, 0)</b> = (<?php echo date("d-M-y"); ?>, 0 ) -- Starting with current date.</h4>

      <div class="row">
        <div class="col-md-12">
          <h1>The Math</h1>
          <pre>

            var num_pellets = 200;
            var days_from_today = runout_date - current_date;
            var pellets_per_day = num_pellets / days_from_today;

            <b>Examples:</b>
            <i><b>200</b> bags of pellets / <b>20</b> days = <b>10</b> bags of pellets per day</i>
            <i><b>80</b> bags of pellets / <b>90</b> days = .<b>89</b> bags of pellets per day<i>

        
          </pre>
        </div>
      </div>

      <footer class="footer">
        <p>&copy; <a href="http://www.dayobject.me">dayobject.me</a></p>
      </footer>

    </div> <!-- /container -->

  <script src="d3.js"></script>
  <script src="graph.js"></script>

   <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-51068337-1', 'dayobject.me');
        ga('send', 'pageview');
    </script>

</body>
</html>