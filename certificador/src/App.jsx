import './App.css';
import CertifyAll from './components/CertificacionPesticidas/CertifyAll';
import CertifySAG from './components/CertificacionSAG/CerificacionSAG';
import CertifyBano from './components/CertificacionBanoJabonoso/CerificacionBano'
import ProductList from './components/ProductList';
import {Link, Route, Routes} from "react-router-dom"


function App() {
  return (
    <div>
      <h1>Sistema de certificacion de Productos</h1>
      <ProductList/>
      <nav>
        <ul>
          <li>
            <Link to ="/">Certificacion SAG</Link>
          </li>
          <li>
            <Link to ="/pesticida">Certificacion Pestiidas</Link>
          </li>
          <li>
            <Link to ="/banojabon">Baño jabonoso</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element = {<CertifySAG/>} />
        <Route path="/pesticida" element = {<CertifyAll/>} />
        <Route path="/banojabon" element = {<CertifyBano/>} />
      </Routes>
    </div>
  );
}

export default App;
