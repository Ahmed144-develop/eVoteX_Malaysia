import "./Home.css"

const Home = () => {
  return (
    <div>
      <section className="home" id="home">
      <div className="home-content">
        <h1>eVoteX</h1>
        <h3>
        <span> “Empowering Digital Democracy in Malaysia” (eVX) 2024</span>
        </h3>
        <a href="./register" className="btn">
          Register For Voting
        </a>
      </div>
      <div className="home-img">
      <img src= "src/assets/website logo.png" alt="" />
      </div>
      </section>
    </div>
    
  );
}


export default Home;
