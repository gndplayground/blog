import React from "react";
import Github from "../icons/Github";
import LinkedIn from "../icons/LinkedIn";
import RSS from "../icons/RSS";
import Twitter from "../icons/Twitter";

export function ListSocials() {
  return (
    <ul className="list-socials">
      <li>
        <a
          href="https://twitter.com/giang_dev"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Twitter profile"
        >
          <Twitter />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/gndplayground"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Github profile"
        >
          <Github />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/giang-nguy%E1%BB%85n-ng%E1%BB%8Dc-tr%C6%B0%E1%BB%9Dng-1b73a1146/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
        >
          <LinkedIn />
        </a>
      </li>
      <li>
        <a
          href="/rss.xml"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="RSS Feed"
        >
          <RSS />
        </a>
      </li>
    </ul>
  );
}
