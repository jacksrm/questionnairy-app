import { useNavigate, useParams } from 'react-router';
import './patient.css';
import { useEffect, useState } from 'react';
import { getPatient } from '../commands/patient/get';
import showErrorFriendly from '../utils/show_error_friendly';

export default function Patient() {
  const [patient, setPatient] = useState<Patient>({} as Patient);

  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (id) {
      getPatient({ type: 'id', value: id })
        .then((p) => {
          if (p) {
            setPatient(p);
            return;
          }

          nav('/');
        })
        .catch((e: ResponseError) => showErrorFriendly(e));
    }
  }, []);
  return (
    <main>
      <h1>Patient</h1>
      <div>
        <h3>ID: </h3>
        <p>{id}</p>
      </div>
      <div>
        <h3>Nome:</h3>
        <p>{patient.name}</p>
      </div>
      <div>
        <h3>CPF:</h3>
        <p>{patient.cpf}</p>
      </div>
      <div>
        <h3>Data de Nascimento: </h3>
        <p>{patient.birth_date}</p>
      </div>
      <div>
        <h3>Telefone 1:</h3>
        <p>{patient.phone1}</p>
      </div>
      <div>
        <h3>Telefone 2:</h3>
        <p>{patient.phone2 || 'Nenhum Telefone Registrado'}</p>
      </div>
    </main>
  );
}
