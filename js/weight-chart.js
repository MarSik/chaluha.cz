$(document).ready(function() {
  const table = $("#weight");
  const events = $("#events");
  
  const chartData = {
        labels: [],
        datasets: []
    };

  const annotations = {
  };

  events.find('tr').each(function () {
      const $cells = $(this).find('td');
      const $day = $cells.first().text().trim();
      const $position = $(this).attr("data-position");

      annotations["day" + $day] = {
          type: 'line',
          scaleID: 'x',
          borderWidth: 1,
          borderColor: 'black',
          value: $day,
          label: {
            // rotation: 'auto',
            position: $position || "end",
            backgroundColor: 'black',
            content: $cells.slice(1).first().text().trim(),
            display: true
          },
      };
  });

console.log("annotations", annotations);

  table.find('thead tr').first().find('th').slice(1).each(function() {
      chartData.labels.push($(this).text().trim());
  });

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
            plugins: {
              annotation: {
                annotations: annotations,
              },
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
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

    $(".chart-data").hide();
    $(".chart-view").show();
    $("#weight-chart").show();
});
