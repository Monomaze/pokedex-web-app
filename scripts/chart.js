

function renderChart() {
    let [hp, attack, defense, spatk, spdef, speed] = getPokemonStats();
    console.log(hp);
    const ctx = document.getElementById(`chart-${pokemonId}`);

    const data = {
        labels: [
            'HP',
            'Sp. Atk',
            'Sp. Def',
            'Speed',
            'Defense',
            'Attack'
        ],
        datasets: [{
            label: "base stats",
            data: [hp, spatk, spdef, speed, defense, attack],
            fill: true,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)'
              ],
          }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                y: {
                  beginAtZero: true
                }
              }
        },
    };

    let myChart = new Chart(ctx, config);
}