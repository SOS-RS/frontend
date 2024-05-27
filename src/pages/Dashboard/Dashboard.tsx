import { BurgerMenu, Footer, Header } from '@/components';
import { Button } from '@/components/ui/button';

import { NeedsSuppliesCard, ShelterOverview } from './components';
import { RotateCw } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard/useDashboard';

//mock irá ser retirado após a implementação no backend
// const categories = [
//   {
//     id: '5c9b6767-5310-461b-977b-906fe16370ae',
//     name: 'Medicamentos',
//     sheltersWithSupplies: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213000',
//         name: 'Simers',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213001',
//         name: 'Simers2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213002',
//         name: 'Teste1',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213000',
//         name: 'Simers',
//       },
//     ],
//     sheltersRequesting: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213000',
//         name: 'Simers',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213001',
//         name: 'Simers2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213002',
//         name: 'Teste1',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//     ],
//   },
//   {
//     id: '03fdb0f2-6b50-4895-b970-5793cad80c86',
//     name: 'Cuidados com Animais',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
//   {
//     id: 'b3a81a9d-a964-4413-9a33-974a3b4673d1',
//     name: 'Especialistas e Profissionais',
//     sheltersWithSupplies: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//     ],
//     sheltersRequesting: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//     ],
//   },
//   {
//     id: '60d6808e-9d13-484d-84a4-2ca35d42b3a6',
//     name: 'Acomodações e Descanso',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
//   {
//     id: 'fd1f74c4-6723-4ffe-8657-773a943e65c4',
//     name: 'Equipamentos de Emergência',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
//   {
//     id: '6e6aaf88-b9fb-4a38-ab92-0db63c30e3f8',
//     name: 'Voluntariado',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
//   {
//     id: '037ac262-4f35-42e0-83e1-4cdcceedb39c',
//     name: 'Itens Descartáveis',
//     sheltersWithSupplies: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//     ],
//     sheltersRequesting: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//     ],
//   },
//   {
//     id: '718d5be3-69c3-4216-97f1-12b690d0eb97',
//     name: 'Higiene Pessoal',
//     sheltersWithSupplies: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213002',
//         name: 'Teste1',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213001',
//         name: 'Simers2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213002',
//         name: 'Teste1',
//       },
//     ],
//     sheltersRequesting: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213001',
//         name: 'Simers2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213002',
//         name: 'Teste1',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//     ],
//   },
//   {
//     id: 'a3e3bdf8-0be4-4bdc-a3b0-b40ba931be5f',
//     name: 'Alimentos e Água',
//     sheltersWithSupplies: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//     ],
//     sheltersRequesting: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213003',
//         name: 'Teste2',
//       },
//     ],
//   },
//   {
//     id: '5d50d3cf-4e36-4639-813d-d43de8886ac8',
//     name: 'Material de Limpeza',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
//   {
//     id: 'bf8b5e09-544f-4eff-9bb7-6220aaa34a85',
//     name: 'Vestuário',
//     sheltersWithSupplies: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213001',
//         name: 'Simers2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213002',
//         name: 'Teste1',
//       },
//     ],
//     sheltersRequesting: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213001',
//         name: 'Simers2',
//       },
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213002',
//         name: 'Teste1',
//       },
//     ],
//   },
//   {
//     id: '05583098-5f2e-44e2-b874-452ec86d9d3e',
//     name: 'Veículos de Resgate e Transporte',
//     sheltersWithSupplies: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213000',
//         name: 'Simers',
//       },
//     ],
//     sheltersRequesting: [
//       {
//         id: '7f21ccc7-d1de-4a23-b710-260761213000',
//         name: 'Simers',
//       },
//     ],
//   },
//   {
//     id: '4f95853f-d5e1-487d-8086-6ddfaf2bbab7',
//     name: 'Eletrodomésticos e Eletrônicos',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
//   {
//     id: 'be0e4018-ca46-44cd-b814-7681ba98c51a',
//     name: 'Mobílias',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
//   {
//     id: 'c117dd37-82ab-43a6-bf66-d97acef97f6e',
//     name: 'Jogos e Passatempo',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
//   {
//     id: '8200759f-067f-4fda-8947-ff5896929fcd',
//     name: 'Cosméticos',
//     sheltersWithSupplies: [],
//     sheltersRequesting: [],
//   },
// ];

const Dashboard = () => {
  const { data, loading, refresh } = useDashboard({ cache: false });

  if (loading) return null;
  console.log(data);
  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="SOS Rio Grande do Sul"
        startAdornment={<BurgerMenu />}
        endAdornment={
          <div className="flex gap-2 items-center">
            <Button
              loading={loading}
              variant="ghost"
              size="sm"
              onClick={() => refresh()}
              className="disabled:bg-red-500 hover:bg-red-400"
            >
              <RotateCw size={20} className="stroke-white" />
            </Button>
          </div>
        }
      />
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl justify-self-start mb-8 mt-4">
          Visão Geral
        </h1>
        <ShelterOverview
          allPeopleShelters={data.allPeopleSheltered}
          totalShelters={data.allShelters}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl justify-self-start mt-8 mb-4">
          Visão geral das necessidades
        </h1>
        <NeedsSuppliesCard catergories={data.categoriesWithPriorities} />
      </div>
      <Footer />
    </div>
  );
};

export { Dashboard };
