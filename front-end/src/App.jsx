import { useEffect, useState } from 'react';
import Axios from "axios";
import { Navbar, ShowNavbar, Login, Singup, Home, AboutSection, Candidates, Voters, CandidateForm, VotersMap, VoteForm, 
  Results, AdminPanel, EligibilityCheck, SuccessRegister, CandidatesList, EligibleVotersList, PollingStationLogin, PollingStationDashboard, 
  VoterAuthentication, ElectoralMonitorRoom } from "./components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const [setData]=useState("");

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:8081/getData");
      setData(response.data);
    } catch (error) {
      //;
    }
  }

  useEffect(() => {
    getData();
  }, );

  return (
    <BrowserRouter>
      <ShowNavbar>
        <Navbar />
      </ShowNavbar>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/aboutsection" element={<AboutSection />} />
        <Route path="/voters" element={<Voters />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Singup />} />
        <Route path="/candidateForm" element={<CandidateForm />} />
        <Route path="/votersMap" element={<VotersMap />} />
        <Route path="/voteForm" element={<VoteForm />} />
        <Route path="/results" element={<Results />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/eligibilityCheck" element={<EligibilityCheck />} />
        <Route path="/SuccessRegister" element={<SuccessRegister />} />
        <Route path="/CandidatesList" element={<CandidatesList />} />
        <Route path="/EligibleVotersList" element={<EligibleVotersList />} />
        <Route path="/PollingStationLogin" element={<PollingStationLogin />} />
        <Route path= "/PollingStationDashboard" element={<PollingStationDashboard />} />
        <Route path= "/VoterAuthentication" element={<VoterAuthentication />} />
        <Route path= "/ElectoralMonitorRoom" element={<ElectoralMonitorRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;