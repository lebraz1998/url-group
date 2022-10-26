import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import type { News } from "../../../src/generated/client";
import {
  DashboardStyledModal,
  DrawerDashboardStyled,
} from "../../../types/dashboard.style";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import { Button, Drawer, LinearProgress, TextField } from "@mui/material";
import useApiHook from "../../../hooks/api.hook";
import PageView from "@mui/icons-material/Pageview";
export default function DashboardModal(props: {
  news: News;
  onClose: () => void;
}) {
  const [image, setImage] = useState<string>();
  return (
    <Modal onClose={() => props.onClose} open={true}>
      <Container
        maxWidth="xs"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <DashboardStyledModal>
          <Box
            sx={{
              backgroundColor: "white",
              maxHeight: "98vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Avatar
                src={props.news.logo ? props.news.logo : ""}
                alt={props.news.title!}
              />
              <IconButton onClick={props.onClose}>
                <Close />
              </IconButton>
            </div>
            <h1 dir="auto">{props.news.title}</h1>
            {image === "loading" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <img
                src={"/api/image?u=" + props.news.image!}
                alt={props.news.title!}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            )}
            <div dir="auto">
              <h5>Author: {props.news.author} </h5>
              <h5>
                Publish Date:{" "}
                {moment(props.news.date).format("DD-MMM-yy hh:mm a")}{" "}
              </h5>
              <h5>Publisher: {props.news.publisher} </h5>
              <h5>Is Video: {props.news.video ? "true" : "false"} </h5>

              <hr />
            </div>
            <p dir="auto" style={{ margin: "15px 0px" }}>
              {props.news.description}{" "}
              <a
                href={props.news.url!}
                target={"_blank"}
                style={{ color: "blue", fontSize: 16 }}
              >
                Read More
              </a>
            </p>
          </Box>
        </DashboardStyledModal>
      </Container>
    </Modal>
  );
}
export function AddDashboardModal({
  news,
  onClose,
}: {
  news?: News;
  onClose: (e?: boolean) => void;
}) {
  const [modal, setModal] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const { data, hasError, setValue, loading } = useApiHook<News>();
  return (
    <Drawer open>
      {load && <LinearProgress />}
      <DrawerDashboardStyled>
        {modal}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <h1>
            Add Meta
            {data && (
              <IconButton
                size="small"
                color="info"
                onClick={() =>
                  setModal([
                    <DashboardModal
                      onClose={() => setModal([])}
                      key={Date.now() + ""}
                      news={data!}
                    />,
                  ])
                }
              >
                <PageView fontSize="small" />
              </IconButton>
            )}
          </h1>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </div>{" "}
        <TextField
          disabled={loading}
          required
          onChange={(e) => setValue(e.target.value)}
          placeholder="URL"
          label="URL"
          fullWidth
          size="small"
        />
        {hasError && (
          <div>
            <h5 style={{ margin: 3 }}>Please try again</h5>
          </div>
        )}
        {loading ? (
          <div
            style={{ display: "flex", margin: 15, justifyContent: "center" }}
          >
            <CircularProgress size={20} />
          </div>
        ) : (
          <></>
        )}
        {data && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 20,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                columnGap: 5,
              }}
            >
              <Button
                onClick={() => {
                  setLoad(true);
                  setError(false);

                  axios
                    .post("/api/crawler/meta", data)
                    .then((res) => {
                      onClose(true);
                    })
                    .catch((e) => {
                      setError(true);
                    })
                    .finally(() => {
                      setLoad(false);
                    });
                }}
                variant="contained"
                disableElevation
                color="info"
              >
                Add
              </Button>
              <Button variant="outlined" onClick={() => onClose()}>
                Cancel
              </Button>
            </div>
            {Object.keys(data).map((res) =>
              res === "image" ? (
                <img
                  src={"/api/image?u=" + data[res]!}
                  alt={data["title"]!}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              ) : res === "logo" ? (
                <Avatar
                  src={data[res] ? data[res]! : ""}
                  alt={data["title"]!}
                />
              ) : (
                <TextField
                  contentEditable={false}
                  disabled
                  style={{ color: "black" }}
                  placeholder={res.toLocaleUpperCase()}
                  label={res.toLocaleUpperCase()}
                  fullWidth
                  size="small"
                  key={res}
                  name={res}
                  defaultValue={data[res]}
                />
              ),
            )}
          </div>
        )}
      </DrawerDashboardStyled>
    </Drawer>
  );
}
