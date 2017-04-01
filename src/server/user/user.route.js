import express from 'express';

import updateInfo from './update-info';
import changePassword from './change-password';

function userHandler(req, res, next) {
  const hasPassword = req.body.oldPassword && req.body.newPassword;
  let action;

  if (hasPassword) {
    action = changePassword({
      name: req.user.name,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    });
  } else {
    action = updateInfo({
      name: req.user.name,
      email: req.body.email,
      location: req.body.location,
      displayName: req.body.displayName,
    });
  }

  return action.then(user => {
    const userObj = user.toObject();
    delete userObj.hash;
    delete userObj.__v;

    return res.json({ user: userObj });
  }).catch(next);
}

const userRouter = new express.Router();
userRouter.put('/user', userHandler);

export default userRouter;

