<?php $title = 'Inicio'; $secure = false; $showmenu = false; require_once('includes/header.php');

$current = trim(shell_exec('aapt dump badging ' . getcwd() . '/../latest.apk | grep versionCode | cut -d "=" -f 4 | cut -d " " -f 1 | sed "s/\'//g"'));

 ?>

    <div id="vcentered_message" class="row valign-wrapper">
      <div class="col s12 center-align grey-text">
        <h5>
          <i class="large material-icons">cloud_download</i> <br>
            buffrapp-<?php print $current; ?>.apk
          </h5>
          <h6>
            Android 4.1 o superior
          </h6>
          <br>
          <a href="../latest.apk" download="buffrapp-<?php print $current;?>.apk" class="waves-effect waves-light btn btn-flat waves-green green white-text">Descargar ahora</a>
          <br>
          <p>¿Sos un administrador? Hacé <a href="login.php">clic acá</a>.
      </div>
    </div>

<?php require_once('includes/footer.php'); ?>
