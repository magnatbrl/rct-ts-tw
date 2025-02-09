import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Room } from "../../types/types";
import BookingForm from "../../components/booking-form/BookingForm";
import styles from "./RoomPage.module.css";
export default function RoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<Room | undefined>(undefined);
  async function fetchRoom() {
    const res = await instance.get(`/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setRoom(res.data);
  }
  useEffect(() => {
    fetchRoom();
  }, []);
  return (
    <div className={styles.roomContainer}>
      {room && (
        <>
          <img className={styles.roomImage} src={room.image} alt={room.type} />
          <h2>{room.type}</h2>
          <p className={styles.roomDescription}>{room.description}</p>
          <p className={styles.roomPrice}>Price: ${room.price}</p>
          <ul className={styles.bedList}>
            {room.beds.map((bed) => (
              <li key={bed.id} className={styles.bedItem}>
                <p>{bed.type}</p>
                <p>{bed.number}</p>
                <div className={styles.bookingFormWrapper}>
                  <h3>Book this bed</h3>
                  <BookingForm id={bed.id} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
