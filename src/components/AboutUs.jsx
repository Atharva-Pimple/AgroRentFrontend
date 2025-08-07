import React from 'react'

function AboutUs() {
  return (
    <div className="main-content" style={{
      width: '100%',
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>About Us</h1>
        <p>This is the About Us page content.</p>
      </div>
    </div>
  )
}

export default AboutUs
