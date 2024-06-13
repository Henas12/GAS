import { createContext, useContext, useState } from 'react';
import ServerChecker from './error/ServerChecker';
import { BASE_URL } from '../constants';
const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [myData, setMyData] = useState(null);
  const setMyDataValue = (data) => {
    setMyData(data);
  };

  return (
<ServerChecker url={BASE_URL}>
    <MyContext.Provider value={{ myData, setMyData: setMyDataValue }}>
      {children}
    </MyContext.Provider>
    </ServerChecker>
  );
};

export const useMyContext = () => useContext(MyContext);
