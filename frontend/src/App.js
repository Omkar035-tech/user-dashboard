import './App.css';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}

export default App;
