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
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Cadastrar novo item"
        className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
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
      <div className="p-4 flex flex-col max-w-5xl w-full gap-3 items-start h-full">
        <form className="contents" onSubmit={handleSubmit}>
          <h6 className="text-2xl font-semibold">Cadastrar novo item</h6>
          <p className="text-muted-foreground">
            Informe o nome do item que você deseja cadastrar, a categoria e a
            prioridade
          </p>
          <div className="flex flex-col gap-6 w-full mt-6">
            <TextField
              label="Nome do item"
              {...getFieldProps('name')}
              error={!!errors.name}
              helperText={errors.name}
            />
            <div className="flex flex-col w-full">
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
            <div className="flex flex-col w-full">
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
                        <div className="flex gap-2 p-2 items-center">
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
          <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
            <Button
              loading={isSubmitting}
              type="submit"
              className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
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
