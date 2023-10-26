# unitylabs_assignment

## Testing Guide

***NOTE*** -  Make sure to include the JWT token generated during registration or login as an Authorization header in the format 'Bearer <token>' when testing the API endpoints. Add mongodb atlas driver URL in index.js to connect to Database
 
## Endpoints and Requests:

_________________________________________________________
### 1. User Registration (POST)

Endpoint: /api/register
Request:
Method: POST
Headers:
Content-Type: application/json
Body (Raw JSON):
json :-

{
  "username": "your_username",
  "password": "your_password",
  "type": "buyer" // or "seller"
}
Note: Register a user with a username and password.
___________________________________________________________

### 2. User Login (POST)

Endpoint: /api/login
Request:
Method: POST
Headers:
Content-Type: application/json
Body (Raw JSON):
json:-

{
  "username": "your_username",
  "password": "your_password"
}
Note: Authenticate a user and receive a JWT token for authorization.
_______________________________________________________________

### 3.Get a List of Sellers (GET)

Endpoint:  /api/buyer/list-of-sellers
Request:
Method: GET
Headers:
Authorization: 
Note: Retrieve the list of seller
___________________________________________________________

### 4. Get Seller's Catalog (GET)

Endpoint: /api/seller/:seller_id/catalog
Request:
Method: GET
Headers:
Authorization: Bearer JWT_TOKEN (replace with your JWT token)
Note: Retrieve the catalog for a specific seller.
______________________________________________________________

### 5. Create Order (POST)

Endpoint: /api/order/:seller_id
Request:
Method: POST
Headers:
Content-Type: application/json
Authorization: Bearer JWT_TOKEN (replace with your JWT token)
Body (Raw JSON):
json:-

{
  
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ]
}
Note: Create an order for a buyer with the specified buyerId from a seller.
________________________________________________________________

### 6. Create Catalog (POST)

Endpoint: /api/catalog
Request:
Method: POST
Headers:
Content-Type: application/json
Authorization: Bearer JWT_TOKEN (replace with your JWT token)
Body (Raw JSON):
json:-

{
  "products": [
    {
      "name": "Product 1",
      "price": 10.0
    },
    {
      "name": "Product 2",
      "price": 15.0
    }
  ]
}
Note: Create a catalog for a seller with the specified sellerId.

_____________________________________________________________

### 7. Get Orders Received by Seller (GET)

Endpoint: /api/seller/orders
Request:
Method: GET
Headers:
Authorization: Bearer JWT_TOKEN (replace with your JWT token)
Note: Retrieve orders received by the seller.
________________________________________________________________

## Security Note:

**Hasing and Salting Passwords:** I have implemented secure password storage by using bcrypt to hash and salt passwords. This ensures that user passwords are stored securely in the database.

**JWT Authorization:** I've incorporated JWT (JSON Web Token) authorization for user authentication. Users are issued tokens upon registration and login, which must be included in the request headers for protected routes. This adds a layer of security to the API.

**JWT Token in .env File:** Storing the JWT secret in the .env file ensures that sensitive information is not exposed in the codebase. It's a best practice to keep secrets and configuration values in environment variables.

**Code Comments:** I've added comments to the code for improved readability and understanding. Well-commented code makes it easier to maintain and modify in the future.
