import { useNavigate, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

// import { useAuth } from "../hooks/useAuth";
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { database } from '../services/firebase';
import { ref, remove, update } from 'firebase/database';
import { QuestionButton } from '../components/QuestionButton';

type RoomParams = {
  id: string | undefined;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const navigateTo = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    const roomRef = ref(database, `rooms/${roomId}`);
    await update(roomRef, {
      endedAt: new Date(),
    });

    navigateTo('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    const questionRef = ref(
      database,
      `rooms/${roomId}/questions/${questionId}`
    );
    if (window.confirm('Are you sure you want to delete this question?')) {
      await remove(questionRef);
    }
  }

  async function handleMarkQuestionAsAnswered(questionId: string) {
    const questionRef = ref(
      database,
      `rooms/${roomId}/questions/${questionId}`
    );
    await update(questionRef, {
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    const questionRef = ref(
      database,
      `rooms/${roomId}/questions/${questionId}`
    );
    await update(questionRef, {
      isHighlighted: true,
    });
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Logo do Letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button outlined onClick={handleEndRoom}>
              End room
            </Button>
          </div>
        </div>
      </header>

      <main className='content'>
        <div className='room-title'>
          <h1>{title} Room</h1>
          {questions.length > 0 && <span>{questions.length} question(s)</span>}
        </div>

        <div className='question-list'>
          {questions?.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <QuestionButton
                      type='button'
                      onClick={() => handleMarkQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt='Mark a question as answered' />
                    </QuestionButton>
                    <QuestionButton
                      type='button'
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt='Highlight a question' />
                    </QuestionButton>
                  </>
                )}
                <QuestionButton
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt='Remove a question' />
                </QuestionButton>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
