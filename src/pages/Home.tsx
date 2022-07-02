import { useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import { child, get, ref } from 'firebase/database';
import { database } from '../services/firebase';
import { CreateRoomButton, Input, Separator } from '../components/Styled';

export function Home() {
  const navigateTo = useNavigate();
  const { user, signIn } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signIn();
    }
    navigateTo('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await ref(database, 'rooms');
    const roomSnapshot = await get(child(roomRef, `${roomCode}`));

    if (!roomSnapshot.exists()) {
      alert('Room does not exist');
      return;
    }

    if (roomSnapshot.val().endedAt) {
      alert('Room already ended');
      return;
    }

    navigateTo(`/rooms/${roomCode}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img
          src={illustrationImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />
          <CreateRoomButton onClick={handleCreateRoom}>
            <img src={googleIconImg} alt='Logo do Google' />
            Crie sua sala com o Google
          </CreateRoomButton>
          <Separator>ou entre em uma sala</Separator>
          <form onSubmit={handleJoinRoom}>
            <Input
              type='text'
              placeholder='Digite o código da sala'
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
