import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Masonry from "react-masonry-css";

import IndexCardComponent from "../components/index/card.component";
import { prisma } from "../prisma/prisma";
import { News } from "../src/generated/client";

export async function getServerSideProps(ctx) {
  const result = await prisma.news.findMany({ orderBy: { id: "desc" } });
  return {
    props: {
      news: JSON.parse(JSON.stringify(result)),
    }, // will be passed to the page component as props
  };
}
const Home = (props: { news: News[] }) => {
  return (
    <Container>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {" "}
        {props.news.map((res) => (
          <Grid item key={res.id} xs={12} sm={6} md={4} lg={3}>
            <IndexCardComponent news={res} />
          </Grid>
        ))}
      </Masonry>
    </Container>
  );
};
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default Home;
