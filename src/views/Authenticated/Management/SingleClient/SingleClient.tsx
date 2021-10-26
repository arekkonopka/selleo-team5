import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";

const SingleClient = () => {
  const { user } = useAuth();
  console.log("singleClient");
  return (
    <div>
      <div className="description">
        <Card sx={{ width: 400, minHeight: 400, boxShadow: 3 }}>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} gutterBottom>
              {" "}
              {user?.name}
            </Typography>
            <Box sx={{ borderBottom: 1 }}></Box>
            <Typography
              sx={{ fontSize: 18, margin: 2 }}
              gutterBottom
            ></Typography>
            <TextField
              id="filled-multiline-static"
              label="Twój opis"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="filled"
            />
          </CardContent>
        </Card>
      </div>
      <div className="tags"></div>
    </div>
  );
};

export default SingleClient;
