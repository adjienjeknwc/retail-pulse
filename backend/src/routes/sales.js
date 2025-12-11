const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const multer = require('multer');

// Setup for file upload (needed for CSV import later)
const upload = multer({ dest: 'tmp/' }); 

router.get('/', salesController.getSales);
router.post('/', salesController.createSale);

// We will add the import logic later if needed, 
// for now this prevents the crash if you add the import route code.
router.post('/import', upload.single('file'), (req, res) => {
    res.json({ message: "Import feature coming soon" });
});

module.exports = router;