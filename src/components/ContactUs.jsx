import React from 'react'
import prajaktaImg from '../assets/prajakta.jpg';
import atharvPLImg from '../assets/atharvPL.jpg';
import atharvImg from '../assets/atharv.jpg';
import ankitaImg from '../assets/ankita.jpg';
import paragImg from '../assets/parag.jpg';

function ContactUs() {
  const teamMembers = [
    {
      name: 'Atharv Pimpale',
      role: 'Full Stack Developer',
      email: 'atharv@gmail.com',
      initials: 'AP',
      image: atharvPLImg
    },
    {
      name: 'Atharv Pawar',
      role: 'Full Stack Developer',
      email: 'atharv@gmail.com',
      initials: 'AP',
      image: atharvImg
    },
    {
      name: 'Prajakta Dusane',
      role: 'Full Stack Developer',
      email: 'prajakta@gmail.com',
      initials: 'PD',
      image: prajaktaImg
    },
    {
      name: 'Parag Palaskar',
      role: 'Full Stack Developer',
      email: 'parag@gmail.com',
      initials: 'PP',
      image: paragImg
    },
    {
      name: 'Ankita Durgude',
      role: 'Full Stack Developer',
      email: 'ankita@gmail.com',
      initials: 'AD',
      image: ankitaImg
    },
  ];

  return (
    <div className="container my-5" style={{ marginTop: '100px' }}>
      <h2 className="text-center mb-5 text-primary">Contact Our Team</h2>

      <div className="row">
        {teamMembers.map((member, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden h-100" style={{ maxWidth: '300px', margin: '0 auto' }}>
              <div 
                className="card-img-top d-flex align-items-center justify-content-center"
                style={{ 
                  height: '180px', 
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontSize: '2.2rem',
                  fontWeight: 'bold',
                  padding: 0
                }}
              >
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    style={{ height: '100%', width: '60%', objectFit: 'cover', display: 'block', margin: '0 auto', background: 'transparent' }} 
                  />
                ) : (
                  member.initials
                )}
              </div>
              <div className="card-body text-center p-4">
                <h5 className="card-title text-primary">{member.name}</h5>
                <p className="card-text text-secondary">{member.role}</p>
                <p className="text-muted">{member.email}</p>
                <a 
                  href={`mailto:${member.email}`} 
                  className="btn btn-outline-primary mt-2 text-decoration-none"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactUs
