import "./Voters.css";


const Voters = () => {
  return (
    <section className="voters" id="voters">
    <h2 className="heading">Voter <span> Features </span></h2>

    <div className="voters-container">
      <div className="voters-box">
      <img src="src/assets/eligibility.png" alt="" />
        <div className="voters-layer">
          <h4>Eligability to Vote </h4>
          <p>Quickly check your eligibility to vote from the comfort of your device. Simply enter your ID number to verify whether you meet the criteria to participate in upcoming elections.</p>
          <a href="/EligibilityCheck"><i className='bx bx-link-external'></i></a>
        </div>
      </div>

      <div className="voters-box">
        <img src="src/assets/voters.jpg" alt="" />
        <div className="voters-layer">
          <h4>Online Voting </h4>
          <p>an online platform that enables individuals to cast their votes electronically, providing a convenient and accessible method for participating in elections or decision-making processes.</p>
          <a href="/VoterAuthentication"><i className='bx bx-link-external'></i></a>
        </div>
      </div>

      <div className="voters-box">
        <img src="src/assets/polling.jpg" alt="" />
        <div className="voters-layer">
          <h4>Polling Station </h4>
          <p>Get essential information about your assigned polling station. Find details such as the location, address, opening hours, and a map for easy navigation. Ensure you know where to go on election day to cast your vote with confidence.</p>
          <a href="/VotersMap"><i className='bx bx-link-external'></i></a>
        </div>
      </div>
      
      <div className="voters-box">
        <img src="src/assets/election.png" alt="" />
        <div className="voters-layer">
          <h4>Result Tracking </h4>
          <p>Stay informed about election results in real-time. Access live updates on election outcomes, including candidate tallies, ballot measures, and other election- related data. Monitor the progress of the election and view the results as they come in.</p>
          <a href="/Results"><i className='bx bx-link-external'></i></a>
        </div>
      </div>
    </div>
  </section>
);
}

export default Voters;