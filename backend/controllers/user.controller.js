import User from '../models/user.model.js';
import generateProfileImage from '../utils/generateProfileImage.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

/*
  @desc - auth user and get token
  @route - /user/auth
  @access - Public

*/

const authUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email }); 
        const matchPassword = await bcrypt.compare(password, user.password); 

        if(!user) {
            throw 'Invalid email id';
        }

        if(!matchPassword) {
            throw 'inncorrect password'
        }

        const token = generateToken(res, user._id);
        return res.status(200).json({
            _id: user._id, 
            name: user.name, 
            email: user.email,
            token, 
            imageUrl: user.imageUrl,
            success: true
        })
        
    } catch (error) {
        return res.status(404).json({message: error, success: false});
    }
};

/* 

@desc register the user
@auth /user
@access public

*/

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const userExists = await User.findOne({email});  

        if(userExists)  {
            throw 'User Already Exists';
        }
        
        // https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
        
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);
        const imageUrl = generateProfileImage(name);
        
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword, 
            imageUrl
        })

        if(!user) 
          throw 'Invalid User Data';

          const token = generateToken(res, user._id); 
          return res.status(201).json({
              _id: user._id, 
              name: user.name, 
              email: user.email,
              imageUrl,
              token
          })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error});
    }
}


/* 

@desc logout the user
@route /user/logout
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
 @route   GET user/profile
 @access  Private

*/

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user) 
            throw 'User not found';

        return res.status(201).json({
            _id: user._id, 
            name: user.name, 
            email: user.email
        })
    } catch (error) {
        return res.status(404).json({message: error});
    }
}; 


// @desc    Update user profile
// @route   PUT user/profile
// @access  Private 

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if(!user) 
          throw 'User not found';

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
        return res.status(404).json({message: error});
    }
};

export {
    authUser, 
    registerUser,
    logoutUser, 
    getUserProfile, 
    updateUserProfile,
}