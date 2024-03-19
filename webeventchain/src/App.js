import mcloving from './mcloving.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>EventChain</h1> {/* Cambia el título aquí */}
        <p>
          Bienvenido a EventChain, la plataforma de eventos descentralizada.
        </p>
        <img src={mcloving} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
