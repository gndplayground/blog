import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/700.css";
import "modern-normalize/modern-normalize.css";
import "../styles/app.css";

import { useLocation } from "@reach/router";
import React from "react";
import { Helmet } from "react-helmet";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useSiteMetadata } from "../hooks/useSiteData";
import { useTabFocus } from "../hooks/useTabFocus";

export interface PageProps {
  children: React.ReactNode;
  title?: string;
}

function PageLayout(props: PageProps) {
  const { children, title } = props;

  const { isFocusing } = useTabFocus();

  const { pathname } = useLocation();

  const site = useSiteMetadata();

  const url = `${site.siteUrl}${pathname}`;

  const titleSeo = title || "Giang Nguyen's Site";

  React.useEffect(() => {
    if (!isFocusing) {
      document.body.classList.add("no-animation");
    } else {
      document.body.classList.remove("no-animation");
    }
  }, [isFocusing]);

  return (
    <main>
      <Helmet>
        <title>{titleSeo}</title>
        <meta name="language" content="en" />
        <meta name="description" content="Giang Nguyen's personal site" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={`${site.siteUrl}/images/me.jpg`} />
        <meta name="twitter:site" content="@giang_dev" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" property="og:title" content={titleSeo} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={titleSeo} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${site.siteUrl}/images/me.jpg`} />
      </Helmet>
      <div className="page">
        <Header />
        <div className="page__body">{children}</div>
        <div className="page__footer">
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default PageLayout;
