import { Fragment, useMemo } from 'react';
import { HandHeart, Home, LifeBuoy, Loader, Users } from 'lucide-react';

import { BurgerMenu, Header } from '@/components';
import { AboutCardInfo, ServicedFrontInfo } from './components';
import { frontItems } from './frontItems';
import { useGithubContributors } from '@/hooks';
import WithTooltip from '@/components/ui/with-tooltip';
import { removeDuplicatesByField } from '@/lib/utils';
import { IAboutUsPerson } from './types';

const AboutUs = () => {
  const { data: frontendContributors, loading: loadingFrontendContributors } =
    useGithubContributors('sos-rs', 'frontend');
  const { data: backendContributors, loading: loadingBackendContributors } =
    useGithubContributors('sos-rs', 'backend');

  const persons: IAboutUsPerson[] = [
    {
      name: 'Klaus Riffel',
      link: 'https://www.linkedin.com/in/klaus-riffel-69441928/',
    },
    {
      name: 'Rhuam Estevam',
      link: 'https://www.linkedin.com/in/rhuam/',
    },
    {
      name: 'José Fagundes',
      link: 'https://www.linkedin.com/in/jos%C3%A9-fagundes/',
    },
    {
      name: 'Manoel Júnior',
      link: 'https://www.linkedin.com/in/manoelfpjunior/',
    },
    {
      name: 'Vinicius Arantes',
      link: 'https://www.linkedin.com/in/viniciusrnt/',
    },
    {
      name: 'Thiago Marins',
      link: 'https://www.linkedin.com/in/thiago-dable',
    },
    {
      name: 'Gabriel Mancuso',
      link: 'https://www.linkedin.com/in/luizgabrielmancuso/',
    },
    {
      name: 'Max Riffel',
      link: 'https://www.linkedin.com/in/max-riffel-07a134a1/',
    },
    {
      name: 'Kiwi Bertola',
      link: 'https://www.linkedin.com/in/kiwi-bertola-10079073/',
    },
  ];

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
    <div className="flex flex-col h-screen items-center">
      <Header title="SOS Rio Grande do Sul" startAdornment={<BurgerMenu />} />
      <div className="flex flex-col gap-4 p-4 max-w-4xl pb-8 w-full">
        <h2 className="text-4xl pt-4 font-semibold !text-zinc-900">
          Sobre nós
        </h2>
        <h4 className="text-lg text-muted-foreground font-medium">
          Conheça a história do projeto SOS RS
        </h4>
        <h3 className="text-2xl font-medium text-muted-foreground mt-8">
          Como tudo começou
        </h3>
        <p className="text-justify text-md md:text-lg font-medium [&>a]:text-blue-500 [&>a]:hover:text-blue-600 [&>a]:active:text-blue-700">
          Iniciado no domingo (04/05) e concluído na segunda (05/05), após 18
          horas seguidas de desenvolvimento, nosso webapp <b>SOS RS 🛟</b>,
          idealizado e desenvolvido por{' '}
          {persons.slice(0, -1).map((p, idx) => (
            <Fragment key={idx}>
              <a className="hover:underline" href={p.link} target="_blank">
                {p.name}
              </a>
              {', '}
            </Fragment>
          ))}{' '}
          e{' '}
          <a
            className="hover:underline"
            href={persons.at(-1)?.link}
            target="_blank"
          >
            {persons.at(-1)?.name}
          </a>
          , atingiu resultados verdadeiramente inspiradores.
        </p>
        <p className="text-justify font-medium text-md md:text-lg">
          O SOS RS rapidamente ganhou destaque nos grupos de WhatsApp, graças ao
          seu modelo colaborativo. Alcançamos rapidamente o nível de todas as
          outras iniciativas de gestão de demanda combinadas e lançamos nossa
          comunidade open source, recebendo uma enxurrada de contribuições:
          nosso projeto alcançou <b>600 estrelas no GitHub</b> e foi{' '}
          <b>forkeado mais de 350 vezes!</b>
        </p>
        <h3 className="text-2xl font-medium text-muted-foreground mt-8">
          Nossos parceiros
        </h3>
        <p className="text-justify font-medium text-md md:text-lg">
          Formamos parcerias sólidas com mais de 1400 voluntários, fortalecendo
          ainda mais nossa missão. Hoje, comemoramos números que falam por si.
        </p>
        <div className="flex gap-2 flex-wrap mt-4">
          <AboutCardInfo
            icon={<Home />}
            topLabel="mais de"
            centerLabel="800"
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
            centerLabel="55.000"
            bottomLabel="pessoas beneficiadas desde o lançamento"
            className="w-full"
          />
        </div>
        <p className="text-justify font-medium text-md md:text-lg leading-10">
          Atualmente, o <b>SOS RS </b>
          <LifeBuoy
            className="align-middle inline-block relative max-h-6 padding pb-0.5"
            size={18}
          />{' '}
          apoia a gestão das demandas e necessidades dos abrigos do Rio Grande
          do Sul com informações públicas, atualizadas, confiáveis e auditáveis.
        </p>
        <h3 className="text-2xl font-medium text-muted-foreground mt-4">
          Frentes atendidas
        </h3>
        <div className="flex flex-col gap-6">
          {frontItems.map((item, idx) => (
            <ServicedFrontInfo key={idx} {...item} />
          ))}
        </div>
        <p className="text-justify font-medium text-md md:text-lg mt-4">
          O grupo de voluntários do SOS RS já soma mais de 2100 pessoas e cerca
          de 126 mil horas de trabalho desde a criação da iniciativa.
        </p>
        <h3 className="text-2xl font-medium text-muted-foreground mt-4">
          Contribuidores da plataforma ({contributors.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            contributors.map((contributor, idx) => (
              <WithTooltip key={idx} content={contributor.login}>
                <a href={contributor.html_url} target="_blank">
                  <img
                    className="rounded-full w-10 h-10 md:w-12 md:h-12"
                    src={contributor.avatar_url}
                  />
                </a>
              </WithTooltip>
            ))
          )}
        </div>
      </div>
      <div className="bg-black [&>p]:text-white p-8 w-full flex justify-center mt-4">
        <p className="text-justify text-md md:text-lg">
          Agradecemos a todos que têm tornado este impacto possível! Vamos
          continuar trabalhando juntos para fazer a diferença. Acesse:{' '}
          <a
            href="https://sos-rs.com"
            className="hover:underline text-blue-500 hover:text-blue-600 active:text-blue-700"
          >
            sos-rs.com
          </a>
        </p>
      </div>
    </div>
  );
};

export { AboutUs };
