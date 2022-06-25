import { Link } from "gatsby";
import React from "react";
import { ListSocials } from "./ListSocials";

export function Header() {
  return (
    <header className="main-header">
      <nav className="main-nav font-nav-menu" aria-label="Main navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
      <div className="main-header__socials">
        <ListSocials />
      </div>
    </header>
  );
}
