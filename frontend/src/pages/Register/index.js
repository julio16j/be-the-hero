import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };
    try {
      const response = await api.post('ongs', data);
  
      alert('Seu Id de acesso: '+response.data.id);

      history.push('/');
    } catch ( err ){
      alert('Erro no cadastro, tente novamente;');
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Sign Up</h1>
          <p>Sign up, log in, and help people find your NGO's causes on the platform</p>

          <Link className = "back-link"   to="/">
            <FiArrowLeft  size={16} color ="#E02041" />
            I already have an account.
          </Link>
        </section>
        <form onSubmit={handleRegister} >
          <input placeholder ="NGO's name" value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder ="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder ="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          
          <div className="input-group">
            <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
            <input placeholder="UF" value={uf} onChange={e => setUf(e.target.value)} />
          </div>

          <button className="button" type="submit" >Register</button>
        </form>
      </div>
    </div>
  )
}