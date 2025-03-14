"use client";

import { useState, useEffect } from "react";

import parse from "html-react-parser";
import { highlightText } from "../utils/textHighLight";

import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
  backgroundColor: "#1a000d",
  color: "#FFFFFF",
};

const OutOfStock = ({ searchTerm }) => {
  const [OutOfStock, setOutOfStock] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemNameOOS, setItemNameOOS] = useState("");

  const updateOutOfStock = async () => {
    const snapshot = query(collection(firestore, "outOfStock"));
    const docs = await getDocs(snapshot);
    const outOfStockList = [];
    docs.forEach((doc) => {
      outOfStockList.push({ name: doc.id, ...doc.data() });
    });
    setOutOfStock(outOfStockList);
  };

  const addItemOOS = async (itemOOS) => {
    const docRef = doc(collection(firestore, "outOfStock"), itemOOS);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateOutOfStock();
  };

  const removeItemOOS = async (itemOOS) => {
    const docRef = doc(collection(firestore, "outOfStock"), itemOOS);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateOutOfStock();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateOutOfStock();
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              label="Item"
              variant="outlined"
              fullWidth
              value={itemNameOOS}
              onChange={(e) => setItemNameOOS(e.target.value)}
              color="primary"
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItemOOS(itemNameOOS);
                setItemNameOOS("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box
        sx={(theme) => ({
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "40%",
          },
          [theme.breakpoints.down("sm")]: {
            width: "80%",
          },
        })}
      >
        <Box
          border={"1px white solid"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack
            display={"flex"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              variant={"h2"}
              textAlign={"center"}
              sx={{ fontSize: "25px" }}
            >
              Shopping List
            </Typography>
            <Button
              sx={{
                paddingLeft: 0.7,
                paddingRight: 0.7,
                marginRight: 2,
                color: "black",
                fontSize: "16px",
              }}
              variant="contained"
              onClick={handleOpen}
            >
              Add Item
            </Button>
          </Stack>
        </Box>
        <Stack overflow={"auto"} sx={{ background: "white" }}>
          {OutOfStock.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              border={"1px solid black"}
              color="black"
            >
              <Typography variant={"h3"} textAlign={"center"}>
                {parse(
                  highlightText(
                    name.charAt(0).toUpperCase() + name.slice(1),

                    searchTerm
                  )
                )}
              </Typography>
              <Stack direction={"row"} m={2} spacing={1.2}>
                <Button
                  size={"small"}
                  variant="contained"
                  onClick={() => removeItemOOS(name)}
                  sx={{
                    padding: 0.25,
                    minWidth: 0,
                    color: "black",
                  }}
                >
                  <RemoveIcon />
                </Button>
                <Typography variant={"h3"} textAlign={"center"}>
                  {quantity}
                </Typography>
                <Button
                  size={"small"}
                  variant="contained"
                  onClick={() => addItemOOS(name)}
                  sx={{
                    padding: 0.25,
                    minWidth: 0,
                    color: "black",
                  }}
                >
                  <AddIcon />
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default OutOfStock;
