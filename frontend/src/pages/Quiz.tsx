import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { fetchQuizQuestions, saveRanking, type Question } from '../services/api';

export function Quiz() {
  const navigate = useNavigate();
  const { playerName, score, incrementScore } = useGameStore();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!playerName) navigate('/');
  }, [playerName, navigate]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuizQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
        alert("Erro ao carregar o quiz. Verifique se o Docker está rodando.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    if (playerName) loadQuestions();
  }, [playerName, navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswerClick = async (answer: string) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    if (isCorrect) incrementScore(10);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsSaving(true);
      try {
        const finalScore = isCorrect ? score + 10 : score;
        await saveRanking(playerName, finalScore);
        navigate('/ranking');
      } catch (error) {
        console.error("Erro ao salvar ranking:", error);
        alert("Erro ao salvar sua pontuação.");
        setIsSaving(false);
      }
    }
  };

  if (loading) return <div className="app-container"><h3>Buscando perguntas do cache... ⏳</h3></div>;
  if (isSaving) return <div className="app-container"><h3>Salvando sua pontuação no banco... 💾</h3></div>;
  
  if (!currentQuestion) {
    return (
      <div className="app-container">
        <h3>Ops! Nenhuma pergunta foi encontrada.</h3>
        <button onClick={() => navigate('/')}>Voltar para o início</button>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ maxWidth: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px' }}>
        <strong>👤 {playerName}</strong>
        <strong>📊 {score} pts</strong>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px' }} className="ranking-item">
        <span style={{ fontSize: '14px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>
          Pergunta {currentQuestionIndex + 1} de {questions.length} • Nível: {currentQuestion.difficulty}
        </span>
        
        <h2 style={{ margin: '15px 0' }} dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className="answer-btn"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
}