<?php
 $title   = 'Iniciá sesión'; $showmenu = false; require_once('includes/header.php');
 $scripts = [ 'login' ];

 if (isset($_SESSION['username']) || isset($_SESSION['password'])) {
  header('location: index.php');
 }
?>

  <div class="section"></div>
  <h5 class="green-text center-align">Para continuar, iniciá sesión.</h5>
  <div class="container">
    <div class="z-depth-1 grey lighten-4 form_box">
      <div class="col" method="post">

        <div class="row">
          <div class="col s12">
          </div>
        </div>

        <div class="row">
          <div class="input-feld col s12">
            <input class="validate" type="text" name="username" id="username" />
            <label for="username">Ingresá tu correo electrónico o DNI</label>
          </div>
        </div>

        <div class="row">
          <div class="input-feld col s12">
            <input class="validate" type="password" name="password" id="password" />
            <label for="password">Ingresá tu contraseña</label>
          </div>
        </div>

        <div class="row">
          <div class="input-feld col s12">
            <button id="button" type="submit" class="waves-effect waves-light btn green right">Iniciar sesión</button>
          </div>
        </div>

      </div>
    </div>
  </div>
<?php require_once('includes/footer.php'); ?>
