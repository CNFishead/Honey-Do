import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To HoneyDo",
  description: "The Best Place to keep track of all your To-do's",
  keywords: "to do, lists, to-do, list",
};

export default Meta;
