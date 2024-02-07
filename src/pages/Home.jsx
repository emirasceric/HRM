import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const accounts = useSelector((state) => {
    return state.accountReducer.accounts;
  });

  const navigate = useNavigate();

  function handleAccountNavigation(id) {
    navigate(`/accounts/${id}`);
  }

  return (
    <Grid container style={{ padding: 16 }} spacing={2}>
      {accounts.map((account) => (
        <Grid item>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {account.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handleAccountNavigation(account.id)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
