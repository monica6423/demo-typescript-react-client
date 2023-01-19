import { useState } from "react";
import Layout from "../../components/layout/Layout";
import Form from "../../components/form/Form";
import CreateNew from "../../components/createNew/CreateNew";
import Table from "../../components/table/Table";

const HomePage = () => {
  const [formType, setFormType] = useState<string | null>(null);
  return (
    <Layout
      title="Carbonara Demo User"
      link="/company-list"
      linkTitle="parent compant list"
    >
      <CreateNew setFormType={setFormType} />
      {formType ? (
        <table>
          <tbody>
            <Form formType={formType} />
          </tbody>
        </table>
      ) : (
        <></>
      )}
      <Table />
    </Layout>
  );
};

export default HomePage;
