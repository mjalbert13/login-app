const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require("../model/User");
const passport = require('passport');

router.get('/register', (req,res) => res.render('register'));

router.get('/login', (req,res) => res.render('login'));

//Register Handle
router.post('/register', (req,res) =>{
   const {name, email, password, password2} = req.body;
   let errors =[];

   if(!name || !email || !password || !password2){
       errors.push({msg: 'You need to fill in all fields'});
   }

   if(!password !== !password2){
       errors.push({msg:'Your passwords did not match'});
   }

   if(password.length < 6){
       errors.push({msg:'Password must be greater than 6 chars'});
   }

   if(errors.length > 0){
       res.render('register',{
           errors,
           name,
           email,
           password,
           password2
       });
   }else{
       User.findOne({email: email})
       .then(function(user){
           if(user) {
            errors.push({msg:'Email already exists'})
            res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            });
           } else{
               const newUser = new User({
                   name: name,
                   email: email,
                   password: password
               });
               bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt,(err, hash)=>{
                    if(err) throw err;

                    newUser.password = hash;

                    newUser.save()
                    .then(user =>{
                        req.flash('success_msg', 'You are now registerd')
                        res.redirect('/users/login');
                    })
                    .catch( err => console.log(err));
                }));
           }
       });
   }
});

// Login route
router.post('/login',(req, res, next) =>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//logout
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
});

module.exports =router;