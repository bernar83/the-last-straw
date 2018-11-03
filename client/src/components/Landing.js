import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <Typography component="h2" variant="h1" align="center" gutterBottom>
        The Last Straw
      </Typography>
      <Typography variant="body1" align="center">
        An application to track the amount of plastic you saved by not using straws
      </Typography>
      <Grid container spacing={16} style={{justifyContent: "center", marginTop: "10px"}}>
        <Grid item >
          <Button variant="contained" component={Link} to={'/register'}>
            Register
          </Button>
        </Grid>
        <Grid item >
          <Button variant="contained" component={Link} to={'/login'}>
            Log In
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
