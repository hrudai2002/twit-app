import User from '../models/userModel';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';

/*
  @desc - auth user and get token
  @route - /api/users/auth
  @access - Public

*/
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id, 
            name: user.name, 
            email: user.email
        });
    } else {
        res.status(401);
        throw Error('Invalid email or password');
    }
});

/* 

@desc register the user
@auth /api/users
@access public

*/

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body; 
    const userExists = User.findOne({email}); 

    if(userExists) {
        res.status(400); 
        throw Error('user already exists');
    }

    const user = await User.create({
        name,
        email, 
        password, 
    })

    if(user)  {
        generateToken(res, user._id); 
        res.status(201).json({
            _id: user._id, 
            name: user.name, 
            email: user.email
        })
    } else {
        res.status(400);
        throw Error('invalid user data');
    }
})


/* 

@desc logout the user
@auth /api/users/logout
@access public

*/

const logOutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true, 
        expires: new Date(0)
    });
    res.status(200).json({message: 'Logged out successfully'});
}