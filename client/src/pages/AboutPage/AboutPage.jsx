import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About our Safe Chat Checker</h1>
        
        <div className="about-section">
          <h2>Its Purpose</h2>
          <p>
            We provide a helpful tool for users who want to verify the safety and 
            appropriateness of messages they receive. If you&apos;re unsure about a message&apos;s 
            intent or content, our analysis service can help you make informed decisions 
            about your online interactions.
          </p>
        </div>

        <div className="about-section">
          <h2>How It Works</h2>
          <p>
            Simply paste any message you&apos;d like to analyze into our tool. Our system 
            will evaluate the content and provide feedback about potential red flags 
            or suspicious elements. This analysis can help you better understand if 
            a message might be inappropriate or concerning.
          </p>
        </div>

        <div className="about-section">
          <h2>Features</h2>
          <ul className="feature-list">
            <li>Real-time message analysis</li>
            <li>Instant feedback on content appropriateness</li>
            <li>Secure user accounts</li>
            <li>Privacy-focused design</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Use Our Service</h2>
          <p>
            Whether you&apos;re concerned about online safety or want to ensure your 
            messages maintain appropriate standards, our tool helps you communicate 
            with confidence. We believe in creating a safer online environment for 
            everyone through awareness and proactive message screening.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;