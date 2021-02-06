import { Box, Button, Link, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import InputField from "../InputField";

import axios from "./../../helper/axios";

const ProductListItemEdit = ({ product, setIsEditing, addToCart }) => {
  const { id, name, description, category, price, image } = product;

  return (
    <Formik
      initialValues={{
        id,
        name,
        description,
        category,
        price,
        image,
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await axios.put(`catalog?key=3fc45675`, values);

          addToCart(response.data);

          setIsEditing(false);
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
                  <Link onClick={() => setIsEditing(false)}>Cancel</Link>
                </Box>
                <Box>
                  <Button
                    isLoading={isSubmitting}
                    colorScheme="teal"
                    type="submit"
                  >
                    Update Product
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

export default ProductListItemEdit;
