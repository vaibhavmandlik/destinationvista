import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import RevenueChart from "./RevenueChart";

const DashboardContent = () => {
  return (
    <div className="content p-4 w-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="text-center p-3">
            <h5>Total Packages</h5>
            <p className="display-6">12</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3">
            <h5>Active Users</h5>
            <p className="display-6">45</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3">
            <h5>Revenue</h5>
            <p className="display-6">$12,345</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3">
            <h5>Growth</h5>
            <p className="display-6">+23%</p>
          </Card>
        </Col>
      </Row>

      {/* Revenue Overview */}
      <Card className="p-4">
        <h5>Revenue Overview</h5>
        <RevenueChart />
      </Card>
    </div>
  );
};

export default DashboardContent;
