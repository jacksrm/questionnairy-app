import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Tabs, ToggleGroup } from 'radix-ui';
import { useContext, useEffect, useState } from 'react';
import './search_menu.css';
import NewPatientDialog from './new_patient_dialog';
import ButtonLabel from './template/button_label';
import Input, { formatCPF, onlyDigits } from './template/input';
import { PatientContext } from '../context/patients';

type SearchType = 'name' | 'cpf';

export default function SearchMenu() {
  const { searchCpf, updatePatientList } = useContext(PatientContext);

  const [searchType, setSearchType] = useState<SearchType>('name');
  const [searchInput, setSearchInput] = useState('');

  const placeholder = {
    name: 'Ex: João Carlos',
    cpf: 'Ex: 123.456.789-09',
  };

  const handleToggleChange = (v: string) => {
    setSearchInput('');
    setSearchType(v as SearchType);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);

    switch (searchType) {
      case 'name':
        setSearchInput(e.target.value);
        break;
      case 'cpf':
        const raw = onlyDigits(e.target.value);
        const formatted = formatCPF(raw);
        setSearchInput(formatted);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (!searchInput) updatePatientList();
  }, [searchInput]);

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (searchType) {
      case 'name':
        break;
      case 'cpf':
        if (!searchInput) return;
        searchCpf(searchInput);
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex py-1 px-2 gap-1">
      <form onSubmit={handleFormSubmit} className="flex flex-col w-full">
        <ToggleGroup.Root
          className="flex w-full gap-2 ml-3"
          defaultValue="name"
          onValueChange={handleToggleChange}
          type="single"
          aria-label="Tipo de busca">
          <ToggleGroup.Item
            className="toggle-group-item"
            value="name"
            defaultChecked>
            Name
          </ToggleGroup.Item>
          <ToggleGroup.Item className="toggle-group-item" value="cpf">
            CPF
          </ToggleGroup.Item>
        </ToggleGroup.Root>
        <div className="flex gap-2">
          <Input
            value={searchInput}
            onChange={handleInputChange}
            onClickReset={() => setSearchInput('')}
            showCondition={!!searchInput}
            type="text"
            aria-label="Campo de busca"
            placeholder={placeholder[searchType]}
          />

          <ButtonLabel label="Pesquisar" type="submit">
            <MagnifyingGlassIcon />
          </ButtonLabel>
        </div>
      </form>

      <NewPatientDialog />
    </div>
  );
}
