import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import RequireUser from "./conponants/RequireUser";
import Profile from "./conponants/profile/Profile";
import Feed from "./conponants/feed/Feed"; 
import {useSelector} from 'react-redux'
import UpdateProfile from "./conponants/updateprofile/UpdateProfile";
import { useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar'
import OnlyIfNotLogin from "./conponants/OnlyIfNotLogin";
import toast, { Toaster } from 'react-hot-toast';

export const TOAST_SUCCESS='toast_success';
export const TOAST_FAILURE='toast_failure';

function App() {
  const isLoading=useSelector(state=>state.appConfigReducer.isLoading);
  const toastData=useSelector(state=>state.appConfigReducer.toastData);
  const loadingRef=useRef(null);
  useEffect(()=>{
    if(isLoading){
      loadingRef.current?.continuousStart();
    }else{
      loadingRef.current?.complete();
    }
  },[isLoading])

  useEffect(()=>{
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message)
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;
    }
  },[toastData]);
  return (

    <div className="App">
      <LoadingBar color='#5f9fff' ref={loadingRef} />
      <div><Toaster/></div>
      <Routes>
        <Route  element={<RequireUser/>}> 
        <Route element={<Home />} >
          <Route path="/"element={<Feed/>}/>
          <Route path="profile/:userId"element={<Profile/>}/>
          <Route path="/updateProfile"element={<UpdateProfile/>}/>
        </Route>
        </Route>
        <Route element={<OnlyIfNotLogin/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
