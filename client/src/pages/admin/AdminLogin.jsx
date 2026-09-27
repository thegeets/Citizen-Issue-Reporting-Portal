import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Shield, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { adminLogin } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter administrator email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminLogin(email, password);
      if (res.user?.role !== 'admin') {
        toast.error('Access Denied: This account does not possess municipal administrator privileges.');
        return;
      }
      toast.success('Municipal Administrator authenticated successfully!');
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Administrator authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="civic-card admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <Shield size={30} />
          </div>
          <h2 className="admin-login-title">Municipal Admin Console</h2>
          <p className="admin-login-subtitle">
            Authorized Personnel & Engineering Control Room
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Official Administrator Email"
            name="email"
            type="email"
            placeholder="admin@municipality.gov"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={Mail}
          />

          <div className="form-group">
            <label className="form-label" htmlFor="adminPass">
              <span>Security Access Key <span className="required">*</span></span>
            </label>
            <div className="admin-password-wrapper">
              <input
                id="adminPass"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input admin-password-input"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="admin-password-icon">
                <Lock size={18} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="admin-password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg" loading={loading} style={{ marginTop: '0.75rem' }}>
            Unlock Admin Console
          </Button>
        </form>

        <div className="admin-login-footer">
          <Link to="/" className="admin-login-back-link">
            ← Return to Public Citizen Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
