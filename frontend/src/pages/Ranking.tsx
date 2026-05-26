import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTop5, type PlayerScore } from '../services/api';
import { useGameStore } from '../store/useGameStore';

export function Ranking() {
  const [top5, setTop5] = useState<PlayerScore[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const resetGame = useGameStore((state) => state.resetGame);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getTop5();
        setTop5(data);
      } catch (error) {
        console.error("Erro ao buscar o ranking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="app-container">
      <h1>🏆 Top 5 uTech 🏆</h1>

      {loading ? (
        <p>Carregando ranking... ⏳</p>
      ) : (
        <div>
          <ul className="ranking-list">
            {top5.map((player, index) => {
              let podiumClass = '';
              if (index === 0) podiumClass = 'podium-1';
              if (index === 1) podiumClass = 'podium-2';
              if (index === 2) podiumClass = 'podium-3';

              return (
                <li key={index} className={`ranking-item ${podiumClass}`}>
                  <span>{index + 1}º {player.name}</span>
                  <span>{player.score} pts</span>
                </li>
              );
            })}
          </ul>

          {top5.length === 0 && <p>Ninguém jogou ainda. Seja o primeiro!</p>}

          <button onClick={handlePlayAgain} style={{ marginTop: '10px' }}>
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}