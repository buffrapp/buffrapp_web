<?php
    // Internal information
    $info = array(
        'home'       => 'index.html'
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
        'horarios'      => 'horarios_de_atencion',
        'products'      => 'productos',
        'orders'      => 'pedidos',
        'reports'      => 'reportes',
    );
    

    // Open a connection to the database.
    try {
        $server = new PDO('mysql:host=' . $server['hostname'] . ':' . $server['port'] . ';dbname=' . $server['database'] .';charset=utf8', $server['username'], $server['password']);
    } catch (PDOException $e) {
        $secure = false; $title = 'Fatal exception';
        require_once('includes/header.php');
        echo '
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