"use client";
import React from "react";
import LoanRequestFactory from "@/factory/LoanRequestFactory";
import LoanListFactory from "@/factory/LoanListFactory";
import BfbContainer from "@/components/BfbContainer";
import WithAuth from "@/higher-order-components/WithAuth";

type Props = {};

const Page = (props: Props) => {
  return (
    <WithAuth>
      <BfbContainer
        loanRequestFactory={() => <LoanRequestFactory />}
        loanListFactory={() => <LoanListFactory />}
      />
    </WithAuth>
  );
};

export default Page;
