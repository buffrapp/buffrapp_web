<?php $title = 'Iniciá sesión';  require_once('includes/header.php'); ?>
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
    </main>
    <footer></footer>
    <!-- Compiled and minified Javascript for jQuery -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <!-- Compiled and minified Javascript for jQuery UI -->
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
    <!-- Compiled and minified Javascript for MaterializeCSS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <!-- Compiled and minified Javascript for ChartJS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" integrity="sha256-Uv9BNBucvCPipKQ2NS9wYpJmi8DTOEfTA/nH2aoJALw=" crossorigin="anonymous"></script>
    <!-- API: Login frontend. -->
    <script src="scripts/login.js"></script>
  </body>
</html>
<?php require_once('includes/footer.php'); ?>
