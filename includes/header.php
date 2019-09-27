<?php
 session_start();
 require_once('config.php');

 if (file_exists('vendor')) {
  require_once('vendor/autoload.php');
 } else {
  die('Falta el directorio de instalación de composer y sus dependencias, ¿te aseguraste de ejecutar <span style="font-family: monospace">composer install</span> antes de ingresar?');
 }

 use \Firebase\JWT\JWT;

 function doQuickLoginRedir() {
  unset($_SESSION['token']);
  header('location: login.php');
  exit();
 }

 if (!isset($secure)) {
  $secure = true;
 }

 if (!isset($showmenu)) {
  $showmenu = true;
 }

 if ($secure) {
  if (!isset($_SESSION['token'])) {
    doQuickLoginRedir();
  } else {
    // Try to decode the token.
    try {
      $decoded = JWT::decode($_SESSION['token'], $security['secret'], array('HS256'));

      $query = 'SELECT COUNT(DNI) FROM ' . $tables['admin'] . ' WHERE (DNI = ' . $server->quote($decoded->data->username) . ' OR `E-mail` = ' . $server->quote($decoded->data->username) . ') AND Password = ' . $server->quote($decoded->data->password);
      $matches = $server->query($query)->fetch()[0];

      if ($matches > 0) {
        if ($matches > 2) {
          doQuickLoginRedir();
        }
      } else {
        doQuickLoginRedir();
      }
    } catch (SignatureInvalidException $e) {
      // Invalid signature, probably something went wrong with the client
      // but we're gonna request a recent login just to ensure the safety
      // of the process.

      doQuickLoginRedir();
    } catch (UnexpectedValueException $e) {
      doQuickLoginRedir();
    }
  }
 }
?>

<html lang="es">
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
          <?php echo ($secure ? '
                          <a href="#" data-target="mobile-navbar" class="sidenav-trigger">
                                <i class="material-icons">menu</i>
                            </a>    
                          <a href="logout.php" class="right" id="account_greeter">Cerrar sesión</a>':""); ?>
        </div>
      </nav>
    </header>
    <main><?php echo ($showmenu ? '
        <div class="row">
        <div class="col s2 nav-mobile hide-on-med-and-down"> <!-- Left side-->
          <ul id="area_picker" class="collection">
            <li class="collection-item area_picker_pedidos">
              <span class="title"><h5>Pedidos</h5></span>
              <p>Gestioná los pedidos, verificá la reputación del usuario y otros.</p>
            </li>

            <li class="collection-item area_picker_productos">
              <span class="title"><h5>Productos</h5></span>
              <p>Administrá los productos, controlá la disponibilidad y más.</p>
            </li>

            <li class="collection-item area_picker_historial">
              <span class="title"><h5>Historial</h5></span>
              <p>Consultá el historial de ventas.</p>
            </li>


            <li class="collection-item area_picker_estadisticas">
              <span class="title"><h5>Estadísticas</h5></span>
              <p>Echále un vistazo al estado del sistema, la cantidad de ventas y otros datos.</p>
            </li>

            <li class="collection-item area_picker_configuraciones">
              <span class="title"><h5>Configuraciones</h5></span>
              <p>Editá la configuración del sistema.</p>
            </li>
          </ul>
        </div>
        <div class="col s9"><!-- Right side -->
        ' : '');

?>

