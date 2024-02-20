import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [myData, setMyData] = useState(null);
  const setMyDataValue = (data) => {
    setMyData(data);
  };

  return (
    <MyContext.Provider value={{ myData, setMyData: setMyDataValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
