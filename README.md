# Football Radar  
Real-time football match radar, with integration between frontend and backend via REST routes. External API consumption using Node, dynamic updates via polling, Redis caching, and a responsive interface built with React.

## 🖥️ Frontend  
- React.js with Vite  
- React Router DOM for navigation between pages  
- Asynchronous requests to the backend via Axios  
- Responsive CSS, adapting the interface for smaller screens

## ⚙️ Backend  
- Node.js with Express  
- Structure with controllers and routes  
- Integration with the external API from api-football  
- Data updates using polling  
- Redis for caching and reducing repeated requests

## Features  
- Live match list  
- Complete match details:  
  - Real-time score  
  - Match time  
  - Lineups  
  - Events  
  - Statistics

## About the API  
This project uses the [Api-Football](https://www.api-football.com/) API to retrieve real-time football match data.

⚠️ Attention: the API requires an access key (API Key), which is currently linked to a paid plan.  
Therefore, the project will not work properly without a valid key.

If you want to test it locally, you can:

- Request access to the API from the official website  
- Create a `.env` file based on the `.env.example`  
- The codebase is prepared to work as soon as a valid key is provided in the `.env` file.

## 🛠️ How to run locally  

Clone the repository:
```bash
git clone git@github.com:LippeTK/radar-esportivo.git
```
Install the dependencies:

   cd backend && npm install

   cd ../frontend && npm install

Create the .env file in the backend folder with your API key.

Run backend and frontend separately:

```
cd backend
npm start
cd ../frontend
npm run dev
```
📸 Preview
Want to see the project in action? Check it out **[here](https://imgur.com/a/6acBmpG)**!

Developed by Felipe Carvalho



# Radar de futebol

Radar de partidas de futebol em tempo real, com integração entre frontend e backend próprio via rotas REST.
Consumo de API externa com Node, atualizações dinâmicas via polling, cache com Redis e interface responsiva em React.

## Tecnologias

### 🖥️ Frontend

- **React.js** com **Vite**
- **React Router DOM** para navegação entre páginas
- Requisições assíncronas ao backend via `axios`
- CSS **responsivo**, adaptadando a interface para telas menores

### ⚙️ Backend

- **Node.js** com **Express**
- Estrutura com `controller` e `routes`
- Integração com **API externa** da [api-football](https://www.api-football.com/)
- Atualização de dados com **polling**
- Uso de **Redis** para cache e redução de requisições repetidas

## Funcionalidades

- Lista de partidas ao vivo
- Detalhamento completo da partida:
  - Placar em tempo real
  - Tempo de jogo
  - Escalações
  - Eventos
  - Estatísticas

## Sobre a API

Este projeto utiliza a [API da api-football](https://www.api-football.com/) para obter dados em tempo real de partidas de futebol.

⚠️ **Atenção:** a API requer uma chave de acesso (API Key), que atualmente está vinculada a um plano pago.  
Por isso, o projeto **não funcionará corretamente sem uma chave válida**.

Caso deseje testar localmente, você pode:

- Solicitar acesso à API no site oficial
- Criar `.env` com base no `.env.example`

A estrutura do código está preparada para funcionar assim que uma chave for fornecida no `.env`.

## 🛠️ Como rodar localmente

1. Clone o repositório:

   ```bash
   git clone git@github.com:LippeTK/radar-esportivo.git

   ```

2. Instale as dependências:

   cd backend && npm install

   cd ../frontend && npm install

3. Crie o arquivo .env na pasta backend com sua chave da API.

4. Rode o backend e o frontend separadamente:

```
  cd backend
  npm start
  cd ../frontend
  npm run dev
```

## 📸 Preview

Quer ver o projeto em ação? Confira **[aqui](https://imgur.com/a/6acBmpG)**!

Desenvolvido por
Felipe Carvalho
