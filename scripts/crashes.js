let atime = 200;

const NO_CRASHES  = 'No hay problemas.';
const TBODY_EMPTY = '<tbody></tbody>';

function td(data) {
  return '<td>' + data + '</td>';
}

$('document').ready(function () {
  todo();

  $('#update').on('click', function() {
    update();
  });
});

function update() {
  setTimeout(function() {
      $('#crashes_table_container').fadeOut();
  }, atime);
  setTimeout(function() {
      $('#crashes_empty').fadeIn();
      $('#crashes_table_body').html(TBODY_EMPTY);
      $('#crashes_table').addClass('hide');
  }, atime * 2);
  setTimeout(function() {
      todo();
  }, atime * 4);
}

function todo(){
    $.ajax({
      url: 'api.php',
      type: 'POST',
      data: {
        request: 'getCrashes'
      }
    })
    .done(function (data) {
      console.log(data);
      data = JSON.parse(data);

     let html = '';

     if (data.length > 0) {
       for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          let cur = data[i];
          html += '<tr id="crash' + cur['id'] + '" class="crash">'
                  +  td(cur['date_time'])
                  +  td(cur['activity'])
                  +  td(cur['device_brand'])
                  +  td(cur['device_model'])
                  +  td(cur['device_codename'])
//                  +  td(cur['fingerprint'])
                  +  td(cur['motherboard'])
                  +  td(cur['compilation_date'])
                  +  td('Android ' + cur['os_release'] + ' (' + cur['os_codename'] + ', SDK ' + cur['os_sdk'] + ')')
                  +  td(cur['content'])
                  '</tr>';
        }

       if ($('#crashes_empty').length > 0) {
           setTimeout(function() {
               $('#crashes_empty, #crashes_table_container').fadeOut();
           }, atime);
           setTimeout(function() {
               $('#crashes_table_body').append(html);
               $('#crashes_table,  #crashes_table_container').removeClass('hide').fadeIn();
           }, atime * 2);
       } else {
         $('#crashes_table_body').append(html);
       }
     } else {
      $('#crashes_empty').html(NO_CRASHES);
     }
 });
}
