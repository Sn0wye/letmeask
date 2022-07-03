import { useNavigate, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import noQuestions from '../assets/images/noQuestions.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

// import { useAuth } from "../hooks/useAuth";
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { database } from '../services/firebase';
import { ref, remove, update } from 'firebase/database';
import { QuestionButton } from '../components/QuestionButton';
import { DeleteButton } from '../components/DeleteButton';

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
          {questions.length === 0 ? (
            <div className='no-questions'>
              <img src={noQuestions} alt='No questions illustration' />
              <h2>No questions around here...</h2>
              <p>
                Share the room code with your friend and start answering
                questions!
              </p>
            </div>
          ) : (
            questions?.map((question) => {
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
                        onClick={() =>
                          handleMarkQuestionAsAnswered(question.id)
                        }
                      >
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <circle
                            cx='12.0003'
                            cy='11.9998'
                            r='9.00375'
                            stroke='#737380'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                          <path
                            d='M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193'
                            stroke='#737380'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      </QuestionButton>
                      <QuestionButton
                        type='button'
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z'
                            stroke='#737380'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      </QuestionButton>
                    </>
                  )}
                  <DeleteButton
                    type='button'
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M3 5.99988H5H21'
                        stroke='#737380'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z'
                        stroke='#737380'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </DeleteButton>
                </Question>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
