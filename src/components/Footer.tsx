import React from "react";
import { ListSocials } from "./ListSocials";

export function Footer() {
  return (
    <footer className="main-footer">
      <p className="main-footer__text">Design this site using Figma ❤️</p>
      <p className="main-footer__text">Code with React and Gatsby ⭐</p>
      <div className="main-footer__socials">
        <ListSocials />
      </div>
    </footer>
  );
}
