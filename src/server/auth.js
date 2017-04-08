import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from './user/user.model';
import login from './user/login';
import signup from './user/signup';

function checkCredentials(username, password, done) {
  return login({ password, name: username })
    .then(user => {
      const userObj = user.toObject();
      delete userObj.hash;

      return done(null, userObj);
    })
    .catch(err => {
      const mismatch = err.message &&
        err.message.match(/not (?:found|match)/i);
      if (mismatch) {
        return done(null, false);
      }

      return done(err);
    });
}

function deserializeUser(id, done) {
  return User
    .findById(id)
    .select({ hash: 0 })
    .exec()
    .then(user => {
      if (user) {
        return done(null, user);
      }

      throw new Error(`Cannot deserialize user: ${id}`);
    })
    .catch(err => done(err));
}

passport.use(new LocalStrategy(checkCredentials));
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(deserializeUser);

// "next" is needed for express to identify the function as
// an error handler
/* eslint-disable-next-line no-unused-vars */
function authErrorHandler(err, req, res, next) {
  if (err) {
    res.status(400).end();
  }
}

function signupMiddleware(req, res, next) {
  return signup({ name: req.body.username, password: req.body.password })
    .then(() => next())
    .catch(err => next(err));
}

function logoutHandler(req, res) {
  req.logout();
  return res.status(200).end();
}

function loginHandler(req, res) {
  res.json({ user: req.user });
}

function meHandler(req, res) {
  const user = req.user.toObject();
  delete user.hash;
  delete user.__v;
  res.json({ user });
}

function checkNameHandler(req, res, next) {
  return User
    .findOne({ name: req.params.name })
    .exec()
    .then(user => {
      if(!user) {
        return res.status(200).end();
      }

      return res.status(400).end();
    })
    .catch(next);
}

function ensureLogin(req, res, next) {
  if (req.user) {
    return next();
  }

  const msg = 'Login is required.';

  return res.status(401).send(msg).end();
}

function ensureNoLogin(req, res, next) {
  if (!req.user) {
    return next();
  }

  const msg = 'Not for logged-in users.';

  return res.status(400).send(msg).end();
}

const authRouter = new express.Router();
authRouter.post('/login',
  ensureNoLogin,
  passport.authenticate('local'),
  loginHandler
);

authRouter.post('/signup',
  ensureNoLogin,
  signupMiddleware,
  passport.authenticate('local'),
  loginHandler
);

authRouter.get('/me', ensureLogin, meHandler);
authRouter.get('/logout', ensureLogin, logoutHandler);
authRouter.get('/checkname/:name', checkNameHandler);
authRouter.use(authErrorHandler);

export { authRouter, ensureLogin, ensureNoLogin };

