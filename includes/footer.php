        </div>
      </div>
    </main>
    <footer></footer>
    <!-- Compiled and minified Javascript for jQuery -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <!-- Compiled and minified Javascript for MaterializeCSS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <!-- Compiled and minified Javascript for ChartJS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" integrity="sha256-Uv9BNBucvCPipKQ2NS9wYpJmi8DTOEfTA/nH2aoJALw=" crossorigin="anonymous"></script>
    <?php
      if ($secure) {
        print '<script src="scripts/common.js"></script>';
      }

      if (isset($scripts) && is_array($scripts)) {
        foreach ($scripts as $script) {
          print '<script defer src="scripts/' . $script . '.js"></script>';
        }
      }
    ?>
  </body>
</html>
