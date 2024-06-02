import LoansList from "@/components/LoansList";
import { FetchLoans } from "@/domain/usage/FetchLoans";
import { LoanFetcher } from "@/domain/use-case/FetchLoansImplementation";
import React from "react";

const LoanListFactory = () => {
  const [source, setSource] = React.useState("");
  const loanFetcher: LoanFetcher = new FetchLoans();

  React.useEffect(() => {
    setSource(localStorage.getItem("username") ?? "");
  }, []);

  return (
    <div>
      <LoansList source={source} loanFetcher={loanFetcher} />
    </div>
  );
};

export default LoanListFactory;
