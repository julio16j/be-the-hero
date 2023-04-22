import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Longon(){
  const [id, setId] = useState('');
  const history = useHistory('');
  async function handleLongin(e){
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (error) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
   <div className="logon-container">
     <section className="form">
      <img src={logoImg} alt="Be The Hero"/>
      <form onSubmit={handleLongin}>
        <h1>Make your login here</h1>
        
        <input placeholder="Your ID" value={id} onChange={e => setId(e.target.value)} />
        <button className="button" type="submit" >Enter</button>

        <Link className = "back-link"   to="/register">
          <FiLogIn  size={16} color ="#E02041" />
          I don't have account
        </Link>
      </form>
     </section>
     <img src={heroesImg} alt="Heroes"/>
   </div>
  )
}