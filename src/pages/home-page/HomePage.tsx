
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import { Room } from "../../types/types";




const HomePage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  async function fetchRooms() {
    const res = await instance.get('/rooms', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    setRooms(res.data)
  }
  useEffect(() => { fetchRooms() }, [])



  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Available Rooms</h2>
      <div className={styles.cardContainer}>
        {rooms.map((room) => (
          <Link to={`/rooms/${room.id}`} key={room.id} className={styles.card}>
            <img src={room.image} alt={room?.type} className={styles.image} />
            <h2 className={styles.roomTitle}>{room.type}</h2>
            <p className={styles.description}>{room?.description}</p>
            <p className={styles.price}>Price: €{room?.price}</p>
            
          </Link>
          
        ))}
      </div>
       {/* Дополнительные услуги */}
       <div className={styles.servicesSection}>
        <h2 className={styles.title}>Additional Services 
          you can order all additional services upon arrival.</h2>
  
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/Clean.jpg" alt="Cleaning Service" />
            <p className={styles.servicesDescription}>Extra Room Cleaning</p>
          </div>
          <div className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/flamingoImage.jpg" alt="Flamingo Trip & Salt Museum" />
            <p className={styles.servicesDescription}>Flamingo Trip & Salt Museum</p>
          </div>
          <div className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/baggage.webp" alt="Luggage Storage" />
            <p className={styles.servicesDescription}>Luggage Storage</p>
      
          </div>
          <div className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Private Surfing Lessons" />
            <p className={styles.roomDescription}>Private Surfing Lessons</p>
  
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;