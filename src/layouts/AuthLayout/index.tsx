import { Button, TextField } from "@mui/material";
import React, { useReducer } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import { userAuth } from "../../redux/auth/asyncActions";
import styles from "./AuthLayout.module.scss";
const AuthLayout = () => {
  const dispatch = useAppDispatch();

  const { isLoading, isAuth } = useAppSelector((state) => state.auth);
  let location = useLocation();
  const [form, updateForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    { username: "", password: "" }
  );
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userAuth({ username: form.username, password: form.password }));
  };

  if (isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <TextField
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
            autoComplete="off"
            name="username"
            sx={{ marginBottom: "20px" }}
            required
            label="Login"
            size="small"
            fullWidth
          />
          <TextField
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
            autoComplete="off"
            name="password"
            sx={{ marginBottom: "20px" }}
            required
            label="Password"
            size="small"
            type={"password"}
            fullWidth
          />
          <Button disabled={isLoading} type="submit" color="primary" variant="contained" fullWidth>
            {isLoading ? "Submiting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;
