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
});
