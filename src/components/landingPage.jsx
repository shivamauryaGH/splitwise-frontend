// // components/LandingPage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/landingPage.css';

// const LandingPage = () => (
//   <div className="landing-page">
//     <h1 className="landing-title">Welcome to Splitwise Expense Manager</h1>
//     <p className="landing-subtitle">
//       Manage and split your expenses effortlessly with friends, family, and colleagues!
//     </p>
    
//     <div className="landing-buttons">
//       <Link to="/login" className="landing-btn login-btn">Log In</Link>
//       <Link to="/createuser" className="landing-btn signup-btn">Sign Up</Link>
//     </div>

//     <div className="features">
//       <h2>Features</h2>
//       <ul>
//         <li>Track expenses with ease</li>
//         <li>Split bills among friends and family</li>
//         <li>Keep a clear record of who owes whom</li>
//       </ul>
//     </div>
//   </div>
// );

// export default LandingPage;


// components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingPage.css';

const LandingPage = () => (
  <div className="landing-page">
    <header className="header-section">
      <h1 className="landing-title">Welcome to Splitwise Expense Manager</h1>
      <p className="landing-subtitle">
        Manage and split your expenses effortlessly with friends, family, and colleagues!
      </p>
    </header>

    <section className="chart-section">
      <img src="images\image2.jpeg" alt="Sample Expense Chart" className="expense-chart" />
    </section>

    <div className="landing-buttons">
      <Link to="/login" className="landing-btn login-btn">Log In</Link>
      <Link to="/createuser" className="landing-btn signup-btn">Sign Up</Link>
    </div>

    <section className="features-section">
      <h2>Features</h2>
      <ul className="features-list">
        <li>
          <img src="images\image3.png" alt="Track Expenses" />
          <span>Track expenses with ease</span>
        </li>
        <li>
          <img src="images\image2.jpeg" alt="Split Bills" />
          <span>Split bills among friends and family</span>
        </li>
        <li>
          <img src="images\image4.jpeg" alt="Clear Record" />
          <span>Keep a clear record of who owes whom</span>
        </li>
      </ul>
    </section>

    <footer className="landing-footer">
      <p>Splitwise Expense Manager © 2024. All rights reserved.</p>
    </footer>
  </div>
);

export default LandingPage;

