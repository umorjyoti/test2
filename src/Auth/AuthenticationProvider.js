import React, {Children, createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [animation, setAnimation] = useState('Welcome');
  const [loader, setLoader] = useState(false);

  const handleAnimation = () => {
    setAnimation('Warning');
    setTimeout(() => {
      setAnimation('Welcome');
    }, 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        loader,
        animation,
        setAnimation,
        handleAnimation,
        user,
        setUser,
        login: async (email, password) => {
          try {
            setLoader(true);
            await auth().signInWithEmailAndPassword(email, password);
            setLoader(false);
          } catch (e) {
            handleAnimation();
            setLoader(false);
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            setLoader(true);
            await auth().createUserWithEmailAndPassword(email, password);
            setLoader(false);
          } catch (e) {
            handleAnimation();
            setLoader(false);
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        passwordReset: async email => {
          setLoader(true);
          await auth().sendPasswordResetEmail(email);
          setLoader(false);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
