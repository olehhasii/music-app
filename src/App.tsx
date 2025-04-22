import './App.css';
import ToastMessage from './components/Forms/ToastMessage';
import Header from './components/Header';

import TracksSection from './components/Tracks/TracksSection';

function App() {
  return (
    <>
      <Header />
      <TracksSection />
      <ToastMessage />
    </>
  );
}

export default App;
