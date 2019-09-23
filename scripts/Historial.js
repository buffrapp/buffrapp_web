let atime = 400;
let NO_HAY = "NO HAY PEDIDOS";

$('document').ready(function () {
  $('.modal').modal();
  $('.collapsible').collapsible();  
  todo();
});
function verOrden(id_pedido){
          $.ajax({
            url: 'api.php',
            type: 'POST',
            data: {
              request: 'viewOrder',
              content: [id_pedido]
            }
          })
          .done(function (data) {
            console.log(data);
            data = JSON.parse(data);
            let horarios = `<div class='row'>
                          <div class='col s3'>
                              Recibido: `+data[0]['Recibido']+`
                          </div>
                          <div class='col s3'>
                              Tomado: `+data[0]['Tomado']+`
                          </div>
                          <div class='col s3'>
                              Listo: `+data[0]['Listo']+`
                          </div>
                          <div class='col s3'>
                              Entregado: `+data[0]['Entregado']+`
                          </div>
                          </div>`;
                        $('#horarios').html(horarios);
            let alumno = `<div class='row'>
                          <div class='col s3'>
                            Alumno: `+data[0]['Usuario']+`
                          </div>
                          <div class='col s3'>
                            Año: `+data[0]['curso']+`
                          </div>
                          <div class='col s3'>
                            DNI: `+data[0]['DNI_Usuario']+`
                          </div>
                          </div>`;
                          $('#alumno').html(alumno);
            let administrador = `<div class='row'>
                                <div class='col s3'>
                                  Administrador: `+data[0]['Admin']+`
                                </div>
                                <div class='col s3'>
                                  DNI: `+data[0]['DNI_Administrador']+`
                                </div>
                                </div>`;
                        $('#administrador').html(administrador);
            let pedido = `<div class='row'>
                          <div class='col s3'>
                            Producto: `+data[0]['Producto']+`
                          </div>
                          <div class='col s3'>
                            Precio: $`+data[0]['Precio']+`
                          </div>
                          </div>`;
                          $('#pedido').html(pedido);
            let html = `
                      <div class='col s12'>
                      
                        <div class='row'>
                        <h5 class="green-text">
                            <div class='col s3'>
                              ID Pedido: `+data[0]["ID_Pedido"]+`
                            </div>
                            <div>
                              Fecha: `+data[0]['DIA']+`
                            </div>
                        </h5>
                        </div>
                      </div>`;
                      $('.collapsible').collapsible();
           if (data.length>0) {
            $('#descripcion').html(html);
           };
          }); 
          $('#prueba').html('<span>Lorem ipsum dolor sit amet.</span>');
}

function Buscar(){
  let valor = $('#search').val();
  if (valor.length>0) {
    let uni='';
    if ($('#ID_Pedido').prop('checked')) {
      uni = unir(uni,'ID_Pedido = '+valor);
    };
    if ($('#Nombre_Alumno').prop('checked')) {
      uni = unir(uni,'u.Nombre LIKE "%'+valor+'%"');
    };
    if ($('#Nombre_Encargado').prop('checked')) {
      uni = unir(uni,'a.Nombre LIKE "%'+valor+'%"');
    };
    if ($('#Nombre_Producto').prop('checked')) {
      uni = unir(uni,'p.Nombre LIKE "%'+valor+'%"');
    };
    if ($('#DNI_Alumno').prop('checked')) {
      uni = unir(uni,'DNI_Usuario = '+valor);
    };
    //console.log(uni);
      $('.modal').modal();
  $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      request: 'history',
      content: ['1',uni]
    }
  })
  .done(function (data) {
    console.log(data);
    data = JSON.parse(data);
   let html = '';
   let total = 0;
   if (data.length > 0) {
    html=`<table border="1">
      <tr>
        <th>Pedido</th>
        <th>Administrador</th>
        <th>Alumno</th>
        <th>Ver más</th>
      </tr>
    `;


    total = data.length;
    
     for (let i = 0; i < data.length; i++) {
      if (data[i]['']) {};
        html += `
        <tr>
          <td>` + data[i]['ID_Pedido'] + `</td>
            <td>` + data[i]['Usuario'] + `</td>  
            <td>` + data[i]['Admin'] + `</td>
          <td><a class="waves-effect waves-light btn modal-trigger green" onclick="verOrden(` + data[i]['ID_Pedido'] + `)" href="#modal1">Ver más</a>
</td>
        </tr>
        `
     }
     html +=`</table>`;
   }
   $('#pedidos').html(html);
   $('#total').html(total);
 });
  }else{
    todo();
  }
}

function todo(){
   $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      request: 'history',
      content: ['1']
    }
  })
  .done(function (data) {
    console.log(data);
    data = JSON.parse(data);
   let html = '';
   let total = 0;
   if (data.length > 0) {
    html=`<table border="1">
      <tr>
        <th>Pedido</th>
        <th>Administrador</th>
        <th>Alumno</th>
        <th>Ver más</th>
      </tr>
    `;


    total = data.length;
    
     for (let i = 0; i < data.length; i++) {
      if (data[i]['']) {};
        html += `
        <tr>
          <td>` + data[i]['ID_Pedido'] + `</td>
            <td>` + data[i]['Usuario'] + `</td>  
            <td>` + data[i]['Admin'] + `</td>
          <td><a class="waves-effect waves-light btn modal-trigger green" onclick="verOrden(` + data[i]['ID_Pedido'] + `)" href="#modal1">Ver más</a>
</td>
        </tr>
        `
     }
     html +=`</table>`;
       $('#pedidos').html(html);
   }
   $('#total').html(total);
 });
}
function unir(html,sql){
  if (html=='') {
    html=sql;
  }else{
    html+=' OR '+sql;
  }
  return html;
}