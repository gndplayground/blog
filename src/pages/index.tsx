import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { Helmet } from "react-helmet";
import { ListSocials } from "../components/ListSocials";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import PageLayout from "../layouts/PageLayout";
import "../styles/index.page.css";

const IndexPage = () => {
  const refDeco = React.useRef<HTMLDivElement | null>(null);

  const { isVisible } = useIntersectionObserver(refDeco, {});

  return (
    <PageLayout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Giang Nguyen's Site</title>
      </Helmet>
      <div className="intro">
        <div className="intro__inner">
          <div className="intro__content">
            <h1 className="font-title">GIANG NGUYEN’S SITE</h1>
            <p className="font-intro-text">
              Hi, I'm{" "}
              <span style={{ color: "var(--color-primary)" }}>Giang</span>.
            </p>
            <p className="font-intro-text">
              I write to share some experience and knowledge about my journey as
              a developer.
            </p>
            <p className="font-intro-text">You can find me on...</p>
            <ListSocials />
            <p className="font-intro-text">
              Or contact my email{" "}
              <a href="mailto:giang.nguyen.dev@gmail.com">
                giang.nguyen.dev@gmail.com
              </a>
              .
            </p>
          </div>
          <div className="intro__me">
            <StaticImage
              style={{
                borderRadius: "50px",
              }}
              layout="fixed"
              quality={90}
              width={200}
              height={200}
              src="../images/me.jpg"
              alt="Picture of me, my son and my dog"
            />
            <div
              className={`intro__deco ${isVisible ? "" : "no-animation"}`}
              ref={refDeco}
            >
              <div className="shape-square" />
              <div className="shape-tri" />
              <div className="shape-round" />
              <div className="shape-square-2" />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default IndexPage;
