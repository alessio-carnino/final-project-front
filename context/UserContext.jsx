import axios from "axios";
import { createContext, useContext, useState } from "react";
const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UseProvider = ({ children }) => {
  const storedData = localStorage.getItem("data");

  const [data, setData] = useState(storedData ? JSON.parse(storedData) : null);

  // immagino sia per il PATCH di user (???)
  const changeData = (newData) => {
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (props) => {
    if (loading) return;

    const {
      first_name,
      last_name,
      user_name,
      email,
      password,
      repeat_password,
      profession_title,
      cover_img,
    } = props;

    setError(null);
    setLoading(true);

    if (password !== repeat_password) {
      throw new Error("Passwords don't match");
    }
    try {
      const { data } = await axios.post(`${VITE_API_URL}/auth/signup`, {
        first_name,
        last_name,
        user_name,
        email,
        password,
        profession_title,
        cover_img,
      });
      changeData(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    ...data,
    error,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
