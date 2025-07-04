const main = document.querySelector('main');

const rotas = {
  home: {
    html: 'pages/home.html',
    js: 'script/home.js'
  },
  products: {
    html: 'pages/products.html',
    js: 'script/products.js'
  },
  orders: {
    html: 'pages/orders.html',
    js: 'script/orders.js'
  },
  checkout: {
    html: 'pages/checkout.html',
    js: 'script/checkout.js'
  },
  config: {
    html: 'pages/config.html',
    js: 'script/config.js'
  },
  login: {
    html: 'pages/login.html',
    js: 'script/login.js'
  }
};

function esconderIndicadores() {
  document.querySelectorAll('img[id^="Indicator"]').forEach(ind => {
    ind.style.visibility = 'hidden';
  });

  // Só aplica cor aos links com id começando com btn
  document.querySelectorAll('a[id^="btn"]').forEach(link => {
    link.style.color = '#7C8DB5';
  });
}

function ativarIndicadorPorHash(hash) {
  esconderIndicadores();

  const idBotao = {
    '#/home': 'btnInicial',
    '#/products': 'btnProdutos',
    '#/orders': 'btnPedidos',
    '#/checkout': 'btnVendas',
    '#/config': 'btnConfiguration',
    '#/login': 'btnSair'
  }[hash];

  const linkAtivo = document.getElementById(idBotao);
  if (linkAtivo) {
    linkAtivo.style.color = '#4A0060';

    // Corrigido: encontra corretamente o li pai
    const li = linkAtivo.closest('li');
    const indicador = li?.querySelector('img[id^="Indicator"]');
    if (indicador) indicador.style.visibility = 'visible';
  }
}

async function carregarArquivo(arquivo) {
  try {
    const resposta = await fetch(arquivo);
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return await resposta.text();
  } catch (erro) {
    return `<p>Erro ao carregar conteúdo: ${erro.message}</p>`;
  }
}

async function atualizarRota() {
  let hash = window.location.hash || '#/home';
  const rota = hash.replace('#/', '');

  ativarIndicadorPorHash(hash);

  if (rotas[rota]) {
    const { html, js } = rotas[rota];
    main.innerHTML = 'Carregando...';

    const conteudo = await carregarArquivo(html);
    main.innerHTML = conteudo;

    document.querySelectorAll('script[data-dinamico]').forEach(el => el.remove());

    const script = document.createElement("script");
    script.src = js;
    script.setAttribute("data-dinamico", "true");
    script.onload = () => {
      if (rota === 'home') {
        setTimeout(() => {
          renderLineChart();
          renderDonutChart();
        }, 100);
      }
    };
    document.body.appendChild(script);
  } else {
    main.innerHTML = "<p>Página não encontrada.</p>";
  }
}


window.addEventListener('hashchange', atualizarRota);
window.addEventListener('load', atualizarRota);
