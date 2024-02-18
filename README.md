# Shoes Management Dashboard

Welcome to the Shoes Management Dashboard! This application is designed to help you efficiently manage your shoe inventory, track sales, and analyze sales history. Below are the details on setting up and using the application.

## Features

### Authentication

- Users can register and log in to access the dashboard securely using JWT (JSON Web Tokens).
- A single role (admin) is defined for managing the system.

### Shoes Management

- CRUD operations for managing shoes in the inventory.
- Real-time UI updates for seamless user experience.
- Shoes filtering options for efficient inventory management.

### Sales Management

- Sell products by specifying quantity, buyer name, and sale date.
- Automatic removal of products from inventory when the quantity reaches zero.

### Sales History

- View sales history categorized by weekly, daily, monthly, and yearly periods.

### Shoes Filtering

- Filter shoes based on various criteria, including price range, release date, brand, model, style, size, color, and additional relevant parameters.

### Polish Request

- User can request polish request for their shoes and admin can approve and give status to the request so, that user can tract the activity.

### Product Verification

- User can search by product id to check the product authenticity if the product is real or fake.

### User Interface Features

- Real-time UI updates for changes in product inventory and sales.
- Efficient CRUD operations using RTK Query.
- Re-fetching functionality for data accuracy.

### State Management

- Utilization of Redux for consistent application state.

### Bulk Delete Product Options

- Efficiently manage inventory by implementing bulk delete for shoes.

### Duplicate & Edit

- Create a new product by duplicating an existing one and making necessary modifications.

## Technical Requirements

- RTK Query for CRUD operations.
- Redux for state management.
- Real-time UI updates and re-fetching for data accuracy.
- Mobile responsiveness for a better user experience.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd assignment_6_client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm start
   ```

5. Open your browser and go to [http://localhost:5173](http://localhost:5173).

## Live Deployment

- [Frontend Live](https://showa-client.vercel.app/)
- [Backend Live](https://showa-inventory-management-app.vercel.app/)

## Demo Video

[Demo Video](https://drive.google.com/file/d/1hUgJz1Ju-fCBqZE9f5P8cOBqbf1qBLeF/view?usp=sharing)

## Repository Links

- [Frontend Repository](https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-client-side-xanon-oc)
- [Backend Repository](https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-xanon-oc)
