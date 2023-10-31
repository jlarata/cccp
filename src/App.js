import logo from './logo.svg';
import './App.css';
import { Films } from './components/Films';
import { Header } from './components/Header';
import { FrasesSobreGatos } from './components/FrasesSobreGatos';



function App() {
  return (
    //react fragment
    <>
      <Header></Header>
      <Films></Films>
      <FrasesSobreGatos></FrasesSobreGatos>
    </>
    
  );
}

export default App;
