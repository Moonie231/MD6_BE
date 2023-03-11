import { Router } from 'express';
import {foodRouter} from "./foodRouter";

export const router = Router()
router.use('/foods',foodRouter);