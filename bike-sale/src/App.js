import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import env from "react-dotenv";
import { Routes, Route, Navigate } from "react-router-dom";

import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import SigninPage from "./pages/jsFiles/SigninPage";
import SignupPage from "./pages/jsFiles/SignupPage";
import MySavedRentedBikes from "./pages/jsFiles/MySavedRentedBikes";
import HomePage from "./pages/jsFiles/HomePage";
import CreatePost from "./pages/jsFiles/CreatePost";
import AllBikes from "./pages/jsFiles/AllBikesPage";
import Header from "./Components/jsFiles/Header";
import SingleBikePage from "./pages/jsFiles/SingleBikePage";
import PaymentPage from "./pages/jsFiles/PaymentPage";

function App() {
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;
  const userId = localStorage.getItem("userId");
  const verifyUser = async () => {
    if (userId) {
      const response = await axios.get(`${env.BACKEND_URL}/users/verify`, {
        headers: {
          "content-type": "application/JSON",
          Authorization: userId,
        },
      });
      // console.log(response);
      // console.log(userId);
      setUser(response);
    }
  };
  // console.log(user);
  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <div className='App'>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />} />

        {/* {user ? ( */}
        <>
          <Route
            path='/create'
            element={userId ? <CreatePost /> : <SigninPage />}
          />
          <Route
            path='/allbikes'
            element={userId ? <AllBikes /> : <SigninPage />}
          />
          <Route
            path='/myBikes'
            element={userId ? <MySavedRentedBikes /> : <SigninPage />}
          />
          <Route
            path='/allbikes/:motoId'
            element={userId ? <SingleBikePage /> : <SigninPage />}
          />
          <Route
            path='/onebike/:motoId'
            element={userId ? <PaymentPage /> : <SigninPage />}
          />
          {/* <> */}
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </>
        {/* // </> */}
        {/* // ) : ( */}
        {/* //   <>
        //     <Route path='/signin' element={<SigninPage />} />
        //     <Route path='/signup' element={<SignupPage />} />
        //   </>
        // )} */}
      </Routes>
    </div>
  );
}

export default App;
