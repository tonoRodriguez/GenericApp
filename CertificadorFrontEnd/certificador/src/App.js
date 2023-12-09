import './App.css';
import CertifyAll from './components/CertifyAll';
import ProductList from './components/ProductList';

function App() {
  return (
    <div>
      <h1>Sistema de certificacion de Productos</h1>
      <ProductList/>
      <CertifyAll/>
    </div>
  );
}

export default App;
