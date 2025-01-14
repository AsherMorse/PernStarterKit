import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// Security middleware configuration
export const securityMiddleware = [
    // Basic security headers
    helmet(),
    
    // Rate limiting
    limiter,
    
    // CORS configuration
    (req, res, next) => {
        res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    }
]; 