# README

Este projeto é o frontend de um aplicativo destinado a auxiliar na organização e distribuição de suprimentos, além de coordenar voluntários durante os alagamentos no Rio Grande do Sul. A aplicação visa conectar pessoas afetadas pelas enchentes com recursos essenciais e voluntários dispostos a ajudar.

## Sobre o Projeto

O objetivo deste aplicativo é facilitar uma resposta rápida e eficiente em situações de emergência causadas por enchentes, promovendo a colaboração e o apoio mútuo entre a comunidade e organizações de ajuda.

## Tecnologias Utilizadas

Este frontend foi desenvolvido utilizando as seguintes tecnologias:

- **React**: Uma biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript**: Um superconjunto de JavaScript que adiciona tipagem estática ao código.
- **Tailwind CSS**: Um framework CSS para criar designs personalizados sem sair do HTML.

## Rodando o projeto localmente

**ATENÇÃO: NÃO RODE O PROJETO USANDO A URL DE PROD.** 

Após executar os passos abaixo, é importante que você tenha uma instância da API rodando localmente para que o frontend possa se comunicar com ela.
No repositório https://github.com/SOS-RS/backend você encontra o arquivo docker-compose.dev.yml que pode ser utilizado para subir a API localmente com as instruções no readme.

## Como executar
1. Clone o repositório:
   ```
   git clone https://github.com/seuusuario/projeto-enchentes-frontend.git
   ```
2. Entre no diretório do projeto:
   ```
   cd projeto-enchentes-frontend
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
   O app estará disponível em `http://localhost:5173`.

## Contribuindo

Contribuições são muito bem-vindas! Se você tem interesse em ajudar a melhorar o app, por favor:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`).
3. Faça seus commits (`git commit -am 'Adicionando uma nova feature'`).
4. Faça push para a branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.

---

Agradecemos o seu interesse e apoio. Juntos, podemos fazer uma diferença significativa para as vítimas das enchentes no Rio Grande do Sul!
