import './App.css';
import CertifyAll from './components/CertificacionPesticidas/CertifyAll';
import CertifySAG from './components/CertificacionSAG/CerificacionSAG';
import CertifyBano from './components/CertificacionBanoJabonoso/CerificacionBano'
import {Link, Route, Routes} from "react-router-dom"


function App() {
  return (
    <div>
      <h1>Sistema de certificacion de Productos</h1>
      <nav>
        <div>
          <div>
            <Link to ="/">Certificacion SAG</Link>
          </div>
          <div>
            <Link to ="/pesticida">Certificacion Pesticidas</Link>
          </div>
          <div>
            <Link to ="/banojabon">Baño jabonoso</Link>
          </div>          
        </div>
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
