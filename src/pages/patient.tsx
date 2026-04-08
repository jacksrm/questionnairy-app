import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPatient } from '../commands/patient/get';
import showErrorFriendly from '../utils/show_error_friendly';
import './patient.css';

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
      <section className="title">
        <h1 className="patient-title">{patient.name}</h1>
      </section>
      <section className="activity-history">
        <h2 className="activity-history-title">Histórico de Atividades</h2>
      </section>
    </main>
  );
}
