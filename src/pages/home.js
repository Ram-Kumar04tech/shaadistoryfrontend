import React, { useState } from "react";
import ChatComponent from "../components/components/conversation/Conversation";
import ProfileComponent from "../components/components/profile/profile";
import OCRComponent from "../components/components/Ocr/Ocr";
import SuggestedProfilesComponent from "../components/components/suggestedprofile/SuggestedProfile";
import "../styles/Home.css";

function HomePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const mockProfile = {
    name: "Ranjith",
    age: 28,
    language: "Tamil",
    location: "Chennai, Tamilnadu",
    bio: "Digital creator | Photography enthusiast | Travel lover"
  };

  const mockProfiles = [
    { id: 1, name: "Sarmitha", age: 32, language: "Tamil", location: "Thiruvanandhapuram,kerala " },
    { id: 2, name: "Kavi Bharathi", age: 35, language: "Tamil", location: "Thanjavur, Tamilnadu" },
    { id: 3, name: "Priya varshini", age: 29, language: "Tamil", location: "Theni, Tamilnadu" },
    { id: 4, name: "Hari Priya", age: 35, language: "Tamil", location: "Coimbatore, Tamilnadu" },
    { id: 5, name: "Ramchi", age: 36, language: "Tamil", location: "Tiruppur, Tamilnadu" }
  ];

  return (
    <div className="home-container">
      <ChatComponent />
      
      <div className="right-card">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
          <button 
            className={`tab-button ${activeTab === "upload" ? "active" : ""}`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Screenshot
          </button>
        </div>

        {activeTab === "profile" ? (
          <>
            <ProfileComponent profile={mockProfile} />
            <SuggestedProfilesComponent profiles={mockProfiles} />
          </>
        ) : (
          <OCRComponent />
        )}
      </div>
    </div>
  );
}

export default HomePage;