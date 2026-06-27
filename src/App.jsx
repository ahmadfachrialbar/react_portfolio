import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import CursorGlow from './components/common/CursorGlow';
import './App.css';

export default function App() {
  return (
    <LanguageProvider>
      <CursorGlow />
      <Home />
    </LanguageProvider>
  );
}
