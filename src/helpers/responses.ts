export const responses = {
  getData: {
    main: {
      successMessage: 'Data retrieved successfully.',
      errorMessage: 'Could not retrieve the requested information. Please try again.',
    }
  },
  getProduct: {
    schema: {
      successMessage: 'Product retrieved successfully.',
      errorMessage: 'The product you are trying to retrieve does not exist.',
    },
    validator: {
      successMessage: 'Product retrieved successfully.',
      error: 'productId does not exist.',
      errorMessage: 'The product you are trying to retrieve does not exist.',
    }
  },
  addProduct: {
    schema: {
      successMessage: 'Product added successfully.',
      errorMessage: 'The information you submitted is incomplete or invalid.',
    },
    validator: {
      successMessage: 'Product added successfully.',
      error: 'productName already exists.',
      errorMessage: 'The product you are trying to add already exists.',
    }
  },
  updateProduct: {
    schema: {
      successMessage: 'Product updated successfully.',
      errorMessage: 'The information you submitted is incomplete or invalid.',
    },
    validator: {
      successMessage: 'Product updated successfully.',
      error: 'productId does not exist.',
      errorMessage: 'The product you are trying to update does not exist.',
      error2: 'productName already exists.',
      errorMessage2: 'The product name you are trying to use already exists.',
    }
  },
  deleteProduct: {
    schema: {
      successMessage: 'Product deleted successfully.',
      errorMessage: 'The information you submitted is incomplete or invalid.',
    },
    validator: {
      successMessage: 'Product deleted successfully.',
      error: 'productId does not exist.',
      errorMessage: 'The product you are trying to delete does not exist.',
    }
  },
};