import * as React from "react";
import { Link } from "gatsby";
import PageLayout from "../layouts/PageLayout";

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

const NotFoundPage = () => {
  return (
    <PageLayout title="Not found">
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </PageLayout>
  );
};

export default NotFoundPage;
