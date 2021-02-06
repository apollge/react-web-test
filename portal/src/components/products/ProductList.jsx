import { Stack } from "@chakra-ui/react";
import React from "react";

import ProductListItem from "./ProductListItem";

const ProductList = ({ products, addToCart }) => {
  return (
    <Stack spacing={8} mb={4}>
      {!products.length
        ? `Nothing to show`
        : products.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
    </Stack>
  );
};

export default ProductList;
