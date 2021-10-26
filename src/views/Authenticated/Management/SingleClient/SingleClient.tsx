import {
  Box,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../../../../hooks/useAuth";
import "./index.scss";

const SingleClient = () => {
  const { user } = useAuth();

  return (
    <div className="singleClient">
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
              rows={6}
              variant="filled"
            />
          </CardContent>
        </Card>
      </div>
      <div className="tags">
        <Card sx={{ width: 400, minHeight: 400, boxShadow: 3 }}>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} gutterBottom>
              {user?.name}
            </Typography>
            <Box sx={{ borderBottom: 1 }}></Box>
            <FormGroup></FormGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleClient;
