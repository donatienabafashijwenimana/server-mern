import  express from 'express';
import { createPost} from '../controller/postController.js';
import { protectroute } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/',protectroute, createPost);

export default router;