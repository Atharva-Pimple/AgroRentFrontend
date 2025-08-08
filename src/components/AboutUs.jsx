import React from 'react'
import './AboutUs.css'

function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About AgroRent</h1>
          <p className="hero-subtitle">
            Connecting farmers through shared agricultural equipment
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To revolutionize farming practices by creating a digital platform that enables 
              cost-effective equipment sharing among farmers, promoting sustainable agriculture 
              and stronger community bonds.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="problem-section">
        <div className="container">
          <h2>The Challenge We're Solving</h2>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">💰</div>
              <h3>Financial Constraints</h3>
              <p>
                Many small-scale farmers struggle to afford expensive agricultural equipment, 
                limiting their farming efficiency and productivity.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">⏰</div>
              <h3>Idle Equipment</h3>
              <p>
                Valuable farming machinery sits unused for extended periods, representing 
                wasted investment and resources.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🔗</div>
              <h3>Lack of Connection</h3>
              <p>
                No centralized platform exists for farmers to connect and share equipment 
                within their local communities.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">📈</div>
              <h3>Poor Resource Utilization</h3>
              <p>
                Inefficient resource allocation leads to higher operational costs and 
                reduced farming productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <h2>Our Solution</h2>
          <div className="solution-content">
            <div className="solution-text">
              <h3>AgroRent Platform</h3>
              <p>
                We've developed a comprehensive web-based platform that bridges the gap 
                between equipment owners and those who need them. Our system facilitates 
                seamless equipment rental and lending within farming communities.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🌾</span>
                  <span>Easy equipment listing and discovery</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📅</span>
                  <span>Simple rental booking system</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">👥</span>
                  <span>Role-based access for Admins and Farmers</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💬</span>
                  <span>Transparent communication channels</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🤝</span>
                  <span>Community collaboration tools</span>
                </div>
              </div>
            </div>
            <div className="solution-image">
              <div className="image-placeholder">
                <span>🌱</span>
                <p>Growing Together</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2>Benefits for Farmers</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Cost Savings</h3>
              <p>
                Reduce capital expenditure on expensive equipment while accessing 
                the tools you need when you need them.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Additional Income</h3>
              <p>
                Generate extra revenue by renting out your idle equipment to 
                other farmers in your community.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Improved Efficiency</h3>
              <p>
                Access to better equipment leads to more efficient farming 
                practices and increased productivity.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Community Building</h3>
              <p>
                Strengthen local farming communities through collaboration 
                and shared resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Sustainability</h3>
              <p>Promoting efficient resource utilization for a greener future</p>
            </div>
            <div className="value-item">
              <h3>Community</h3>
              <p>Building stronger connections among farming communities</p>
            </div>
            <div className="value-item">
              <h3>Accessibility</h3>
              <p>Making agricultural equipment accessible to all farmers</p>
            </div>
            <div className="value-item">
              <h3>Transparency</h3>
              <p>Ensuring clear and honest communication between users</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Join the Agricultural Revolution</h2>
          <p>
            Be part of a community that's transforming farming through shared resources 
            and collaboration. Start renting or lending equipment today!
          </p>
          <div className="cta-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
