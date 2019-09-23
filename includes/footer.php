        </div>
      </div>
    </main>
    <footer></footer>
    <!-- Compiled and minified Javascript for jQuery -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <!-- Compiled and minified Javascript for MaterializeCSS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <!-- Compiled and minified Javascript for ChartJS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
            <?php echo ($showmenu ? '<ul id="mobile-navbar" class="sidenav">
            <li class="collection-item area_picker_pedidos">
              <span class="title"><h5><i class="material-icons">person</i>Pedidos</h5></span>
            </li>

            <li class="collection-item area_picker_productos">
              <span class="title"><h5><i class="material-icons">person</i>Productos</h5></span>
            </li>

            <li class="collection-item area_picker_historial">
              <span class="title"><h5><i class="material-icons">history</i>Historial</h5></span>
            </li>


            <li class="collection-item area_picker_estadisticas">
              <span class="title"><h5><i class="material-icons">trending_up</i>Estadísticas</h5></span>
            </li>

            <li class="collection-item area_picker_configuraciones">
              <span class="title"><h5><i class="material-icons">person</i>Configuraciones</h5></span>
            </li>
        
        </ul>' : ''); ?>
    
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
