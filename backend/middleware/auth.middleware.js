import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

export const protect = async (req, res, next) => {
    try {
        let token = req.cookies.jwt; 
        if(!token) 
           throw Error('Not authorized, no token');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const found = await User.findById(decoded.userId); 

        if(!found) 
          throw Error('Not authorized, no token');
        
        next();
        
    } catch (error) {
        return res.status(401).json({message: error});
    }
    
}