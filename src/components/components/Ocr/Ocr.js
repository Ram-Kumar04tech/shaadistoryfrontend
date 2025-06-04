import React, { useState } from "react";
import axios from "axios";
import "./Ocr.css";

function OCRComponent() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("screenshot", file);

      const res = await axios.post("https://ocrbackend2-24xk.vercel.app/upload", formData);
      setResult(res.data.data);
    } catch (err) {
      setError("Failed to extract data. Please try again with a clear screenshot.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-feature">
      <div className="upload-card">
        <div className="card-content">
          <h2 className="card-title">Upload Screenshot</h2>
          
          <div className="upload-section">
            <label className="upload-label">
              Instagram Profile Screenshot
            </label>
            <div className="file-upload-area">
              <div className="file-upload-content">
                <div className="file-upload-text">
                  <label
                    htmlFor="file-upload"
                    className="file-upload-button"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="file-input"
                    />
                  </label>
                  <p className="file-upload-or">or drag and drop</p>
                </div>
                <p className="file-upload-hint">PNG, JPG up to 5MB</p>
              </div>
            </div>
            {file && (
              <p className="file-selected">
                Selected: <span className="file-name">{file.name}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={isLoading}
            className={`upload-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <span className="button-loading">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Extract Profile Info'
            )}
          </button>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="results-card">
        <div className="card-content">
          <h2 className="card-title">Extracted Data</h2>
          
          {result ? (
            <div className="results-grid">
              <div className="result-item">
                <div className="result-icon name-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="result-details">
                  <p className="result-label">Name</p>
                  <p className="result-value">{result.name || 'Not found'}</p>
                </div>
              </div>

              <div className="result-item">
                <div className="result-icon bio-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="result-details">
                  <p className="result-label">Bio</p>
                  <p className="result-value">{result.bio || 'Not found'}</p>
                </div>
              </div>

              <div className="results-row">
                <div className="result-item">
                  <div className="result-icon followers-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="result-details">
                    <p className="result-label">Followers</p>
                    <p className="result-value">{result.followers || 'Not found'}</p>
                  </div>
                </div>

                <div className="result-item">
                  <div className="result-icon following-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="result-details">
                    <p className="result-label">Following</p>
                    <p className="result-value">{result.following || 'Not found'}</p>
                  </div>
                </div>
              </div>

              <div className="result-item">
                <div className="result-icon location-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="result-details">
                  <p className="result-label">Location</p>
                  <p className="result-value">{result.guess_location || 'Not found'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="empty-state-title">No data extracted</h3>
              <p className="empty-state-message">Upload a screenshot to see the extracted profile information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OCRComponent;
