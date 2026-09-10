import { useClinic } from "./hooks/useClinica";
import WaitingListPanel from "./componentes/PanelEspera";
import HistoryPanel from "./componentes/PanelHistorial";
import DoctorRotationPanel from "./componentes/PanelRotacionMedicos";
import CommitteePanel from "./componentes/PanelComite";
import "./App.css";

function App() {
  const {
    waitingPatients,
    history,
    doctors,
    committeeMembers,
    countdown,
    attendPatient,
    addPatient,
    rotateNow,
    committeeNext,
    committeePrev,
  } = useClinic();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Panel de gestion - Clinica</h1>
        <p>
          Pacientes en espera, historial de atencion, rotacion de medicos y
          comite administrativo, cada uno con su propia estructura de datos
        </p>
      </header>

      <main className="grid">
        <WaitingListPanel
          patients={waitingPatients}
          onAttend={attendPatient}
          onAddPatient={addPatient}
        />
        <HistoryPanel history={history} />
        <DoctorRotationPanel
          doctors={doctors}
          countdown={countdown}
          onRotateNow={rotateNow}
        />
        <CommitteePanel
          members={committeeMembers}
          onNext={committeeNext}
          onPrev={committeePrev}
        />
      </main>
    </div>
  );
}

export default App;