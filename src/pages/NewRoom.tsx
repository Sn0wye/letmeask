import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ref, push } from 'firebase/database';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { Input } from '../components/Styled';

export function NewRoom() {
  const { user } = useAuth();
  const navigateTo = useNavigate();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return;

    const roomRef = ref(database, 'rooms');

    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    });

    navigateTo(`/admin/rooms/${firebaseRoom.key}`);
  }
  return (
    <div id='page-auth'>
      <aside>
        <img
          src={illustrationImg}
          alt='Illustration symbolizing questions and answers'
        />
        <strong>Create Q&amp; Live Rooms</strong>
        <p>Ask questions of your audience in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask Logo' />
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <Input
              type='text'
              placeholder='Room name'
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <Button type='submit'>Create Room</Button>
          </form>
          <p>
            Want to enter a existing room? <Link to='/'>Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
