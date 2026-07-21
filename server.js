const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ============================================================
// ۱. خواندن فایل‌های JSON (دروس همه رشته‌ها)
// ============================================================
const coursesData = {};
const dataDir = path.join(__dirname, 'data');

try {
  const files = fs.readdirSync(dataDir);
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
      const data = JSON.parse(content);
      coursesData[data.field] = data;
      console.log(✅ Loaded: ${data.field});
    }
  });
  console.log(✅ Total ${Object.keys(coursesData).length} fields loaded);
} catch (err) {
  console.log('⚠️ No data folder found or error reading files');
}

// ============================================================
// ۲. APIهای قبلی (Health, Register, Login, Courses, Grades)
// ============================================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// داده‌های نمونه برای دروس و نمرات (برای تست)
const courses = [
  { id: 1, name: "مبانی کامپیوتر و برنامه‌سازی", credits: 3, type: "اصلی" },
  { id: 2, name: "ریاضی عمومی ۱", credits: 3, type: "پایه" },
  { id: 3, name: "فیزیک ۱", credits: 3, type: "پایه" },
];

const grades = [
  { id: 1, courseName: "مبانی کامپیوتر", credits: 3, score: 18.5, semester: 1 },
  { id: 2, courseName: "ریاضی عمومی ۱", credits: 3, score: 17.0, semester: 1 },
];

// دریافت دروس (قدیمی - برای تست)
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// دریافت نمرات (قدیمی - برای تست)
app.get('/api/grades', (req, res) => {
  res.json(grades);
});

// ثبت‌نام کاربر
app.post('/api/register', (req, res) => {
  const { firstName, lastName, studentId, email, password } = req.body;
  
  if (!firstName  !lastName  !studentId  !email  !password) {
    return res.status(400).json({ error: 'همه فیلدها الزامی هستند' });
  }
  
  res.status(201).json({
    message: 'ثبت‌نام موفقیت‌آمیز بود',
    user: { id: Date.now(), firstName, lastName, studentId, email }
  });
});

// ورود کاربر
app.post('/api/login', (req, res) => {
  const { studentId, password } = req.body;
  
  if (!studentId || !password) {
    return res.status(400).json({ error: 'شماره دانشجویی و رمز عبور الزامی است' });
  }
  
  if (studentId === '402151084' && password === '123456') {
    res.json({
      message: 'ورود موفقیت‌آمیز بود',
      user: { id: 1, firstName: 'محمد مانی', lastName: 'نصراله زاده جوان', studentId: '402151084' }
    });
  } else {
    res.status(401).json({ error: 'شماره دانشجویی یا رمز عبور اشتباه است' });
  }
});

// ============================================================
// ۳. APIهای جدید (دریافت دروس رشته‌ها)
// ============================================================

// دریافت لیست رشته‌ها
app.get('/api/fields', (req, res) => {
  const fields = Object.keys(coursesData);
  if (fields.length === 0) {
    return res.status(500).json({ error: 'داده‌ای یافت نشد' });
  }
  res.json(fields);
});

// دریافت دروس یک رشته خاص
app.get('/api/courses/:fieldName', (req, res) => {
  const fieldName = decodeURIComponent(req.params.fieldName);
  const data = coursesData[fieldName];
  
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'رشته مورد نظر یافت نشد' });
  }
});

// دریافت همه دروس (همه رشته‌ها)
app.get('/api/all-courses', (req, res) => {
  res.json(coursesData);
});

// ============================================================
// ۴. شروع سرور
// ============================================================
app.listen(port, () => {
  console.log(✅ Server running on port ${port});
  console.log(✅ ${Object.keys(coursesData).length} fields available);
});