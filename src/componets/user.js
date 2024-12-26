import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image="data:image/jpeg;base64,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"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sikanth
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Employee Id: srikad4
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Email Id: srikanthadepu@verizon.com
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Designation: Technical Specialist
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
