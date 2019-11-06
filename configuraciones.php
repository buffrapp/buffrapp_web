<?php
  $title   = 'Configuraciones'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'configuraciones' ]; 
?>
<div class="row">
	<a class="waves-effect waves-light btn-large" id="misdatos" onclick="misdatos()"><i class="material-icons right">person</i>Mis datos</a>
	<a class="waves-effect waves-light btn-large" id="horarios" onclick="horarios()"><i class="material-icons right">calendar_today</i>Horarios</a>
	<a class="waves-effect waves-light btn-large" id="reportes" onclick="reportes()"><i class="material-icons right">notification_important</i>Motivos de reportes</a>
</div>

<div class="row">
	<div class="center-align">
		<h5 class="col s12 grey-text" id="TituloC">Configuraciones</h5>
	</div>
</div>

<div class="row">
	<div class="center-align">
		<h5 class="col s12" id="explicacion" >Elegí lo que quieras modificar</h5>
	</div>
</div>
<?php require_once('includes/footer.php'); ?>
