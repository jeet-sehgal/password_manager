import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {DashboradPage, HomePage, LoginPage, ProfilePage, SignupPage }from "./pages";
import {Authentication} from "./components"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"",
        element:<HomePage/>
      },
      
      {
        path:"/login",
        element:<Authentication authentication={false}><LoginPage/></Authentication>
      },
      {
        path:"/signup",
        element:<Authentication authentication={false}><SignupPage/></Authentication>
      },
      {
        path:"/dashboard",
        element:<Authentication authentication={true}><DashboradPage/></Authentication>
      },
      {
        path:"/profile",
        element:<Authentication authentication={true}><ProfilePage/></Authentication>
      },
      
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
