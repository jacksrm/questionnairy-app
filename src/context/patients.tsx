import React, { useState } from 'react';
import { getAllPatients } from '../commands/patient/get_all';
import showErrorFriendly from '../utils/show_error_friendly';
import { getPatient } from '../commands/patient/get';
import { toast } from 'sonner';
import getByName from '../commands/patient/get_by_name';

type PatientContextProps = {
  patients: Patient[];
  updatePatientList: () => Promise<void>;
  searchCpf: (value: string) => void;
  searchName: (value: string) => void;
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

  const searchName = (value: string) => {
    getByName(value)
      .then((patients) => {
        if (patients.length === 0) {
          toast.error('Nenhum paciente encontrado');
          return;
        }

        setPatients(patients);
      })
      .catch((e: ResponseError) => showErrorFriendly(e));
  };

  const context = { patients, updatePatientList, searchCpf, searchName };
  return (
    <PatientContext.Provider value={context}>
      {children}
    </PatientContext.Provider>
  );
}
