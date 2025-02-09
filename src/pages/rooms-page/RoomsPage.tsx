
import RoomsList from '../../components/rooms-list/RoomsList'
import RoomsForm from '../../components/rooms-form/RoomForm'
import { useState } from 'react';
import { Room } from '../../types/types';

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
  return (
    <div>
      <RoomsForm rooms={rooms} setRooms={setRooms} />
      <RoomsList rooms={rooms} setRooms={setRooms} />
    </div>
  )
}

