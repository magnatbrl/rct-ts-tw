import React, { useState, useEffect } from "react";
import styles from "./CheckoutPage.module.css";
import instance from "../../lib/axios";

interface CheckoutInfoItem {
  id: number;
  entryDate: string;
  departureDate: string;
  totalPrice: number;
  bookingNumber: string;
}

const CheckoutPage: React.FC = () => {
  const [checkoutInfoItems, setCheckoutInfoItems] = useState<CheckoutInfoItem[]>([]);
  const fetchCheckout = async () => {
    const res = await instance.post('/booking/confirm', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })

    if (res.status === 200) {
      setCheckoutInfoItems(res.data);
    }

  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  return (
    <div className={styles.checkoutContainer}>
      <h1>Bookings</h1>
      <ul>
        {checkoutInfoItems.map((item) => (
          <li key={item.id}>
            <p>Entry date: {item.entryDate}</p>
            <p>Departure date: {item.departureDate}</p>
            <p>Total price: {item.totalPrice}</p>
            <p>Booking number: {item.bookingNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutPage;
