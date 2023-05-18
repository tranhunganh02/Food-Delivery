import { useEffect } from "react";
import countProduct from "../../features/User/countProductInCart";
import { createContext } from "react";
import { useState } from "react";

export const CountContext = createContext(0);

export const CountProductInCart = ({ children }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    countProduct().then((data) => {
      setCount(data);
    });
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
