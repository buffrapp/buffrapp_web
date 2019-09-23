let atime = 100;
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
            let horarios=`<div class='row'>
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
            if (data[0]['CANCELADO']!=null) {
              if (data[0]['Recibido']==null) {
                horarios = `<div class='row'>
                          <div class='col s3'>
                              Recibido: CANCELADO
                          </div>`;

              }else{

                horarios = `<div class='row'>
                          <div class='col s3'>
                              Recibido: `+data[0]['Recibido']+`
                          </div>`;

                if (data[0]['Tomado']==null) {
                  horarios += `<div class='col s3'>
                                  Tomado: CANCELADO
                              </div>`;
                }else{

                  horarios += `<div class='col s3'>
                              Tomado: `+data[0]['Tomado']+`
                          </div>`;

                  if (data[0]['Listo']==null) {
                    horarios += `<div class='col s3'>
                                    Listo: CANCELADO
                                </div>`;
                  }else{
                    horarios += `<div class='col s3'>
                              Listo: `+data[0]['Listo']+`
                          </div>`;
                    horarios += `<div class='col s3'>
                                    Entregado: NO VINO
                                </div>`;
                  }
                }
                horarios+=` <div class="row center-align red-text">
                              <br>
                              `+data[0]['CANCELADO']+`
                            </div>`;
                horarios += `</div>`;
              }
            }
              
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
            if (data[0]['Admin']==null) {
              administrador = `<div class='row'>
                                  <div class='col s12'>
                                    NO SE LLEGÓ A TOMAR ESTE PEDIDO
                                  </div>
                                </div>`;
            }
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
                            <div class='col s5'>
                              ID Pedido: `+data[0]["ID_Pedido"]+`
                            </div>
                            <div lang="es-es" class='col s5'>
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
  let uni='';
  
  
  if (valor.length>0 && !$('#Todo').prop('checked') ) {
    if ($('#ID_Pedido').prop('checked')) {
      uni = unir(uni,'ID_Pedido = '+valor);
    }else if ($('#Nombre_Alumno').prop('checked')) {
      uni = unir(uni,'u.Nombre LIKE "%'+valor+'%"');
    }else if ($('#Nombre_Encargado').prop('checked')) {
      uni = unir(uni,'a.Nombre LIKE "%'+valor+'%"');
    }else if ($('#Nombre_Producto').prop('checked')) {
      uni = unir(uni,'p.Nombre LIKE "%'+valor+'%"');
    }else if ($('#DNI_Alumno').prop('checked')) {
      uni = unir(uni,'DNI_Usuario = '+valor);
    };
    if ($('#Cancelado').prop('checked')) {
      uni += 'AND o.DNI_Cancelado IS NOT NULL';
    }else if ($('#NoCancelado').prop('checked')) {
      uni += 'AND o.DNI_Cancelado IS NULL';
    }
  }else{
    if (uni == '') {
      if ($('#Cancelado').prop('checked')) {
        uni = 'o.DNI_Cancelado IS NOT NULL';
      }else if ($('#NoCancelado').prop('checked')) {
        uni = 'o.DNI_Cancelado IS NULL';
      }else{
        todo();
      }
    }else{
      if ($('#Cancelado').prop('checked')) {
        uni += 'AND o.DNI_Cancelado IS NOT NULL';
      }else if ($('#NoCancelado').prop('checked')) {
        uni += 'AND o.DNI_Cancelado IS NULL';
      }else{
        todo();
    }
  }
    
  }
  
    console.log(uni);
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
        <th>Alumno</th>
        <th>Administrador</th>
        <th>Ver más</th>
      </tr>
    `;


    total = data.length;
    
     for (let i = 0; i < data.length; i++) {

      if (data[i]['CANCELADO']==null) {
        html += `
        <tr>
          <td>` + data[i]['ID_Pedido'] + `</td>
            <td>` + data[i]['Usuario'] + `</td>
            `;
        if (data[i]['Admin']==null) {
          html += `<td>----</td>`;
        }else{

          html += `<td>` + data[i]['Admin'] + `</td>`;
        }
        html += `<td><a class="waves-effect waves-light btn modal-trigger green" onclick="verOrden(` + data[i]['ID_Pedido'] + `)" href="#modal1">Ver más</a>
          </td>
        </tr>
        `;
      }else{
        html += `
        <tr class='red lighten-2'>
          <td>` + data[i]['ID_Pedido'] + `</td>
            <td>` + data[i]['Usuario'] + `</td>  
            <td>` + data[i]['Admin'] + `</td>
          <td><a class="waves-effect waves-light btn modal-trigger black" onclick="verOrden(` + data[i]['ID_Pedido'] + `)" href="#modal1">Ver más</a>
          </td>
        </tr>
        `;
      }
        
     }
     html +=`</table>`;
   }
   $('#pedidos').html(html);
   $('#total').html(total);
 });
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
        <th>Alumno</th>
        <th>Administrador</th>
        <th>Ver más</th>
      </tr>
    `;


    total = data.length;
    
     for (let i = 0; i < data.length; i++) {

      if (data[i]['CANCELADO']==null) {
        html += `
        <tr>
          <td>` + data[i]['ID_Pedido'] + `</td>
            <td>` + data[i]['Usuario'] + `</td>
            `;
        if (data[i]['Admin']==null) {
          html += `<td>----</td>`;
        }else{

          html += `<td>` + data[i]['Admin'] + `</td>`;
        }
        html += `<td><a class="waves-effect waves-light btn modal-trigger green" onclick="verOrden(` + data[i]['ID_Pedido'] + `)" href="#modal1">Ver más</a>
          </td>
        </tr>
        `;
      }else{
        html += `
        <tr class='red lighten-2'>
          <td>` + data[i]['ID_Pedido'] + `</td>
            <td>` + data[i]['Usuario'] + `</td>  
            <td>` + data[i]['Admin'] + `</td>
          <td><a class="waves-effect waves-light btn modal-trigger black" onclick="verOrden(` + data[i]['ID_Pedido'] + `)" href="#modal1">Ver más</a>
          </td>
        </tr>
        `;
      }
        
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
function Activar(){
  Buscar();
}
function Desactivar(){
  Buscar();
}