let atime = 200;

const NO_CRASHES = 'No hay problemas.';

function td(data) {
  return '<td>' + data + '</td>';
}

$('document').ready(function () {
  todo();
});

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
                  +  td(cur['date_time']) +
                  +  td(cur['activity']) +
                  +  td(cur['device_brand']) +
                  +  td(cur['device_model']) +
                  +  td(cur['device_codename']) +
                  +  td(cur['fingerprint']) +
                  +  td(cur['motherboard']) +
                  +  td(cur['compilation_date']) +
                  +  td('Android ' + cur['os_release'] + '(' + cur['os_codename'] + ', SDK ' + cur['os_sdk'] + ')') +
                  +  td(cur['content']) +
                  '</tr>';
        }


       if ($('#crashes_empty').length > 0) {
           setTimeout(function() {
               $('#crashes_empty').fadeOut();
           }, atime);
           setTimeout(function() {
              $('#crashes_cards_container').append(html);
           }, atime * 2);
       } else {
         $('#crashes_cards_container').append(html);
       }
     } else {
      $('#crashes_empty').html(NO_CRASHES);
     }
 });
}
