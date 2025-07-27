const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer sozlamasi (fayllarni uploads/ papkaga saqlaydi)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// MySQL ulanishi
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // o'zgartiring!
  password: '',         // o'zgartiring!
  database: 'oltinsoy'
});

// Xodim qo‘shish endpointi
app.post('/api/employees', upload.fields([
  { name: 'photo' }, { name: 'passportScan' }, { name: 'diploma' },
  { name: 'workBook' }, { name: 'contract' }, { name: 'insurance' }
]), async (req, res) => {
  try {
    const body = req.body;
    const files = req.files;
    const getFile = (name) => files && files[name] ? '/uploads/' + files[name][0].filename : null;

    const [result] = await pool.query(
      `INSERT INTO employees
      (employeeId, firstName, lastName, birthDate, gender, passport, phone, address, position, department, hireDate, employmentType, salary, status, photo, passportScan, diploma, workBook, contract, insurance)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.employeeId, body.firstName, body.lastName, body.birthDate, body.gender, body.passport, body.phone, body.address,
        body.position, body.department, body.hireDate, body.employmentType, body.salary, body.status,
        getFile('photo'), getFile('passportScan'), getFile('diploma'), getFile('workBook'), getFile('contract'), getFile('insurance')
      ]
    );
    res.json({ success: true, message: "Xodim qo‘shildi", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Xatolik: " + err.message });
  }
});

// Xodimlar ro‘yxati (GET)
app.get('/api/employees', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employees ORDER BY id DESC');
  res.json(rows);
});

// Serverni ishga tushirish
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Oltinsoy backend http://localhost:${PORT} da ishlayapti`);
}); 