<?php
  $title   = 'Gestor de problemas técnicos'; $secure = true; $showmenu = false; require_once('includes/header.php');
  $scripts = [ 'crashes' ];
?>
      <div id="crashes_table_container" class="row"> <!-- Card container -->
        <h5 id="crashes_empty" class="center-align grey-text">Cargando...</h5>
        <table id="crashes_table" class="striped highlight centered hide">
          <thead>
            <th> Fecha y hora </th>
            <th> Actividad </th>
            <th> Marca </th>
            <th> Modelo </th>
            <th> Nombre clave </th>
<!--        <th> Huella digital </th> -->
            <th> Placa base / SoC </th>
            <th> Fecha de compilación </th>
            <th> Sistema operativo </th>
            <th> Notas adicionales </th>
          </thead>
          <tbody id="crashes_table_body">

          </tbody>
        </table>
      </div>
  <div class="fixed-action-btn">
    <a id="update" class="btn-floating btn-large waves-effect waves-light modal-trigger green" href="#">
      <i class="waves-effect waves-light large material-icons">refresh</i>
    </a>
  </div>
<?php require_once('includes/footer.php'); ?>
