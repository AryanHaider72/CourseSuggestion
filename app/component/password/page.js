'use client';
import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import axios from 'axios'; // Add axios for making API requests

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading spinner

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    // Start loading
    setLoading(true);
    setMessage('');

    try {
      // Send API request to backend for password change
      const response = await axios.post('http://localhost:8080/api/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      },{ withCredentials: true });

      // If successful, show success message
      setMessage(response.data.message);
    } catch (error) {
      // Handle errors from the API
      if (error.response) {
        // If error response exists (backend error)
        setMessage(error.response.data.message || 'Something went wrong');
      } else {
        // If no response from the server (e.g., network issues)
        setMessage('Network error. Please try again later.');
      }
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="container p-3 d-flex justify-content-center align-items-center bg-body-tertiary">
      <div className="card shadow-sm p-5">
        <div className="text-center mb-4">
          <KeyRound size={40} color='#ffa835' className="mb-2" />
          <h4 className="fw-bold">Change Password</h4>
          <p className="text-muted small mb-0">Keep your account safe by using a strong password.</p>
        </div>

        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Display the response message (success or error) */}
          {message && (
            <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn text-white w-100 rounded-pill" id='button1' disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
