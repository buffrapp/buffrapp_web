let atime = 200;

const NO_CRASHES = 'No hay problemas.';

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
      data = data.replace(RegExp("\n","g"), "<br>");
      data = JSON.parse(data);

     let html = '';

     if (data.length > 0) {
       for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          html += `
          <div id="producto` + data[i][0] + `" class="producto col s3">
              <div class="card">
                  <div class="card-content">
                    <p>
                      <span>` + data[i]['content'] + `</span>
                    </p>
                  </div>
              </div>
          </div>
          `
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
