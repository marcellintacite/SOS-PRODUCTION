import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./theme/globalStyles";
import Accueil from "./pages/Accueil/Accueil";
import HopitalProche from "./pages/HopitalProche/HopitalProche";
import Right from "./pages/HopitalProche/component/ContainerRight";
import QuickTest from "./pages/Quicktest/QuickTest";
import Chercher from "./pages/RechercheHopital/Chercher";

import Secours from "./pages/Secours/Secours";
import Navbar from "./components/Navbar";
import ScrollToTop from "./fonctions/ScrollToTop";
import Map from "./pages/map/Map";
import "./app.css";
import ChatContainer from "./components/ChatContainer";
import Maternite from "./pages/Maternite/Maternite";
import Sexualite from "./pages/Sexualite/Sexualite";
import Divers from "./pages/Divers/Divers";
import { useEffect, useState } from "react";
import heart from "./pages/Accueil/Assets/heart.json";
import Lottie from "lottie-react";
import InstallPWA from "./components/PromptPwa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [showBtn, setShow] = useState(true);
  const [location, setLocation] = useState({});

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (r) => {
          setLocation({
            lat: r.coords.latitude,
            lng: r.coords.longitude,
          });
        },
        (e) => {
          console.log(e);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      toast.error("Vous devez autoriser la géolocalisation");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setShow(true);
    }, 5000);

    if (Object.keys(location).length === 0) {
      getLocation();
    }
    console.log(location);
  }, [location]);
  return (
    <div className="App">
      <GlobalStyle />

      {loading && (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            animationData={heart}
            loop={true}
            style={{
              width: "200px",
            }}
          />
        </div>
      )}

      {!loading && (
        <>
          <Navbar />
          <ScrollToTop />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/Quicktest" element={<QuickTest />} />
            <Route path="/hopitalProche" element={<HopitalProche />}>
              <Route path="/hopitalProche" element={<Right />} />
              <Route path="/hopitalProche/proche" element={<Chercher />} />
            </Route>
            <Route
              path="hopitalProche/map"
              element={<Map location={location} />}
            />
            <Route path="*" element={<Accueil />} />
            <Route path="/Secours" element={<Secours />} />
            <Route path="/Sexualite" element={<Sexualite />} />
            <Route path="/Maternite" element={<Maternite />} />
            <Route path="/divers" element={<Divers />} />
          </Routes>
          {showBtn && <InstallPWA setCLose={setShow} />}
          <ChatContainer />
        </>
      )}
    </div>
  );
}

export default App;
