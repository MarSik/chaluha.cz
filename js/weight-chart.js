$(document).ready(function() {
  const table = $("#weight");
  const chartData = {
        labels: ["0", "1", "2", "3"],
        datasets: []
    };

  table.find('tr').slice(1).each(function() {
        const $cells = $(this).find('td');
        
        // First cell is the dataset label
        const datasetLabel = $cells.first().text().trim();
        
        // Collect numeric data from remaining cells
        const datasetValues = $cells.slice(1).map(function() {
            const value = parseFloat($(this).text().trim());
            return isNaN(value) ? null : value;
        }).get();

        const datasetColor = $(this).attr("data-color");

        // if (datasetLabel == "Jahoda") {
        //   datasetColor = "#ff1010";
        // } else if (datasetLabel == "Jarisch") {
        //   datasetColor = "#10f7ff";
        // } else if (datasetLabel == "Jód") {
        //   datasetColor = "#ff9810";
        // } else if (datasetLabel == "Jitrocel") {
        //   datasetColor = "#00b312";
        // }

        // Add dataset to chart data
        chartData.datasets.push({
            label: datasetLabel,
            data: datasetValues,
            borderColor: datasetColor,
            backgroundColor: datasetColor,
        });
    });
    console.log("D ", chartData);


    // Create Chart.js chart
    const ctx = document.getElementById('weight-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line', // or 'line', etc.
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                      text: "hmotnost [g]",
                      display: true,
                    },
                    beginAtZero: true,
                },
                x: {
                    title: {
                      text: "věk [den]",
                      display: true,
                    },
                }
            }
        }
    });

    table.hide();
    $("#weight-chart").show();
});
