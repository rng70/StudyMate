const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
/**
 * @route   GET api/profile/me
 * @desc    Get current user profile
 * @access  Private
 */ 
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

/**
 * @route   POST api/profile
 * @desc    Create or update a user profile
 * @access  Private
 */ 
router.post('/',
    [
        auth,
        [
            check('status', 'Status is required')
                .not()
                .isEmpty(),
            check('skills', 'Skills is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        /**
         * @desc Build profile object
         */
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company)
            profileFields.company = company;
        if (website)
            profileFields.website = website;
        if (location)
            profileFields.location = location;
        if (bio)
            profileFields.bio = bio;
        if (status)
            profileFields.status = status;
        if (githubusername)
            profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        /**
         * @desc social link object
         */
        profileFields.social = {}
        if (youtube)
            profileFields.social.youtube = youtube;
        if (twitter)
            profileFields.social.youtube = twitter;
        if (facebook)
            profileFields.social.youtube = facebook;
        if (linkedin)
            profileFields.social.youtube = linkedin;
        if (instagram)
            profileFields.social.youtube = instagram;
        

        /**
         * @desc update profile
         */
        try {
            let profile = await Profile.findOne({ user: req.user.id });

            /**
            * @desc if profile found then update it otherwise create a new profile
            */
            if (profile) {
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, {
                    new: true
                })

                return res.json(profile);
            }

            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
        console.log(profileFields.skills);
        res.send("Hello");
    }
);

/**
 * @route   POST api/profile
 * @desc    Create or update a user profile
 * @access  Public
*/ 
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

/**
 * @route   POST api/profile/user/:user_id
 * @desc    Get a user profile by id
 * @access  Public
*/ 
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        
        if (!profile) {
            res.status(400).json({ msg: 'Profile not found' });
        }  
        res.send(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
})


module.exports = router;