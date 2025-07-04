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
      fontFamily: 'Poppins, sans-serif'
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    xaxis: {
      categories: ['1', '5', '10', '15', '25', '30'],
      title: { 
        text: 'Dias',
        style: {
          fontFamily: 'Poppins, sans-serif'
        } 
      },
      labels: { 
        style: { 
          colors: '#9A2EB1',
          fontFamily: 'Poppins, sans-serif'
        } 
      }
    },
    yaxis: {
      title: { 
        text: 'Valor (R$)',
        style: {
          fontFamily: 'Poppins, sans-serif'
        } 
      },
      labels: {
        formatter: v => 'R$' + v.toLocaleString('pt-BR'),
        style: {
          fontFamily: 'Poppins, sans-serif'
        }
      }
    },
    colors: ['#B832F9'],
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColors: '#7E1B9A',
      strokeWidth: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        gradientToColors: ["#E1BEE7"],
        opacityFrom: 0.4,
        opacityTo: 0.1
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