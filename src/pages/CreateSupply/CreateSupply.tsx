import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CircleStatus, Header, LoadingScreen, TextField } from '@/components';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useShelter, useSupplies, useSupplyCategories } from '@/hooks';
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
import { Fragment } from 'react/jsx-runtime';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';
import { useState } from 'react';
import { ModalCreateSupply } from './components';

const CreateSupply = () => {
  const navigate = useNavigate();
  const { shelterId = '-1' } = useParams();
  const { data: shelter } = useShelter(shelterId);
  const { toast } = useToast();
  const { data: supplyCategories, loading } = useSupplyCategories();
  const { data: supplies } = useSupplies();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [supplyId, setSupplyId] = useState<string>('');

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
      shelterId,
      priority: SupplyPriority.Needing,
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: Yup.object().shape({
      shelterId: Yup.string().required('Este campo deve ser preenchido'),
      name: Yup.string()
      .matches(/^[a-zA-ZÀ-ÿ0-9\s]*$/, "O nome não deve conter caracteres especiais")
      .test('min-letters', 'O nome deve conter pelo menos 3 letras', value => {
        const letterCount = (value?.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
        return letterCount >= 3;
      })
        .min(3, 'Insira no mínimo 3 caracteres')
        .required('Este campo deve ser preenchido'),
      quantity: Yup.number()
        .typeError('Insira um valor númerico')
        .moreThan(0, 'O valor tem que ser maior do que 0')
        .optional(),
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

  const filteredSupplies =
    values.name.length > 2
      ? supplies.filter((e) => {
          const normalizedSearchTerm = values.name
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          return e.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(normalizedSearchTerm);
        })
      : [];

  const renderSupplies = (element: IUseSuppliesData, key: number) => {
        if (values.name.length < 3 || key > 30) return <></>;

    return (
      <Fragment key={key}>
        <div
          className="flex cursor-pointer border m-1 p-2 rounded hover:scale-105"
          onClick={() => {
            setSupplyId(element.id);
            setModalOpened(true);
          }}
        >
          {element.name}
        </div>
      </Fragment>
    );
  };

  if (loading) return <LoadingScreen />;

  return (
    <Fragment>
      {modalOpened && (
        <ModalCreateSupply
          supplies={shelter.shelterSupplies as any}
          supplyId={supplyId}
          shelterId={shelterId}
          open={modalOpened}
          title="Escolha a prioridade do item"
          options={[
            {
              label: 'Precisa urgente',
              value: `${SupplyPriority.Urgent}`,
            },
            {
              label: 'Precisa',
              value: `${SupplyPriority.Needing}`,
            },
            {
              label: 'Disponível para doação',
              value: `${SupplyPriority.Remaining}`,
            },
            {
              label: 'Não preciso',
              value: `${SupplyPriority.NotNeeded}`,
            },
          ]}
          onClose={() => setModalOpened(false)}
        />
      )}
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
              <div className="flex flex-wrap">
                {filteredSupplies.length > 0 && (
                  <div className="border p-2 rounded bg-amber-200 text-gray-700">
                    Foram encontrados registros com as informações fornecidas.
                    Para evitar registros duplicados, pedimos a gentileza de
                    verificar se alguns dos registros abaixo lhe atende:
                  </div>
                )}
                {filteredSupplies.map(renderSupplies)}
              </div>
              <div className="flex flex-col w-full">
                <label className="text-muted-foreground">Categoria</label>
                <Select
                  onValueChange={(v) => setFieldValue('supplyCategoryId', v)}
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.supplyCategoryId && 'border-red-600'
                    }`}
                  >
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
                <div className="text-red-600 text-sm mt-0">
                  {errors.supplyCategoryId}
                </div>
              </div>
              <TextField
                label="Quantidade"
                {...getFieldProps('quantity')}
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
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
                      SupplyPriority.Needing,
                      SupplyPriority.Urgent,
                      SupplyPriority.Remaining,
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
              <div className="text-red-600 text-sm mt-0">{errors.priority}</div>
            </div>
            <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
              <Button
                loading={isSubmitting}
                type="submit"
                disabled={filteredSupplies.length > 0}
                className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export { CreateSupply };
