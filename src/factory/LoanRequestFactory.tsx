import LoanRequestForm from "@/components/LoanRequestForm";
import { FetchLoans } from "@/domain/usage/FetchLoans";
import { LoanRequestHandler } from "@/domain/usage/SubmitLoanRequest";
import { LoanFetcher } from "@/domain/use-case/FetchLoansImplementation";
import { LoanRequester } from "@/domain/use-case/SubmitLoanRequestImplementation";

import { Endpoints } from "@/endpoints/EndPoints";
import React from "react";

type Props = { children?: React.ReactElement };

const LoanRequestFactory: React.FC<Props> = ({ children }) => {
  const [source, setSource] = React.useState("");
  React.useEffect(() => {
    setSource(localStorage.getItem("username") ?? "");
  }, []);
  const publishLoanRequest: LoanRequester = new LoanRequestHandler(
    Endpoints.SUBMIT_LOAN_REQUEST
  );
  const loanFetcher: LoanFetcher = new FetchLoans();
  return (
    <div>
      <LoanRequestForm
        publishLoanRequest={publishLoanRequest}
        source={source}
        loanFetcher={loanFetcher}
      />
    </div>
  );
};

export default LoanRequestFactory;
