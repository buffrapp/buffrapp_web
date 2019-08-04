<?php
 session_start();
 if (isset($secure) && ( !isset($_SESSION['username']) || !isset($_SESSION['password']) )) {
   header('location: login.php');
   exit();
 }
?>

<html>
  <head>
    <meta charset="utf-8"/>
    <title>BuffRApp - <?php echo $title; ?></title>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"  media="screen,projection"/>

    <!--Import custom styles-->
    <link type="text/css" rel="stylesheet" href="styles/custom.css">

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body>
    <header>
      <nav class="green">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">BuffRApp</a><span class="right" id="account_greeter">¡Hola administrador!</span>
        </div>
      </nav>
    </header>
    <main>
