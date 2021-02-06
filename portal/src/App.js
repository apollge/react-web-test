import { Box, Button, ChakraProvider, Flex, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./App.css";
import ProductList from "./components/products/ProductList";
import ProductListItemEntry from "./components/products/ProductListItemEntry";
import axios from "./helper/axios";
import ToastMessage from "./helper/toastContainer";

function App() {
  const [cartList, addToCart] = useState([]);

  const [isAddingProduct, setIsAddingProduct] = useState(false);

  useEffect(() => {
    displayCatalog();
  }, []);

  const displayCatalog = async () => {
    try {
      const response = await axios.get("catalog?key=3fc45675");

      if (response) {
        addToCart(response.data);
        toast.success(`Products fetched.`);
      }
    } catch (err) {
      toast.error(`Failed to fetch catalog: ${err.message}`);
    }
  };

  const getProducts = () => displayCatalog();

  return (
    <ChakraProvider>
      <Box mt={8} mx="auto" maxW="800px" w="100%">
        <Flex align="center">
          <Box>
            <Button mb={4} onClick={getProducts}>
              Get available products
            </Button>
          </Box>
          <Box ml="auto">
            <Link onClick={() => setIsAddingProduct(true)}>Add Product</Link>
          </Box>
        </Flex>
        {isAddingProduct ? (
          <ProductListItemEntry
            addToCart={addToCart}
            setIsAddingProduct={setIsAddingProduct}
          />
        ) : (
          <ProductList products={cartList} addToCart={addToCart} />
        )}
        <ToastMessage />
      </Box>
    </ChakraProvider>
  );
}

export default App;
