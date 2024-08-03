"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Modal,
  QuantityInput,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const OutOfStock = () => {
  // We'll add our component logic here
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
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemNameOOS}
              onChange={(e) => setItemNameOOS(e.target.value)}
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

      <Box>
        <Box
          border={"1px white solid"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant={"h2"} textAlign={"center"}>
              Out of Stock
            </Typography>
            <Button
              sx={{
                paddingLeft: 0.7,
                paddingRight: 0.7,
                minWidth: 0,
              }}
              variant="contained"
              onClick={handleOpen}
            >
              Add Item
            </Button>
          </Stack>
        </Box>
        <Stack overflow={"auto"}>
          {OutOfStock.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              paddingX={10}
              border={"1px solid white"}
            >
              <Typography variant={"h3"} textAlign={"center"}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>

              <Button
                size={"small"}
                variant="contained"
                onClick={() => removeItemOOS(name)}
                sx={{
                  padding: 0.25,
                  minWidth: 0,
                }}
              >
                <ArrowDownwardIcon />
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
                }}
              >
                <ArrowUpwardIcon />
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default OutOfStock;
