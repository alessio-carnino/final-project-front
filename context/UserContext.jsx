import axios from "axios";
import { createContext, useContext, useState } from "react";
const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UseProvider = ({ children }) => {
  const storedUserToken = localStorage.getItem("userToken");
  const [userToken, setUserToken] = useState(storedUserToken);
  const storedUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(storedUserId);

  // not sure about this (???)
  const changeData = (newData) => {
    if (newData) {
      setUserToken(newData.token);
      localStorage.setItem("userToken", newData.token);
      setUserId(newData.userId);
      localStorage.setItem("userId", newData.userId);
    } else {
      localStorage.clear();
      setUserToken(null);
      setUserId(null);
    }
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (props) => {
    if (loading) return;

    let {
      first_name,
      last_name,
      user_name,
      email,
      password,
      repeat_password,
      profession_title,
      cover_img,
      description,
      description_preview,
    } = props;

    if (password !== repeat_password) {
      throw new Error(`Passwords don't match`);
    }

    setError(null);
    setLoading(true);

    try {
      const { data } = await axios.post(`${VITE_API_URL}/auth/signup`, {
        first_name,
        last_name,
        user_name,
        email,
        password,
        profession_title,
        cover_img,
        description,
        description_preview,
      });
      changeData(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (props) => {
    if (loading) return;

    const { email, password } = props;

    setError(null);
    setLoading(true);

    try {
      const { data } = await axios.post(`${VITE_API_URL}/auth/login`, {
        email,
        password,
      });
      changeData(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async (props) => {
    if (loading) return;

    setError(null);
    setLoading(true);
    changeData(null);
    setLoading(false);
  };

  const value = {
    userToken,
    userId,
    logOut,
    logIn,
    signUp,
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
