const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const ExcelJS = require('exceljs');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Statik fayllarni serve qilish
app.use(express.static(__dirname));

// Messages faylini yaratish
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Messages faylini yaratish (agar mavjud bo'lmasa)
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

// Bookings faylini yaratish
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');
if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

// Asosiy sahifalar
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

// API endpoints
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        server: 'Oltinsoy Xususiy Sanatoriyasi Admin Panel',
        version: '1.0.0'
    });
});

// Xabarlarni olish
app.get('/api/messages', (req, res) => {
    try {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        res.json(messages);
    } catch (error) {
        console.error('Xabarlarni olishda xatolik:', error);
        res.status(500).json({ error: 'Xabarlarni olishda xatolik yuz berdi' });
    }
});

// Yangi xabar qo'shish
app.post('/api/messages', (req, res) => {
    try {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        const newMessage = {
            id: Date.now().toString(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        messages.push(newMessage);
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
        res.json(newMessage);
    } catch (error) {
        console.error('Xabar qo\'shishda xatolik:', error);
        res.status(500).json({ error: 'Xabar qo\'shishda xatolik yuz berdi' });
    }
});

// Xabarni o'chirish
app.delete('/api/messages/:id', (req, res) => {
    try {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        const filteredMessages = messages.filter(msg => msg.id !== req.params.id);
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filteredMessages, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Xabarni o\'chirishda xatolik:', error);
        res.status(500).json({ error: 'Xabarni o\'chirishda xatolik yuz berdi' });
    }
});

// Xabarni yangilash
app.put('/api/messages/:id', (req, res) => {
    try {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        const messageIndex = messages.findIndex(msg => msg.id === req.params.id);
        
        if (messageIndex === -1) {
            return res.status(404).json({ error: 'Xabar topilmadi' });
        }
        
        messages[messageIndex] = { ...messages[messageIndex], ...req.body };
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
        res.json(messages[messageIndex]);
    } catch (error) {
        console.error('Xabarni yangilashda xatolik:', error);
        res.status(500).json({ error: 'Xabarni yangilashda xatolik yuz berdi' });
    }
});

// Barcha band qilishlarni olish
app.get('/api/bookings', (req, res) => {
    try {
        const bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'));
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Band qilishlarni olishda xatolik yuz berdi' });
    }
});

// Yangi band qilish qo‘shish
app.post('/api/bookings', (req, res) => {
    try {
        const bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'));
        const newBooking = {
            id: Date.now().toString(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        bookings.push(newBooking);
        fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
        res.json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Band qilishni saqlashda xatolik yuz berdi' });
    }
});

// Export questions to styled Excel
app.get('/api/export-questions-excel', async (req, res) => {
    try {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        const questions = messages.filter(msg => msg.type === 'question');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Savollar');
        // Header
        worksheet.columns = [
            { header: '#', key: 'idx', width: 5 },
            { header: 'Ism', key: 'senderName', width: 18 },
            { header: 'Email', key: 'email', width: 22 },
            { header: 'Telefon', key: 'phone', width: 14 },
            { header: 'Savol', key: 'message', width: 40 },
            { header: 'Sana', key: 'createdAt', width: 20 }
        ];
        // Add rows
        questions.forEach((q, i) => {
            worksheet.addRow({
                idx: i+1,
                senderName: q.senderName || '',
                email: q.email || '',
                phone: q.phone || '',
                message: q.message || '',
                createdAt: q.createdAt ? new Date(q.createdAt).toLocaleString() : ''
            });
        });
        // Style header
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF222222' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF000000' } },
                left: { style: 'thin', color: { argb: 'FF000000' } },
                bottom: { style: 'thin', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } }
            };
        });
        // Style all data cells
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            row.eachCell(cell => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'thin', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } }
                };
            });
        });
        // Autofilter
        worksheet.autoFilter = {
            from: 'A1',
            to: 'F1'
        };
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="savollar.xlsx"');
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error('Excel export error:', err);
        res.status(500).json({ error: 'Excel fayl yaratishda xatolik' });
    }
});

