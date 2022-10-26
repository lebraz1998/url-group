import axios from "axios";
import { useEffect, useState } from "react";
import { News } from "../../src/generated/client";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

export default function IndexCardComponent({ news }: { news: News }) {
  return (
    <Card sx={{ maxWidth: 500, height: "auto" }}>
      <CardHeader
        avatar={
          <Avatar
            src={news.logo + ""}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            {news.publisher}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={news.publisher}
        sx={{ fontSize: 13 }}
        subheader={moment(news.date).format("MMMM DD, yyyy hh:mm a")}
      />
      <a href={news.url + ""} target="_blank">
        <ImageFallback news={news} />
      </a>
      <CardContent style={{ overflow: "hidden" }} dir="auto">
        <Typography variant="h6" color="black">
          {news.title}{" "}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {news.description}
        </Typography>
      </CardContent>
      <CardActions>
        <a
          href={news.url!}
          target={"_blank"}
          style={{ color: "blue", fontSize: 13 }}
        >
          Read More
        </a>
      </CardActions>
    </Card>
  );
}
const myLoader = ({ src, width, quality }) => {
  return src;
};
function ImageFallback({ news }: { news: News }) {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    setImage(news.image + "");
  }, []);
  console.log();
  return image === "loading" || !image ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <Image
      src={"/api/image?u=" + news.image}
      alt={news.title + ""}
      onError={(e) => {
        setImage(news.logo + "");
      }}
      loading={"lazy"}
      quality={90}
      layout="responsive"
      width="100%"
      sizes="res"
      height={65}
    />
  );
}
