(function () {
  'use strict';

  if (window.__PEDIDOS_APP__) {
    console.log('[Pedidos] Módulo já carregado - Reinicializando');
    return window.__PEDIDOS_APP__.init();
  }

  // Sistema principal em closure
  const PedidosApp = {
    config: {
      maxRetries: 3,
      retryDelay: 500
    },
    state: {
      initialized: false,
      retryCount: 0
    },
    elements: {},
    data: {
      pedidos: []
    },

    init: function () {
      if (this.state.initialized) {
        console.warn('[Pedidos] Já inicializado');
        return this.cleanup().then(() => this._initialize());
      }
      return this._initialize();
    },

    // Inicialização interna
    _initialize: function () {
      console.log('[Pedidos] Iniciando módulo...');

      return this._loadElements()
        .then(() => this._loadData())
        .then(() => this._setupEvents())
        .then(() => {
          this.state.initialized = true;
          this.render();

          // Inicializa o AOS aqui depois de renderizar
          if (window.AOS) {
            window.AOS.init({
              duration: 800, // duração da animação em ms
              easing: 'ease-in-out',
              once: true // anima uma vez só
            });
          }

          console.log('[Pedidos] Módulo pronto');
        })
        .catch(error => {
          console.error('[Pedidos] Erro na inicialização:', error);
          this._handleRetry();
        });
    },

    // Carrega elementos DOM
    _loadElements: function () {
      return new Promise((resolve, reject) => {
        this.elements.container = document.getElementById('pedidosContainer');
        this.elements.searchInput = document.getElementById('searchInput');

        if (!this.elements.container) {
          const err = new Error('Container não encontrado');
          console.error(err);
          reject(err);
          return;
        }

        resolve();
      });
    },

    // Carrega dados
    _loadData: function () {
      return new Promise((resolve) => {
        try {
          this.data.pedidos = [{
            id: 19263,
            quantidade: 5,
            dataCriacao: '2025-06-08',
            dataEntrega: '2025-06-15',
            personalizacao: 'Nome e número',
            tecidos: ['Algodão', 'Poliester'],
            vendedor: 'Revendedor A',
            statusPedido: 'Finalizado',
            statusAaa: 'Ativo'
          }];
          resolve();
        } catch (error) {
          console.error('[Pedidos] Erro ao carregar dados:', error);
          this.data.pedidos = [];
          resolve(); // Continua mesmo sem dados
        }
      });
    },

    // Configura eventos
    _setupEvents: function () {
      return new Promise((resolve) => {
        if (this.elements.searchInput) {
          this.elements.searchInput.removeEventListener('input', this._handleSearch);
          this.elements.searchInput.addEventListener(
            'input',
            this._handleSearch.bind(this)
          );
        }
        resolve();
      });
    },

    // Renderização
    render: function (pedidos = this.data.pedidos) {
      if (!this.elements.container) return;

      try {
        this.elements.container.innerHTML = pedidos
          .map(pedido => this._createPedidoHTML(pedido))
          .join('');
      } catch (error) {
        console.error('[Pedidos] Erro ao renderizar:', error);
        this._showError();
      }
    },

    // Cria HTML do pedido
    _createPedidoHTML: function (pedido) {
      return `
        <div class="pedido-card">
          <div class="pedido-img">Capa</div>
          <div class="pedido-info">
            <div><strong>Quantidade:</strong> ${pedido.quantidade}</div>
            <div><strong>Data criação:</strong> ${this._formatDate(pedido.dataCriacao)}</div>
            <div><strong>Data entrega:</strong> ${this._formatDate(pedido.dataEntrega)}</div>
            <div><strong>Personalização:</strong> ${pedido.personalizacao}</div>
            <div><strong>Tecidos:</strong> ${pedido.tecidos.join(', ')}</div>
            <div><strong>Vendedor:</strong> ${pedido.vendedor}</div>
          </div>
        </div>
      `;
    },

    // Manipulador de busca
    _handleSearch: function (event) {
      const termo = event.target.value.toLowerCase();
      const resultados = this.data.pedidos.filter(pedido =>
        pedido.vendedor.toLowerCase().includes(termo) ||
        pedido.personalizacao.toLowerCase().includes(termo)
      );
      this.render(resultados);
    },

    // Formatação de data
    _formatDate: function (dateString) {
      try {
        return new Date(dateString).toLocaleDateString('pt-BR');
      } catch {
        return dateString;
      }
    },

    // Limpeza antes de reinicializar
    cleanup: function () {
      return new Promise((resolve) => {
        if (this.elements.searchInput) {
          this.elements.searchInput.removeEventListener('input', this._handleSearch);
        }
        this.state.initialized = false;
        resolve();
      });
    },

    // Tratamento de retentativa
    _handleRetry: function () {
      if (this.state.retryCount < this.config.maxRetries) {
        this.state.retryCount++;
        console.warn(`[Pedidos] Tentativa ${this.state.retryCount} de ${this.config.maxRetries}`);
        setTimeout(() => this.init(), this.config.retryDelay * this.state.retryCount);
      } else {
        this._showError();
      }
    },

    // Exibe erro
    _showError: function () {
      if (this.elements.container) {
        this.elements.container.innerHTML = `
          <div class="pedido-error">
            <p>Erro ao carregar pedidos. <a href="#/pedidos" onclick="location.reload()">Recarregar</a></p>
          </div>
        `;
      }
    }
  };

  // Expõe globalmente com verificação
  window.__PEDIDOS_APP__ = PedidosApp;

  // Inicialização controlada
  if (document.readyState === 'complete') {
    PedidosApp.init();
  } else {
    document.addEventListener('DOMContentLoaded', () => PedidosApp.init());
  }
})();