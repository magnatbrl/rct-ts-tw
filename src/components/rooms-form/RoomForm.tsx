import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import instance from "../../lib/axios";
import styles from "./RoomForm.module.css";
import { Room } from "../../types/types";

const schema = Yup.object({
  number: Yup.string().required("Room number is required!"),
  type: Yup.string().required("Type is required!"),
});

interface Props {
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  rooms: Room[];
}

const RoomsForm = ({ setRooms }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function fetchRooms() {
    const res = await instance.get("/rooms", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setRooms(res.data);
  }

  const formik = useFormik({
    initialValues: {
      number: "",
      type: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const regRes = await instance.post("/rooms", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (regRes.status === 201) {
          setSuccessMessage("Room is successfully added")
          fetchRooms();
        }
      } catch (error) {
        // if (error instanceof AxiosError) {
        //   setErrorMessage(error.response?.data?.message || 'An error occurred');
        // }
      }
    },
  });
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Add room</h2>
        <form onSubmit={formik.handleSubmit}>
        {errorMessage && <div className="error pl-3 text-red-500">{errorMessage}</div>}
        {successMessage && <div className="success pl-3 text-green-500">{successMessage}</div>}
          <input
            type="text"
            name="number"
            placeholder="room number"
            value={formik.values.number}
            onChange={formik.handleChange}
          />
          {formik.errors.number && (
            <div className="error">{formik.errors.number}</div>
          )}
          <input
            type="text"
            name="type"
            placeholder="type"
            value={formik.values.type}
            onChange={formik.handleChange}
          />
          <button type="submit" className={styles.btn}>
            Add
          </button>
        </form>
      </div>
    </>
  );
};
export default RoomsForm;
