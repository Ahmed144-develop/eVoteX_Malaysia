import "./Candidates.css"


const Candidates = () => {
    return (
      <section className="candidates" id="candidates">
        <h2 className="heading"> Candidate <span> Features </span></h2>
  
        <div className="candidates-container">
          <div className="candidates-box">
            <img src="src/assets/Registration.jpeg" alt="" />
            <div className="candidates-layer">
              <h4>Candidate Registration </h4>
              <p>Seamlessly register as a candidate from the convenience of your device. Complete your candidate registration online, providing the necessary information securely.</p>
              <a href="/CandidateForm"><i className='bx bx-link-external'></i></a>
            </div>
          </div>
          <div className="candidates-box">
            <img src="src/assets/election.png" alt="" />
            <div className="candidates-layer">
              <h4>Result Tracking </h4>
              <p>Stay informed about election results in real-time. Access live updates on election outcomes, including candidate tallies, ballot measures, and other election-related data. </p>
              <a href="/Results"><i className='bx bx-link-external'></i></a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Candidates;
  