import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Shield,
  ShieldCheck,
  PlusCircle,
  FileText,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Building2,
  Globe,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Check,
  Home,
  Info,
  Phone,
  HelpCircle,
  Plus,
} from 'lucide-react';
import Button from '../common/Button';
import Modal from '../common/Modal';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t, isNepali } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky elevation & compaction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    toast.info(isNepali ? 'तपाईं सफलतापूर्वक लग आउट हुनुभएको छ।' : 'You have logged out successfully.');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  };

  const handleSelectLanguage = (langCode) => {
    setLanguage(langCode);
    setLangDropdownOpen(false);
  };

  return (
    <header className="civic-header-wrapper">
      {/* ====================================================================
          Layer 1: Small Civic Utility Bar
          ==================================================================== */}
      <div className="civic-topbar">
        <div className="container">
          {/* Left: 24/7 Citizen Support */}
          <div className="civic-topbar-left">
            <div className="civic-topbar-badge">
              <span className="civic-topbar-live-dot" />
              <ShieldCheck size={14} className="civic-badge-icon" />
              <span>{isNepali ? 'नागरिक सेवा • २४/७ सहायता' : 'Citizen Services • 24/7 Support'}</span>
            </div>
            <span className="civic-topbar-divider">•</span>
            <span className="civic-topbar-service-note">
              {isNepali ? 'आधिकारिक नगरपालिका डिजिटल सेवा' : 'Official Municipal Public Service Portal'}
            </span>
          </div>

          {/* Right: Quick Emergency & Language Helper */}
          <div className="civic-topbar-right">
            <div className="civic-topbar-helpline">
              <PhoneCall size={13} color="#38BDF8" />
              <span>{t('topbar.helpline')}</span>
            </div>
            <span className="civic-topbar-divider">•</span>
            <button
              type="button"
              className="civic-topbar-link"
              onClick={() => setContactModalOpen(true)}
            >
              <HelpCircle size={13} />
              <span>{isNepali ? 'आपतकालीन सम्पर्क' : 'Emergency Contacts'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          Layer 2: Main Navigation Bar
          ==================================================================== */}
      <nav className={`portal-navbar ${isScrolled ? 'portal-navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* LEFT: Municipal Crest & Brand Identity */}
          <Link to="/" className="brand-logo" onClick={closeMenus}>
            <div className="brand-crest-box">
              <Building2 size={24} className="brand-crest-icon" />
            </div>
            <div className="brand-text-block">
              <span className="brand-text-main">
                {isNepali ? 'नगरवासी सेवा पोर्टल' : 'CITIZEN PORTAL'}
              </span>
              <span className="brand-text-sub">
                {isNepali ? 'नगरपालिका गुनासो व्यवस्थापन' : 'Issue Reporting & Resolution'}
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links */}
          <div className="nav-links-wrapper">
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                  <Home size={16} className="nav-link-icon" />
                  <span>{t('nav.home')}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/report" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <PlusCircle size={16} className="nav-link-icon" />
                  <span>{t('nav.reportIssue')}</span>
                </NavLink>
              </li>
              {isAuthenticated && (
                <li>
                  <NavLink to="/my-reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <FileText size={16} className="nav-link-icon" />
                    <span>{t('nav.myReports')}</span>
                  </NavLink>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="nav-link nav-link-btn"
                  onClick={() => setAboutModalOpen(true)}
                >
                  <Info size={16} className="nav-link-icon" />
                  <span>{t('nav.about')}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link nav-link-btn"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Phone size={16} className="nav-link-icon" />
                  <span>{t('nav.contact')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* RIGHT: Actions, Language Switcher, Primary CTA & Profile */}
          <div className="nav-actions">
            {/* Compact Language Selector Dropdown */}
            <div className="lang-selector-desktop">
              <button
                type="button"
                className="lang-selector-btn"
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setDropdownOpen(false);
                }}
                aria-expanded={langDropdownOpen}
                aria-label="Select Language"
              >
                <Globe size={15} color="var(--primary-blue)" />
                <span>{language === 'ne' ? 'NE 🇳🇵' : 'EN 🇬🇧'}</span>
                <ChevronDown size={13} color="#64748B" />
              </button>

              {langDropdownOpen && (
                <div className="lang-dropdown-menu">
                  <button
                    type="button"
                    className={`lang-option-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => handleSelectLanguage('en')}
                  >
                    <span>🇬🇧 English</span>
                    {language === 'en' && <Check size={14} color="var(--primary-blue)" />}
                  </button>

                  <button
                    type="button"
                    className={`lang-option-btn ${language === 'ne' ? 'active' : ''}`}
                    onClick={() => handleSelectLanguage('ne')}
                  >
                    <span>🇳🇵 नेपाली</span>
                    {language === 'ne' && <Check size={14} color="var(--primary-blue)" />}
                  </button>
                </div>
              )}
            </div>

            {/* Primary Report CTA Button */}
            <Link to="/report" className="header-cta-btn">
              <Plus size={16} />
              <span>{isNepali ? 'गुनासो दर्ता' : 'Report an Issue'}</span>
            </Link>

            {/* Profile / Auth Dropdown */}
            {isAuthenticated ? (
              <div className="nav-user-dropdown">
                <button
                  className="nav-user-btn"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setLangDropdownOpen(false);
                  }}
                  aria-expanded={dropdownOpen}
                >
                  <div className="nav-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="nav-user-name">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} color="#64748B" />
                </button>

                {dropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-header">
                      <div className="dropdown-user-title">{user?.name}</div>
                      <div className="dropdown-user-email">{user?.email}</div>
                      <div className="dropdown-citizen-badge">
                        <Shield size={11} /> {t('nav.citizenAccount')}
                      </div>
                    </div>

                    <Link to="/profile" className="dropdown-item" onClick={closeMenus}>
                      <UserIcon size={16} />
                      <span>{t('nav.profile')}</span>
                    </Link>

                    <Link to="/my-reports" className="dropdown-item" onClick={closeMenus}>
                      <FileText size={16} />
                      <span>{t('nav.myReports')}</span>
                    </Link>

                    <div className="dropdown-divider" />

                    <button className="dropdown-item dropdown-logout-btn" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth-buttons">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.signIn')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Header Quick Language Switcher */}
            <button
              type="button"
              className="mobile-lang-quick-btn"
              onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
              title="Switch language"
              aria-label="Switch Language"
            >
              <Globe size={15} />
              <span>{language === 'en' ? 'NE' : 'EN'}</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation drawer"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ====================================================================
          Layer 3: Mobile Slide-in Drawer & Backdrop
          ==================================================================== */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-nav-backdrop" onClick={closeMenus} />
          <aside className="mobile-nav-drawer" role="dialog" aria-modal="true">
            {/* Drawer Header */}
            <div className="mobile-nav-header">
              <div className="mobile-brand-wrapper">
                <div className="brand-crest-box mobile-crest">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="mobile-brand-title">
                    {isNepali ? 'नगरवासी सेवा पोर्टल' : 'CITIZEN PORTAL'}
                  </div>
                  <div className="mobile-brand-sub">
                    {isNepali ? 'गुनासो व्यवस्थापन' : 'Issue Reporting'}
                  </div>
                </div>
              </div>
              <button
                onClick={closeMenus}
                className="mobile-close-btn"
                aria-label="Close navigation drawer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Language Selection Grid */}
            <div className="mobile-drawer-lang-section">
              <span className="mobile-drawer-section-label">{t('nav.language')}</span>
              <div className="mobile-lang-grid">
                <button
                  type="button"
                  onClick={() => handleSelectLanguage('en')}
                  className={`mobile-lang-pill ${language === 'en' ? 'active' : ''}`}
                >
                  <span>🇬🇧 English</span>
                  {language === 'en' && <Check size={14} />}
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectLanguage('ne')}
                  className={`mobile-lang-pill ${language === 'ne' ? 'active' : ''}`}
                >
                  <span>🇳🇵 नेपाली</span>
                  {language === 'ne' && <Check size={14} />}
                </button>
              </div>
            </div>

            {/* Authenticated Citizen Profile Overview */}
            {isAuthenticated && (
              <div className="mobile-citizen-card">
                <div className="mobile-citizen-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="mobile-citizen-info">
                  <strong className="mobile-citizen-name">{user?.name}</strong>
                  <span className="mobile-citizen-email">{user?.email}</span>
                  <div className="mobile-citizen-badge">
                    <ShieldCheck size={12} color="var(--primary-blue)" /> {t('nav.citizenAccount')}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links inside Drawer */}
            <div className="mobile-drawer-links">
              <NavLink
                to="/"
                className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
                onClick={closeMenus}
                end
              >
                <Home size={18} />
                <span>{t('nav.home')}</span>
              </NavLink>

              <NavLink
                to="/report"
                className={({ isActive }) => `mobile-drawer-link mobile-drawer-cta ${isActive ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <PlusCircle size={18} />
                <span>{isNepali ? '+ नयाँ समस्या दर्ता' : '+ Report an Issue'}</span>
              </NavLink>

              {isAuthenticated && (
                <NavLink
                  to="/my-reports"
                  className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenus}
                >
                  <FileText size={18} />
                  <span>{t('nav.myReports')}</span>
                </NavLink>
              )}

              {isAuthenticated && (
                <NavLink
                  to="/profile"
                  className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenus}
                >
                  <UserIcon size={18} />
                  <span>{t('nav.profile')}</span>
                </NavLink>
              )}

              <button
                type="button"
                className="mobile-drawer-link"
                onClick={() => {
                  closeMenus();
                  setAboutModalOpen(true);
                }}
              >
                <Info size={18} />
                <span>{t('nav.aboutPortal')}</span>
              </button>

              <button
                type="button"
                className="mobile-drawer-link"
                onClick={() => {
                  closeMenus();
                  setContactModalOpen(true);
                }}
              >
                <Phone size={18} />
                <span>{t('nav.civicContacts')}</span>
              </button>
            </div>

            {/* Drawer Footer Actions */}
            <div className="mobile-drawer-footer">
              {isAuthenticated ? (
                <Button
                  variant="danger"
                  size="md"
                  fullWidth
                  onClick={handleLogout}
                  icon={LogOut}
                >
                  {t('nav.logout')}
                </Button>
              ) : (
                <div className="mobile-auth-actions">
                  <Link to="/login" onClick={closeMenus} style={{ width: '100%' }}>
                    <Button variant="outline" fullWidth size="md">
                      {t('nav.signIn')}
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenus} style={{ width: '100%' }}>
                    <Button variant="primary" fullWidth size="md">
                      {t('nav.register')}
                    </Button>
                  </Link>
                </div>
              )}

              {/* Civic 24/7 Helpline Ribbon */}
              <div className="mobile-drawer-helpline">
                <PhoneCall size={14} color="var(--primary-blue)" />
                <span>24/7 Helpline: <strong>1660-01-99999</strong></span>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ====================================================================
          About Municipal Portal Modal
          ==================================================================== */}
      <Modal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        title={t('aboutModal.title')}
        maxWidth="580px"
        footer={
          <Button variant="primary" onClick={() => setAboutModalOpen(false)}>
            {t('aboutModal.closeBtn')}
          </Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.65' }}>
          <p>{t('aboutModal.p1')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
              <CheckCircle2 size={18} color="var(--primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span><strong>{t('aboutModal.point1Title')}</strong> {t('aboutModal.point1Desc')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
              <CheckCircle2 size={18} color="var(--primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span><strong>{t('aboutModal.point2Title')}</strong> {t('aboutModal.point2Desc')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
              <CheckCircle2 size={18} color="var(--primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span><strong>{t('aboutModal.point3Title')}</strong> {t('aboutModal.point3Desc')}</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* ====================================================================
          Emergency & Municipal Contacts Modal
          ==================================================================== */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title={t('contactModal.title')}
        maxWidth="560px"
        footer={
          <Button variant="primary" onClick={() => setContactModalOpen(false)}>
            {t('contactModal.closeBtn')}
          </Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ padding: '1.15rem', backgroundColor: 'var(--primary-blue-light)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-focus)' }}>
            <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <PhoneCall size={18} color="var(--primary-blue)" /> {t('contactModal.helplineTitle')}
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-blue)', letterSpacing: '0.02em' }}>
              {t('contactModal.helplineNumber')}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {t('contactModal.helplineSub')}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
              <Mail size={16} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
              <span><strong>{t('contactModal.emailLabel')}</strong> support@citizenportal.gov</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
              <Clock size={16} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
              <span><strong>{t('contactModal.hoursLabel')}</strong> {t('contactModal.hoursVal')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
              <MapPin size={16} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
              <span><strong>{t('contactModal.hqLabel')}</strong> {t('contactModal.hqVal')}</span>
            </div>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Navbar;
