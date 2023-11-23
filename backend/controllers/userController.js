import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

/*
  @desc - auth user and get token
  @route - /api/users/auth
  @access - Public

*/


const authUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email }); 
        const matchPassword = await bcrypt.compare(password, user.password); 

        if(!user || !matchPassword) 
           throw Error('Invalid email or password');

        const token = generateToken(res, user._id);
        return res.status(200).json({
            _id: user._id, 
            name: user.name, 
            email: user.email,
            token
        })
        
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};

/* 

@desc register the user
@auth /api/users
@access public

*/

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body; 
        const userExists = await User.findOne({email});  

        if(userExists)  {
            throw Error('User Already Exists');
        }
        
        // https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
        
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })

        if(!user) 
          throw Error('Invalid User Data');

          const token = generateToken(res, user._id); 
          return res.status(201).json({
              _id: user._id, 
              name: user.name, 
              email: user.email,
              token
          })
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}


/* 

@desc logout the user
@auth /api/users/logout
@access public

*/

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true, 
        expires: new Date(0)
    });
    res.status(200).json({message: 'Logged out successfully'});
}


/* 

 @desc    Get user profile
 @route   GET /api/users/profile
 @access  Private

*/

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user) 
            throw Error('User not found');

        return res.status(201).json({
            _id: user._id, 
            name: user.name, 
            email: user.email
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}; 


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private 

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if(!user) 
          throw Error('User not found');

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email; 
    
        if(req.body.password) {
            user.password = req.body.password;
        }
    
        const updatedUser = await user.save(); 
    
        return res.status(201).json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};

export {
    authUser, 
    registerUser,
    logoutUser, 
    getUserProfile, 
    updateUserProfile,
}