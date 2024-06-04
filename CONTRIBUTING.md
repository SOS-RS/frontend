# Contribuindo

Você pode contribuir com o projeto de diversas formas, implementando uma
funcionalidade nova, corrigindo um bug, procurando bugs, revisando pull
requests, entre outras.
Para se inteirar do projeto, entre no
[Discord](https://discord.gg/vjZS6BQXvM) e participe das discussões.

## 🤝 Contribuindo com atividades que não são de código

O projeto precisa de ajuda em diversas frentes diferentes como: QA, produto,
design e gestão. Entre no servidor do Discord onde há canais específicos para
essas atividades.

Se você encontrou um bug, vá nas
[issues](https://github.com/SOS-RS/frontend/issues)
do projeto e reporte-o lá. Verifique antes se já não existe um bug aberto para o
problema que quer relatar, usando a busca. O mesmo vale para novas
funcionalidades.

O restante deste documento focará nas contribuições de código.

## ✅ Escolhendo qual será sua contribuição de código

Verifique no [projeto do Github](https://github.com/orgs/SOS-RS/projects/1)
quais funcionalidades ainda não foram implementadas e já estão prontas para
serem desenvolvidas, elas estarão na coluna "Disponível pra dev". Lá há itens de
backend e frontend, então atente-se para qual você gostaria de participar.

Após escolher o item que quer trabalhar, faça um comentário no issue informando
que quer contribuir para sua entrega. Uma pessoa que administra o repositório
marcará você como a pessoa responsável por aquele issue, e marcará o item como
"Em desenvolvimento".

A partir daí você já pode trabalhar no item que escolheu.

Você também pode mandar a contribuição diretamente sem avisar, mas corre o
risco de alguém solicitar para trabalhar no item e entregá-lo junto ou antes de
você, desperdiçando assim esforços. Somente faça isso se a correção for bem rápida e pontual para
evitar o desperdício.

⚠️ **Importante**: Itens de alta prioridade precisam ser entregues o mais rápido possível,
idealmente em até dois dias. Verifique se tem tempo livre suficiente para se
dedicar a um item de urgência, a fim de evitar segurar o item por tempo demais
de forma desnecessária.

## 🚀 Configuração Inicial Local

1. Faça um fork do repositório para o seu usuário (uma boa ideia é usar um nome mais descritivo do que `frontend`, como `sos-rs-frontend`).
2. Clone o repositório (troque `<seuusuario>` na url abaixo pelo seu usuário):

   ```bash
   git clone https://github.com/<seuusuario>/sos-rs-frontend.git
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

   O app estará disponível em <http://localhost:5173>.

5. Inicie o servidor de backend. Veja as instruções no seu
   [documento de contribuição](https://github.com/SOS-RS/backend/blob/develop/CONTRIBUTING.md).

## 💻 Codificando e enviando

1. Faça suas alterações.
2. Rode o lint com `npm run lint`.
3. Crie um branch com o git `git checkout -b nomedobranch`.
4. Faça um commit com `git commit`.
5. Faça um push para o seu repositório com `git push`.
6. [Sincronize seu repositório](#-sincronizando).
7. [Abra um pull request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).
  Não deixe de informar, no seu pull request, qual a issue que está fechando.
  Idealmente coloque um comentário no PR que já fechará a issue, como
  `fixes #xxxx` ou `closes #xxxx` (onde `xxxx` é o número do issue). Veja
  [como isso funciona](https://docs.github.com/pt/get-started/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests).
8. Acompanhe a revisão do PR. Algumas verificações automáticas serão feitas (o
   Github Actions rodará o build do Vite, por exemplo). Se uma delas falhar, corrija-a, a
   revisão humana só começa quando estas checagem estão passando. Após abrir o
   PR uma pessoa que administra o projeto pode pedir revisões e alterações.
   Busque respondê-las o mais rápido possível para que o PR possa ser integrado.

## 🔄 Sincronizando

Você vai precisar, de tempos em tempos, sincronizar a branch `develop` do
seu repositório. Você pode usar o botão `Sync fork` do Github
(veja [os docs](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)).
Ou você pode fazer manualmente, o que te permite fazer a sincronização sem depender do Github:

1. Antes de mais nada, se estiver no meio de uma contribuição, verifique que já commitou
   tudo que tinha pra commitar, e então faça checkout do branch `develop`:

   ```bash
   git checkout develop
   ```

2. Adicione o repositório oficial como remoto com nome `upstream` (só necessário na primeira vez):

   ```bash
   git remote add upstream https://github.com/SOS-RS/frontend.git
   ```

3. Faça pull do branch `develop`:

   ```bash
   git pull upstream develop
   ```

4. Se estiver no meio de uma contribuição, faça um rebase no branch `develop`
   (substitua `<seubranch>` pelo nome do seu branch):

   ```bash
   git checkout <seubranch>
   git rebase develop
   ```

   Após o rebase, é importante rodar novamente a aplicação e verificar se tudo
   continua funcionando.
