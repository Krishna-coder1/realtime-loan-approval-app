import { useState, useEffect } from "react";
import LoanTable from "./LoanTable";
import React from "react";
import { LoanRequestEntity } from "@/domain/interface/LoanRequestEntity";
import { Roles } from "@/enums/Roles";
import { LoanFetcher } from "@/domain/use-case/FetchLoansImplementation";

// Component to fetch and display loan statuses
const LoanStatusComponent: React.FC<{
  source: string;
  loanFetcher: LoanFetcher;
}> = ({ loanFetcher, source }) => {
  const [loading, setLoading] = React.useState(false);
  const [vloading, vsetLoading] = React.useState(false);

  const [customerLoanRequests, setCustomerLoanRequests] = useState<
    LoanRequestEntity[]
  >([] as LoanRequestEntity[]);
  const [vendorLoanRequests, setVendorLoanRequests] = useState<
    LoanRequestEntity[]
  >([] as LoanRequestEntity[]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all customer loan requests
  const fetchCustomerLoanRequests = async () => {
    setLoading(true);
    try {
      const response = await loanFetcher.fetch<{
        ok: boolean;
        json: Function;
      }>(Roles.BFB, "loans_list");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch customer loan statuses"
        );
      }

      setCustomerLoanRequests(data);
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  // Fetch all vendor loan requests
  const fetchVendorLoanRequests = async () => {
    vsetLoading(true);
    try {
      const response = await loanFetcher.fetch<{
        ok: boolean;
        json: Function;
      }>(Roles.VENDOR, "loans_list");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch vendor loan statuses");
      }

      setVendorLoanRequests(data);
    } catch (error: any) {
      setError(error.message);
    }
    vsetLoading(false);
  };
  useEffect(() => {
    fetchCustomerLoanRequests();
    fetchVendorLoanRequests();
  }, []);

  return (
    <div>
      {source === Roles.BFB && (
        <div>
          <h1>Customer Loan Statuses</h1>
          <LoanTable
            source={source}
            onRefresh={fetchCustomerLoanRequests}
            loading={loading}
            loans={customerLoanRequests}
          />
          <br />
        </div>
      )}
      <h1>Vendor Loan Statuses</h1>
      <LoanTable
        source={Roles.VENDOR}
        onRefresh={fetchVendorLoanRequests}
        loading={vloading}
        loans={vendorLoanRequests}
      />
    </div>
  );
};

export default LoanStatusComponent;
