import React from "react";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "../hooks/usePageTitle";


export default function PageTitle(fallback = "School Management Portal") {
  const title = usePageTitle(fallback);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
