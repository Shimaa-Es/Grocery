import { Button, Container, Fade } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import EmptyCard from "../../../assets/EmptyCart.png";
const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <Fade in={true}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <div className="text-center md:space-y-4 space-y-3.5 text-gray-500">
          <img
            className="w-1/3 h-1/2 mt-12 mx-auto"
            src={EmptyCard}
            alt="empty-cart"
          />
          <h6 className="text-sm">There are no items in this cart</h6>

          <Button
            onClick={() => navigate("/products")}
            size="large"
            color="success"
            sx={{ textTransform: "capitalize" }}
            variant="outlined">
            Continue Shopping
          </Button>
        </div>
      </Container>
    </Fade>
  );
};

export default EmptyCart;
