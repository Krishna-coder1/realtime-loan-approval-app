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
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoanRequestData } from "@/domain/interface/LoanRequestData";
import { LoanRequester } from "@/domain/use-case/SubmitLoanRequestImplementation";
import { LoanFetcher } from "@/domain/use-case/FetchLoansImplementation";
import { Roles } from "@/enums/Roles";
import { LoanRequestEntity } from "@/domain/interface/LoanRequestEntity";
import { Cancel, CheckCircle } from "@mui/icons-material";

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
  const [loanResult, setLoanResult] = useState<LoanRequestEntity>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");

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
    setDialogOpen(true);
    setDialogMessage("Submitting Loan Request");
    const response = await publishLoanRequest.submitLoanRequest(formData);
    if (response.message) {
      setDialogMessage("Processing loan request");
      console.log("Loan request submitted successfully");
      const fetchLoanStatus = async () => {
        const latestLoanResponse = await loanFetcher.fetch<{
          ok: boolean;
          json: Function;
        }>(formData.source as Roles, "latest_loan");
        if (latestLoanResponse.ok) {
          const latestLoanData = await latestLoanResponse.json();
          setLoanResult(latestLoanData);
          setDialogMessage(
            `Your Loan ID is ${latestLoanData.LOAN_ID}. Loan Status: ${latestLoanData.LOAN_STATUS}`
          );
        } else {
          console.error("Failed to fetch the latest loan status");
          setDialogMessage("Failed to fetch the latest loan status");
        }
        setLoading(false);
      };

      setTimeout(fetchLoanStatus, 3000); // Assuming there is a delay for data processing
    } else {
      console.error("Failed to submit loan request");
      setDialogMessage("Failed to submit loan request");
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogMessage("");
    setLoanResult(null);
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        disableEscapeKeyDown
        open={dialogOpen}
        aria-labelledby="loan-status-dialog-title"
        fullWidth
        PaperProps={{
          sx: {
            background: loading
              ? "white"
              : loanResult?.LOAN_STATUS === "APPROVE"
              ? "radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(255,255,255,1) 0%, rgba(249,255,244,1) 100%)"
              : "radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(255,255,255,1) 0%, rgba(255,245,244,1) 100%)",
          },
        }}
      >
        <DialogTitle id="loan-status-dialog-title">Loan Status</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {loading ? (
              <CircularProgress size={80} sx={{ marginBottom: 2 }} />
            ) : null}
            {!loading && (
              <div>
                {loanResult?.LOAN_STATUS === "APPROVE" ? (
                  <CheckCircle color="success" sx={{ fontSize: "10rem" }} />
                ) : (
                  <Cancel sx={{ fontSize: "10rem" }} color="error" />
                )}
              </div>
            )}
            {loading && (
              <Typography color={"InfoText"}>{dialogMessage}...</Typography>
            )}
            <br />
            {!loading && (
              <Grid
                rowSpacing={0}
                border={1}
                padding={1}
                marginLeft={3}
                container
                xs={6}
              >
                <Grid item xs={6}>
                  <Typography fontWeight={300}>Loan ID:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight={400}>
                    {loanResult?.LOAN_ID}
                  </Typography>
                </Grid>
                <Grid xs={6} item>
                  <hr />
                </Grid>
                <Grid xs={6} item>
                  <hr />
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight={300}>Loan Status:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight={400}>
                    {loanResult?.LOAN_STATUS}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <br />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={() => setDialogOpen(false)}
            variant="contained"
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
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
