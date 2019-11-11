$('document').ready(function () {
  var ctx = $('#stats');

  ctx = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [ 'Verde', 'Verde', 'Verde', 'Verde', 'Verde', 'Verde' ],
      datasets: [{
          label: 'Número de ventas',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(76, 175, 80, 0.7)'
          ],
          borderColor: [
              'rgba(76, 175, 80, 1.0)'
          ],
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });

  $.ajax({
            url: 'api.php',
            type: 'POST',
            data: {
              request: 'getDiasMas'
            }
          })
          .done(function (data) {
            console.log(data);
            data = JSON.parse(data);
            let html = '';
            for (let i = 0; i < data.length; i++) {
              html += `<div class="row">`+data[i]['DIA']+`: `+data[i]['Pedidos']+`</div>`;
            };
            $('#DiasMas').html(html);
          });
  $.ajax({
            url: 'api.php',
            type: 'POST',
            data: {
              request: 'getAlimentosMas'
            }
          })
          .done(function (data) {
            console.log(data);
            data = JSON.parse(data);
            let html = '';
            for (let i = 0; i < data.length; i++) {
              html += `<div class="row">`+data[i]['Nombre']+`: `+data[i]['Pedidos']+`</div>`;
            };
            $('#AlimentosMás').html(html);
          });
});
