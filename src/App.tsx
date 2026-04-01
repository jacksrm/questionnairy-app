import { Toaster } from 'sonner';
import MainPage from './pages/main_page';
import PatientsProvider from './context/patients';

function App() {
  return (
    <>
      <PatientsProvider>
        <Toaster />
        <MainPage />
      </PatientsProvider>
    </>
  );
}

export default App;
