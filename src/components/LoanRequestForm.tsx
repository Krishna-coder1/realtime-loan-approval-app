"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoanRequestData } from "@/domain/interface/LoanRequestData";
import { LoanRequester } from "@/domain/use-case/SubmitLoanRequestImplementation";
import { LoanFetcher } from "@/domain/use-case/FetchLoansImplementation";
import { Roles } from "@/enums/Roles";

const theme = createTheme();

const initialFormData: LoanRequestData = {
  source: "",
  loanAmountReq: 0,
  tenure: 0,
  salary: 0,
  collateralAmount: 0,
  panNumber: "",
  contactNo: "",
  custId: "",
};

const LoanRequestForm: React.FC<{
  source: string;
  publishLoanRequest: LoanRequester;
  loanFetcher: LoanFetcher;
}> = ({ source, publishLoanRequest, loanFetcher }) => {
  const [formData, setFormData] = useState<LoanRequestData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [loanResult, setLoanResult] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleChange: any = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value, source: source });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSnackbarOpen(true);
    setSnackbarMessage("Submitting Loan Request");
    const response = await publishLoanRequest.submitLoanRequest(formData);
    if (response.message) {
      setSnackbarMessage("Processing loan request");
      console.log("Loan request submitted successfully");
      // Check if the source is 'vendor' to fetch the latest vendor record
      if (formData.source === "vendor") {
        // Wait for the backend to process the data and update the loan status
        setTimeout(async () => {
          const latestLoanResponse = await loanFetcher.fetch<{
            ok: boolean;
            json: Function;
          }>(Roles.VENDOR, "latest_loan");
          if (latestLoanResponse.ok) {
            const latestLoanData = await latestLoanResponse.json();
            setLoanResult(latestLoanData);
            setSnackbarMessage(
              `You Loan ID is ${latestLoanData.LOAN_ID} Loan Status: ${latestLoanData.LOAN_STATUS}D`
            );
            setSnackbarOpen(true);
          } else {
            console.error("Failed to fetch the latest loan status");
          }
          setLoading(false);
        }, 5000); // Assuming there is a delay for data processing
      } else if (formData.source === Roles.BFB) {
        // Wait for the backend to process the data and update the loan status
        setTimeout(async () => {
          const latestLoanResponse = await loanFetcher.fetch<{
            ok: boolean;
            json: Function;
          }>(Roles.BFB, "latest_loan");
          if (latestLoanResponse.ok) {
            const latestLoanData = await latestLoanResponse.json();
            setLoanResult(latestLoanData);
            setSnackbarMessage(
              `You Loan ID is ${latestLoanData.LOAN_ID} Loan Status: ${latestLoanData.LOAN_STATUS}D`
            );
            setSnackbarOpen(true);
          } else {
            console.error("Failed to fetch the latest loan status");
          }
          setLoading(false);
        }, 5000); // Assuming there is a delay for data processing
      } else {
        setLoading(false);
      }
    } else {
      console.error("Failed to submit loan request");
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
    setLoanResult(null);
    setSnackbarOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={null}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            loanResult
              ? loanResult?.LOAN_STATUS === "APPROVE"
                ? "success"
                : "error"
              : "info"
          }
          sx={{ width: "100%" }}
        >
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={24} sx={{ marginRight: 2 }} />
              {snackbarMessage}
            </Box>
          ) : (
            snackbarMessage
          )}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Loan Request Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="source"
              label="Source"
              name="source"
              value={source}
              autoComplete="off"
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="loanAmountReq"
              label="Loan Amount Requested"
              name="loanAmountReq"
              value={formData.loanAmountReq}
              onChange={handleChange}
              type="number"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="tenure"
              label="Tenure (months)"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              type="number"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="salary"
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              type="number"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="collateralAmount"
              label="Collateral Amount"
              name="collateralAmount"
              value={formData.collateralAmount}
              onChange={handleChange}
              type="number"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="panNumber"
              label="PAN Number"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactNo"
              label="Contact Number"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              autoComplete="off"
            />
            {source === Roles.BFB && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="custId"
                label="Customer ID"
                name="custId"
                value={formData.custId}
                onChange={handleChange}
                autoComplete="off"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Submit Loan Request
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoanRequestForm;
