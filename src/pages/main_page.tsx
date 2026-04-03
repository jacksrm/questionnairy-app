import { useContext, useEffect } from 'react';
import PatientCard from '../components/patient_card';
import SearchMenu from '../components/search_menu';
import { PatientContext } from '../context/patients';
import './main_page.css';

export default function MainPage() {
  const { patients, updatePatientList } = useContext(PatientContext);

  useEffect(() => {
    updatePatientList();
  }, []);

  return (
    <main className="flex flex-col">
      <SearchMenu />

      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </main>
  );
}
