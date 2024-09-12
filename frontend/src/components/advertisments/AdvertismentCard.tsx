import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Advertisment } from "../../types";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const AdvertismentCard: React.FC<{ advertisment: Advertisment }> = ({
  advertisment,
}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`${advertisment.id}`)}>
        {advertisment.imageUrl && (
          <CardMedia
            sx={{ minHeight: 300 }}
            image={advertisment.imageUrl}
            title={advertisment.name}
          />
        )}
        <CardContent>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ lineHeight: 1 }}
          >
            {advertisment.name}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {advertisment.price} ₽
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.secondary", textAlign: "right" }}
          >
            {new Date(advertisment.createdAt).toLocaleString()}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ color: "text.secondary" }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <VisibilityIcon fontSize="small" />
              <Typography variant="caption">{advertisment.likes}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <ThumbUpIcon fontSize="small" />
              <Typography variant="caption">{advertisment.views}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AdvertismentCard;
