# HealthConnect | Dashboard de Telemedicina 🩺

Este projeto é uma aplicação Full-Stack funcional focada no setor de Telemedicina. Ele demonstra a integração entre uma interface moderna e a persistência de dados em tempo real utilizando PostgreSQL.

## 🚀 Funcionalidades

- **Agendamento com Persistência**: Integração real com Supabase para salvar consultas diretamente no banco de dados.
- **Interface Responsiva**: Construída com Tailwind CSS para garantir fidelidade ao design e performance.
- **Log de Execução Visual**: Terminal embutido que monitora a conexão com o banco e o status do pagamento em tempo real.
- **Segurança de Dados**: Implementação de Row Level Security (RLS) no PostgreSQL para proteção de inserções.

## 📂 Estrutura do Projeto

A organização segue o modelo de separação de responsabilidades para facilitar a escalabilidade:

```text
.
├── database/           # Scripts SQL e documentação do banco de dados
│   └── schema.sql      # Estrutura das tabelas e políticas de segurança
├── frontend/           # Interface do usuário e lógica de cliente
│   ├── index.html      # Estrutura principal
│   ├── app.js          # Lógica de agendamento e conexão API
│   ├── style.css       # Estilização personalizada
│   └── config.js       # Configurações de ambiente (ignorado no Git)
└── README.md           # Documentação principal

## 🛠️ Tecnologias

- **Frontend**: HTML5, Tailwind CSS e JavaScript Vanilla (ES6+).
- **Backend/BaaS**: Supabase (PostgreSQL) para persistência de dados e Row Level Security.
- **DevOps/Tooling**: Git para versionamento e Live Server para ambiente local.

## 📌 Como Rodar o Projeto

1. **Clone o repositório** para sua máquina local.
2. Certifique-se de ter a extensão **Live Server** instalada no seu VS Code.
3. **Configure as chaves**: Crie um arquivo `config.js` dentro da pasta `/frontend` usando suas credenciais do Supabase (veja o `config.example.js`).
4. **Prepare o Banco**: Execute o script contido em `database/schema.sql` no Editor SQL do seu painel Supabase.
5. **Inicie**: Clique com o botão direito no `index.html` (dentro de `/frontend`) e selecione **"Open with Live Server"**.

---
Desenvolvido por **Mac-Toni**.
```
