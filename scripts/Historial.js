let atime = 400;
let NO_HAY = "NO HAY PEDIDOS";
$('document').ready(function () {
  
  $('.modal').modal();
  $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      request: 'history'
    }
  })
  .done(function (data) {
    console.log(data);
    data = JSON.parse(data);
   let html = '';
   let total = 0;
   if (data.length > 0) {
    html=` <table border="1">
      <tr>
        <th>Pedido</th>
        <th>Administrador</th>
        <th>Alumno</th>
        <th>Fecha de inicio</th>
      </tr>
    `;


    total = data.length;
    
     for (let i = 0; i < data.length; i++) {
      //console.log(data[i]['Ciudad']+" "+data[i]['Nombre']+" "+data[i]['Precio']+data[i]['encargado']+" "+data[i]['FH_Recibido']);
        html += `
        <tr>
          <td onclick="verPedido(` + data[i]['ID_Pedido'] + `)">` + data[i]['ID_Pedido'] + `</td>
            <td onclick="verAdmin(` + data[i]['DNIUsuario'] + `)">` + data[i]['Usuario'] + `</td>  
            <td onclick="verAlumno(` + data[i]['DNIAdmin'] + `)">` + data[i]['Admin'] + `</td>
          <td>` + data[i]['FH_Recibido'] + `</td>
        </tr>
        `
     }
     html +=`</table>`;
       $('#pedidos').append(html);
   }
   $('#total').append(total);
 });

});

