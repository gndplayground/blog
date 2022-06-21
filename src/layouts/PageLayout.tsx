import "modern-normalize/modern-normalize.css";
import React from "react";

import "../styles/app.css";

export interface PageProps {
  children: React.ReactNode;
}

function PageLayout(props: PageProps) {
  const { children } = props;
  return <main>{children}</main>;
}

export default PageLayout;
