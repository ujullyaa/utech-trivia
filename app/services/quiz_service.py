import random


class QuizService:
    def get_questions(self):
        mock_questions = [
            {
                "category": "Geral", "type": "multiple", "difficulty": "easy",
                "question": "Qual é a capital do Brasil?",
                "correct_answer": "Brasília", "incorrect_answers": ["Rio de Janeiro", "São Paulo", "Salvador"]
            },
            {
                "category": "Geral", "type": "multiple", "difficulty": "easy",
                "question": "Quantos lados tem um triângulo?",
                "correct_answer": "3", "incorrect_answers": ["2", "4", "5"]
            },
            {
                "category": "Geral", "type": "multiple", "difficulty": "easy",
                "question": "Qual é a cor do céu em um dia limpo?",
                "correct_answer": "Azul", "incorrect_answers": ["Verde", "Vermelho", "Amarelo"]
            },
            {
                "category": "Geral", "type": "multiple", "difficulty": "medium",
                "question": "Quem pintou a Mona Lisa?",
                "correct_answer": "Leonardo da Vinci", "incorrect_answers": ["Van Gogh", "Picasso", "Michelangelo"]
            },
            {
                "category": "Geral", "type": "multiple", "difficulty": "medium",
                "question": "Qual é o maior planeta do sistema solar?",
                "correct_answer": "Júpiter", "incorrect_answers": ["Saturno", "Marte", "Terra"]
            },
            {
                "category": "Geral", "type": "multiple", "difficulty": "hard",
                "question": "De quem é a famosa frase 'Penso, logo existo'?",
                "correct_answer": "René Descartes", "incorrect_answers": ["Platão", "Galileu Galilei", "Sócrates"]
            }
        ]

        random.shuffle(mock_questions)

        return mock_questions


quiz_service_instance = QuizService()
