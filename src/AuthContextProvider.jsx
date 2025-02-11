import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(false);
    console.log(user);

    const login = (email, password, handleError) => {
        console.log("logging in via auth context");
        axios.post('http://localhost:8080/exerciseApp/api/user/login', {
                username: email,
                password: password
              })
              .then(function (response) {
                console.log("AUTH RESPONSE = ", response);
                setUser(response.data);
              })
              .catch(function (error) {
                if (handleError) {
                  handleError();
                }
              });
    };

    const register = (email, password, handleError) => {
        console.log("registering user...");
        axios.post('http://localhost:8080/exerciseApp/api/user/register', {
            username: email,
            password: password
          })
          .then(function (response) {
            console.log(response)
            setUser(response.data);
          })
          .catch(function (error) {
            if (handleError) {
              handleError();
            }
          });
    };

    return (
        <AuthContext.Provider value={{user, setUser, login, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;