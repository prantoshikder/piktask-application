"use client";

import { Box, CardContent, Container, Grid } from "@/components/ui-kit";
import { Skeleton } from "@/components/ui-kit";
import React from "react";

const Loader = ({ item }) => {
  return (
    <Container>
      <Grid container wrap="nowrap">
        {Array(4)
          .fill()
          .map((item, index) => (
            <Box className="m-[2rem_1.5rem_0rem_0rem]" width={360} my={5} key={index}>
              <Skeleton variant="rect" width={360} height={250} />
              <Box pt={0.5}>
                <Skeleton className="w-[340px] ml-[0.9rem] mb-[0.5rem]" />

                <CardContent className="flex items-center justify-between pt-[0] mt-[auto] pb-[0]">
                  <div className="w-[30rem] flex justify-between items-center">
                    <Skeleton className="ml-[0.9rem] mb-[0.5rem]" variant="circle" width={40} height={40} />
                    <Skeleton className="mr-[5rem]" animation="wave" width="50%" />
                  </div>

                  <Skeleton className="w-[10.5rem] h-[4.5rem] rounded-[2.1rem]" animation="wave" />
                </CardContent>
              </Box>
            </Box>
          ))}
      </Grid>
    </Container>
  );
};

export default Loader;
