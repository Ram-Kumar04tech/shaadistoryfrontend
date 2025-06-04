import React from "react";
import "./SuggestedProfile.css";

function SuggestedProfilesComponent({ profiles }) {
  return (
    <div className="suggested-profiles">
      <h3>Suggested Profiles</h3>
      <div className="profiles-grid">
        {profiles.map(profile => (
          <div key={profile.id} className="profile-thumbnail">
            <div className="thumbnail-image-placeholder"></div>
            <div className="thumbnail-info">
              <h4>{profile.name}</h4>
              <p>{profile.age} • {profile.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedProfilesComponent;