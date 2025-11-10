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


#### MongoDB Lesson Collection (Requirement A)
- **Model**: `models/Lesson.js`
- **Fields**: topic, price, location, space (all required)
- **Database**: MongoDB Atlas cloud database
- **Status**: Schema defined and ready for data

### Database Connection Test
- A test script is included to verify MongoDB connectivity and Lesson collection functionality:

# Test database connection and Lesson model
- node test-db.js