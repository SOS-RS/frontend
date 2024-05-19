import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CircleStatus, Header, LoadingScreen, TextField } from '@/components';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSupplyCategories } from '@/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICreateSupply, SupplyPriority } from '@/service/supply/types';
import { getSupplyPriorityProps } from '@/lib/utils';
import { ShelterSupplyServices, SupplyServices } from '@/service';
import { ICreateShelterSupply } from '@/service/shelterSupply/types';
import { clearCache } from '@/api/cache';

const CreateSupply = () => {
  const navigate = useNavigate();
  const { shelterId = '-1' } = useParams();
  const { toast } = useToast();
  const { data: supplyCategories, loading } = useSupplyCategories();

  const {
    errors,
    getFieldProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    values,
  } = useFormik<ICreateSupply & Omit<ICreateShelterSupply, 'supplyId'>>({
    initialValues: {
      name: '',
      supplyCategoryId: supplyCategories?.at(0)?.id ?? '-1',
      shelterId,
      priority: SupplyPriority.NotNeeded,
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: Yup.object().shape({
      shelterId: Yup.string().required('Este campo deve ser preenchido'),
      name: Yup.string().required('Este campo deve ser preenchido'),
      quantity: Yup.number().typeError('Insira um valor númerico').moreThan(0, 'O valor tem que ser maior do que 0').optional(),
      priority: Yup.string().required('Este campo deve ser preenchido'),
      supplyCategoryId: Yup.string().required('Este campo deve ser preenchido'),
    }),
    onSubmit: async (values) => {
      try {
        const resp = await SupplyServices.create({
          name: values.name,
          supplyCategoryId: values.supplyCategoryId,
        });
        await ShelterSupplyServices.create({
          supplyId: resp.data.id,
          priority: +values.priority,
          quantity: Number(values.quantity) || null,
          shelterId,
        });
        clearCache(false);
        toast({
          title: 'Item cadastrado com sucesso',
        });
        navigate(`/abrigo/${shelterId}/items`);
      } catch (err: any) {
        toast({
          variant: 'destructive',
          title: 'Ocorreu um erro ao tentar cadastrar o item',
          description: `${err?.response?.data?.message ?? err}`,
        });
      }
    },
  });

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex h-screen flex-col items-center">
      <Header
        title="Cadastrar novo item"
        className="border-b border-b-border bg-white [&_*]:text-zinc-800"
        startAdornment={
          <Button
            variant="ghost"
            className="[&_svg]:stroke-blue-500"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      <div className="flex size-full max-w-5xl flex-col items-start gap-3 p-4">
        <form className="contents" onSubmit={handleSubmit}>
          <h6 className="text-2xl font-semibold">Cadastrar novo item</h6>
          <p className="text-muted-foreground">
            Informe o nome do item que você deseja cadastrar, a categoria e a
            prioridade
          </p>
          <div className="mt-6 flex w-full flex-col gap-6">
            <TextField
              label="Nome do item"
              {...getFieldProps('name')}
              error={!!errors.name}
              helperText={errors.name}
            />
            <div className="flex w-full flex-col">
              <label className="text-muted-foreground">Categoria</label>
              <Select
                onValueChange={(v) => {
                  setFieldValue('supplyCategoryId', v);
                }}
                defaultValue={`${values.supplyCategoryId}`}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-muted-foreground"
                    placeholder="Selecione"
                  />
                </SelectTrigger>
                <SelectContent>
                  {supplyCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="text-muted-foreground"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <TextField
              label="Quantidade"
              {...getFieldProps('quantity')}
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
            <div className="flex w-full flex-col">
              <label className="text-muted-foreground">Prioridade</label>
              <Select
                onValueChange={(v) => {
                  setFieldValue('priority', v);
                }}
                defaultValue={`${values.priority}`}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-muted-foreground"
                    placeholder="Selecione"
                  />
                </SelectTrigger>
                <SelectContent>
                  {[
                    SupplyPriority.Urgent,
                    SupplyPriority.Needing,
                    SupplyPriority.Remaining,
                    SupplyPriority.NotNeeded,
                  ].map((priority) => {
                    const { className, label } =
                      getSupplyPriorityProps(priority);
                    return (
                      <SelectItem
                        key={priority}
                        value={`${priority}`}
                        className="text-muted-foreground"
                      >
                        <div className="flex items-center gap-2 p-2">
                          <CircleStatus className={className} />
                          {label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col justify-end py-6 md:justify-start">
            <Button
              loading={isSubmitting}
              type="submit"
              className="flex w-full gap-2 bg-blue-500 text-lg font-medium text-white hover:bg-blue-600"
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateSupply };
