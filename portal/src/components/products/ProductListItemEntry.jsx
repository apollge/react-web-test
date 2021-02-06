import React from "react";
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { toast } from "react-toastify";
import InputField from "../InputField";

import axios from "./../../helper/axios";

const ProductListItemEntry = ({ addToCart, setIsAddingProduct }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await axios.post(`catalog?key=3fc45675`, values);

          addToCart(response.data);

          setIsAddingProduct(false);
          toast.success(`Product updated.`);

          setSubmitting(false);
          resetForm();
        } catch (err) {
          toast.error(`Failed to update product: ${err.message}`);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mb={3}>
            <InputField name="name" label="Name" />
          </Box>
          <Box mb={3}>
            <InputField name="description" label="Description" />
          </Box>
          <Box mb={3}>
            <InputField name="category" label="Category" />
          </Box>
          <Box mb={3}>
            <InputField name="price" label="Price" type="number" />
          </Box>
          <Box mb={3}>
            <InputField name="image" label="Image URL" />
          </Box>
          <Flex>
            <Box ml="auto">
              <Flex align="center">
                <Box mr={3}>
                  <Link onClick={() => setIsAddingProduct(false)}>Cancel</Link>
                </Box>
                <Box>
                  <Button
                    isLoading={isSubmitting}
                    colorScheme="teal"
                    type="submit"
                  >
                    Add Product
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ProductListItemEntry;
