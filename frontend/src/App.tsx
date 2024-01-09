import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import React from "react";
import NavBar from "./components/navbar/NavBar.components";
import { Route, Routes } from "react-router-dom";
import Loader  from "./components/loader/loader.components";

//importing home page using lazy loading
const Home = lazy(() => import("./Home/Home.page"));
const Comapnies = lazy(() => import("./page/comapnies/Comapnies.page"));
const AddCompanies = lazy(() => import("./page/comapnies/AddCompanies.page"));
const Jobs = lazy(() => import("./page/jobs/Jobs.page"));
const AddJobs = lazy(() => import("./page/jobs/AddJobs.page"));
const Candidate = lazy(() => import("./page/candidates/Candidate.page"));
const AddCandidate = lazy(() => import("./page/candidates/AddCandidate.page"));


const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";

  return (
    <div className={appStyle}>
      <NavBar />
      <div className="wrapper">
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Comapnies/>} />
              <Route path="add" element={<AddCompanies/>} />
            </Route>
            <Route path="/jobs">
              <Route index element={<Jobs/>} />
              <Route path="add" element={<AddJobs/>} />
            </Route>
            <Route path="/candidates">
              <Route index element={<Candidate/>} />
              <Route path="add" element={<AddCandidate/>} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
