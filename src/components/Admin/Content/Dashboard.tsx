import Container from "../../Container";
import DashboardCardsList from "./DashboardCardsList";

const Dashboard = () => {
  return (
    <div className="pt-40">
      <Container>
        <DashboardCardsList />
      </Container>
    </div>
  );
};

export default Dashboard;
