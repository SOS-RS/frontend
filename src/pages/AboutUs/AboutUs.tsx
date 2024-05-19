import { useMemo } from 'react';
import { HandHeart, Home, Loader, Users } from 'lucide-react';

import { BurgerMenu, Header } from '@/components';
import { AboutCardInfo, ServicedFrontInfo } from './components';
import { frontItems } from './frontItems';
import { useGithubContributors } from '@/hooks';
import WithTooltip from '@/components/ui/with-tooltip';
import { removeDuplicatesByField } from '@/lib/utils';

const AboutUs = () => {
  const { data: frontendContributors, loading: loadingFrontendContributors } =
    useGithubContributors('sos-rs', 'frontend');
  const { data: backendContributors, loading: loadingBackendContributors } =
    useGithubContributors('sos-rs', 'backend');

  const loading = useMemo(
    () => loadingBackendContributors || loadingFrontendContributors,
    [loadingBackendContributors, loadingFrontendContributors]
  );
  const contributors = useMemo(
    () =>
      removeDuplicatesByField(
        'login',
        frontendContributors,
        backendContributors
      ),
    [frontendContributors, backendContributors]
  );

  return (
    <div className="flex h-screen flex-col items-center">
      <Header title="SOS Rio Grande do Sul" startAdornment={<BurgerMenu />} />
      <div className="flex w-full max-w-4xl flex-col gap-4 p-4 pb-8">
        <h2 className="pt-4 text-4xl font-semibold !text-zinc-900">
          Sobre nós
        </h2>
        <h4 className="text-lg font-medium text-muted-foreground">
          Conheça a história do projeto SOS RS
        </h4>
        <h3 className="mt-8 text-2xl font-medium text-muted-foreground">
          Como tudo começou
        </h3>
        <p className="text-md text-justify font-medium md:text-lg [&>a]:text-blue-500 [&>a]:hover:text-blue-600 [&>a]:active:text-blue-700">
          Iniciado no domingo (04/05) e concluído na segunda (05/05), após 18
          horas seguidas de desenvolvimento, nosso webapp <b>SOS RS 🛟</b>,
          idealizado e desenvolvido por{' '}
          <a
            className="hover:underline"
            href="https://www.linkedin.com/in/klaus-riffel-69441928/"
            target="_blank"
          >
            Klaus Riffel
          </a>
          ,{' '}
          <a
            className="hover:underline"
            href="https://www.linkedin.com/in/rhuam/"
            target="_blank"
          >
            Rhuam Estevam
          </a>
          ,{' '}
          <a
            className="hover:underline"
            href="https://www.linkedin.com/in/jos%C3%A9-fagundes/"
            target="_blank"
          >
            José Fagundes
          </a>
          ,{' '}
          <a
            className="hover:underline"
            href="https://www.linkedin.com/in/manoelfpjunior/"
            target="_blank"
          >
            Manoel Júnior
          </a>{' '}
          e{' '}
          <a
            className="hover:underline"
            href="https://www.linkedin.com/in/viniciusrnt/"
            target="_blank"
          >
            Vinicius Arantes
          </a>
          , atingiu resultados verdadeiramente inspiradores.
        </p>
        <p className="text-md text-justify font-medium md:text-lg">
          O SOS RS rapidamente ganhou destaque nos grupos de WhatsApp, graças ao
          seu modelo colaborativo. Alcançamos rapidamente o nível de todas as
          outras iniciativas de gestão de demanda combinadas e lançamos nossa
          comunidade open source, recebendo uma enxurrada de contribuições:
          nosso projeto alcançou <b>400 estrelas no GitHub</b> e foi{' '}
          <b>forkeado mais de 150 vezes!</b>
        </p>
        <h3 className="mt-8 text-2xl font-medium text-muted-foreground">
          Nossos parceiros
        </h3>
        <p className="text-md text-justify font-medium md:text-lg">
          Formamos parcerias sólidas com mais de 1400 voluntários, fortalecendo
          ainda mais nossa missão. Hoje, comemoramos números que falam por si.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <AboutCardInfo
            icon={<Home />}
            topLabel="mais de"
            centerLabel="500"
            bottomLabel="abrigos atendidos"
            className="flex-1"
          />
          <AboutCardInfo
            icon={<Users />}
            topLabel="apoio de mais de"
            centerLabel="1400"
            bottomLabel="voluntários"
            className="flex-1"
          />
          <AboutCardInfo
            icon={<HandHeart />}
            topLabel="mais de"
            centerLabel="40.000"
            bottomLabel="pessoas beneficiadas desde o lançamento"
            className="w-full"
          />
        </div>
        <p className="text-md text-justify font-medium md:text-lg">
          Atualmente, o <b>SOS RS 🛟</b> apoia a gestão das demandas e
          necessidades dos abrigos do Rio Grande do Sul com informações
          públicas, atualizadas, confiáveis e auditáveis.
        </p>
        <h3 className="mt-4 text-2xl font-medium text-muted-foreground">
          Frentes atendidas
        </h3>
        <div className="flex flex-col gap-6">
          {frontItems.map((item, idx) => (
            <ServicedFrontInfo key={idx} {...item} />
          ))}
        </div>
        <p className="text-md mt-4 text-justify font-medium md:text-lg">
          O grupo de voluntários do SOS RS já soma mais de 2100 pessoas e cerca
          de 126 mil horas de trabalho desde a criação da iniciativa.
        </p>
        <h3 className="mt-4 text-2xl font-medium text-muted-foreground">
          Contribuidores da plataforma ({contributors.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {loading ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            contributors.map((contributor, idx) => (
              <WithTooltip key={idx} content={contributor.login}>
                <a href={contributor.html_url} target="_blank">
                  <img
                    className="size-10 rounded-full md:size-12"
                    src={contributor.avatar_url}
                  />
                </a>
              </WithTooltip>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 flex w-full justify-center bg-black p-8 [&>p]:text-white">
        <p className="text-md text-justify md:text-lg">
          Agradecemos a todos que têm tornado este impacto possível! Vamos
          continuar trabalhando juntos para fazer a diferença. Acesse:{' '}
          <a
            href="https://sos-rs.com"
            className="text-blue-500 hover:text-blue-600 hover:underline active:text-blue-700"
          >
            sos-rs.com
          </a>
        </p>
      </div>
    </div>
  );
};

export { AboutUs };
