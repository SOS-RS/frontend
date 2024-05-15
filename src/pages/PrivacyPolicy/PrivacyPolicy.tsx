import { BurgerMenu, Header } from '@/components';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col h-screen items-center">
      <Header title="SOS Rio Grande do Sul" startAdornment={<BurgerMenu />} />
      <div className="w-full flex flex-col gap-4 p-4 max-w-4xl [&_*]:text-zinc-500 pb-8">
        <h3 className="text-4xl pt-4 font-bold !text-zinc-900">
          Política de privacidade
        </h3>
        <p className="text-justify text-md">
          Ao entrar para o <b>SOS RS 🛟</b>, você nos confia uma série de
          informações. E nós cuidamos e protegemos essas informações, para você.
          Aqui você vai entender quais informações coletamos e o porquê de
          fazermos isso. E, ainda, como você pode atualizar, acompanhar ou, até
          mesmo, excluir esses dados.
        </p>
        <p className="text-justify text-md">
          Desenvolvemos um mapa dinâmico que consolida diversas informações
          sobre as enchentes, incluindo localização de abrigos e suas demandas,
          o que ajuda diariamente as vítimas das enchentes no RS. Nossas
          soluções incluem usar a mais avançada tecnologia para mostrar a
          disponibilidade dos abrigos e as necessidades de doação para cada um
          deles.
        </p>
        <p className="text-justify text-md">
          O <b>SOS RS 🛟</b> declara manter sigilo e confidencialidade sobre os
          dados pessoais cadastrados, mas, como a plataforma é alimentada por
          toda a comunidade, não nos responsabilizamos pela:
        </p>
        <ul>
          <li>1. Veracidade das informações;</li>
          <li>2. Qualidades de eventuais itens doados;</li>
          <li>3. Correção das necessidades apontadas;</li>
        </ul>
        <p className="text-justify text-md">
          Declaramos seguir os princípios de proteção de dados consolidados nas
          legislações vigentes no Brasil, especialmente, a Resolução{' '}
          <b>CFM Nº 2299 DE 30/09/2021</b>.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Coleta de informações
        </h5>
        <p className="text-justify text-md">
          Coletamos apenas informações imprescindíveis para desempenhar nosso
          propósito. As informações coletadas e como essas informações são
          utilizadas dependem de como e do quanto você utiliza o <b>SOS RS 🛟</b>
          . Armazenamos as informações que coletamos.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Itens que você cria ou nos fornece
        </h5>
        <p className="text-justify text-md">
          Ao cadastrar um abrigo, você nos fornece, inicialmente, informações
          pessoais, como seu nome e CPF. Ao alimentar nosso aplicativo, você
          fornece dados sobre os abrigos, os quais você, usuário, se
          responsabiliza integralmente, e que também são fornecidos para a
          comunidade, após alimentação, e podem ser armazenados pelo SOS-RS.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Informações que coletamos automaticamente quando você utiliza nossos
          serviços
        </h5>
        <p className="text-justify text-md">
          Utilizamos apenas cookies temporários, com ID de sessão do servidor e
          dados de localização, quando autorizados, para otimizar sua
          experiência na plataforma. É possível redefinir seu navegador da web
          para recusar todos os cookies, todavia alguns recursos nossos podem
          não funcionar corretamente, se a sua capacidade de aceitar cookies
          estiver desabilitada.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Por que o SOS RS coleta dados
        </h5>
        <p className="text-justify text-md">
          Usamos as informações coletadas para auxiliar a fornecer, manter e
          melhorar a logística de suprimentos e disponibilidade em abrigos.
          Também para:
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Entrar em contato com você
        </h5>
        <p className="text-justify text-md">
          Se você for um abrigo, usamos as informações que coletamos para
          interagir diretamente com você.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Compartilhamento de suas informações
        </h5>
        <p className="text-justify text-md">
          Podemos compartilhar os dados com a comunidade e outras soluções do
          mesmo grupo e segmento, para cumprimento do nosso propósito e outros
          fins que julgarmos pertinente.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Por motivos legais
        </h5>
        <p className="text-justify text-md">
          Talvez precisemos compartilhar informações pessoais suas para fora do
          SOS, se isso for absolutamente necessário para cumprir a lei ou
          solicitação governamental ou judicial não abusiva.
        </p>
        <p className="text-justify text-md">
          Se o <b>SOS RS 🛟</b> realizar fusão, aquisição ou venda, continuará a
          garantir a confidencialidade das suas informações pessoais e avisará
          os afetados antes que as informações sejam transferidas ou submetidas
          a uma política de privacidade diferente.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Mantemos suas informações seguras
        </h5>
        <p className="text-justify text-md">
          Possuímos segurança que protege continuamente suas informações, o que
          inclui:
        </p>
        <ul className="space-y-2">
          <li className="text-justify text-md">
            1. A utilização de criptografia para manter os seus dados pessoais
            privados enquanto estão em trânsito. Seus dados são, portanto,
            transferidos por uma conexão segura.
          </li>
          <li className="text-justify text-md">
            2. A restrição ao acesso a informações personalíssimas de pessoas
            físicas por parte de outros usuários e desenvolvedores. E ainda, o
            rigoroso treinamento e cumprimento de obrigações de
            confidencialidade para os que possuem acesso total aos dados.
          </li>
        </ul>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Exportar e excluir informações
        </h5>
        <p className="text-justify text-md">
          Nossos desenvolvedores permitem solicitar a exclusão dos seus dados
          pessoais, enviando um e-mail para <b>contato@sos-rs.com</b>.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Retenção de suas informações e compliance
        </h5>
        <p className="text-justify text-md">
          Reteremos suas informações por quanto tempo for necessário para
          satisfazer as finalidades para as quais elas foram coletadas ou para
          cumprir com os requerimentos legais aplicáveis.
        </p>
        <p className="text-justify text-md">
          Eventualmente os dados serão descartados após o encerramento do
          propósito do <b>SOS RS 🛟</b>. A nossa política de exclusão garante que
          os dados fornecidos sejam removidos de forma segura e completa dos
          nossos servidores. Para manter as suas informações protegidas em caso
          de exclusão acidental, pode haver um espaço de tempo entre o momento
          em que você solicita excluir ou exclui algo e o momento em que as
          cópias são definitivamente excluídas dos nossos sistemas ativos e de
          backup.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Você pode, a qualquer momento:
        </h5>
        <p className="text-justify text-md">
          Atualizar, inativar e corrigir, remover e solicitar acesso às suas
          informações.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Dados de contato
        </h5>
        <p className="text-justify text-md">
          Entre em contato conosco em caso de dúvidas, pelo e-mail{' '}
          <b>contato@sos-rs.com</b>. Você também pode travar contato com a
          autoridade local de proteção de dados, se possuir dúvidas sobre seus
          direitos de acordo com a legislação brasileira.
        </p>
        <h5 className="text-2xl pt-4 font-bold !text-zinc-900">
          Quando esta política se aplica e alterações
        </h5>
        <p className="text-justify text-md">
          Esta Política de Privacidade se aplica ao <b>SOS RS 🛟</b>. Nos
          reservamos ao direito de alterar este documento periodicamente, porém
          não reduziremos seus direitos nesta Política de Privacidade, sem seu
          consentimento e aviso prévio.
        </p>
      </div>
    </div>
  );
};

export { PrivacyPolicy };
