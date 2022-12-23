import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-page">
      <div className="error-text-container">
        <p className="error-text">Ooops! It's a dead end</p>
      </div>
      <div className="error-button-container">
        <button className="error-button">
          <Link to="/" className="error-btn">
            Back home
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Error;
