import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

function App() {
  const [name, setName] = useState('');
  const [book, setBook] = useState('');
  const [idBook, setIdBook] = useState(0);
  const [time, setTime] = useState(0);

  const createAndDownloadoOrShare = () => {
    axios.post('/create-pdf', {name, book, idBook, time})
      .then(() => axios.get('/fetch-pdf'), {responseType: 'blob'})
      .then(res => {
        const pdfBlob = new Blob([res.data], {type: 'application/pdf'});

        saveAs(pdfBlob, 'emprestimo-livro.pdf');
      });
  };
  return (
    <div className="App">
      <input type="text"  placeholder="Nome" name="name" onChange={e => setName(e.target.value)}/>
      <input type="text" placeholder="Livro Recebido" name="book" onChange={e => setBook(e.target.value)}/>
      <input type="number" placeholder="Código do livro" name="idBook" onChange={e => setIdBook(e.target.value)}/>
      <input type="number" placeholder="Prazo" name="time" onChange={e => setTime(e.target.value)}/>
      <button onClick={createAndDownloadoOrShare}>
        Download 📥
      </button>
      {JSON.stringify(`${name}`)}
    </div>
  );
}

export default App;
