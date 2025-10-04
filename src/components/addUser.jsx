import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddUser } from "../redux/userSlice";
import {
  useLoginUserMutation,
  usePostUserMutation,
} from "../redux/userService";

const AddUser = () => {
  const { isAddUser } = useSelector((state) => state.users);
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    dispatch(setIsAddUser(false));
  };

  const [postUser] = usePostUserMutation();
  const [loginUser] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    await loginUser({ email, password });
    dispatch(setIsAddUser(false));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    await postUser({ firstname, lastname, email, password });
    dispatch(setIsAddUser(false));
  };

  return (
    <div
      className="user-form"
      style={isAddUser ? { display: "block" } : { display: "none" }}
    >
      {login ? (
        <div className="form">
          <div className="heading">
            <h3>Login</h3>
            <IoMdCloseCircle
              style={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={handleClose}
            />
          </div>
          <form method="post" onSubmit={handleLogin}>
            <div className="form-item">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="submit">
              <input type="submit" className="submitBtn" value="Login" />
            </div>
          </form>
          <p className="form-footer">
            Not a member? <span onClick={() => setLogin(false)}>Sign up</span>
          </p>
        </div>
      ) : (
        <div className="form">
          <div className="heading">
            <h3>Sign Up</h3>
            <IoMdCloseCircle
              style={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={handleClose}
            />
          </div>
          <form method="post" onSubmit={handleSignUp}>
            <div className="form-item">
              <label htmlFor="firstname">Firstname:</label>
              <input
                type="text"
                id="firstname"
                className="firstname"
                placeholder="Enter your firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="lastname">Lastname:</label>
              <input
                type="text"
                id="lastname"
                className="lastname"
                placeholder="Enter your lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="submit">
              <input type="submit" className="submitBtn" value="Sign Up" />
            </div>
          </form>
          <p className="form-footer">
            Already have an account?{" "}
            <span onClick={() => setLogin(true)}>Login</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddUser;
