$('document').ready(function() {
	$('#button').click(function () {
		if ($('#username').val() && $('#password').val()) {
			$.ajax({
				url: 'api.php',
				type: 'POST',
				data: {
					request: 'doAdministratorLogin',
					content: [ $('#username').val(), $('#password').val() ]
				}
			})
			.done(function (data) {
				console.log(data);
				data = parseInt(data);
				switch (data) {
					case 0:
						M.toast({ 'html': 'Cargando...' });
					  	window.location = 'pedidos.php';
						break;
					case 1:
						M.toast({ 'html': 'Hubo un problema al iniciar sesión.' });
						break;
					case 3:
						M.toast({ 'html': 'Esa combinación de usuario y contraseña no existe.' });
						break;
				}
			})
			.fail(function (data) {
				M.toast({html: 'Hubo un problema al conectarse con el servidor, ¿estás conectado a la red?'})
			});
		} else {
			M.toast({html: 'Tenés que completar todos los campos.'});
		}
	});
});
