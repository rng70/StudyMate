const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charactes').isLength({min: 6})
],  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { name, email, password } = req.body;
    
    try {
        /**
        * Case-1: Check if the user exists
        * Case-2: Get user gravatar
        * Case-3: Encrypt Password
        * Case-4: Return jsonwebtokens
        */
        
        /* Case-1: Check if the user exists */
        let userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({errors: [{ msg: "User already exists"}] });
        }

        /* Case-2: Get user gravatar */
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        /* If everything goes well create new user */
        user = new User({
            name,
            email,
            avatar,
            password
        })

        /* Case-3: Encrypt Password */
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        /* Now save the user to the database */
        await user.save();

        /* Case-4: Return jsonwebtokens */
        res.send('User registered')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server failure');
    }
})


module.exports = router;