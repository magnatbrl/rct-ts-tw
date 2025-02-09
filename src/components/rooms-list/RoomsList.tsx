import { useEffect, useState } from 'react'
import instance from '../../lib/axios';
import { Room } from '../../types/types';
import styles from './RoomsList.module.css';
import BedsForm from '../beds-form/BedsForm';

interface Props {
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>,
  rooms: Room[]
}

export default function RoomsList({ rooms, setRooms }: Props) {

  const [accordionOpen, setAccordionOpen] = useState(false);

  async function fetchRooms() {
    const res = await instance.get('/rooms', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    setRooms(res.data)
  }


  async function deleteRoom(id: number) {
    const res = await instance.delete(`/rooms/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })

    if (res.status === 204) {
      fetchRooms();
    }
  }

  function handleDeleteRoom(id: number) {
    deleteRoom(id);
  }

  async function deleteBed(id: number) {
    const res = await instance.delete(`/beds/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    if (res.status === 204) {
      fetchRooms();
    }
  }

  function handleDeleteBed(id: number) {
    deleteBed(id);
  }


  useEffect(() => { fetchRooms() }, [])

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Rooms</h2>
        <ul className={styles.cardContainer}>
          {rooms.map((room) => (<li key={room.id} className={styles.card}>
            <p className='text-sm mb-0'>Type room: {room.type}</p>
            <p className='text-sm'>Number room: {room.number}</p>
            <button className={styles.removeBtn} onClick={() => handleDeleteRoom(room.id)}>Delete Room</button>
            <div className='bg-gray-100 rounded-md mt-6'>
              <div className='py-2 ml-2'>
                <button
                  onClick={() => setAccordionOpen(!accordionOpen)}
                  className='flex justify-between w-full'>
                  <span className=''>Bed</span>
                  {accordionOpen ? <span className='mr-2'>-</span> : <span className='mr-2'>+</span>}
                </button>
                <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
                  }`}>
                  <div className='overflow-hidden'>
                    <ul className={styles.bedsContainer}>
                      {room.beds.map(
                        (bed) => <li key={bed.id} className={styles.cardBed}>
                          <p className='text-sm mb-0 mt-4'>Type bed: {bed.type}</p>
                          <p className='text-sm mb-1'>Number bed: {bed.number}</p>
                          <button className={styles.removeBtn} onClick={() => handleDeleteBed(bed.id)}>Delete Bed</button>
                        </li>
                      )}
                    </ul>
                    <BedsForm roomId={room.id} />
                  </div>
                </div>
              </div>
            </div>
          </li>))}
        </ul>
      </div>
    </>

  )
}