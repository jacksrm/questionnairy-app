type GetPatientByInput = {
  type: 'id' | 'cpf';
  value: string;
};

type CreatePatientInput = {
  name: string;
  cpf: string;
  phone1: string;
  phone2: string | null;
  birth_date: string;
};
