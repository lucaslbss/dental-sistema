# 🦷 Sistema de Controle Financeiro - Clínica Odontológica

Este projeto é um sistema web minimalista desenvolvido como **Atividade Extensionista** para o curso de Bacharelado em Ciência da Computação da **Gran Faculdade**. 

O objetivo do projeto é promover a **transformação digital** de uma microempresa local (clínica odontológica), substituindo o controle financeiro feito em planilhas instáveis por um sistema local seguro, ágil e aderente aos princípios da Lei Geral de Proteção de Dados (LGPD).

## ✨ Funcionalidades

- **🔒 Autenticação Segura:** Sistema de login com proteção de rotas e senhas criptografadas via *hashing*.
- **💰 Registro de Caixa:** Cadastro rápido de pagamentos (Dinheiro, Cartão e Cheque).
- **📅 Gestão de Cheques:** Campos condicionais para rastreamento de emissor e vencimento de cheques pré-datados.
- **🔍 Filtros Dinâmicos:** Pesquisa em tempo real por data e nome do cliente.
- **📄 Relatórios em PDF:** Geração automática de relatórios de caixa diários filtrados direto no navegador, sem sobrecarregar o servidor.

## 🛠️ Tecnologias Utilizadas

**Backend:**
- [Node.js](https://nodejs.org/) - Ambiente de execução.
- [Express](https://expressjs.com/) - Framework para o servidor web e API REST.
- [SQLite](https://www.sqlite.org/) - Banco de dados relacional (arquivo local, dispensando instalação de servidores).
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografia avançada para proteção de senhas.

**Frontend:**
- HTML5, CSS3 e Vanilla JavaScript.
- [jsPDF](https://parall.ax/products/jspdf) - Biblioteca para geração de relatórios em PDF no lado do cliente.

## 🚀 Como instalar e rodar o projeto localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado na sua máquina.

### Passos de Instalação

1. Clone este repositório:
   ```bash
   git clone [https://github.com/lucaslbss/dental-sistema.git](https://github.com/lucaslbss/dental-sistema.git)