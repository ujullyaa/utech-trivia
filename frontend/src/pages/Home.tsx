import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

export function Home() {
  const [nameInput, setNameInput] = useState('');
  
  const navigate = useNavigate();
  
  const setPlayerName = useGameStore((state) => state.setPlayerName);

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (nameInput.trim() === '') {
      alert("Por favor, digite seu nome para começar!");
      return;
    }
    
    setPlayerName(nameInput);
    navigate('/quiz');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>uTech Trivia 🚀</h1>
      <p>Teste seus conhecimentos e entre para o Top 5!</p>
      
      <form onSubmit={handleStartGame} style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="Qual o seu nome?" 
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{ 
            padding: '10px', 
            fontSize: '16px', 
            borderRadius: '4px', 
            border: '1px solid #ccc',
            marginRight: '10px'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            cursor: 'pointer',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Jogar
        </button>
      </form>
    </div>
  );
}