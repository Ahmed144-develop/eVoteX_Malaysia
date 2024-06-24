import "./About.css"

const AboutSection = () => {
    return (
        <section className="about" id="about">
            <div className="about-img">
                <img src="src/assets/About.jpg" alt="" /> 
            </div>
            <div className="about-content">
                <h2 className="heading">About <span>    eVoteX   </span>   website   </h2>
                <p>A customizable electronic voting system offers the benefit of adaptability to support various election scenarios at multiple levels, 
                    while providing a common foundation of transparency, accuracy, security and cost efficiency. 
                    By building on a flexible and modular platform, base components for voters rolls, 
                    identity management and ballot construction can be parameterized and extended to fit localized needs of different election bodies. 
                    This allows the system to scale securely across parliamentary or state elections, referendums and partisan elections. 
                    Standard base features such as result tally mechanisms, accessibility options for disabled voters and fraud detection algorithms remain applicable regardless of election type when built with customization in mind. 
                    With role-based access control and configurable processes and administrative privileges, the system promotes fair and equal participation. 
                    The ability to tailor security, auditing rigor and reporting dashboards instills confidence in electoral integrity. 
                    A model-based approach allows such a robust base electronic voting platform to be built once then configured as per election commission requirements, saving duplication costs. 
                    Overall this strategy offers accelerated launch of accessible, accurate and secure election solutions with long term cost savings.</p>
                <a href="src/assets/eVoteX Infographics.pdf" className="btn">Read More</a>
            </div>
        </section>
    );
}

export default AboutSection;
