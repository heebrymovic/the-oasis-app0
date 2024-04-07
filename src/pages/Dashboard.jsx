import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { DashboardLayout, DashboardFilter } from "../features/dashboard";

const Dashboard = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
