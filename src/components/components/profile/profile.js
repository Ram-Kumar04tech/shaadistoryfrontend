import React from "react";
import "./profile.css";

function ProfileComponent({ profile }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-placeholder">
          <span>Profile Image</span>
        </div>
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p>{profile.age} years old</p>
        </div>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Language:</span>
          <span className="detail-value">{profile.language}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{profile.location}</span>
        </div>
        <div className="detail-item bio">
          <span className="detail-label">Bio:</span>
          <p className="detail-value">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;