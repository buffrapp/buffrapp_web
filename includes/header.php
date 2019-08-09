<?php
 session_start();
 require_once('config.php');

 if (!isset($secure)) {
  $secure = true;
 }

 if (!isset($showmenu)) {
  $showmenu = true;
 }

 if ($secure && !(isset($_SESSION['username']) && isset($_SESSION['password'])) ) {
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
          <a href="#" class="brand-logo">BuffRApp</a>
          <?php echo ($secure ? '<a href="logout.php" class="right" id="account_greeter">Cerrar sesión</a>':""); ?>
        </div>
      </nav>
    </header>
    <main><?php echo ($showmenu ? '
      <div class="row">
        <div class="col s3"> <!-- Left side-->
          <ul id="area_picker" class="collection">

            <li id="area_picker_pedidos" class="collection-item">
              <span class="title"><h5>Pedidos</h5></span>
              <p>Gestioná los pedidos, verificá la reputación del usuario y otros.</p>
            </li>

            <li id="area_picker_productos" class="collection-item">
              <span class="title"><h5>Productos</h5></span>
              <p>Administrá los productos, controlá la disponibilidad y más.</p>
            </li>

            <li id="area_picker_estadisticas" class="collection-item">
              <span class="title"><h5>Estadísticas</h5></span>
              <p>Echále un vistazo al estado del sistema, la cantidad de ventas y otros datos.</p>
            </li>
          </ul>
        </div>
        <div class="col s9"> <!-- Right side -->
        ' : ''); ?>
