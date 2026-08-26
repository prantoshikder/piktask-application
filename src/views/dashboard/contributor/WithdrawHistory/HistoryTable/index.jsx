"use client";

import { Button, Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import useStyles from "../WithdrawHistory.style";

const HistoryTable = ({ withdrawalHistory, setLoading, isLoading }) => {
  const { classes } = useStyles();
  const user = useSelector((state) => state.user);

  const handleDownloadInvoice = async (invoiceId) => {
    if (user?.isLoggedIn && user?.role === "contributor") {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/contributor/withdrawals/${invoiceId}/invoice`;
        const res = await fetch(url, {
          method: "GET",
          headers: { Authorization: user?.token },
        });

        const blob = await res.blob();
        const newBlob = new Blob([blob]);

        const blobUrl = window.URL.createObjectURL(newBlob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "invoice.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        window.URL.revokeObjectURL(blob);
      } catch (error) {
        console.log("Withdrawals invoice", error);
      }
    }
  };

  return (
    <Grid container className={classes.publishGridContainer}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }} className={classes.loaderItem}>
        <Card className={classes.cardRoot}>
          <CardContent className={classes.productCard}>
            <TableContainer className={classes.tableContainer} component={Paper}>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                    height: 300,
                  }}
                >
                  <CircularProgress color="primary" />
                </div>
              ) : (
                <Table className={classes.table} aria-label="publish data table">
                  <TableHead>
                    <TableRow className={classes.tableHead}>
                      <TableCell className={classes.tableCell}>Created Date</TableCell>
                      <TableCell className={classes.tableCell}>Paid Date</TableCell>
                      <TableCell className={classes.tableCell}>Withdrawal Amount</TableCell>
                      <TableCell className={classes.tableCell}>Transfer</TableCell>
                      <TableCell className={classes.tableCell}>Status</TableCell>
                      <TableCell className={classes.tableCell}>Reason</TableCell>
                      <TableCell className={classes.tableCell}>Invoice</TableCell>
                    </TableRow>
                  </TableHead>

                  {withdrawalHistory?.length > 0 &&
                    withdrawalHistory?.map((historyItem) => (
                      <TableBody key={historyItem?.id} className={classes.tableRowBody}>
                        <TableRow className={classes.tableRowContent}>
                          <TableCell className={classes.tableCell}>{moment(historyItem?.createdAt).format("ll")}</TableCell>
                          <TableCell className={classes.tableCell}>
                            {historyItem?.status === "paid" && `${moment(historyItem?.date_paid).format("ll")}`}
                          </TableCell>
                          <TableCell className={classes.tableCell}>${historyItem?.amount}</TableCell>
                          <TableCell className={classes.tableCell}>{historyItem?.gateway}</TableCell>
                          <TableCell
                            className={
                              historyItem?.status === "paid"
                                ? `${classes.tableCell} ${classes.statusSuccess}`
                                : historyItem?.status === "pending"
                                ? `${classes.tableCell} ${classes.statusPending}`
                                : `${classes.tableCell} ${classes.statusDanger}`
                            }
                          >
                            {historyItem?.status}
                          </TableCell>
                          <TableCell className={classes.tableCell}>{historyItem?.reason}</TableCell>
                          <TableCell className={classes.tableCell}>
                            {historyItem?.status === "paid" && (
                              <Button onClick={() => handleDownloadInvoice(historyItem?.id)} className={classes.invoiceButton}>
                                Download
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                </Table>
              )}
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HistoryTable;
