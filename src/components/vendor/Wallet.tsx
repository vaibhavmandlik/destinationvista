import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Wallet = () => {
  const walletData = {
    balance: "$12,345.67",
    income: "$3,456.78",
    expenses: "$1,234.56",
  };

  return (
    <div className="container mt-5">
      {/* Wallet Summary Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Personal Wallet</h5>
            <button className="btn btn-outline-primary btn-sm">
              <i className="bi bi-wallet2"></i>
            </button>
          </div>

          {/* Summary Cards */}
          <div className="row">
            {/* Balance */}
            <div className="col-md-4 mb-3">
              <div className="card bg-light border-0">
                <div className="card-body text-center">
                  <h6 className="text-muted">Balance</h6>
                  <h4 className="fw-bold">{walletData.balance}</h4>
                </div>
              </div>
            </div>

            {/* Income */}
            <div className="col-md-4 mb-3">
              <div className="card bg-light border-0">
                <div className="card-body text-center">
                  <h6 className="text-success">
                    <i className="bi bi-arrow-up"></i> Income
                  </h6>
                  <h4 className="fw-bold">{walletData.income}</h4>
                </div>
              </div>
            </div>

            {/* Expenses */}
            <div className="col-md-4 mb-3">
              <div className="card bg-light border-0">
                <div className="card-body text-center">
                  <h6 className="text-danger">
                    <i className="bi bi-arrow-down"></i> Expenses
                  </h6>
                  <h4 className="fw-bold">{walletData.expenses}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-0">Recent Transactions</h5>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
