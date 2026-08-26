"use client";

import { Button, Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@/components/ui-kit";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const HistoryTable = ({ withdrawalHistory, setLoading, isLoading }) => {
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
    <Grid container className="pt-[1rem] pb-[4rem]">
      <Grid size={{ xs: 12, sm: 12, md: 12 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
        <Card className="h-[auto] rounded-[0] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)]">
          <CardContent className="p-[2rem]">
            <TableContainer className="[border:0] shadow-[none] rounded-[0]" component={Paper}>
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
                <Table aria-label="publish data table">
                  <TableHead>
                    <TableRow className="bg-[#ECEEF5] [&_th]:[border-bottom:0px_solid_transparent]">
                      <TableCell className="p-[1rem] text-[1.6rem] text-left">Created Date</TableCell>
                      <TableCell className="p-[1rem] text-[1.6rem] text-left">Paid Date</TableCell>
                      <TableCell className="p-[1rem] text-[1.6rem] text-left">Withdrawal Amount</TableCell>
                      <TableCell className="p-[1rem] text-[1.6rem] text-left">Transfer</TableCell>
                      <TableCell className="p-[1rem] text-[1.6rem] text-left">Status</TableCell>
                      <TableCell className="p-[1rem] text-[1.6rem] text-left">Reason</TableCell>
                      <TableCell className="p-[1rem] text-[1.6rem] text-left">Invoice</TableCell>
                    </TableRow>
                  </TableHead>

                  {withdrawalHistory?.length > 0 &&
                    withdrawalHistory?.map((historyItem) => (
                      <TableBody key={historyItem?.id}>
                        <TableRow className="[&_td]:border-[#E3E3E3] [&:last-child_td]:[border:0] [&:nth-of-type(even)]:bg-[rgba(0,0,0,0.04)]">
                          <TableCell className="p-[1rem] text-[1.6rem] text-left">{moment(historyItem?.createdAt).format("ll")}</TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-left">
                            {historyItem?.status === "paid" && `${moment(historyItem?.date_paid).format("ll")}`}
                          </TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-left">${historyItem?.amount}</TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-left">{historyItem?.gateway}</TableCell>
                          <TableCell
                            className={
                              historyItem?.status === "paid"
                                ? `p-[1rem] text-[1.6rem] text-left text-[#03911a] capitalize`
                                : historyItem?.status === "pending"
                                ? `p-[1rem] text-[1.6rem] text-left text-[#0088f2] capitalize`
                                : `p-[1rem] text-[1.6rem] text-left text-[#ff0000] capitalize`
                            }
                          >
                            {historyItem?.status}
                          </TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-left">{historyItem?.reason}</TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-left">
                            {historyItem?.status === "paid" && (
                              <Button onClick={() => handleDownloadInvoice(historyItem?.id)} className="p-[0_1.5rem] bg-[#0088f2] text-[#fff] [border:.2rem_solid] border-[#0088f2] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:border-[#0773c5]">
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
