import logo from './logo.svg';
import './App.css';
import { Films } from './components/Films';
import { Header } from './components/Header';



function App() {
  return (
    //react fragment
    <>
      <Header></Header>
      <Films></Films>
    </>
    
  );
}

export default App;
