import { Toaster } from 'sonner';
import PatientsProvider from './context/patients';
import MainRouter from './router/main_router';

function App() {
  return (
    <PatientsProvider>
      <Toaster />
      <MainRouter />
    </PatientsProvider>
  );
}

export default App;
