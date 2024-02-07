import React from "react";
import { Button, Grid, Typography } from "@mui/material";

export default function PageHeader(props) {
  const { title, onAdd } = props;

  return (
    <Grid
      container
      style={{ padding: 16 }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={onAdd}>
          Add New
        </Button>
      </Grid>
    </Grid>
  );
}
