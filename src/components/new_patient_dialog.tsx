import { CheckIcon, Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import './new_patient_dialog.css';
import ButtonLabel from './template/button_label';
import { Dialog, Form } from 'radix-ui';
import { SubmitEventHandler, useContext, useState } from 'react';
import { createPatient } from '../commands/patient/create';
import Input, { formatCPF, formatPhone, onlyDigits } from './template/input';
import { toast } from 'sonner';
import showErrorFriendly from '../utils/show_error_friendly';
import { PatientContext } from '../context/patients';

export default function NewPatientDialog() {
  const { updatePatientList } = useContext(PatientContext);

  const [dialogState, setDialogState] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');

  const resetFormField = () => {
    setName('');
    setCpf('');
    setBirthDate('');
    setPhone1('');
    setPhone2('');
  };

  const handleOpenCloseDialog = (open: boolean) => {
    resetFormField();

    setDialogState(open);
  };

  const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    const loadId = crypto.randomUUID();
    const input: CreatePatientInput = {
      birth_date,
      cpf: formatCPF(cpf),
      name,
      phone1: phone1,
      phone2: phone2 || null,
    };

    toast.loading('Guardando dados do paciente...', {
      id: loadId,
      dismissible: false,
    });
    createPatient(input)
      .then(() => {
        toast.success('Paciente registrado com sucesso!');
        updatePatientList();
        handleOpenCloseDialog(false);
      })
      .catch((e: ResponseError) => {
        showErrorFriendly(e);
      })
      .finally(() => {
        toast.dismiss(loadId);
      });
    e.preventDefault();
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = onlyDigits(e.target.value);
    const formatted = formatCPF(raw);

    setCpf(formatted);
  };

  const handlePhone1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = onlyDigits(e.target.value);
    const formatted = formatPhone(raw);
    setPhone1(formatted);
  };

  const handlePhone2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = onlyDigits(e.target.value);
    const formatted = formatPhone(raw);
    setPhone2(formatted);
  };

  return (
    <Dialog.Root open={dialogState} onOpenChange={handleOpenCloseDialog}>
      <Dialog.Trigger asChild>
        <ButtonLabel
          label="Novo Paciente"
          type="button"
          className="search-menu-button">
          <PlusIcon />
        </ButtonLabel>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[80vh] w-[90%] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-md p-6.25 focus:outline-none bg-gray-50 flex flex-col overflow-auto">
          <Dialog.Title className="m-0 text-xl font-medium">
            Cadastrar Novo Paciente
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
            Insira os dados do paciente
          </Dialog.Description>

          <Form.Root onSubmit={handleFormSubmit} className="form-root">
            <div className="flex flex-wrap gap-2 size-full">
              <Form.Field name="name" className="flex flex-col grow">
                <div className="input-label-container">
                  <Form.Label className="input-label">Nome</Form.Label>
                  <Form.Message match="valueMissing" className="error-message">
                    Campo obrigatório
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onClickReset={() => setName('')}
                    showCondition={!!name}
                    required
                    type="text"
                    placeholder="Ex: João Lacerda"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field name="cpf" className="flex flex-col grow">
                <div className="input-label-container">
                  <Form.Label className="input-label">CPF</Form.Label>
                  <Form.Message match="valueMissing" className="error-message">
                    Campo obrigatório
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <Input
                    value={formatCPF(cpf)}
                    onChange={handleCpfChange}
                    onClickReset={() => setCpf('')}
                    showCondition={!!cpf}
                    required
                    inputMode="numeric"
                    type="text"
                    placeholder="Ex: 123.456.789-09"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field name="birth_date" className="flex flex-col grow">
                <div className="input-label-container">
                  <Form.Label className="input-label">
                    Data de Nascimento
                  </Form.Label>
                  <Form.Message match="valueMissing" className="error-message">
                    Campo obrigatório
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <Input
                    value={birth_date}
                    onChange={(e) => setBirthDate(e.target.value)}
                    onClickReset={() => setBirthDate('')}
                    showCondition={false}
                    required
                    type="date"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field name="phone1" className="flex flex-col grow">
                <div className="input-label-container">
                  <Form.Label className="input-label">Telefone 1</Form.Label>
                  <Form.Message match="valueMissing" className="error-message">
                    Campo obrigatório
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <Input
                    value={phone1}
                    onChange={handlePhone1Change}
                    onClickReset={() => setPhone1('')}
                    showCondition={!!phone1}
                    required
                    inputMode="tel"
                    type="tel"
                    placeholder="Ex: (85) 98765-4321"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field name="phone2" className="flex flex-col grow">
                <div className="input-label-container">
                  <Form.Label className="input-label">Telefone 2</Form.Label>
                </div>
                <Form.Control asChild>
                  <Input
                    value={phone2}
                    onChange={handlePhone2Change}
                    onClickReset={() => setPhone2('')}
                    showCondition={!!phone2}
                    inputMode="tel"
                    type="tel"
                    placeholder="Ex: (85) 98765-4321"
                  />
                </Form.Control>
              </Form.Field>
            </div>
            <div className="flex gap-2 justify-end">
              <Dialog.Close asChild>
                <ButtonLabel
                  className="bg-rose-700"
                  autoHide={false}
                  showLabel
                  label="Cancelar"
                  type="button">
                  <Cross2Icon />
                </ButtonLabel>
              </Dialog.Close>
              <Form.Submit asChild>
                <ButtonLabel
                  autoHide={false}
                  showLabel
                  label="Registrar"
                  type="submit">
                  <CheckIcon />
                </ButtonLabel>
              </Form.Submit>
            </div>
          </Form.Root>

          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-6.25 appearance-none items-center justify-center rounded-full text-rose-900 bg-gray3 hover:bg-rose-200 focus:shadow-[0_0_0_2px] transition-colors focus:shadow-rose-300 focus:outline-none"
              aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
