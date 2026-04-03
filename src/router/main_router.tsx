import { HashRouter, Route, Routes } from 'react-router';
import MainPage from '../pages/main_page';
import Patient from '../pages/patient';

export default function MainRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="patient/:id" element={<Patient />} />
      </Routes>
    </HashRouter>
  );
}
