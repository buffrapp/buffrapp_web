<?php
    // Internal information
    $info = array(
        'home'              => 'index.html',
        'session_lifetime'  => 3 // months
    );

    // Database
    $server = array(
        'hostname'   => 'localhost',
        'username'   => 'root',
        'password'   => 'usbw',
        'port'       => 3306,
        'database'   => 'buffrapp'
    );

    $tables = array(
        'users'      => 'usuarios',
        'admin'      => 'administrador',
        'horarios'   => 'horarios_de_atencion',
        'products'   => 'productos',
        'orders'     => 'pedidos',
        'reports'    => 'reportes',
        'reasons'    => 'motivos',
        'crashes'    => 'crashes'
    );

    // Security
    $security = array(
      'secret'       => 'BuFfRaPp2019@WebOnline24/7FullBuildSecret',
    );


    // Open a connection to the database.
    try {
        $server = new PDO('mysql:host=' . $server['hostname'] . ':' . $server['port'] . ';dbname=' . $server['database'] .';charset=utf8', $server['username'], $server['password'], array(
          PDO::MYSQL_ATTR_FOUND_ROWS => true
        ));
    } catch (PDOException $e) {
        $secure = false; $title = 'Error fatal';
        echo '
        <html>
          <head>
            <meta charset="utf-8"/>
            <title>BuffRApp - ' . $title . '</title>
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
                </div>
              </nav>
            </header>
            <main>
              <div id="vcentered_message" class="col s12">
                  <h5 class="grey-text center-align">
                      <i class="large material-icons">link_off</i> <br>
                      No fue posible conectarse con la base de datos. ¿Querés <a href="">probar otra vez</a>?
                  </h5>
              </div>';
        require_once('includes/footer.php');
        $server = null;
        error_log($e->getMessage());
        exit();
    }
?>
