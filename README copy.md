# Products API

This is an Express.js server connected to a MongoDB database using Mongoose for managing products.

## Installation

1. Clone the repository.
2. Install dependencies using pnpm:
   ```
   pnpm install
   ```
3. Create a `.env` file based on `.env.example` and set your environment variables.
4. Start the server in development mode with automatic restarts using nodemon:
   ```
   pnpm start
   ```
   This runs `nodemon server.js` as defined in the package.json scripts.
   
   Alternatively, to start the server without nodemon:
   ```
   pnpm run dev
   ```

## Environment Variables

- `PORT`: The port number the server listens on (default: 3000).
- `MONGODB_URI`: MongoDB connection URI (e.g., `mongodb://localhost:27017/productsdb`).

## API Endpoints

### Create a Product

- **URL:** `/products`
- **Method:** `POST`
- **Description:** Create a new product.
- **Request Body:**
  ```json
  {
    "name": "Product Name",
    "price": 100,
    "category": "Category Name",
    "description": "Optional description",
    "inStock": true
  }
  ```
- **Response:** Returns the created product object with status 201.

### List Products

- **URL:** `/products`
- **Method:** `GET`
- **Description:** List products with optional filtering and pagination.
- **Query Parameters:**
  - `category` (optional): Filter by category.
  - `page` (optional): Page number (default: 1).
  - `limit` (optional): Number of items per page (default: 10).
- **Response:** Returns an array of product objects.

### Get Product by ID

- **URL:** `/products/:id`
- **Method:** `GET`
- **Description:** Get a product by its ID.
- **Response:** Returns the product object.

### Update Product

- **URL:** `/products/:id`
- **Method:** `PUT`
- **Description:** Update a product by its ID.
- **Request Body:** Same as create product.
- **Response:** Returns the updated product object.

### Delete Product

- **URL:** `/products/:id`
- **Method:** `DELETE`
- **Description:** Delete a product by its ID.
- **Response:** Returns a success message.

### Search Products by Name

- **URL:** `/products/search`
- **Method:** `GET`
- **Description:** Search products by name (case-insensitive).
- **Query Parameters:**
  - `name` (required): Name to search for.
- **Response:** Returns an array of matching products.

### Get Product Stats

- **URL:** `/products/stats`
- **Method:** `GET`
- **Description:** Get product count grouped by category.
- **Response:** Returns an array of objects with category and count.

## Example Requests

Create a product:
```bash
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name":"Sample","price":10,"category":"Books"}'
```

List products:
```bash
curl http://localhost:3000/products
```

Search products:
```bash
curl http://localhost:3000/products/search?name=sample
```

## Notes

- The server uses API key authentication middleware; ensure to provide the required API key in your requests.
- Error handling middleware returns appropriate error messages for validation and not found errors.
- This project uses [Mongoose](https://mongoosejs.com/) to interact with MongoDB.
- Nodemon is used for development to automatically restart the server on file changes.
