import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../../store/constant";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";

function Dashboard(): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
