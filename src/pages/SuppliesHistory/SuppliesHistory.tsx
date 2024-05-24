import { ChevronLeft, Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CircleStatus,
  Header,
  LoadingScreen,
  VerifiedBadge,
} from '@/components';
import { useShelter, useSuppliesHistory } from '@/hooks';
import { IUseSuppliesHistoryDataResults } from '@/hooks/useSuppliesHistory/types';
import { format } from 'date-fns';
import { getSupplyPriorityProps } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SuppliesHistoryGroup } from './components/SuppliesHistoryGroup';
import { GroupedHistory, PriorityLabel } from './types';

const groupByDateTime = (histories: IUseSuppliesHistoryDataResults[]) => {
  return histories.reduce((groups, history) => {
    const dateTime = format(new Date(history.createdAt), 'dd/MM/yyyy HH:mm');
    groups[dateTime] = groups[dateTime] || [];
    groups[dateTime].push(history);
    return groups;
  }, {} as Record<string, IUseSuppliesHistoryDataResults[]>);
};

const isExcluded = (history: IUseSuppliesHistoryDataResults): boolean => {
  return (
    (history.priority === 0 || history.predecessor?.priority === 0) &&
    (history.priority < 0 || history.quantity === history.predecessor?.quantity)
  );
};

const isEdited = (history: IUseSuppliesHistoryDataResults): boolean => {
  return history.predecessor !== null && !isExcluded(history);
};

const processHistory = (
  history: IUseSuppliesHistoryDataResults,
  groups: Record<PriorityLabel, GroupedHistory>,
  priorityLabel: PriorityLabel
) => {
  if (history.predecessor === null) {
    groups[priorityLabel].added.push(history);
  } else if (isEdited(history)) {
    groups[priorityLabel].edited.push(history);
  } else {
    groups[priorityLabel].excluded.push(history);
  }
};

const groupByPriority = (
  histories: IUseSuppliesHistoryDataResults[]
): Record<PriorityLabel, GroupedHistory> => {
  return histories.reduce((groups, history) => {
    const { className, label } = getSupplyPriorityProps(history.priority);
    const priorityLabel = label as PriorityLabel;

    if (!groups[priorityLabel]) {
      groups[priorityLabel] = {
        added: [],
        edited: [],
        excluded: [],
        className,
      };
    }

    processHistory(history, groups, priorityLabel);
    return groups;
  }, {} as Record<PriorityLabel, GroupedHistory>);
};

const SuppliesHistory = () => {
  const params = useParams();
  const { shelterId = '-1' } = params;
  const navigate = useNavigate();
  const { data: shelter, loading } = useShelter(shelterId);
  const { data: histories, loading: historiesLoading } =
    useSuppliesHistory(shelterId);

  if (loading && historiesLoading) return <LoadingScreen />;

  const groupedHistories = groupByDateTime(histories.results);

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Histórico de edições"
        startAdornment={
          <Button
            size="sm"
            variant="ghost"
            className="[&_svg]:stroke-white disabled:bg-red-500 hover:bg-red-400"
            onClick={() => navigate(`/abrigo/${shelterId}`)}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      <div className="p-4 flex flex-col max-w-5xl w-full h-full">
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          Histórico de edições
        </h1>
        <div className="flex items-center gap-1">
          <h1 className="text-[#677183] font-semibold text-lg">
            {shelter.name}
          </h1>
          {shelter.verified && <VerifiedBadge />}
        </div>
        <div className="py-4">
          <Card className="border-[#677183]">
            <CardContent className="p-2 flex items-top sm:items-center">
              <Info
                color="#677183"
                size={18}
                className="w-24 mt-1 sm:w-12 lg:w-8 sm:mt-0"
              />
              <p className="text-[#677183] text-sm">
                Confira a lista de itens que foram adicionados em cada uma das
                modificações feitas a esse abrigo
              </p>
            </CardContent>
          </Card>
        </div>
        {Object.entries(groupedHistories).map(([dateTime, histories]) => (
          <div key={dateTime} className="py-4 flex flex-col gap-2 border-b">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[18px]">{dateTime}</p>
            </div>
            <p className="text-[#677183] font-normal text-md mt-2">
              Modificações
            </p>
            {Object.entries(groupByPriority(histories)).map(
              ([priority, items], index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p className="font-semibold text-md flex gap-2 items-center">
                    <CircleStatus className={items.className} />
                    {priority}
                  </p>
                  <SuppliesHistoryGroup
                    title="Excluído"
                    items={items.excluded}
                    className={items.className}
                  />
                  <SuppliesHistoryGroup
                    title="Editado"
                    items={items.edited}
                    className={items.className}
                  />
                  <SuppliesHistoryGroup
                    title="Adicionado"
                    items={items.added}
                    className={items.className}
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { SuppliesHistory };