const ACCOUNTING_FILE = path.join(__dirname, 'accountingData.json');
// Export accounting to styled Excel
app.get('/api/export-accounting-excel', async (req, res) => {
    try {
        if (!fs.existsSync(ACCOUNTING_FILE)) {
            return res.status(404).json({ error: 'Hisob-kitob maʼlumotlari topilmadi' });
        }
        const data = JSON.parse(fs.readFileSync(ACCOUNTING_FILE, 'utf8'));
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Hisob-kitob');
        worksheet.columns = [
            { header: 'Sana', key: 'date', width: 15 },
            { header: 'Summa', key: 'amount', width: 14 },
            { header: 'Turi', key: 'type', width: 12 },
            { header: 'Manba/Kategoriya', key: 'source', width: 20 },
            { header: 'Izoh', key: 'note', width: 30 }
        ];
        let totalIncome = 0, totalExpense = 0;
        data.forEach(item => {
            worksheet.addRow({
                date: item.date || '',
                amount: item.amount || '',
                type: item.type === 'income' ? 'Daromad' : 'Xarajat',
                source: item.source || '',
                note: item.note || ''
            });
            if (item.type === 'income') totalIncome += parseFloat(item.amount) || 0;
            if (item.type === 'expense') totalExpense += parseFloat(item.amount) || 0;
        });
        // Add summary rows
        worksheet.addRow([]);
        worksheet.addRow({ date: 'Jami', amount: totalIncome, type: 'Daromad' });
        worksheet.addRow({ date: 'Jami', amount: totalExpense, type: 'Xarajat' });
        worksheet.addRow({ date: 'Sof daromad', amount: totalIncome - totalExpense });
        // Style header
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF222222' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF000000' } },
                left: { style: 'thin', color: { argb: 'FF000000' } },
                bottom: { style: 'thin', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } }
            };
        });
        // Style all data cells
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            row.eachCell(cell => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'thin', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } }
                };
                // Summary rows
                if (row.getCell(1).value === 'Jami' || row.getCell(1).value === 'Sof daromad') {
                    cell.font = { bold: true };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E2E2' } };
                }
            });
        });
        // Autofilter
        worksheet.autoFilter = {
            from: 'A1',
            to: 'E1'
        };
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="hisob_kitob.xlsx"');
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error('Excel export error:', err);
        res.status(500).json({ error: 'Excel fayl yaratishda xatolik' });
    }
});

// Export bookings to styled Excel
app.get('/api/export-bookings-excel', async (req, res) => {
    try {
        if (!fs.existsSync(BOOKINGS_FILE)) {
            return res.status(404).json({ error: 'Booking maʼlumotlari topilmadi' });
        }
        const data = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'));
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Booking');
        worksheet.columns = [
            { header: 'Xona raqami', key: 'roomNumber', width: 12 },
            { header: 'Kirish sanasi', key: 'checkInDate', width: 15 },
            { header: 'Chiqish sanasi', key: 'checkOutDate', width: 15 },
            { header: 'Sigʻimi', key: 'roomCapacity', width: 10 },
            { header: 'Xona turi', key: 'roomType', width: 14 },
            { header: 'Mijoz ismi', key: 'clientName', width: 18 },
            { header: 'Telefon', key: 'phone', width: 14 },
            { header: 'Manzil', key: 'address', width: 18 },
            { header: 'Passport', key: 'passport', width: 14 },
            { header: 'Hamrohlar', key: 'companions', width: 16 },
            { header: 'Summa', key: 'amount', width: 12 },
            { header: 'Toʻlov usuli', key: 'paymentMethod', width: 14 },
            { header: 'Holat', key: 'status', width: 12 }
        ];
        data.forEach(item => {
            worksheet.addRow({
                roomNumber: item.roomNumber || '',
                checkInDate: item.checkInDate || '',
                checkOutDate: item.checkOutDate || '',
                roomCapacity: item.roomCapacity || '',
                roomType: item.roomType || '',
                clientName: item.clientName || '',
                phone: item.phone || '',
                address: item.address || '',
                passport: item.passport || '',
                companions: item.companions || '',
                amount: item.amount || '',
                paymentMethod: item.paymentMethod || '',
                status: item.status || ''
            });
        });
        // Style header
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF222222' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF000000' } },
                left: { style: 'thin', color: { argb: 'FF000000' } },
                bottom: { style: 'thin', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } }
            };
        });
        // Style all data cells
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            row.eachCell(cell => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'thin', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } }
                };
            });
        });
        // Autofilter
        worksheet.autoFilter = {
            from: 'A1',
            to: 'M1'
        };
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="booking.xlsx"');
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error('Excel export error:', err);
        res.status(500).json({ error: 'Excel fayl yaratishda xatolik' });
    }
});

// Server ishga tushirish - BARCHA IP MANZILLARDAN
const HOST = NODE_ENV === 'production' ? '0.0.0.0' : '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`🚀 Server ishga tushdi!`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🌐 Network: http://192.168.228.166:${PORT}`);
    console.log(`📱 Admin Panel: http://192.168.228.166:${PORT}/admin`);
    console.log(`🔐 Admin Login: http://192.168.228.166:${PORT}/admin-login`);
    console.log(`⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`);
    console.log(`💡 Parol: admin1234`);
    console.log(`🌍 Barcha tarmoq qurilmalaridan kirish mumkin!`);
    console.log(`🌐 Environment: ${NODE_ENV}`);
    console.log(`📨 Messages API: http://192.168.228.166:${PORT}/api/messages`);
});

// Xatoliklarni qayd qilish
process.on('uncaughtException', (err) => {
    console.error('❌ Xatolik:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Promise xatoligi:', err);
});