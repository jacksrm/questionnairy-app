import React, { useState } from 'react';
import { getAllPatients } from '../commands/patient/getAll';
import showErrorFriendly from '../utils/show_error_friendly';
import { getPatient } from '../commands/patient/get';
import { toast } from 'sonner';

type PatientContextProps = {
  patients: Patient[];
  updatePatientList: () => Promise<void>;
  searchCpf: (value: string) => void;
};

type PatientsProviderProps = React.PropsWithChildren<{}>;
export const PatientContext = React.createContext<PatientContextProps>(
  {} as PatientContextProps,
);

export default function PatientsProvider({ children }: PatientsProviderProps) {
  const [patients, setPatients] = useState<Patient[]>([]);

  const updatePatientList = async () => {
    getAllPatients()
      .then((val) => {
        setPatients(val);
      })
      .catch((e: ResponseError) => showErrorFriendly(e));
  };

  const searchCpf = (value: string) => {
    getPatient({ type: 'cpf', value })
      .then((patient) => {
        if (patient) {
          setPatients([patient]);
          return;
        }

        toast.error('Nenhum paciente encontrado');
      })
      .catch((e: ResponseError) => showErrorFriendly(e));
  };

  return (
    <PatientContext.Provider value={{ patients, updatePatientList, searchCpf }}>
      {children}
    </PatientContext.Provider>
  );
}
