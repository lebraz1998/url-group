import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import DashboardTable from "../../components/admin/dashboard/table.components";
import { prisma } from "../../prisma/prisma";
import { News } from "../../src/generated/client";

export async function getServerSideProps({ req, res }) {
  const result = await prisma.news.findMany({ orderBy: { id: "desc" } });
  return {
    props: {
      news: JSON.parse(JSON.stringify(result)),
    }, // will be passed to the page component as props
  };
}

export default function DashboardScreen(props) {
  const [news, setNews] = useState<News[]>(props.news);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Container>
        <DashboardTable
          child={loading ? <LinearProgress /> : null}
          news={news}
          onUpdate={() => {
            setLoading(true);
            axios
              .get("/api/crawler/meta")
              .then((e) => {
                setNews(e.data);
              })
              .catch((e) => {})
              .finally(() => {
                setLoading(false);
              });
          }}
        />
      </Container>
    </>
  );
}
