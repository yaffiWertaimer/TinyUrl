import express from 'express';
import RedirectController from '../Controllers/RedirectController.js';
const RedirectRouter = express.Router();

// מסלול להפניה
RedirectRouter.get('/:id', RedirectController.redirectLink);

// מסלול לקבלת מידע על קליקים לפי מזהה קישור
// RedirectRouter.get('/:id/clicks', getClicksByLinkId);

export default RedirectRouter;
