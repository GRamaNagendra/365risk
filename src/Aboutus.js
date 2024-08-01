import React from 'react';

// About Us Component
const AboutUs = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>About Us</h1>
          <p style={styles.subtitle}>Discover who we are, our mission, vision, values, and more.</p>
        </div>
      </header>
      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.sectionText}>
            Our mission is to deliver innovative risk management solutions that drive operational excellence and ensure regulatory compliance. We are dedicated to offering exceptional value through our expertise and customer-centric approach.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Vision</h2>
          <p style={styles.sectionText}>
            We strive to be the global leader in risk management, recognized for our innovation, excellence, and ability to anticipate and mitigate emerging risks. Our goal is to set the industry standard and be the trusted partner for organizations seeking to protect their future.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Values</h2>
          <ul style={styles.valuesList}>
            <li style={styles.valuesItem}>Integrity</li>
            <li style={styles.valuesItem}>Excellence</li>
            <li style={styles.valuesItem}>Collaboration</li>
            <li style={styles.valuesItem}>Innovation</li>
            <li style={styles.valuesItem}>Customer Focus</li>
          </ul>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Approach</h2>
          <p style={styles.sectionText}>
            We combine industry knowledge with advanced analytics to provide tailored risk management solutions. Our collaborative approach ensures that we address each client's unique challenges effectively.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Services</h2>
          <div style={styles.serviceList}>
            <div style={styles.serviceItem}>
              <h3 style={styles.serviceTitle}>Risk Assessment</h3>
              <p style={styles.serviceDescription}>Identify potential risks and develop effective mitigation strategies.</p>
            </div>
            <div style={styles.serviceItem}>
              <h3 style={styles.serviceTitle}>Compliance Management</h3>
              <p style={styles.serviceDescription}>Ensure adherence to regulatory requirements and industry standards.</p>
            </div>
            <div style={styles.serviceItem}>
              <h3 style={styles.serviceTitle}>Crisis Management</h3>
              <p style={styles.serviceDescription}>Manage and recover from unexpected crises effectively.</p>
            </div>
            <div style={styles.serviceItem}>
              <h3 style={styles.serviceTitle}>Training and Development</h3>
              <p style={styles.serviceDescription}>Enhance risk management skills through customized training programs.</p>
            </div>
          </div>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Achievements</h2>
          <ul style={styles.achievementsList}>
            <li style={styles.achievementItem}>Awarded Best Risk Management Firm 2023 by Risk Management Review.</li>
            <li style={styles.achievementItem}>Implemented risk solutions for over 500 clients worldwide.</li>
            <li style={styles.achievementItem}>Published multiple whitepapers on emerging risk trends and mitigation strategies.</li>
            <li style={styles.achievementItem}>Achieved ISO 27001 certification for information security management.</li>
          </ul>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Partners</h2>
          <p style={styles.sectionText}>We collaborate with leading organizations to enhance our service offerings. Our partners include:</p>
          <ul style={styles.partnersList}>
            <li style={styles.partnerItem}>Global Risk Consulting Inc.</li>
            <li style={styles.partnerItem}>TechSecure Solutions</li>
            <li style={styles.partnerItem}>Compliance Experts LLC</li>
            <li style={styles.partnerItem}>Financial Safety Network</li>
          </ul>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Meet Our Team</h2>
          <div style={styles.teamContainer}>
            <div style={styles.teamMember}>
              <div style={styles.teamMemberImage}></div>
              <h3 style={styles.teamMemberName}>Admin 1</h3>
              <p style={styles.teamMemberRole}>Chief Executive Officer</p>
              <p style={styles.teamMemberBio}>Jane brings over 20 years of experience in risk management and strategic planning, leading our company to new heights.</p>
            </div>
            <div style={styles.teamMember}>
              <div style={styles.teamMemberImage}></div>
              <h3 style={styles.teamMemberName}>Admin 2</h3>
              <p style={styles.teamMemberRole}>Chief Risk Officer</p>
              <p style={styles.teamMemberBio}>John is an expert in risk analysis and compliance, ensuring our solutions are robust and effective.</p>
            </div>
            <div style={styles.teamMember}>
              <div style={styles.teamMemberImage}></div>
              <h3 style={styles.teamMemberName}>Admin 3</h3>
              <p style={styles.teamMemberRole}>Head of Innovation</p>
              <p style={styles.teamMemberBio}>Emily leads our innovation team, driving new developments and staying ahead of industry trends.</p>
            </div>
          </div>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <p style={styles.sectionText}>If you have any questions or would like to learn more about our services, feel free to reach out to us:</p>
          <div style={styles.contactDetails}>
            <p><strong>Email:</strong> support@risk365risk.com</p>
            <p><strong>Phone:</strong> +91758493384</p>
            <p><strong>Address:</strong> 123 Risk Ave, Suite 100, Risk City, RC 12345</p>
          </div>
          <a href="/contact" style={styles.contactButton}>Get in Touch</a>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Follow Us</h2>
          <div style={styles.socialMedia}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>Instagram</a>
          </div>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>FAQ</h2>
          <div style={styles.faqContainer}>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>What services do you offer?</h3>
              <p style={styles.faqAnswer}>We offer a range of services including risk assessments, compliance management, crisis management, and training and development.</p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>How can I contact your support team?</h3>
              <p style={styles.faqAnswer}>You can contact our support team via email at support@risk365risk.com or call us at +1 (800) 123-4567.</p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>Where are you located?</h3>
              <p style={styles.faqAnswer}>We are located at 123 Risk Ave, Suite 100, Risk City, RC 12345.</p>
            </div>
          </div>
        </section>
      </main>
     
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
    margin: '0',
    padding: '0',
    boxSizing: 'border-box'
  },
  header: {
    backgroundColor: '#003366',
    color: '#fff',
    padding: '40px 20px',
    textAlign: 'center'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    fontSize: '3rem',
    margin: '0'
  },
  subtitle: {
    fontSize: '1.5rem',
    marginTop: '10px'
  },
  main: {
    padding: '20px',
    backgroundColor: '#f5f5f5'
  },
  section: {
    backgroundColor: '#ffffff',
    margin: '20px 0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '2rem',
    margin: '0 0 10px 0',
    color: '#003366',
    borderBottom: '2px solid #28a745',
    paddingBottom: '10px'
  },
  sectionText: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#555'
  },
  valuesList: {
    listStyleType: 'none',
    paddingLeft: '0'
  },
  valuesItem: {
    fontSize: '1.2rem',
    marginBottom: '10px'
  },
  serviceList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px'
  },
  serviceItem: {
    flex: '1 1 calc(50% - 20px)',
    backgroundColor: '#e9ecef',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
    ':hover': {
      backgroundColor: '#d0d0d0',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(-5px)'
    }
  },
  serviceTitle: {
    fontSize: '1.5rem',
    color: '#003366',
    margin: '0 0 10px 0'
  },
  serviceDescription: {
    fontSize: '1.1rem',
    color: '#555'
  },
  achievementsList: {
    listStyleType: 'circle',
    paddingLeft: '20px'
  },
  achievementItem: {
    fontSize: '1.2rem',
    marginBottom: '10px'
  },
  partnersList: {
    listStyleType: 'none',
    paddingLeft: '0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  partnerItem: {
    fontSize: '1.2rem',
    backgroundColor: '#e9ecef',
    padding: '10px 20px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    ':hover': {
      backgroundColor: '#d0d0d0',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
    }
  },
  teamContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px'
  },
  teamMember: {
    flex: '1 1 calc(33% - 20px)',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ':hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
    }
  },
  teamMemberImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#cccccc',
    margin: '0 auto 10px auto'
  },
  teamMemberName: {
    fontSize: '1.5rem',
    margin: '10px 0',
    color: '#003366'
  },
  teamMemberRole: {
    fontSize: '1.2rem',
    color: '#666'
  },
  teamMemberBio: {
    fontSize: '1rem',
    color: '#444'
  },
  contactDetails: {
    fontSize: '1.2rem',
    color: '#444',
    marginBottom: '20px'
  },
  contactButton: {
    display: 'inline-block',
    padding: '12px 24px',
    fontSize: '1.1rem',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '6px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    marginTop: '10px',
    textAlign: 'center',
    ':hover': {
      backgroundColor: '#218838',
      transform: 'scale(1.05)'
    }
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '20px 0'
  },
  socialLink: {
    color: '#003366',
    transition: 'color 0.3s',
    ':hover': {
      color: '#28a745'
    }
  },
  faqContainer: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px'
  },
  faqItem: {
    marginBottom: '20px'
  },
  faqQuestion: {
    fontSize: '1.3rem',
    color: '#003366',
    margin: '0'
  },
  faqAnswer: {
    fontSize: '1.1rem',
    color: '#555'
  }
};

export default AboutUs;
