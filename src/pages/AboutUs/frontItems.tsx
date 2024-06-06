import { IServicedFrontInfoProps } from './components/ServicedFrontInfo/types';
import {
  Car,
  Baby,
  MapPinned,
  CookingPot,
  GlassWater,
  Goal,
  HeartHandshake,
  Infinity,
  MonitorSmartphone,
  Speech,
  Users,
} from 'lucide-react';

export const frontItems: IServicedFrontInfoProps[] = [
  {
    icon: <GlassWater size={24} color="black" />,
    title: 'Água',
    description: 'Atender demandas urgentes de água;',
  },
  {
    icon: <CookingPot size={24} color="black" />,
    title: 'Cozinhas solidárias',
    description:
      'Auxiliar na operação das cozinhas com o envio de suprimentos e distribuição das marmitas;',
  },
  {
    icon: <Infinity size={24} color="black" />,
    title: 'Conexões',
    description:
      'Gerir dados confiáveis sobre a demanda de abrigos e a disponibilidade de doações;',
  },
  {
    icon: <HeartHandshake size={24} color="black" />,
    title: 'Comunidades',
    description: 'Mapear e integrar lideranças comunitárias;',
  },
  {
    icon: <Speech size={24} color="black" />,
    title: 'Comunicação',
    description:
      'Manter as informações sobre a iniciativa atualizadas e disponíveis a todos;',
  },
  {
    icon: <MapPinned size={24} color="black" />,
    title: 'Dados e Geolocalização',
    description:
      'Fornecer dados públicos sobre as enchentes e as demandas do cenário de crise com o apoio do IPH UFRGS e nossas operações de voluntários;',
  },
  {
    icon: <Goal size={24} color="black" />,
    title: 'Expansão',
    description: 'Estruturar o crescimento da operação e parcerias;',
  },
  {
    icon: <Car size={24} color="black" />,
    title: 'Logística',
    description:
      'Conectar o transporte dos centros de distribuição e triagem aos abrigos;',
  },
  {
    icon: <Baby size={24} color="black" />,
    title: 'Olhar para a criança',
    description: 'Proteger e oferecer apoio às crianças em abrigos;',
  },
  {
    icon: <Users size={24} color="black" />,
    title: 'Pessoas',
    description:
      'Recrutar, acolher, orientar, treinar e direcionar novos voluntários e padrinhos/madrinhas;',
  },
  {
    icon: <MonitorSmartphone size={24} color="black" />,
    title: 'Tecnologia',
    description:
      'Desenvolver uma solução digital a partir de dados públicos confiáveis.',
  },
];
