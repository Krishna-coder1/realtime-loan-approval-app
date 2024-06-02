import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Refresh } from "@mui/icons-material";
import { LoanRequestEntity } from "@/domain/interface/LoanRequestEntity";
import { Roles } from "@/enums/Roles";

interface LoanTableProps {
  loans: LoanRequestEntity[];
  loading: boolean;
  onRefresh: Function;
  source: string;
}

const LoanTable: React.FC<LoanTableProps> = ({
  source,
  loans,
  loading,
  onRefresh,
}) => {
  const [searchId, setSearchId] = useState<string>("");
  const [filteredLoans, setFilteredLoans] =
    useState<LoanRequestEntity[]>(loans);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchId(value);
    if (!value) {
      setFilteredLoans(loans);
    } else {
      const filtered = loans.filter((loan) =>
        loan.LOAN_ID.toString().includes(value)
      );
      setFilteredLoans(filtered);
    }
  };

  useEffect(() => {
    setFilteredLoans(loans);
  }, [loans]);

  return (
    <TableContainer component={Paper}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <TextField
          label="Search by Loan ID"
          variant="outlined"
          value={searchId}
          onChange={handleSearch}
          size="small"
        />
        <IconButton
          onClick={() => onRefresh()}
          size="large"
          type="button"
          color="primary"
        >
          <Refresh />
        </IconButton>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Loan ID</TableCell>
            <TableCell>Origin</TableCell>
            <TableCell>Loan Amount Requested</TableCell>
            <TableCell>Tenure</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Collateral Amount</TableCell>
            {source === Roles.BFB && <TableCell>PAN Number</TableCell>}{" "}
            <TableCell>Contact Number</TableCell>
            <TableCell>Credit Score</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <CircularProgress
            size={20}
            sx={{ margin: "1rem", textAlign: "center" }}
          />
        ) : (
          <TableBody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <TableRow key={loan.LOAN_ID}>
                  <TableCell>{loan.LOAN_ID}</TableCell>
                  <TableCell>{loan.SOURCE}</TableCell>
                  <TableCell>{loan.LOAN_AMOUNT_REQ}</TableCell>
                  <TableCell>{loan.TENURE}</TableCell>
                  <TableCell>{loan.SALARY}</TableCell>
                  <TableCell>{loan.COLLATERAL_AMOUNT}</TableCell>
                  {source === Roles.BFB && (
                    <TableCell>{loan.PAN_NUMBER}</TableCell>
                  )}
                  <TableCell>{loan.CONTACT_NO}</TableCell>
                  <TableCell>{loan.CREDIT_SCORE}</TableCell>

                  <TableCell>
                    <Typography
                      style={{
                        color:
                          loan.LOAN_STATUS === "APPROVE"
                            ? green[500]
                            : red[500],
                      }}
                    >
                      {loan.LOAN_STATUS}D
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No loans found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default LoanTable;
