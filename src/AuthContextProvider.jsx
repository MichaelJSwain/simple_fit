import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(undefined);

    const login = (email, password, handleError) => {
        console.log("logging in via auth context");
        axios.post('http://localhost:8080/exerciseApp/api/user/login', {
                username: email,
                password: password
              })
              .then(function (response) {
                setUser(response.data);
              })
              .catch(function (error) {
                handleError(true);
              });
    };

    const register = (email, password) => {
        console.log("registering user...");
        axios.post('http://localhost:8080/exerciseApp/api/user/register', {
            username: email,
            password: password
          })
          .then(function (response) {
            setUser(response.data);
          })
          .catch(function (error) {
            handleError(true);
          });
    };

    return (
        <AuthContext.Provider value={{user, setUser, login, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;