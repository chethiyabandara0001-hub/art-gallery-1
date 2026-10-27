import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenu = () => setMobileOpen(false);
  return <header className="site-header" id="top">
    <a href="#top" className="brand" onClick={closeMenu} aria-label="The Unframed, back to top">the unframed<span className="brand-stop">.</span></a>
    <div className="header-aside" aria-hidden="true">An online space for pictures</div>
    <nav className={`main-nav ${mobileOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation">
      <a href="#works" onClick={closeMenu}>Works</a>
      <a href="#about" onClick={closeMenu}>About</a>
      <a href="#index" onClick={closeMenu}>Index <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" /></a>
    </nav>
    <button type="button" className="menu-toggle" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
      {mobileOpen ? <X size={23} /> : <Menu size={23} />}
    </button>
  </header>;
}
