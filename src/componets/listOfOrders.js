import React, { use, useEffect, useState } from "react";
import pendingOrdersData from "../pendingOrdersData.json";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ListOfOrders = () => {
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = useState(pendingOrdersData);
  const [viewProducts, setViewProducts] = useState([]);
  const [delProducts, setDelProducts] = useState([]);

  const [modelOpen, setModelOpen] = useState(false);
  const [delModelOpen, setDelModelOpen] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState();
  const [openRows, setOpenRows] = useState({});

  const handleOpen = (clickedData, index) => {
    setViewProducts(clickedData.products);
    setSelectedRowIndex(index);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleDelModelClose = () => setDelModelOpen(false);
  const [selectAll, setSelectAll] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSelectAll = () => {
    const newCheckedStatus = !selectAll;
    setSelectAll(newCheckedStatus);
    setViewProducts((prevRows) =>
      prevRows.map((row) => ({ ...row, isChecked: newCheckedStatus }))
    );
  };

  const handleRowToggle = (productNumber) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [productNumber]: !prevState[productNumber],
    }));
  };

  const handleRowCheck = (id) => {
    setViewProducts((prevRows) =>
      prevRows.map((row) =>
        row.productNumber === id ? { ...row, isChecked: !row.isChecked } : row
      )
    );

    const isDelete = viewProducts.map((data) => data.isChecked === true);
    console.log(isDelete, "isDeleteisDelete");

    // Update "select all" checkbox status
  };
  console.log(delProducts, "count");

  // ------------ Check box Selection--------------

  const modify = () => {
    console.log("you Clicked on Modify button");
  };

  const handleDelete = () => {
    setOpen(false);
    setDelModelOpen(true);
    setDelProducts(() =>
      viewProducts.filter((data) => data.isChecked === true)
    );
  };

  // --------------- Confirmation handles

  const handleCancel = () => {
    setDelModelOpen(false);

    setViewProducts((prevRows) =>
      prevRows.map((row) => ({ ...row, checked: false }))
    );
  };

  const handleConfirm = () => {
    let updatedArray = viewProducts.filter((data) => data.isChecked === false);
    setViewProducts(updatedArray);
    setOpen(true);
    const data = order.pendingOrders.map(
      (order) =>
        order.orderNumber === selectedRowIndex
          ? { ...order, products: updatedArray } // Update only the products for the matching order
          : order // Keep the rest of the orders intact
    );
    setDelModelOpen(false);
    setOrder({ pendingOrders: data });
    setSelectAll(false);
    console.log(data, "datadatadatadatadatadata");
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell align="right">Order Number</StyledTableCell>
              <StyledTableCell align="right">Total Lines</StyledTableCell>
              <StyledTableCell align="right">Effective Date</StyledTableCell>
              <StyledTableCell align="right">View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order?.pendingOrders?.map((data, index) => (
              <StyledTableRow key={data.orderNumber}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data?.orderNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data?.products?.length}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data?.orderDate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => handleOpen(data, data.orderNumber)}
                  >
                    View
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <TableCell component="th" scope="row">
            <Checkbox
              aria-label="Select All"
              checked={selectAll}
              onChange={() => handleSelectAll()}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography>Select All</Typography>
          </TableCell> */}
          {viewProducts?.map((productData, index) => (
            <div>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleRowToggle(productData.productNumber)}
                  >
                    {openRows[productData.productNumber] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Checkbox
                    name={productData.productNumber}
                    checked={productData.checked}
                    onChange={() => handleRowCheck(productData.productNumber)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell align="right">{productData.productNumber}</TableCell>
                <TableCell align="right">{productData.productName}</TableCell>
                <TableCell align="right">{productData.quantity}</TableCell>
                <TableCell align="right">{productData.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse
                    in={openRows[productData.productNumber]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        Details
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableBody>
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {productData.productName}
                            </TableCell>
                            <TableCell>{productData.quantity}</TableCell>
                            <TableCell align="right">
                              {productData.status}
                            </TableCell>
                            <TableCell align="right">
                              {productData.effectiveDate}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </div>
          ))}
          <Box m={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "40%",
              }}
            >
              <Button disabled variant="contained">
                Modify
              </Button>
              <Button
                disabled={viewProducts < 0}
                onClick={handleDelete}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
      {/* ----------------------Delete Confirmation Model-------------------------- */}

      {delProducts.length > 0 && delModelOpen && (
        <Modal
          open={delModelOpen}
          onClose={handleDelModelClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Are you Sure want to Delete the Product?
            </Typography>
            {delProducts.map((data) => (
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                m={4}
                component="p"
              >
                {`${data.productNumber} - ${data.productName}`}
              </Typography>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "40%",
              }}
            >
              <Button onClick={handleCancel} variant="contained">
                Cancel
              </Button>
              <Button onClick={handleConfirm} variant="contained" color="error">
                Confirm
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ListOfOrders;
