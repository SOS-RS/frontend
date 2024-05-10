import { CircleAlert } from 'lucide-react';

import { Alert, Header } from '@/components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const Distribution = () => {
  const alertDescription =
    'Você pode ver a lista de abrigos e informar o progresso da ajuda a caminho.';

  const data = [
    {
      nome: 'INV001',
      endereço: 'Rua galicia, 78, valença',
      contato: '(31) 99433-6598',
      demanda: 'agua',
      quantidade: '10',
    },
  ];

  return (
    <div className="flex flex-col h-screen items-center">
      <Header title="Centro de distribuição" />
      <div className="p-4 flex flex-col max-w-5xl w-full gap-3 items-start h-full">
        <h6 className="text-2xl font-semibold">Tabela de abrigos</h6>
        <Alert
          description={alertDescription}
          startAdornment={
            <CircleAlert size={20} className="stroke-light-yellow" />
          }
        />

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Demanda</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }, (_, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">Escola Novaerense</TableCell>
                <TableCell>Rua Galícia, N° 26, Valença</TableCell>
                <TableCell>(31) 99433-0505</TableCell>
                <TableCell>Demanda aqui</TableCell>
                <TableCell className="text-center">20</TableCell>
                <TableCell>
                  <Button
                    className="flex gap-2 text-white  font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
                    size="sm"
                  >
                    Separar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export { Distribution };
