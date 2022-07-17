import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "react-use-cart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 0",
  },
}));

export default function AddCartIcon() {
  const { totalItems } = useCart();
  return (
    <StyledBadge badgeContent={totalItems} color="warning">
      <ShoppingCartIcon />
    </StyledBadge>
  );
}
