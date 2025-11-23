# Coursesforyou App - Backend
-Express.js server for lesson order.

#### Logger Middleware (Requirement A)
- **File**: `logger.js`
- **Function**: Logs all incoming requests to the server console
- **Output**: Timestamp, HTTP method, URL for each request
- **Usage**: Automatically applied to all routes

### Static File Middleware (Requirement B)
- **Folder**: `Lessonimages/` - contains lesson images
- **Route**: `/images/:filename` - serves static image files
- **Error Handling**: Returns 404 JSON error for missing images
- **Test Images**: Maths.jpg, Art.jpg, Boxing.jpg, etc.
- **Test**: 
  - `http://localhost:3000/images/Boxing.jpg` (existing image)
  - `http://localhost:3000/images/nonexistent.jpg` (404 error)


### MongoDB Collections 
#### MongoDB Lesson Collection (Requirement A)
- **Model**: `models/Lesson.js`
- **Fields**: topic, price, location, space (all required)
- **Database**: MongoDB Atlas cloud database
- **Status**: Schema defined and ready for data


#### Order Collection (Requirement B)
- **Model**: `order.js`
- **Fields**: name, phone number, lessonIDs (array), spaces, totalPrice
- **Relationships**: References Lesson collection via lessonIDs
- **Validation**: Name (letters only), phone (numbers only)

### Database Connection Test
- A test script is included to verify MongoDB connectivity and Lesson collection functionality:
# Test database connection 
- node test-db.js

## REST API Endpoints 

### GET /api/lessons
- Returns all lessons as JSON array
- Used by frontend to display available lessons

### POST /api/orders  
- Creates new orders in database
- Validates: name (letters only), phone (numbers only), lesson existence
- Calculates total price automatically

### PUT /api/lessons/:id
- Updates any lesson attribute (topic, location, price, space)
- Used for inventory management after orders
- Can set spaces to any number (not just increment/decrement)

### Testing
All endpoints tested with Postman collection
