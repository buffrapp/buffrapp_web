<?php
  $title   = 'Estadísticas'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'estadisticas' ]; 
?>
<!--<canvas id="stats" width="400" height="400"></canvas>-->

<div class="col s12">
	<h3>Dias en los que se vendió más</h3>
	<div class="col s12" id="DiasMas">
		
	</div>
</div>
<div class="col s12">
	<h3>Alimentos más vendidos</h3>
	<div class="col s12" id="AlimentosMás">
		
	</div>
</div>
<?php require_once('includes/footer.php'); ?>
