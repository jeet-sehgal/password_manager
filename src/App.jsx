import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import { useEffect } from "react";
import authservice from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/UserSlice";
import { Toaster } from "react-hot-toast";
import dataService from "./appwrite/data";
import { load } from "./store/MainDataSlice";
import { decryptData } from "./encryption";

function App() {
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .currentUser()
      .then((res) => {
        dispatch(login(res));
        dataService.getPosts(res.$id).then((res) => {
          dispatch(load(res.rows.map(ele=>{return {...ele,password:decryptData(ele.password)}})));
        });
      })
      // .then(res=>{console.log(userData.$id);dataService.getPosts(UserData.$id).then((res) => {dispatch(load(res.rows))});})
      .catch((e) => {
        dispatch(logout());
      });
  }, []);
  console.log(userData);
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "black",
            color: "white",
          },
        }}
      />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
