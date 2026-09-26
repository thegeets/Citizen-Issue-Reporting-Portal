import express from 'express';
import {
  createIssue,
  getAllIssues,
  getMyIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from '../controllers/issueController.js';
import { protect } from '../middleware/auth.js';
import { uploadIssuePhoto } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .post(protect, uploadIssuePhoto, createIssue)
  .get(getAllIssues);

router.route('/my')
  .get(protect, getMyIssues);

router.route('/:id')
  .get(getIssueById)
  .put(protect, uploadIssuePhoto, updateIssue)
  .delete(protect, deleteIssue);

export default router;
