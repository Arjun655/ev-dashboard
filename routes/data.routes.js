import { Router } from 'express';
const router = Router();
import { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord } from 'D:\\File\\Programming\\Web development\\electrifyit-reports-dashboard\\Backend\\controller\\data.controllers.js';


router.post('/', createRecord);


router.get('/', getAllRecords);


router.get('/:id', getRecordById);

router.put('/:id', updateRecord);

router.delete('/:id', deleteRecord);

export default router;

