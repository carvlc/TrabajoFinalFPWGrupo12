import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AboutUs from "./components/AboutUs/AboutUs";
import Footer from "./components/Footer/Footer";
// import AppComparadorPrecios from "./components/ComparadorPrecios/AppCompradorPrecios";
// import AppJuegoDude from "./components/JuegoDude/AppJuegoDude";
// import AppJuegoNave from "./components/JuegoNave/AppJuegoNave";
// import AppListaDeTareas from "./components/ListaDeTareas/AppListaDeTareas";
// import AppJuegoImagenes from "./components/JuegoImagenes/AppJuegoImagenes";
import "./app.css";


function App(){
    return(
        <Router>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                {/* <Route path="/Comparador" element={<AppComparadorPrecios></AppComparadorPrecios>}></Route>
                <Route path="/Dude" element={<AppJuegoDude></AppJuegoDude>}></Route>
                <Route path="/Nave" element={<AppJuegoNave></AppJuegoNave>}></Route>
                <Route path="/Tareas" element={<AppListaDeTareas></AppListaDeTareas>}></Route>
                <Route path="/JuegoImagenes" element={<AppJuegoImagenes></AppJuegoImagenes>}></Route> */}
                <Route path="/AboutUs" element={<AboutUs></AboutUs>}></Route>
                <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
            </Routes>
            <Footer></Footer>
        </Router>
    )
}

export default App;