import { useEffect } from "react";
import countProduct from "../../features/User/countProductInCart";
import { createContext } from "react";
import { useState } from "react";
import { auth } from "../../firebase";

export const CountContext = createContext(0);

export const CountProductInCart = ({ children }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userLogin) => {
      if (userLogin != null) {
        countProduct().then((data) => {
          setCount(data);
        });
      } else {
        setCount(0);
      }
    });
    return unsubscribe;
  }, []);
  const updateCount = () => {
    countProduct().then((data) => {
      setCount(data);
    });
  };
  return (
    <CountContext.Provider value={{ count, updateCount }}>
      {children}
    </CountContext.Provider>
  );
};
