"use client";

import { Container, Grid } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import ProductNotFound from "../ProductNotFound";
import SellerInfo from "./SellerInfo";

export const TopSeller = (props) => {
  const {homeTopSeller, adminDashBoard} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [topSeller, setTopSeller] = useState([]);

  //data loading
  useEffect(() => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/top/?limit=4`)
        .then(({ data }) => {
          if (data?.success) {
            setTopSeller(data.sellers);
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <Container>
        {homeTopSeller && (
          <Grid container spacing={2}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {topSeller.length ? (
                  topSeller?.map((photo) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo.id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
                      <SellerInfo photo={photo} />
                    </Grid>
                  ))
                ) : (
                  <ProductNotFound />
                )}
              </>
            )}
          </Grid>
        )}

      {adminDashBoard && (
        <Grid container spacing={2}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {topSeller.length ? (
                topSeller?.map((photo) => (
                  <Grid size={{ xs: 6, sm: 6, md: 3 }} key={photo.id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
                    <SellerInfo photo={photo} />
                  </Grid>
                ))
              ) : (
                <ProductNotFound />
              )}
            </>
          )}
        </Grid>
      )}
      </Container>

    </>
  );
};
