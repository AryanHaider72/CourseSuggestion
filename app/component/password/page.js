'use client';
import { useState } from 'react';
import { KeyRound } from 'lucide-react';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    // TODO: Add actual API logic here
    setMessage('Password changed successfully!');
  };

  return (
    <div className="container p-3 d-flex justify-content-center align-items-center  bg-body-tertiary" style={{overflowY:'scroll'}}>
      <div className="card shadow-sm p-5" >
        <div className="text-center mb-4">
          <KeyRound size={40}color='#ffa835' className=" mb-2" />
          <h4 className="fw-bold">Change Password</h4>
          <p className="text-muted small mb-0">Keep your account safe by using a strong password.</p>
        </div>

        <form onSubmit={handleChangePassword} >
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

          {message && (
            <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
              {message}
            </div>
          )}

          <button type="submit" className="btn text-white w-100 rounded-pill" id='button1'>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
