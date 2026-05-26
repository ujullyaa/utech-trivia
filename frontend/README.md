# 🏆 uTech Trivia - Desafio Técnico

Um jogo de perguntas e respostas (Trivia) desenvolvido como solução para desafio técnico Full-Stack. A aplicação consome uma API de perguntas, calcula a pontuação do usuário e salva um ranking persistente em banco de dados.

## 🚀 Tecnologias e Arquitetura

O projeto foi dividido em duas camadas principais, garantindo separação de responsabilidades:

**Front-end (Client):**
* **React + TypeScript:** Construído com Vite para máxima performance.
* **Zustand:** Gerenciamento de estado global leve e moderno (evitando *prop drilling*).
* **React Router DOM:** Navegação fluida entre telas (Single Page Application).
* **CSS Nativo (Neumorfismo):** Interface responsiva com design 3D soft, garantindo excelente UI/UX sem dependência de bibliotecas externas pesadas.

**Back-end (API):**
* **Python + FastAPI:** Framework assíncrono e de alta performance.
* **SQLite:** Banco de dados relacional leve e embutido para persistência do Top 5.
* **Docker:** Containerização para garantir que o ambiente rode perfeitamente em qualquer máquina.

## ✨ Diferenciais Implementados

* **Resiliência (Fallback):** O back-end possui um mecanismo de *mock* automático. Caso a API externa de perguntas fique fora do ar (Erro 404/503), o sistema injeta um pacote de perguntas de backup, garantindo que a aplicação nunca quebre na tela do usuário.
* **Blindagem de Banco de Dados:** Uso de validações `IF NOT EXISTS` para garantir que as tabelas sejam recriadas dinamicamente caso o container do Docker seja limpo ou reiniciado.
* **Tipagem Estrita:** Uso rigoroso de interfaces no TypeScript para garantir previsibilidade na comunicação entre os contratos da API e o Front-end.

## 🤖 Ferramentas e Assistência

Em nome da transparência e das boas práticas de desenvolvimento moderno, destaco que este projeto foi desenvolvido com o auxílio de Inteligências Artificiais (como Google Gemini e Anthropic Claude) atuando como *pair programmers*. As ferramentas foram utilizadas de forma estratégica para acelerar o processo de *debugging* (como resolução de problemas de CORS e portas do Docker), construção do design Neumórfico em CSS e revisão de código, sempre mantendo a tomada de decisão arquitetural e a lógica central sob minha responsabilidade.

## 🛠️ Como rodar o projeto localmente

### 1. Subindo a API (Back-end)
Certifique-se de ter o Docker instalado na sua máquina. Abra o terminal na raiz do projeto e execute:

`bash`
docker run --rm -p 8000:8000 -v "$PWD:/app" --name utech_backend mini-game_backend:latest uvicorn main:app --host 0.0.0.0 --port 8000 --reload
`bash`
*A API estará rodando em `http://localhost:8000`. O banco de dados SQLite será inicializado automaticamente.*

### 2. Subindo a Interface (Front-end)
Abra uma nova aba do terminal, navegue até a pasta do front-end e instale as dependências:

`bash`
cd frontend
npm install
`bash`

Em seguida, inicie o servidor de desenvolvimento:

`bash`
npm run dev
`bash`
*Acesse o jogo no seu navegador através do link: `http://localhost:5173/`*

---
Desenvolvido por **Jullya Estelita**.