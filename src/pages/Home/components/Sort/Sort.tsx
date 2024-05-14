import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ISortFormikProps,
  ISortProps,
  SortBy,
  SortOrder,
} from './types';
import { sortByOptions, sortOrderOptions } from '@/lib/utils';

const sortByOpts = Object.entries(sortByOptions).reduce(
  (prev, [sortBy, label]) => ({ ...prev, [sortBy]: label }),
  {} as Record<SortBy, string>
);

const sortOrderOpts = Object.entries(sortOrderOptions).reduce(
  (prev, [sortOrder, label]) => ({ ...prev, [sortOrder]: label }),
  {} as Record<SortOrder, string>
);

const Sort = (props: ISortProps) => {
  const { data, onClose, onSubmit, open } = props;
  const { handleSubmit, values, setFieldValue } = useFormik<ISortFormikProps>(
    {
      initialValues: {
        sortBy: {
          value: data.orderBy ?? SortBy.Name,
          label: sortByOpts[data.orderBy ?? SortBy.Name],
        },
        sortOrder: {
          value: data.order ?? SortOrder.Asc,
          label: sortOrderOpts[data.order ?? SortOrder.Asc],
        },
      },
      enableReinitialize: true,
      validateOnChange: false,
      validateOnBlur: false,
      validateOnMount: false,
      validationSchema: Yup.object().shape({
        search: Yup.string(),
      }),
      onSubmit: (values) => {
        const { sortBy, sortOrder } =
          values;
        onSubmit({
          orderBy: sortBy?.value ?? SortBy.Name,
          order: sortOrder?.value ?? SortOrder.Asc,
        });
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-md overflow-y-scroll max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">
            Faça sua busca:
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="pl-4 pr-4 pb-4 flex flex-col max-w-5xl w-full items-start h-full">
            <div className="flex flex-col gap-2 w-full my-4">
              <p className="text-muted-foreground text-sm md:text-lg font-medium">
                Ordernar resultados
              </p>
              <p className="text-muted-foreground text-sm md:text-lg font-medium">
                Você pode orderar os resultados por nome, data de criação, data de atualização e prioridade.
              </p>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-muted-foreground text-sm md:text-lg font-medium">
                  Ordernar por
                </label>
                <Select
                  placeholder="Selecione"
                  value={{
                    label:
                      sortByOpts[
                        values.sortBy?.value ?? SortBy.Name
                      ],
                    value: values.sortBy?.value ?? SortBy.Name,
                  }}
                  options={Object.entries(sortByOpts).map(
                    ([sortBy, label]) => ({ label, value: sortBy } as any)
                  )}
                  onChange={(v) => {
                    const newValue = {
                      ...v,
                      value: v ? v.value : SortBy.Name,
                    };
                    setFieldValue('sortBy', newValue);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-muted-foreground text-sm md:text-lg font-medium">
                  Sentido da ordenação
                </label>
                <Select
                  value={values.sortOrder}
                  placeholder="Selecione"
                  options={Object.entries(sortOrderOpts).map(
                    ([sortOrder, label]) => ({ label, value: sortOrder } as any)
                  )}
                  onChange={(v) => {
                    const newValue = {
                      ...v,
                      value: v ? v.value : SortOrder.Asc,
                    };
                    setFieldValue('sortOrder', newValue);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
              <Button
                type="submit"
                className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
              >
                Ordenar resultados
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { Sort };
