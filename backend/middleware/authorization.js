const isAdmin = (req, res, next) => {
    // Check if user is logged in and has an admin role
    if (req.user && req.user.role === 'admin') {
        return next(); // Proceed to the next middleware or route handler
    }
    // If not, send a forbidden response
    return res.status(403).send("Access denied :("); 
};

export default isAdmin;
