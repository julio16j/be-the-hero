import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [ title, setTitle] = useState('');
  const [ description, setDescription] = useState('');
  const [ value, setValue] = useState('');
  const history = useHistory();
  async function handleCreateIncident(e){
    e.preventDefault();
    const ongId = localStorage.getItem('ongId');
    const data = {
      title,
      description,
      value
    }
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile');
    } catch (error) {
      alert('Erro ao tentar criar incidents, tente novamente.')
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Create a new case</h1>
          <p>Describe the case in detail to find a hero to solve it.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Back to home
          </Link>
        </section>
        <form onSubmit={handleCreateIncident}>
          <input placeholder="Case title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <input placeholder="Amount" value={value} onChange={e => setValue(e.target.value)} />

          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}