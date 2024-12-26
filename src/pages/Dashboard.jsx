import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Paper,
} from "@mui/material";
import useAddTransactions from "../hooks/useAddTransactions";
import useTransactions from "../hooks/useTransactions";
import ResponsiveAppBar from "../component/AppBar";
import { auth } from "../firebaseconfig";

const Dashboard = () => {
  const { addTransaction } = useAddTransactions();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const { transactions, totalTransactions } = useTransactions();
  const { Balance, income, expenses } = totalTransactions;
  const onSubmit = () => {
    addTransaction({ description, transactionAmount, transactionType });
    // Clear input fields after submission
    setDescription("");
    setTransactionAmount("");
    setTransactionType("expense");
  };

  // Check if any field is empty
  const isButtonDisabled =
    !description || !transactionAmount || !transactionType;

  return (
    <>
      <ResponsiveAppBar />

      <Box
        sx={{
          maxWidth: "600px",
          margin: "50px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          fontFamily={"sans-serif"}
          gutterBottom
          color="	#5c836e"
          fontWeight={"bold"}
        >
          {auth.currentUser.displayName}'s Expense Tracker
        </Typography>

        {/* Balance Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" color="#3e3d34" fontWeight={"bold"}>
            Your Balance
          </Typography>
          <Typography variant="h4" color="#7cb06d">
            {Balance >= 0 ? <h2>${Balance}</h2> : <h2>-${Balance * -1}</h2>}
          </Typography>
        </Box>

        {/* Income and Expenses Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography variant="h6" fontWeight={"bold"} color="success.main">
              Income
            </Typography>
            <Typography variant="h6">${income}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={"bold"} color="error.main">
              Expenses
            </Typography>
            <Typography variant="h6">${expenses}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Add Transaction Section */}
        <Box sx={{ mb: 4 }}>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            variant="outlined"
            size="small"
            sx={{ mr: 2 }}
          />
          <TextField
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            label="Amount"
            variant="outlined"
            size="small"
            sx={{ mr: 2 }}
          />
          <RadioGroup
            row
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            sx={{ display: "inline-flex" }}
          >
            <FormControlLabel
              value="expense"
              control={<Radio />}
              label="Expense"
            />
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Income"
            />
          </RadioGroup>
          <Button
            variant="contained"
            onClick={onSubmit}
            color="primary"
            sx={{ mt: 1 }}
            disabled={isButtonDisabled} // Disable button condition
          >
            Add Transaction
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Transactions Section */}
        <Paper sx={{ padding: "10px" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Transactions
          </Typography>
          <Box>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <Typography key={transaction.id}>
                  <strong>{transaction.description}</strong> - $
                  {transaction.transactionAmount}
                  <span
                    style={{
                      color:
                        transaction.transactionType === "income"
                          ? "green"
                          : "red",
                      marginLeft: "10px",
                    }}
                  >
                    {transaction.transactionType}
                  </span>
                </Typography>
              ))
            ) : (
              <Typography>No transactions found.</Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
