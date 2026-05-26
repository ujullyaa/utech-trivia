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

## 🛠️ Como rodar o projeto localmente

### 1. Subindo a API (Back-end)
Certifique-se de ter o Docker instalado na sua máquina. Abra o terminal na raiz do projeto e execute:

```bash
docker run --rm -p 8000:8000 -v "$PWD:/app" --name utech_backend mini-game_backend:latest uvicorn main:app --host 0.0.0.0 --port 8000 --reload