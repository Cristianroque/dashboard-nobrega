const userElement = document.querySelector("#name");
const chartElement = document.querySelector("#chart");

const nome = "Cristian";
if (userElement) {
    userElement.textContent = nome;
}

function renderLineChart() {
  const el = document.querySelector("#chart");
  if (!el) return;

  const options = {
    series: [{
      name: "Vendas",
      data: [5000, 15000, 25000, 35000, 20000, 25000]
    }],
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: false },
      animations: { enabled: true },
      fontFamily: 'Poppins, sans-serif',
      zoom: { enabled: false },
      background: 'transparent'
    },
    stroke: {
      width: 4,  // Linha mais grossa
      curve: 'smooth',
      colors: ['#9B27B0']
    },
    grid: {
      show: true,
      borderColor: '#f0f0f0',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      }, 
      yaxis: {
        lines: {
          show: true,
          opacity: 0.3
        }
      }
    },
    xaxis: {
      categories: ['1', '5', '10', '15', '25', '30'],
      title: { 
        text: 'Dias',
        style: {
          fontFamily: 'Poppins, sans-serif',
          color: '#666',
          fontSize: '12px'
        } 
      },
      labels: { 
        style: { 
          colors: '#666',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '11px'
        } 
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: { 
        text: 'Valor (R$)',
        style: {
          fontFamily: 'Poppins, sans-serif',
          color: '#666',
          fontSize: '12px'
        } 
      },
      labels: {
        formatter: v => 'R$' + (v/1000).toFixed(0) + 'k',
        style: {
          fontFamily: 'Poppins, sans-serif',
          colors: '#666',
          fontSize: '11px'
        }
      },
      min: 0,
      max: 40000,
      tickAmount: 4
    },
    colors: ['#9B27B0'],
    markers: {
      size: 6,  // Marcadores maiores
      colors: ['#fff'],
      strokeColors: '#9B27B0',
      strokeWidth: 3,  // Borda mais grossa nos marcadores
      hover: {
        size: 8
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: "vertical",
        gradientToColors: ["#E1BEE7"],
        stops: [0, 80, 100],
        opacityFrom: 0.8,
        opacityTo: 0.2
      }
    },
    tooltip: {
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '12px'
      },
      y: {
        formatter: function(value) {
          return "R$" + value.toLocaleString('pt-BR');
        }
      }
    }
  };
  new ApexCharts(el, options).render();
}

function renderDonutChart() {
  const el = document.querySelector("#donut-chart");
  if (!el) return;

  const options = {
    series: [38.6, 22.5, 30.8],
    labels: ["Cancelado", "Finalizado", "Em andamento"],
    chart: {
      type: 'donut',
      height: 300,
      fontFamily: 'Poppins, sans-serif'
    },
    colors: ['#2C044A', '#9B27B0', '#B832F9'],
    stroke: {
      show: true,
      width: 10,
      colors: ['#fff']
    },
    legend: {
      position: 'right',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      markers: { width: 10, height: 10, radius: 12 },
      itemMargin: { vertical: 5 }
    },
    dataLabels: { 
      enabled: false,
      style: {
        fontFamily: 'Poppins, sans-serif'
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: { 
            show: false,
            style: {
              fontFamily: 'Poppins, sans-serif'
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: val => `${val.toFixed(1)}%`
      },
      style: {
        fontFamily: 'Poppins, sans-serif'
      }
    }
  };
  new ApexCharts(el, options).render();
}