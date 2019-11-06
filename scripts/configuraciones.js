$('document').ready(function () {
  
});
document.addEventListener('DOMContentLoaded', function() {
    $('.datepicker').datepicker();
});

function reportes(){
	$('#reportes').attr("disabled", true);
	$('#horarios').attr("disabled", false);
	$('#misdatos').attr("disabled", false);

	$('#TituloC').html("Editar reportes");
	$('#explicacion').html("Editá los motivos por los cuales cancelarias un pedido");	
}

function horarios(){
	$('#horarios').attr("disabled", true);
	$('#reportes').attr("disabled", false);
	$('#misdatos').attr("disabled", false);

	$('#TituloC').html("Editar Horarios");
	$('#explicacion').html("Editá los horarios de atención");	
}

function misdatos(){
	$('#misdatos').attr("disabled", true);
	$('#horarios').attr("disabled", false);
	$('#reportes').attr("disabled", false);

	$('#TituloC').html("Editar mis datos");
	$('#explicacion').html("Editá tus datos personales");	
}