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