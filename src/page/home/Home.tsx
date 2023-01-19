import { useState } from "react";
import Layout from "../../components/layout/Layout";

import CreateNew from "../../components/createNew/CreateNew";
import Table from "../../components/table/Table";

const HomePage = () => {
  return (
    <Layout
      title="Carbonara Demo App"
      link="/company-list"
      linkTitle="parent compant list"
    >
      <CreateNew />

      <Table />
    </Layout>
  );
};

export default HomePage;
