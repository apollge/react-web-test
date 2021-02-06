import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

import axios from "../../helper/axios";
import ProductListItemEdit from "./ProductListItemEdit";

const ProductListItem = ({ product, addToCart }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete("catalog?key=3fc45675", {
        data: { id },
      });

      if (response) {
        addToCart(response.data);
        toast.success("Product deleted.");
      }
    } catch (err) {
      toast.error(`Failed to delete product: ${err.message}`);
    }
  };

  return isEditing ? (
    <ProductListItemEdit
      product={product}
      setIsEditing={setIsEditing}
      addToCart={addToCart}
    />
  ) : (
    <Box
      key={product.id}
      p={5}
      shadow="md"
      borderWidth="1px"
      borderColor="inherit"
    >
      <Flex align="center">
        <Heading fontSize="xl">{product.name}</Heading>
        <Box ml="auto" mr={3}>
          <Link onClick={() => setIsEditing(true)}>Update</Link>
        </Box>
        <Box>
          <Link onClick={() => deleteProduct(product.id)}>Delete</Link>
        </Box>
      </Flex>
      <Text>{product.description}</Text>
    </Box>
  );
};

export default ProductListItem;
