/** @format */
import { useState, useCallback, useRef, useMemo } from "react";
import { Input } from "../components";
import Button from "../components/Button";
import { validateLoginForm } from "./../utils/validation";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { boxStyle } from "./styles";
import { login as handleLogin } from "../store/reducers/authReducer";
import { AppDispatch } from "../store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  const [errorMsgs, setErrorMsg] = useState({
    username: "",
    password: "",
  });
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    username: null,
    password: null,
  });

  const handleSubmit = useCallback(
    (event: { preventDefault: any }) => {
      event.preventDefault();

      if (inputRefs.current.username && inputRefs.current.password) {
        const username = inputRefs.current.username.value;
        const password = inputRefs.current.password.value;

        const errorMsgs = validateLoginForm(username, password);
        setErrorMsg({
          username: errorMsgs.username || "",
          password: errorMsgs.password || "",
        });

        if (!errorMsgs.username && !errorMsgs.password) {
          dispatch(handleLogin({ username, password }));
        }
      }
    },
    [dispatch]
  );

  const passErrMsg = useMemo(() => {
    if (errorMsgs.password) return errorMsgs.password;
    if (inputRefs.current.username && inputRefs.current.password) {
      const username = inputRefs.current.username.value;
      const password = inputRefs.current.password.value;
      return username && password && !auth.isLoggedIn
        ? "Username or password is incorrect"
        : "";
    }
  }, [auth.isLoggedIn, errorMsgs.password]);

  if (auth.isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="app">
      <Box component="form" onSubmit={handleSubmit} style={boxStyle}>
        <Input
          label="Username"
          ref={(element) => (inputRefs.current.username = element)}
          error={errorMsgs.username}
        />
        <Input
          label="Password"
          type="password"
          ref={(element) => (inputRefs.current.password = element)}
          error={passErrMsg}
        />
        <Button label={"Login"} />
      </Box>
    </div>
  );
};

export default Login;
