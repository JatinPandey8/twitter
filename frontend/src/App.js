// import './App.css';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Homepage from './components/Homepage/Homepage';
// import Authentication from './components/Authentication/Authentication';
// import Navigation from './components/Navigation/Navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { store } from './Store/store';
// import { useEffect } from 'react';
// import { getUserProfile } from './Store/Auth/Action';
// import HomeSection from './components/HomeSection/HomeSection';
// import Profile from './components/Profile/Profile';

// function App() {
//   const jwt = localStorage.getItem("jwt")
//   //const { auth } = useSelector(store => store)
//   const auth = useSelector((store) => store.auth);

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
 
//   useEffect(() => {// 2nd last 32.48
//    const jwt = localStorage.getItem("jwt");
//   console.log("JWT from localStorage: ", jwt);  
//     if (jwt && !auth.user && !auth.loading) {
//       dispatch(getUserProfile(jwt)).catch(() => {
//         // Redirect to login if the token is invalid aor expired
//         localStorage.removeItem("jwt");
//         navigate("/login");
//       });
//     }
//   }, [auth.user, jwt, auth.loading, dispatch, navigate]);

//   useEffect(() => {
//     if (auth.user && !auth.loading) {
//           console.log("User authenticated, navigating to homepage...");

//       navigate("/"); // Navigate to homepage when user data is available
//     }
//   }, [auth.user, navigate, auth.loading]);
 
//   return (
//     <div className="">
     
//       <Routes>
//   <Route path="/home" element={<HomeSection />} />
//   <Route path="/profile/:id" element={<Profile />} />
   
// </Routes>

//     </div >
//   );
// }

// export default App;
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Authentication from './components/Authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from './Store/Auth/Action';

function App() {
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log("JWT from localStorage: ", jwt);  
    if (jwt && !auth.user && !auth.loading) {
      dispatch(getUserProfile()).catch(() => {
        localStorage.removeItem("jwt"); 
        navigate("/login");
      });
    }
  }, [auth.user, jwt, auth.loading, dispatch, navigate]);

  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route path="/*" element={auth.user ? <Homepage /> : <Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
