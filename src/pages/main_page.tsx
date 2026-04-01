import { useContext, useEffect, useState } from 'react';
import PatientCard from '../components/patient_card';
import SearchMenu from '../components/search_menu';
import './main_page.css';
import { getAllPatients } from '../commands/patient/getAll';
import showErrorFriendly from '../utils/show_error_friendly';
import { PatientContext } from '../context/patients';

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
