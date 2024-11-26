// import jwt from "jsonwebtoken"; 

// const isLoggedIn = async(req,res,next) => {
//     const {token} = req.cookies ;
//     if (!token){
//         res.status(401).send("login required");
//     }
//     const tokenDetails = jwt.verify(token,process.env.JWT_PASSWORD);

//     // Attach the token details (decoded payload) to the request object for future use
//     req.user = tokenDetails ;
//     next() ;
// }
// export default isLoggedIn ; 

import jwt from "jsonwebtoken"; 

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies

    if (!token) {
        return res.status(401).send("Login required."); // 401 for unauthorized access
    }

    try {
        const tokenDetails = jwt.verify(token, process.env.JWT_PASSWORD); // Verify the token

        // Attach the token details (decoded payload) to the request object for future use
        req.user = tokenDetails;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(403).send("Invalid token."); // 403 for forbidden access
    }
}

export default isLoggedIn;
