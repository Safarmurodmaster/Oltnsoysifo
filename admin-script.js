/* === Elementlar === */
const adminLoginSection = document.getElementById('admin-login-section');
const adminContainer = document.querySelector('.admin-container');
const adminLoginForm = document.getElementById('admin-login-form');
const adminLoginPassword = document.getElementById('admin-login-password');
const adminLoginMessage = document.getElementById('admin-login-message');
const showPasswordChangeBtn = document.getElementById('show-password-change-btn');
const adminPasswordChangeSection = document.getElementById('admin-password-change-section');
const adminPasswordChangeForm = document.getElementById('admin-password-change-form');
const adminPasswordChangeMessage = document.getElementById('admin-password-change-message');
const accountingTableBody = document.querySelector('#accounting-table tbody');
const accountingBalanceDiv = document.getElementById('accounting-balance');
const addAccountingForm = document.getElementById('add-accounting-form');
const filterDate = document.getElementById('filter-date');
const filterType = document.getElementById('filter-type');
const clearFilterBtn = document.getElementById('clear-filter');
const exportExcelBtn = document.getElementById('export-excel');
const exportPdfBtn = document.getElementById('export-pdf');
const dailySummaryDiv = document.getElementById('daily-summary');
const dailyNetDiv = document.getElementById('daily-net');
const weeklySummaryDiv = document.getElementById('weekly-summary');
const weeklyNetDiv = document.getElementById('weekly-net');
const monthlyTablesDiv = document.getElementById('monthly-tables');
const monthlySummaryDiv = document.getElementById('monthly-summary');
const monthlyNetDiv = document.getElementById('monthly-net');
const yearlySummaryDiv = document.getElementById('yearly-summary');
const yearlyNetDiv = document.getElementById('yearly-net');
const monthFilter = document.getElementById('month-filter');
const applyMonthFilterBtn = document.getElementById('apply-month-filter');
const clearMonthFilterBtn = document.getElementById('clear-month-filter');
const exportMonthlyExcelBtn = document.getElementById('export-monthly-excel');
const exportMonthlyPdfBtn = document.getElementById('export-monthly-pdf');
const bookingTableBody = document.querySelector('#booking-table tbody');
const addBookingForm = document.getElementById('add-booking-form');
const bookingFilterDate = document.getElementById('booking-filter-date');
const bookingFilterStatus = document.getElementById('booking-filter-status');
const bookingClearFilterBtn = document.getElementById('booking-clear-filter');
const bookingExportExcelBtn = document.getElementById('booking-export-excel');
const bookingExportPdfBtn = document.getElementById('booking-export-pdf');
const exportExcelDailyBtn = document.getElementById('export-excel-daily');
const exportPdfDailyBtn = document.getElementById('export-pdf-daily');
const customDateFilter = document.getElementById('custom-date-filter');
const customWeekFilter = document.getElementById('custom-week-filter');
const customMonthFilter = document.getElementById('custom-month-filter');
const roomStatusDiv = document.getElementById('room-status');
const roomStatusTableBody = document.querySelector('#room-status-table tbody');
const categoryTableBody = document.querySelector('#category-table tbody');
const addCategoryForm = document.getElementById('add-category-form');
const companionSelect = document.getElementById('companion-select');
const addCompanionForm = document.getElementById('add-companion-form');
const addRoomForm = document.getElementById('add-room-form');
const roomTableBody = document.querySelector('#room-table tbody');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const resetPasswordModal = document.getElementById('reset-password-modal');
const resetPasswordForm = document.getElementById('reset-password-form');
const verifyCodeForm = document.getElementById('verify-code-form');
const resetPasswordMessage = document.getElementById('reset-password-message');
const verifyCodeMessage = document.getElementById('verify-code-message');
const contactForm = document.getElementById('contact-form');
const contactStatusMessage = document.getElementById('contact-status-message');
const logoutBtn = document.getElementById('admin-logout-btn');
const messageTable = document.getElementById('message-table');
const messageFilterStatus = document.getElementById('message-filter-status');
const messageClearFilterBtn = document.getElementById('message-clear-filter');

let adminPassword = localStorage.getItem('adminPassword') || 'admin1234';
let editingAccountingIdx = null;
let editingBookingIdx = null;
let editingCategoryIdx = null;
let messageData = [];

// Modal elements
const bookingEditModal = document.getElementById('booking-edit-modal');
const closeBookingEditModal = document.getElementById('close-booking-edit-modal');
const bookingEditForm = document.getElementById('booking-edit-form');
const cancelBookingEditBtn = document.getElementById('cancel-booking-edit');

// Modal elements for accounting
const accountingEditModal = document.getElementById('accounting-edit-modal');
const closeAccountingEditModal = document.getElementById('close-accounting-edit-modal');
const accountingEditForm = document.getElementById('accounting-edit-form');
const cancelAccountingEditBtn = document.getElementById('cancel-accounting-edit');

function getMaxDate() {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    return today.toISOString().slice(0, 10);
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function getCurrentDateTimeUz() {
    const now = new Date();
    const weekdays = ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba'];
    const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
    const year = now.getFullYear();
    const month = months[now.getMonth()];
    const day = now.getDate();
    const weekday = weekdays[now.getDay()];
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return year + '-yil ' + day + '-' + month + ', ' + weekday + ' ' + hour + ':' + minute;
}

function getYear(dateStr) { return dateStr.split('-')[0]; }
function getMonth(dateStr) { return dateStr.slice(0, 7); }
function getWeek(dateStr) {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay() || 7;
    d.setDate(d.getDate() + 4 - day);
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return d.getFullYear() + '-hafta' + weekNo;
}

/* === Ma'lumotlar bilan ishlash === */
function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
        console.error(key + ' dan ma\'lumot olishda xato:', e);
        return [];
    }
}

function setData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(key + ' ga yozishda xato:', e);
    }
}

/* === Admin kirish va parol ozgartirish === */
if (!localStorage.getItem('isLoggedIn')) {
    if (adminLoginSection) adminLoginSection.style.display = 'flex';
    if (adminContainer) adminContainer.style.display = 'none';
} else {
    if (adminLoginSection) adminLoginSection.style.display = 'none';
    if (adminContainer) adminContainer.style.display = 'flex';
}

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (adminLoginPassword.value === adminPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            if (adminLoginSection) adminLoginSection.style.display = 'none';
            if (adminContainer) adminContainer.style.display = 'flex';
            if (adminLoginMessage) adminLoginMessage.textContent = '';
        } else {
            if (adminLoginMessage) adminLoginMessage.textContent = 'Parol notogri!';
        }
    });
}

// Parolni o'zgartirish tugmasi olib tashlandi - endi Sozlamalar bo'limida

if (adminPasswordChangeForm) {
    adminPasswordChangeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (oldPassword !== adminPassword) {
            if (adminPasswordChangeMessage) adminPasswordChangeMessage.textContent = 'Joriy parol notogri!';
            return;
        }
        if (newPassword !== confirmPassword) {
            if (adminPasswordChangeMessage) adminPasswordChangeMessage.textContent = 'Yangi parollar mos kelmadi!';
            return;
        }
        if (newPassword.length < 6) {
            if (adminPasswordChangeMessage) adminPasswordChangeMessage.textContent = 'Yangi parol kamida 6 belgidan iborat bolishi kerak!';
            return;
        }
        adminPassword = newPassword;
        localStorage.setItem('adminPassword', newPassword);
        if (adminPasswordChangeMessage) adminPasswordChangeMessage.textContent = 'Parol muvaffaqiyatli ozgartirildi!';
        adminPasswordChangeForm.reset();
        setTimeout(function() {
            if (adminPasswordChangeMessage) adminPasswordChangeMessage.textContent = '';
        }, 2000);
    });
}

/* === Sidebar navigatsiyasi === */
document.querySelectorAll('.sidebar nav ul li a').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar nav ul li a').forEach(function(l) { l.classList.remove('active'); });
        link.classList.add('active');
        const section = link.getAttribute('data-section');
        document.querySelectorAll('.admin-section').forEach(function(sec) { sec.classList.remove('active'); });
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
            // Bo'lim o'zgarishida ma'lumotlarni qayta yuklash
            loadSectionData(section);
        } else {
            console.warn('Section with ID ' + section + ' not found!');
        }
    });
});

// Bo'lim ma'lumotlarini yuklash
function loadSectionData(section) {
    if (section === 'dashboard') loadDashboardData();
    else if (section === 'accounting') loadAccountingData();
    else if (section === 'bookings') loadBookingData();
    else if (section === 'room-bookings') loadRoomBookings();
    else if (section === 'messages') loadMessageData();
    else if (section === 'settings') loadSettingsData();
    else if (section === 'questions') loadQuestionsData();
}

// Dashboard ma'lumotlarini yuklash
function loadDashboardData() {
    // Dashboard statistikalarini yangilash
    updateDashboardStats();
}

// Booking ma'lumotlarini yuklash
function loadBookingData() {
    // Booking ma'lumotlarini yuklash
    const bookingData = getData('bookingData');
    renderBookingTable(bookingData);
}

// Settings ma'lumotlarini yuklash
function loadSettingsData() {
    // Sozlamalar ma'lumotlarini yuklash
    loadRoomPricing();
}

// Dashboard statistikalarini yangilash
async function updateDashboardStats() {
    const accountingData = getData('accountingData');
    const bookingData = getData('bookingData');
    const roomBookings = getData('bookingMessages');
    // Kunlik tushumlar
    const today = getTodayDate();
    const todayIncome = accountingData.filter(item => item.type === 'income' && item.date === today)
        .reduce((sum, item) => sum + item.amount, 0);
    const todayExpense = accountingData.filter(item => item.type === 'expense' && item.date === today)
        .reduce((sum, item) => sum + item.amount, 0);
    const todayNet = todayIncome - todayExpense;
    // Buxgalteriya statistikasi
    const totalIncome = accountingData.filter(item => item.type === 'income')
        .reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = accountingData.filter(item => item.type === 'expense')
        .reduce((sum, item) => sum + item.amount, 0);
    const netIncome = totalIncome - totalExpense;
    // Booking statistikasi
    const totalBookings = bookingData.length;
    const activeBookings = bookingData.filter(item => item.status === 'confirmed').length;
    // Xona band qilish statistikasi
    const totalRoomRequests = roomBookings.length;
    const pendingRoomRequests = roomBookings.filter(item => !item.status || item.status === 'pending').length;
    // Savollar statistikasi (API orqali)
    let totalQuestions = 0;
    try {
        const res = await fetch('/api/messages');
        if (res.ok) {
            const messages = await res.json();
            totalQuestions = messages.filter(msg => msg.type === 'question').length;
        }
    } catch (e) {}
    // Dashboard elementlarini yangilash (ID bo'yicha to'g'ridan-to'g'ri)
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setVal('dashboard-today-income', todayIncome.toLocaleString() + ' so\'m');
    setVal('dashboard-today-expense', todayExpense.toLocaleString() + ' so\'m');
    setVal('dashboard-today-net', todayNet.toLocaleString() + ' so\'m');
    setVal('dashboard-active-bookings', activeBookings);
    setVal('dashboard-total-income', totalIncome.toLocaleString() + ' so\'m');
    setVal('dashboard-total-expense', totalExpense.toLocaleString() + ' so\'m');
    setVal('dashboard-net-income', netIncome.toLocaleString() + ' so\'m');
    setVal('dashboard-total-bookings', totalBookings);
    setVal('dashboard-total-questions', totalQuestions);
}

// Booking jadvalini ko'rsatish
function renderBookingTable(data) {
    const tableBody = document.querySelector('#booking-table tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    data.forEach(function(item, index) {
        let statusUz = 'Kutilmoqda';
        if (item.status === 'confirmed') statusUz = 'Tasdiqlangan';
        else if (item.status === 'cancelled') statusUz = 'Bekor qilingan';
        const row = document.createElement('tr');
        row.innerHTML =
            '<td>' + (index + 1) + '</td>' +
            '<td>' + new Date(item.checkInDate).toLocaleDateString('uz-UZ') + '</td>' +
            '<td>' + new Date(item.checkOutDate).toLocaleDateString('uz-UZ') + '</td>' +
            '<td>' + (item.roomNumber || '') + '</td>' +
            '<td>' + (item.roomCapacity || '') + '</td>' +
            '<td>' + (item.roomType || '') + '</td>' +
            '<td>' + (item.clientName || '') + '</td>' +
            '<td>' + (item.phone || '') + '</td>' +
            '<td>' + (item.address || '') + '</td>' +
            '<td>' + (item.passport || '') + '</td>' +
            '<td>' + (item.companions || '') + '</td>' +
            '<td>' + (item.amount ? item.amount.toLocaleString() + ' so\'m' : '') + '</td>' +
            '<td>' + (item.paymentMethod || '') + '</td>' +
            '<td>' + statusUz + '</td>' +
            '<td>' +
                '<div class="action-buttons">' +
                    '<button class="action-btn edit-btn" onclick="openBookingEditModal(' + index + ')">Tahrirlash</button>' +
                    '<button class="action-btn delete-btn" onclick="deleteBooking(' + index + ')">O\'chirish</button>' +
                '</div>' +
            '</td>';
        tableBody.appendChild(row);
    });
}

/* === Booking bo'limi === */
let bookingData = [];

// Booking ma'lumotini qo'shish
function addBooking() {
    const form = document.getElementById('add-booking-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const roomNumber = formData.get('roomNumber');
    const checkInDate = formData.get('checkInDate');
    const checkOutDate = formData.get('checkOutDate');
    const roomCapacity = formData.get('roomCapacity');
    const roomType = formData.get('roomType');
    const clientName = formData.get('clientName');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const passport = formData.get('passport');
    const companions = formData.get('companions');
    const amount = parseInt(formData.get('amount'));
    const paymentMethod = formData.get('paymentMethod');
    const status = formData.get('status');
    
    if (!roomNumber || !checkInDate || !checkOutDate || !clientName) {
        alert('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
        return;
    }
    
    const newBooking = {
        id: Date.now(),
        roomNumber: roomNumber,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        roomCapacity: roomCapacity,
        roomType: roomType,
        clientName: clientName,
        phone: phone,
        address: address,
        passport: passport,
        companions: companions,
        amount: amount,
        paymentMethod: paymentMethod,
        status: status,
        createdAt: new Date().toISOString()
    };
    
    bookingData.push(newBooking);
    setData('bookingData', bookingData);
    
    form.reset();
    renderBookingTable(bookingData);
    
    alert('Band qilish muvaffaqiyatli qo\'shildi!');
}

// Booking ma'lumotini tahrirlash
function editBooking(index) {
    const item = bookingData[index];
    if (!item) return;
    
    const newStatus = prompt('Yangi holat (pending/confirmed/cancelled):', item.status);
    if (newStatus === null) return;
    
    bookingData[index] = {
        ...item,
        status: newStatus || item.status
    };
    
    setData('bookingData', bookingData);
    renderBookingTable(bookingData);
    
    alert('Band qilish muvaffaqiyatli tahrirlandi!');
}

// Booking ma'lumotini o'chirish
function deleteBooking(index) {
    if (confirm('Bu band qilishni o\'chirishni xohlaysizmi?')) {
        bookingData.splice(index, 1);
        setData('bookingData', bookingData);
        renderBookingTable(bookingData);
        
        alert('Band qilish muvaffaqiyatli o\'chirildi!');
    }
}

// Booking filtrlash
function filterBookings() {
    const dateFilter = bookingFilterDate ? bookingFilterDate.value : '';
    const statusFilter = bookingFilterStatus ? bookingFilterStatus.value : '';
    
    let filteredData = bookingData;
    
    if (dateFilter) {
        filteredData = filteredData.filter(function(item) { 
            return item.checkInDate === dateFilter || item.checkOutDate === dateFilter; 
        });
    }
    
    if (statusFilter) {
        filteredData = filteredData.filter(function(item) { return item.status === statusFilter; });
    }
    
    renderBookingTable(filteredData);
}

// Booking filtrini tozalash
function clearBookingFilter() {
    if (bookingFilterDate) bookingFilterDate.value = '';
    if (bookingFilterStatus) bookingFilterStatus.value = '';
    renderBookingTable(bookingData);
}

/* === Xona band qilish bo'limi === */
let roomBookings = [];
let roomPricing = {
    standart: 500000,
    oilaviy: 800000,
    lyuks: 1200000
};

// Xona band qilish ma'lumotlarini yuklash
async function loadRoomBookings() {
    try {
        const response = await fetch('/api/bookings');
        if (response.ok) {
            roomBookings = await response.json();
        } else {
            roomBookings = [];
        }
        renderRoomBookings();
        updateRoomBookingStats();
    } catch (error) {
        roomBookings = [];
        renderRoomBookings();
        updateRoomBookingStats();
    }
}

// Xona band qilish jadvalini ko'rsatish
function renderRoomBookings() {
    const tableBody = document.querySelector('#room-booking-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    roomBookings.forEach(function(booking, index) {
        const row = document.createElement('tr');
        
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const daysDiff = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        
        const regionNames = {
            'toshkent': 'Toshkent viloyati',
            'andijon': 'Andijon viloyati',
            'buxoro': 'Buxoro viloyati',
            'fargona': 'Farg\'ona viloyati',
            'jizzax': 'Jizzax viloyati',
            'namangan': 'Namangan viloyati',
            'navoiy': 'Navoiy viloyati',
            'qashqadaryo': 'Qashqadaryo viloyati',
            'samarqand': 'Samarqand viloyati',
            'sirdaryo': 'Sirdaryo viloyati',
            'surxondaryo': 'Surxondaryo viloyati',
            'xorazm': 'Xorazm viloyati',
            'qoraqalpogiston': 'Qoraqalpog\'iston Respublikasi',
            'toshkent-shahar': 'Toshkent shahri'
        };

        const roomTypeNames = {
            'standart': 'Standart xona',
            'oilaviy': 'Oilaviy xona',
            'lyuks': 'Lyuks xona'
        };

        row.innerHTML = 
            '<td>' + new Date(booking.createdAt).toLocaleDateString('uz-UZ') + '</td>' +
            '<td>' + booking.senderName + '</td>' +
            '<td>' + booking.phone + '</td>' +
            '<td>' + booking.email + '</td>' +
            '<td>' + (regionNames[booking.region] || booking.region) + '</td>' +
            '<td>' + booking.district + '</td>' +
            '<td>' + (roomTypeNames[booking.roomType] || booking.roomType) + '</td>' +
            '<td>' + new Date(booking.checkIn).toLocaleDateString('uz-UZ') + '</td>' +
            '<td>' + new Date(booking.checkOut).toLocaleDateString('uz-UZ') + '</td>' +
            '<td>' + daysDiff + ' kun</td>' +
            '<td>' + booking.totalPrice + ' so\'m</td>' +
            '<td><span class="status-badge status-' + (booking.status || 'pending') + '">' + getStatusText(booking.status || 'pending') + '</span></td>' +
            '<td>' +
                '<div class="action-buttons">' +
                    '<button class="action-btn edit-btn" onclick="editRoomBooking(' + index + ')">Tahrirlash</button>' +
                    (booking.status !== 'confirmed' ? '<button class="action-btn confirm-btn" onclick="confirmRoomBooking(' + index + ')">Tasdiqlash</button>' : '') +
                    (booking.status !== 'cancelled' ? '<button class="action-btn cancel-btn" onclick="cancelRoomBooking(' + index + ')">Bekor qilish</button>' : '') +
                    '<button class="action-btn delete-btn" onclick="deleteRoomBooking(' + index + ')">Ochirish</button>' +
                '</div>' +
            '</td>';
        
        tableBody.appendChild(row);
    });
}

// Holat matnini olish
function getStatusText(status) {
    const statusTexts = {
        'pending': 'Kutilmoqda',
        'confirmed': 'Tasdiqlangan',
        'cancelled': 'Bekor qilingan'
    };
    return statusTexts[status] || 'Kutilmoqda';
}

// Xona band qilishni tasdiqlash
async function confirmRoomBooking(index) {
    if (confirm('Bu band qilishni tasdiqlashni xohlaysizmi?')) {
        roomBookings[index].status = 'confirmed';
        await updateRoomBooking(index);
        renderRoomBookings();
        updateRoomBookingStats();
    }
}

// Xona band qilishni bekor qilish
async function cancelRoomBooking(index) {
    if (confirm('Bu band qilishni bekor qilishni xohlaysizmi?')) {
        roomBookings[index].status = 'cancelled';
        await updateRoomBooking(index);
        renderRoomBookings();
        updateRoomBookingStats();
    }
}

// Xona band qilishni ochirish
async function deleteRoomBooking(index) {
    if (confirm('Bu band qilishni ochirishni xohlaysizmi?')) {
        try {
            if (roomBookings[index].id) {
                await fetch('/api/messages/' + roomBookings[index].id, {
                    method: 'DELETE'
                });
            }
            roomBookings.splice(index, 1);
            setData('bookingMessages', roomBookings);
            renderRoomBookings();
            updateRoomBookingStats();
        } catch (error) {
            console.error('Xona band qilishni ochirishda xato:', error);
            roomBookings.splice(index, 1);
            setData('bookingMessages', roomBookings);
            renderRoomBookings();
            updateRoomBookingStats();
        }
    }
}

// Xona band qilishni yangilash
async function updateRoomBooking(index) {
    try {
        if (roomBookings[index].id) {
            await fetch('/api/messages/' + roomBookings[index].id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomBookings[index])
            });
        }
        setData('bookingMessages', roomBookings);
    } catch (error) {
        console.error('Xona band qilishni yangilashda xato:', error);
        setData('bookingMessages', roomBookings);
    }
}

// Xona band qilish statistikalarini yangilash
function updateRoomBookingStats() {
    const total = roomBookings.length;
    const pending = roomBookings.filter(function(b) { return !b.status || b.status === 'pending'; }).length;
    const confirmed = roomBookings.filter(function(b) { return b.status === 'confirmed'; }).length;
    const cancelled = roomBookings.filter(function(b) { return b.status === 'cancelled'; }).length;

    const totalElement = document.getElementById('total-requests');
    const pendingElement = document.getElementById('pending-requests');
    const confirmedElement = document.getElementById('confirmed-requests');
    const cancelledElement = document.getElementById('cancelled-requests');

    if (totalElement) totalElement.textContent = total;
    if (pendingElement) pendingElement.textContent = pending;
    if (confirmedElement) confirmedElement.textContent = confirmed;
    if (cancelledElement) cancelledElement.textContent = cancelled;
}

// Narxlarni yuklash
function loadRoomPricing() {
    const savedPricing = getData('roomPricing');
    if (savedPricing) {
        roomPricing = Object.assign({}, roomPricing, savedPricing);
    }
    
    const standartPrice = document.getElementById('standart-price');
    const oilaviyPrice = document.getElementById('oilaviy-price');
    const lyuksPrice = document.getElementById('lyuks-price');
    
    if (standartPrice) standartPrice.value = roomPricing.standart;
    if (oilaviyPrice) oilaviyPrice.value = roomPricing.oilaviy;
    if (lyuksPrice) lyuksPrice.value = roomPricing.lyuks;
}

// Narxlarni saqlash
function saveRoomPricing() {
    const standartPrice = document.getElementById('standart-price');
    const oilaviyPrice = document.getElementById('oilaviy-price');
    const lyuksPrice = document.getElementById('lyuks-price');
    
    if (standartPrice && oilaviyPrice && lyuksPrice) {
        roomPricing = {
            standart: parseInt(standartPrice.value) || 500000,
            oilaviy: parseInt(oilaviyPrice.value) || 800000,
            lyuks: parseInt(lyuksPrice.value) || 1200000
        };
        
        setData('roomPricing', roomPricing);
        alert('Narxlar muvaffaqiyatli saqlandi!');
    }
}

/* === Buxgalteriya bo'limi === */
let accountingData = [];

// Buxgalteriya ma'lumotlarini yuklash
function loadAccountingData() {
    renderAccountingTable();
    updateAccountingBalance();
    updateAccountingStats();
    renderAccountingCharts();
}

// Buxgalteriya jadvalini ko'rsatish
function renderAccountingTable() {
    if (!accountingTableBody) return;
    const accountingData = getData('accountingData');
    accountingTableBody.innerHTML = '';
    let totalIncome = 0, totalExpense = 0;
    accountingData.forEach(function(item, index) {
        const row = document.createElement('tr');
        row.innerHTML =
            '<td>' + (index + 1) + '</td>' +
            '<td>' + new Date(item.date).toLocaleDateString('uz-UZ') + '</td>' +
            '<td>' + item.amount.toLocaleString() + ' so\'m</td>' +
            '<td>' + (item.type === 'income' ? 'Daromad' : 'Xarajat') + '</td>' +
            '<td>' + (item.source || '') + '</td>' +
            '<td>' + (item.note || '') + '</td>' +
            '<td>' +
                '<button class="edit-btn" onclick="openAccountingEditModal(' + index + ')">Tahrirlash</button>' +
                '<button class="delete-btn" onclick="deleteAccounting(' + index + ')">O\'chirish</button>' +
            '</td>';
        accountingTableBody.appendChild(row);
        if (item.type === 'income') totalIncome += parseFloat(item.amount) || 0;
        if (item.type === 'expense') totalExpense += parseFloat(item.amount) || 0;
    });
    // Jadvaldan tashqarida jami qatorlar
    const summaryDiv = document.getElementById('accounting-summary');
    if (summaryDiv) {
        summaryDiv.innerHTML =
            '<div class="summary-row"><b>Jami Daromad:</b> <span>' + totalIncome.toLocaleString() + ' so\'m</span></div>' +
            '<div class="summary-row"><b>Jami Xarajat:</b> <span>' + totalExpense.toLocaleString() + ' so\'m</span></div>' +
            '<div class="summary-row"><b>Sof daromad:</b> <span>' + (totalIncome - totalExpense).toLocaleString() + ' so\'m</span></div>';
    }
}

// Buxgalteriya balansini yangilash
function updateAccountingBalance() {
    if (!accountingBalanceDiv) return;
    
    const accountingData = getData('accountingData');
    const totalIncome = accountingData.filter(function(item) { return item.type === 'income'; })
        .reduce(function(sum, item) { return sum + (parseFloat(item.amount) || 0); }, 0);
    
    const totalExpense = accountingData.filter(function(item) { return item.type === 'expense'; })
        .reduce(function(sum, item) { return sum + (parseFloat(item.amount) || 0); }, 0);
    
    const balance = totalIncome - totalExpense;
    
    accountingBalanceDiv.innerHTML = 
        '<div class="balance-item">' +
            '<span class="balance-label">Jami daromad:</span>' +
            '<span class="balance-value income">' + totalIncome.toLocaleString() + ' so\'m</span>' +
        '</div>' +
        '<div class="balance-item">' +
            '<span class="balance-label">Jami xarajat:</span>' +
            '<span class="balance-value expense">' + totalExpense.toLocaleString() + ' so\'m</span>' +
        '</div>' +
        '<div class="balance-item">' +
            '<span class="balance-label">Balans:</span>' +
            '<span class="balance-value ' + (balance >= 0 ? 'income' : 'expense') + '">' + balance.toLocaleString() + ' so\'m</span>' +
        '</div>';
}

// Buxgalteriya statistikalarini yangilash
function updateAccountingStats() {
    const accountingData = getData('accountingData');
    const today = getTodayDate();
    const todayData = accountingData.filter(function(item) { return item.date === today; });
    
    const todayIncome = todayData.filter(function(item) { return item.type === 'income'; })
        .reduce(function(sum, item) { return sum + (parseFloat(item.amount) || 0); }, 0);
    
    const todayExpense = todayData.filter(function(item) { return item.type === 'expense'; })
        .reduce(function(sum, item) { return sum + (parseFloat(item.amount) || 0); }, 0);
    
    const todayNet = todayIncome - todayExpense;
    
    // Kunlik hisobot
    if (dailySummaryDiv) {
        dailySummaryDiv.innerHTML = 
            '<div class="stat-item">' +
                '<span class="stat-label">Kunlik daromad:</span>' +
                '<span class="stat-value income">' + todayIncome.toLocaleString() + ' so\'m</span>' +
            '</div>' +
            '<div class="stat-item">' +
                '<span class="stat-label">Kunlik xarajat:</span>' +
                '<span class="stat-value expense">' + todayExpense.toLocaleString() + ' so\'m</span>' +
            '</div>';
    }
    
    if (dailyNetDiv) {
        dailyNetDiv.innerHTML = 
            '<span class="net-label">Kunlik sof daromad:</span>' +
            '<span class="net-value ' + (todayNet >= 0 ? 'income' : 'expense') + '">' + todayNet.toLocaleString() + ' so\'m</span>';
    }
    
    // Haftalik hisobot
    updateWeeklyStats();
    
    // Oylik hisobot
    updateMonthlyStats();
    
    // Yillik hisobot
    updateYearlyStats();
}

// Haftalik statistikalar
function updateWeeklyStats() {
    const accountingData = getData('accountingData');
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    const weekData = accountingData.filter(function(item) {
        const itemDate = new Date(item.date);
        return itemDate >= weekStart && itemDate <= weekEnd;
    });
    
    const weekIncome = weekData.filter(function(item) { return item.type === 'income'; })
        .reduce(function(sum, item) { return sum + (parseFloat(item.amount) || 0); }, 0);
    
    const weekExpense = weekData.filter(function(item) { return item.type === 'expense'; })
        .reduce(function(sum, item) { return sum + (parseFloat(item.amount) || 0); }, 0);
    
    const weekNet = weekIncome - weekExpense;
    
    if (weeklySummaryDiv) {
        weeklySummaryDiv.innerHTML = 
            '<div class="stat-item">' +
                '<span class="stat-label">Haftalik daromad:</span>' +
                '<span class="stat-value income">' + weekIncome.toLocaleString() + ' so\'m</span>' +
            '</div>' +
            '<div class="stat-item">' +
                '<span class="stat-label">Haftalik xarajat:</span>' +
                '<span class="stat-value expense">' + weekExpense.toLocaleString() + ' so\'m</span>' +
            '</div>';
    }
    
    if (weeklyNetDiv) {
        weeklyNetDiv.innerHTML = 
            '<span class="net-label">Haftalik sof daromad:</span>' +
            '<span class="net-value ' + (weekNet >= 0 ? 'income' : 'expense') + '">' + weekNet.toLocaleString() + ' so\'m</span>';
    }
}

// Oylik statistikalar
function updateMonthlyStats() {
    const accountingData = getData('accountingData');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const selectedMonth = monthFilter ? monthFilter.value : '';
    
    // Oylik ma'lumotlarni hisoblash
    const monthlyData = {};
    for (let month = 1; month <= 12; month++) {
        monthlyData[month] = { income: 0, expense: 0 };
    }
    
    accountingData.forEach(entry => {
        const entryDate = new Date(entry.date);
        if (entryDate.getFullYear() === currentYear) {
            const month = entryDate.getMonth() + 1;
            if (entry.type === 'income') {
                monthlyData[month].income += parseFloat(entry.amount) || 0;
            } else {
                monthlyData[month].expense += parseFloat(entry.amount) || 0;
            }
        }
    });
    
    // Joriy oy uchun umumiy hisobot
    const currentMonthData = monthlyData[currentMonth];
    const currentMonthIncome = currentMonthData.income;
    const currentMonthExpense = currentMonthData.expense;
    const currentMonthNet = currentMonthIncome - currentMonthExpense;
    
    // Oylik hisobotni ko'rsatish (oddiy matn ko'rinishida)
    if (monthlySummaryDiv) {
        monthlySummaryDiv.innerHTML = 
            '<div class="stat-item">' +
                '<span class="stat-label">Oylik daromad:</span>' +
                '<span class="stat-value income">' + currentMonthIncome.toLocaleString() + ' so\'m</span>' +
            '</div>' +
            '<div class="stat-item">' +
                '<span class="stat-label">Oylik xarajat:</span>' +
                '<span class="stat-value expense">' + currentMonthExpense.toLocaleString() + ' so\'m</span>' +
            '</div>';
    }
    
    if (monthlyNetDiv) {
        monthlyNetDiv.innerHTML = 
            '<span class="net-label">Oylik sof daromad:</span>' +
            '<span class="net-value ' + (currentMonthNet >= 0 ? 'income' : 'expense') + '">' + currentMonthNet.toLocaleString() + ' so\'m</span>';
    }
    
    // Oylik jadvallarni ko'rsatish
    updateMonthlyTable(selectedMonth);
}

// Oylik jadval
function updateMonthlyTable(selectedMonth = '') {
    if (!monthlyTablesDiv) return;
    const accountingData = getData('accountingData');
    const currentYear = new Date().getFullYear();
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

    let tableHTML = '';

    if (selectedMonth && selectedMonth !== '') {
        const month = parseInt(selectedMonth);
        const monthName = months[month-1];
        const monthData = accountingData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === currentYear && itemDate.getMonth() + 1 === month;
        });
        let monthIncome = 0, monthExpense = 0;
        // OY NOMI Sarlavha sifatida
        tableHTML += `<h3 style="text-align:center; margin-bottom:10px;">${monthName}</h3>`;
        tableHTML += '<table class="monthly-report-table"><thead><tr><th>Sana</th><th>Summa</th><th>Turi</th><th>Manba/Kategoriya</th><th>Izoh</th></tr></thead><tbody>';
        monthData.forEach(item => {
            tableHTML += `<tr>
                <td>${item.date || ''}</td>
                <td>${item.amount ? item.amount.toLocaleString() + " so'm" : ''}</td>
                <td>${item.type === 'income' ? 'Daromad' : 'Xarajat'}</td>
                <td>${item.source || ''}</td>
                <td>${item.note || ''}</td>
            </tr>`;
            if (item.type === 'income') monthIncome += parseFloat(item.amount) || 0;
            if (item.type === 'expense') monthExpense += parseFloat(item.amount) || 0;
        });
        tableHTML += `<tr><td>Jami</td><td>${monthIncome.toLocaleString()} so'm</td><td>Daromad</td><td></td><td></td></tr>`;
        tableHTML += `<tr><td>Jami</td><td>${monthExpense.toLocaleString()} so'm</td><td>Xarajat</td><td></td><td></td></tr>`;
        tableHTML += '</tbody></table>';
        // SOF DAROMAD alohida va ajralib
        tableHTML += `<div style="text-align:right; font-weight:bold; margin-top:10px;">Sof daromad: ${ (monthIncome - monthExpense).toLocaleString() } so'm</div>`;
    } else {
        // Always show all 12 months, even if no data
        tableHTML += '<table class="monthly-report-table"><thead><tr><th>Oy</th><th>Daromad</th><th>Xarajat</th><th>Sof daromad</th></tr></thead><tbody>';
        for (let month = 1; month <= 12; month++) {
            const monthData = accountingData.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.getFullYear() === currentYear && itemDate.getMonth() + 1 === month;
            });
            let monthIncome = 0, monthExpense = 0;
            monthData.forEach(item => {
                if (item.type === 'income') monthIncome += parseFloat(item.amount) || 0;
                if (item.type === 'expense') monthExpense += parseFloat(item.amount) || 0;
            });
            const monthNet = monthIncome - monthExpense;
            tableHTML += `<tr>
                <td>${months[month-1]}</td>
                <td>${monthIncome.toLocaleString()} so'm</td>
                <td>${monthExpense.toLocaleString()} so'm</td>
                <td>${monthNet.toLocaleString()} so'm</td>
            </tr>`;
        }
        tableHTML += '</tbody></table>';
    }

    monthlyTablesDiv.innerHTML = tableHTML;
}

// Yillik statistikalar
function updateYearlyStats() {
    const accountingData = getData('accountingData');
    const currentYear = new Date().getFullYear();
    
    const yearData = accountingData.filter(function(item) {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === currentYear;
    });
    
    const yearIncome = yearData.filter(function(item) { return item.type === 'income'; })
        .reduce(function(sum, item) { return sum + (parseFloat(item.amount) || 0); }, 0);
    
    const yearExpense = yearData.filter(function(item) { return item.type === 'expense'; })
        .reduce(function(sum, item) { return sum + (parseFloat(item.amount) || 0); }, 0);
    
    const yearNet = yearIncome - yearExpense;
    
    if (yearlySummaryDiv) {
        yearlySummaryDiv.innerHTML = 
            '<div class="stat-item">' +
                '<span class="stat-label">Yillik daromad:</span>' +
                '<span class="stat-value income">' + yearIncome.toLocaleString() + ' so\'m</span>' +
            '</div>' +
            '<div class="stat-item">' +
                '<span class="stat-label">Yillik xarajat:</span>' +
                '<span class="stat-value expense">' + yearExpense.toLocaleString() + ' so\'m</span>' +
            '</div>';
    }
    
    if (yearlyNetDiv) {
        yearlyNetDiv.innerHTML = 
            '<span class="net-label">Yillik sof daromad:</span>' +
            '<span class="net-value ' + (yearNet >= 0 ? 'income' : 'expense') + '">' + yearNet.toLocaleString() + ' so\'m</span>';
    }
}

// Buxgalteriya ma'lumotini qo'shish
function addAccounting() {
    const form = document.getElementById('add-accounting-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const amount = parseInt(formData.get('amount'));
    const type = formData.get('type');
    const source = formData.get('source');
    const note = formData.get('note');
    const date = formData.get('date') || getTodayDate();
    
    if (!amount || !type) {
        alert('Iltimos, summa va turini kiriting!');
        return;
    }
    
    const newItem = {
        id: Date.now(),
        date: date,
        amount: amount,
        type: type,
        source: source,
        note: note,
        createdAt: new Date().toISOString()
    };
    
    const accountingData = getData('accountingData');
    accountingData.push(newItem);
    setData('accountingData', accountingData);
    
    form.reset();
    renderAccountingTable();
    updateAccountingBalance();
    updateAccountingStats();
    renderAccountingCharts();
    
    alert('Ma\'lumot muvaffaqiyatli qo\'shildi!');
}

// Buxgalteriya ma'lumotini tahrirlash
function editAccounting(index) {
    const accountingData = getData('accountingData');
    const item = accountingData[index];
    if (!item) return;
    
    const newAmount = prompt('Yangi summa:', item.amount);
    if (newAmount === null) return;
    
    const newType = prompt('Yangi tur (income/expense):', item.type);
    if (newType === null) return;
    
    const newSource = prompt('Yangi manba:', item.source || '');
    if (newSource === null) return;
    
    const newNote = prompt('Yangi izoh:', item.note || '');
    if (newNote === null) return;
    
    accountingData[index] = {
        ...item,
        amount: parseInt(newAmount) || item.amount,
        type: newType || item.type,
        source: newSource,
        note: newNote
    };
    
    setData('accountingData', accountingData);
    renderAccountingTable();
    updateAccountingBalance();
    updateAccountingStats();
    renderAccountingCharts();
    
    alert('Ma\'lumot muvaffaqiyatli tahrirlandi!');
}

// Buxgalteriya ma'lumotini o'chirish
function deleteAccounting(index) {
    if (confirm('Bu ma\'lumotni o\'chirishni xohlaysizmi?')) {
        const accountingData = getData('accountingData');
        accountingData.splice(index, 1);
        setData('accountingData', accountingData);
        renderAccountingTable();
        updateAccountingBalance();
        updateAccountingStats();
        renderAccountingCharts();
        
        alert('Ma\'lumot muvaffaqiyatli o\'chirildi!');
    }
}

// Filtrlash
function filterAccounting() {
    const accountingData = getData('accountingData');
    const dateFilter = filterDate ? filterDate.value : '';
    const typeFilter = filterType ? filterType.value : '';
    
    let filteredData = accountingData;
    
    if (dateFilter) {
        filteredData = filteredData.filter(function(item) { return item.date === dateFilter; });
    }
    
    if (typeFilter) {
        filteredData = filteredData.filter(function(item) { return item.type === typeFilter; });
    }
    
    renderFilteredAccountingTable(filteredData);
}

// Filtrlangan jadvalni ko'rsatish
function renderFilteredAccountingTable(data) {
    if (!accountingTableBody) return;
    
    accountingTableBody.innerHTML = '';
    
    data.forEach(function(item, index) {
        const row = document.createElement('tr');
        row.innerHTML = 
            '<td>' + new Date(item.date).toLocaleDateString('uz-UZ') + '</td>' +
            '<td>' + item.amount.toLocaleString() + ' so\'m</td>' +
            '<td>' + (item.type === 'income' ? 'Daromad' : 'Xarajat') + '</td>' +
            '<td>' + (item.source || '') + '</td>' +
            '<td>' + (item.note || '') + '</td>' +
            '<td>' +
                '<button class="edit-btn" onclick="editAccounting(' + index + ')">Tahrirlash</button>' +
                '<button class="delete-btn" onclick="deleteAccounting(' + index + ')">O\'chirish</button>' +
            '</td>';
        
        accountingTableBody.appendChild(row);
    });
}

// Filtrni tozalash
function clearAccountingFilter() {
    if (filterDate) filterDate.value = '';
    if (filterType) filterType.value = '';
    renderAccountingTable();
}

// Excel eksport
function exportToExcel() {
    const filteredData = getFilteredAccountingData();
    const data = [
        ['Sana', 'Summa', 'Turi', 'Manba/Kategoriya', 'Izoh']
    ];
    let totalIncome = 0, totalExpense = 0;
    let firstDataRow = 2; // Excel rows are 1-indexed, header is row 1
    filteredData.forEach(function(item) {
        data.push([
            new Date(item.date).toLocaleDateString('uz-UZ'),
            item.amount,
            item.type === 'income' ? 'Daromad' : 'Xarajat',
            item.source || '',
            item.note || ''
        ]);
        if (item.type === 'income') totalIncome += parseFloat(item.amount) || 0;
        if (item.type === 'expense') totalExpense += parseFloat(item.amount) || 0;
    });
    data.push([]);
    // Excel formulas for auto sum
    const lastDataRow = filteredData.length + 1;
    data.push(['Jami', {f: `SUM(B${firstDataRow}:B${lastDataRow})`}, 'Daromad', '', '']);
    data.push(['Jami', {f: `SUMIF(C${firstDataRow}:C${lastDataRow},"Xarajat",B${firstDataRow}:B${lastDataRow})`}, 'Xarajat', '', '']);
    data.push(['Sof daromad', {f: `SUMIF(C${firstDataRow}:C${lastDataRow},"Daromad",B${firstDataRow}:B${lastDataRow})-SUMIF(C${firstDataRow}:C${lastDataRow},"Xarajat",B${firstDataRow}:B${lastDataRow})`}, '', '', '']);

    const ws = XLSX.utils.aoa_to_sheet(data);
    // Set column widths
    ws['!cols'] = [
        { wch: 15 }, // Sana
        { wch: 14 }, // Summa
        { wch: 12 }, // Turi
        { wch: 20 }, // Manba/Kategoriya
        { wch: 30 }  // Izoh
    ];
    // Set autofilter for the data range
    ws['!autofilter'] = { ref: `A1:E${lastDataRow}` };
    // Style all cells: border, center, header bold/black, summary bold/gray
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = { c: C, r: R };
            const cell_ref = XLSX.utils.encode_cell(cell_address);
            if (!ws[cell_ref]) continue;
            if (!ws[cell_ref].s) ws[cell_ref].s = {};
            ws[cell_ref].s.alignment = { horizontal: 'center', vertical: 'center' };
            ws[cell_ref].s.border = {
                top: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } }
            };
            // Header row
            if (R === 0) {
                ws[cell_ref].s.font = { bold: true, color: { rgb: 'FFFFFF' } };
                ws[cell_ref].s.fill = { fgColor: { rgb: '222222' } };
            }
            // Summary rows (last 3 rows)
            if (R === lastDataRow + 1 || R === lastDataRow + 2 || R === lastDataRow + 3) {
                ws[cell_ref].s.font = { bold: true };
                ws[cell_ref].s.fill = { fgColor: { rgb: 'E2E2E2' } };
            }
        }
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hisobot');
    XLSX.writeFile(wb, 'buxgalteriya_hisoboti.xlsx');
    alert('Excel fayl muvaffaqiyatli yuklandi!');
}

function exportToPDF() {
    try {
        if (typeof window.jspdf === 'undefined') {
            alert('PDF kutubxonasi yuklanmagan! Sahifani yangilang.');
            return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const filteredData = getFilteredAccountingData();
        const columns = ['Sana', 'Summa', 'Turi', 'Manba/Kategoriya', 'Izoh'];
        let totalIncome = 0, totalExpense = 0;
        const rows = filteredData.map(function(item) {
            if (item.type === 'income') totalIncome += parseFloat(item.amount) || 0;
            if (item.type === 'expense') totalExpense += parseFloat(item.amount) || 0;
            return [
                new Date(item.date).toLocaleDateString('uz-UZ'),
                item.amount.toLocaleString() + ' so\'m',
                item.type === 'income' ? 'Daromad' : 'Xarajat',
                item.source || '',
                item.note || ''
            ];
        });

        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        doc.text('Buxgalteriya hisoboti', 105, 25, { align: 'center' });

        if (rows.length > 0) {
            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 35,
                styles: {
                    fillColor: [255, 255, 255],
                    textColor: [0, 0, 0],
                    fontSize: 10,
                    cellPadding: 5
                },
                headStyles: {
                    fillColor: [70, 130, 180],
                    textColor: [255, 255, 255],
                    fontSize: 11,
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255]
                }
            });
            let afterTableY = doc.lastAutoTable.finalY + 6;
            doc.setFontSize(12);
            doc.setFont(undefined, 'normal');
            doc.text(`Jami daromad: ${totalIncome.toLocaleString()} so'm`, 14, afterTableY);
            doc.text(`Jami xarajat: ${totalExpense.toLocaleString()} so'm`, 14, afterTableY + 7);
            doc.text(`Sof daromad: ${(totalIncome - totalExpense).toLocaleString()} so'm`, 14, afterTableY + 14);
        } else {
            doc.setFontSize(16);
            doc.setTextColor(100, 100, 100);
            doc.text('Ma\'lumot mavjud emas', 105, 60, { align: 'center' });
        }
        doc.save('buxgalteriya_hisoboti.pdf');
        alert('PDF fayl muvaffaqiyatli yuklandi!');
    } catch (error) {
        console.error('PDF yaratishda xato:', error);
        alert('PDF yaratishda xato yuz berdi: ' + error.message);
    }
}

/* === Logout === */
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        if (adminLoginSection) adminLoginSection.style.display = 'flex';
        if (adminContainer) adminContainer.style.display = 'none';
    });
}

/* === Boshlang'ich yuklash === */
document.addEventListener('DOMContentLoaded', function() {
    // Ma'lumotlarni ishga tushirish
    if (!localStorage.getItem('accountingData')) setData('accountingData', []);
    if (!localStorage.getItem('bookingData')) setData('bookingData', []);
    if (!localStorage.getItem('roomData')) setData('roomData', []);
    if (!localStorage.getItem('messageData')) setData('messageData', []);
    if (!localStorage.getItem('bookingMessages')) setData('bookingMessages', []);
    
    // Buxgalteriya event listenerlari
    if (addAccountingForm) {
        addAccountingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addAccounting();
        });
    }
    
    if (filterDate) {
        filterDate.addEventListener('change', filterAccounting);
    }
    
    if (filterType) {
        filterType.addEventListener('change', filterAccounting);
    }
    
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', clearAccountingFilter);
    }
    
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', exportToExcel);
    }
    
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportToPDF);
    }
    
    // Booking event listenerlari
    if (addBookingForm) {
        addBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addBooking();
        });
    }
    
    if (bookingFilterDate) {
        bookingFilterDate.addEventListener('change', filterBookings);
    }
    
    if (bookingFilterStatus) {
        bookingFilterStatus.addEventListener('change', filterBookings);
    }
    
    if (bookingClearFilterBtn) {
        bookingClearFilterBtn.addEventListener('click', clearBookingFilter);
    }
    
    // Message event listenerlari
    if (messageFilterStatus) {
        messageFilterStatus.addEventListener('change', filterMessages);
    }
    
    if (messageClearFilterBtn) {
        messageClearFilterBtn.addEventListener('click', clearMessageFilter);
    }
    
    // Event listenerlar
    const pricingForm = document.getElementById('pricing-form');
    if (pricingForm) {
        pricingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveRoomPricing();
        });
    }

    // Oylik filtrlash event listenerlari
    if (applyMonthFilterBtn) {
        applyMonthFilterBtn.addEventListener('click', applyMonthFilter);
    }
    
    if (clearMonthFilterBtn) {
        clearMonthFilterBtn.addEventListener('click', clearMonthFilter);
    }
    
    if (monthFilter) {
        monthFilter.addEventListener('change', applyMonthFilter);
    }
    
    // Ma'lumotlarni yuklash
    loadRoomPricing();
    loadRoomBookings();
    loadAccountingData();
    
    // Boshlang'ich bo'limni yuklash
    const activeSection = document.querySelector('.sidebar nav ul li a.active');
    if (activeSection) {
        const section = activeSection.getAttribute('data-section');
        loadSectionData(section);
    } else {
        // Agar hech qanday bo'lim faol bo'lmasa, dashboard ni yuklash
        loadSectionData('dashboard');
    }

    if (exportMonthlyExcelBtn) {
        exportMonthlyExcelBtn.addEventListener('click', exportMonthlyToExcel);
    }
    if (exportMonthlyPdfBtn) {
        exportMonthlyPdfBtn.addEventListener('click', exportMonthlyToPDF);
    }

    // Barcha Excel tugmalarini birga bosish
    const exportAllExcelBtn = document.getElementById('export-all-excel');
    if (exportAllExcelBtn) {
        exportAllExcelBtn.addEventListener('click', function() {
            // Oylik hisobot
            if (typeof exportMonthlyToExcel === 'function') exportMonthlyToExcel();
            // Savollar
            const exportQuestionsExcelBtn = document.getElementById('export-questions-excel');
            if (exportQuestionsExcelBtn) exportQuestionsExcelBtn.click();
            // Band qilish (agar mavjud bo'lsa)
            const bookingExportExcelBtn = document.getElementById('booking-export-excel');
            if (bookingExportExcelBtn) bookingExportExcelBtn.click();
            // Buxgalteriya (umumiy) jadvali
            if (typeof exportToExcel === 'function') exportToExcel();
        });
    }

    // Barcha PDF tugmalarini birga bosish
    const exportAllPdfBtn = document.getElementById('export-all-pdf');
    if (exportAllPdfBtn) {
        exportAllPdfBtn.addEventListener('click', function() {
            // Oylik hisobot
            if (typeof exportMonthlyToPDF === 'function') exportMonthlyToPDF();
            // Savollar
            const exportQuestionsPdfBtn = document.getElementById('export-questions-pdf');
            if (exportQuestionsPdfBtn) exportQuestionsPdfBtn.click();
            // Band qilish (agar mavjud bo'lsa)
            const bookingExportPdfBtn = document.getElementById('booking-export-pdf');
            if (bookingExportPdfBtn) bookingExportPdfBtn.click();
            // Buxgalteriya (umumiy) jadvali
            if (typeof exportToPDF === 'function') exportToPDF();
        });
    }

    // Xona band qilish Excel eksport
    const bookingExportExcelBtn = document.getElementById('booking-export-excel');
    if (bookingExportExcelBtn) {
        bookingExportExcelBtn.addEventListener('click', function() {
            exportBookingToExcel();
        });
    }

    // Xona band qilish PDF eksport
    const bookingExportPdfBtn = document.getElementById('booking-export-pdf');
    if (bookingExportPdfBtn) {
        bookingExportPdfBtn.addEventListener('click', function() {
            exportBookingToPDF();
        });
    }
});

// Oylik filtrlash funksiyalari
function applyMonthFilter() {
    updateMonthlyStats();
}

function clearMonthFilter() {
    if (monthFilter) monthFilter.value = '';
    updateMonthlyStats();
}

// Oylik hisobotlarni Excel ga eksport qilish
function exportMonthlyToExcel() {
    const accountingData = getData('accountingData');
    const currentYear = new Date().getFullYear();
    const selectedMonth = monthFilter ? monthFilter.value : '';
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

    let ws_data = [];
    let totalIncome = 0, totalExpense = 0;

    if (selectedMonth && selectedMonth !== '') {
        // Faqat tanlangan oy uchun barcha kunlar va jami
        const month = parseInt(selectedMonth);
        ws_data.push(['Sana', "Summa", "Turi", "Manba/Kategoriya", "Izoh"]);
        const monthData = accountingData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === currentYear && itemDate.getMonth() + 1 === month;
        });
        monthData.forEach(item => {
            ws_data.push([
                item.date || '',
                item.amount || '',
                item.type === 'income' ? 'Daromad' : 'Xarajat',
                item.source || '',
                item.note || ''
            ]);
            if (item.type === 'income') totalIncome += parseFloat(item.amount) || 0;
            if (item.type === 'expense') totalExpense += parseFloat(item.amount) || 0;
        });
        ws_data.push([]);
        ws_data.push(['Jami', totalIncome, 'Daromad', '', '']);
        ws_data.push(['Jami', totalExpense, 'Xarajat', '', '']);
        ws_data.push(['Sof daromad', totalIncome - totalExpense, '', '', '']);
    } else {
        // Always show all 12 months, even if no data
        for (let m = 1; m <= 12; m++) {
            const monthData = accountingData.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.getFullYear() === currentYear && itemDate.getMonth() + 1 === m;
            });
            let monthIncome = 0, monthExpense = 0;
            monthData.forEach(item => {
                if (item.type === 'income') monthIncome += parseFloat(item.amount) || 0;
                if (item.type === 'expense') monthExpense += parseFloat(item.amount) || 0;
            });
            ws_data.push([months[m-1]]);
            ws_data.push(['Sana', "Summa", "Turi", "Manba/Kategoriya", "Izoh"]);
            monthData.forEach(item => {
                ws_data.push([
                    item.date || '',
                    item.amount || '',
                    item.type === 'income' ? 'Daromad' : 'Xarajat',
                    item.source || '',
                    item.note || ''
                ]);
            });
            ws_data.push([]);
            ws_data.push(['Jami', monthIncome, 'Daromad', '', '']);
            ws_data.push(['Jami', monthExpense, 'Xarajat', '', '']);
            ws_data.push(['Sof daromad', monthIncome - monthExpense, '', '', '']);
            ws_data.push([]);
            totalIncome += monthIncome;
            totalExpense += monthExpense;
        }
        // Yil bo'yicha jami
        ws_data.push(["YIL BO'YICHA JAMISI", totalIncome, 'Daromad', '', '']);
        ws_data.push(["YIL BO'YICHA JAMISI", totalExpense, 'Xarajat', '', '']);
        ws_data.push(["YIL SOF DAROMAD", totalIncome - totalExpense, '', '', '']);
    }

    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Ustun kengliklari
    ws['!cols'] = [
        { wch: 15 }, // Sana
        { wch: 12 }, // Summa
        { wch: 15 }, // Turi
        { wch: 20 }, // Manba/Kategoriya
        { wch: 30 }  // Izoh
    ];

    // Barcha kataklarni markazga joylash va dizayn berish
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = { c: C, r: R };
            const cell_ref = XLSX.utils.encode_cell(cell_address);
            if (!ws[cell_ref]) continue;
            if (!ws[cell_ref].s) ws[cell_ref].s = {};
            ws[cell_ref].s.alignment = { horizontal: 'center', vertical: 'center' };
            ws[cell_ref].s.border = {
                top: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } }
            };
            // Header row (Sana, Summa, ...)
            if (ws_data[R] && ws_data[R][0] === 'Sana') {
                ws[cell_ref].s.font = { bold: true, color: { rgb: 'FFFFFF' } };
                ws[cell_ref].s.fill = { fgColor: { rgb: '222222' } };
            }
            // Summary rows (Jami, Sof daromad, YIL BO'YICHA JAMISI, YIL SOF DAROMAD)
            if (ws_data[R] && (
                ws_data[R][0] === 'Jami' ||
                ws_data[R][0] === 'Sof daromad' ||
                ws_data[R][0] === "YIL BO'YICHA JAMISI" ||
                ws_data[R][0] === "YIL SOF DAROMAD"
            )) {
                ws[cell_ref].s.font = { bold: true };
                ws[cell_ref].s.fill = { fgColor: { rgb: 'E2E2E2' } };
            }
        }
    }

    // (SheetJS uchun style ishlashi uchun faylni .xlsx formatida saqlash kerak va SheetJS versiyasi style-ni qo'llab-quvvatlashi kerak.)

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Oylik Jadval');
    XLSX.writeFile(wb, `oylik_jadval_${currentYear}.xlsx`);
}

function exportMonthlyToPDF() {
    const accountingData = getData('accountingData');
    const currentYear = new Date().getFullYear();
    const selectedMonth = monthFilter ? monthFilter.value : '';
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

    const doc = new jspdf.jsPDF();
    let startY = 14;

    if (selectedMonth && selectedMonth !== '') {
        // Faqat tanlangan oy uchun barcha kunlar va jami
        const month = parseInt(selectedMonth);
        const monthName = months[month-1];
        const monthData = accountingData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === currentYear && itemDate.getMonth() + 1 === month;
        });
        let monthIncome = 0, monthExpense = 0;

        doc.setFontSize(16);
        doc.text(`${monthName} ${currentYear} yil`, 105, startY, { align: 'center' });
        startY += 8;

        // Jadval
        const tableData = monthData.map(item => [
            item.date || '',
            item.amount || '',
            item.type === 'income' ? 'Daromad' : 'Xarajat',
            item.source || '',
            item.note || ''
        ]);
        monthData.forEach(item => {
            if (item.type === 'income') monthIncome += parseFloat(item.amount) || 0;
            if (item.type === 'expense') monthExpense += parseFloat(item.amount) || 0;
        });

        doc.autoTable({
            head: [['Sana', "Summa", "Turi", "Manba/Kategoriya", "Izoh"]],
            body: tableData,
            startY: startY,
            styles: { fontSize: 10, halign: 'center' }
        });

        let afterTableY = doc.lastAutoTable.finalY + 6;
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`Jami daromad: ${monthIncome.toLocaleString()} so'm`, 14, afterTableY);
        doc.text(`Jami xarajat: ${monthExpense.toLocaleString()} so'm`, 14, afterTableY + 7);
        doc.text(`Sof daromad: ${(monthIncome - monthExpense).toLocaleString()} so'm`, 14, afterTableY + 14);
    } else {
        // Barcha oylar bo'yicha umumiy hisobot (avvalgi mantiq)
        let tableData = [];
        let totalIncome = 0, totalExpense = 0;
        for (let month = 1; month <= 12; month++) {
            const monthData = accountingData.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.getFullYear() === currentYear && itemDate.getMonth() + 1 === month;
            });
            if (monthData.length === 0) continue;
            const monthIncome = monthData.filter(item => item.type === 'income').reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
            const monthExpense = monthData.filter(item => item.type === 'expense').reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
            const monthNet = monthIncome - monthExpense;
            tableData.push([months[month-1], monthIncome, monthExpense, monthNet]);
            totalIncome += monthIncome;
            totalExpense += monthExpense;
        }
        tableData.push(['Jami', totalIncome, totalExpense, totalIncome - totalExpense]);
        doc.text(`Oylik hisobot - ${currentYear} yil`, 105, startY, { align: 'center' });
        doc.autoTable({
            head: [['Oy', "Daromad (so'm)", "Xarajat (so'm)", "Sof daromad (so'm)"]],
            body: tableData,
            startY: startY + 8,
            styles: { fontSize: 10, halign: 'center' }
        });
    }
    doc.save(`oylik_hisobot_${currentYear}.pdf`);
}

// Savollarni yuklash va ko'rsatish
async function loadQuestionsData() {
    const questionsList = document.getElementById('questions-list');
    if (!questionsList) return;
    questionsList.innerHTML = '<p>Yuklanmoqda...</p>';
    try {
        const response = await fetch('/api/messages');
        if (!response.ok) throw new Error('Savollarni yuklashda xatolik');
        const messages = await response.json();
        const questions = messages.filter(msg => msg.type === 'question');
        if (questions.length === 0) {
            questionsList.innerHTML = '<p>Savollar topilmadi.</p>';
            return;
        }
        let html = '<div class="questions-table-wrapper"><table class="questions-table" id="questions-table"><thead><tr><th>#</th><th>Ism</th><th>Email</th><th>Telefon</th><th>Savol</th><th>Sana</th><th>Amallar</th></tr></thead><tbody>';
        questions.forEach((q, i) => {
            html += `<tr data-id="${q.id}"><td>${i+1}</td><td>${q.senderName||''}</td><td>${q.email||''}</td><td>${q.phone||''}</td><td>${q.message||''}</td><td>${q.createdAt ? new Date(q.createdAt).toLocaleString() : ''}</td><td><div class="action-buttons"><button class="action-btn delete-btn" onclick="deleteQuestion(${q.id})">O'chirish</button></div></td></tr>`;
        });
        html += '</tbody></table></div>';
        questionsList.innerHTML = html;

        // Edit event
        document.querySelectorAll('.edit-question-btn').forEach(btn => {
            btn.addEventListener('click', async function(e) {
                const tr = e.target.closest('tr');
                const id = tr.getAttribute('data-id');
                const oldMsg = tr.children[4].textContent;
                const newMsg = prompt('Yangi savol matnini kiriting:', oldMsg);
                if (newMsg !== null && newMsg.trim() !== '' && newMsg !== oldMsg) {
                    try {
                        const putRes = await fetch(`/api/messages/${id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message: newMsg })
                        });
                        if (!putRes.ok) throw new Error('Tahrirlashda xatolik');
                        loadQuestionsData();
                    } catch (err) {
                        alert('Tahrirlashda xatolik yuz berdi!');
                    }
                }
            });
        });



        // Export Excel
        const exportExcelBtn = document.getElementById('export-questions-excel');
        if (exportExcelBtn) {
            exportExcelBtn.onclick = function() {
                const ws_data = [
                    ['#', 'Ism', 'Email', 'Telefon', 'Savol', 'Sana'],
                    ...questions.map((q, i) => [
                        i+1, q.senderName||'', q.email||'', q.phone||'', q.message||'', q.createdAt ? new Date(q.createdAt).toLocaleString() : ''
                    ])
                ];
                const ws = XLSX.utils.aoa_to_sheet(ws_data);
                // Set column widths
                ws['!cols'] = [
                    { wch: 5 }, // #
                    { wch: 18 }, // Ism
                    { wch: 22 }, // Email
                    { wch: 14 }, // Telefon
                    { wch: 40 }, // Savol
                    { wch: 20 }  // Sana
                ];
                // Style all cells: border, center, header bold/black
                const range = XLSX.utils.decode_range(ws['!ref']);
                for (let R = range.s.r; R <= range.e.r; ++R) {
                    for (let C = range.s.c; C <= range.e.c; ++C) {
                        const cell_address = { c: C, r: R };
                        const cell_ref = XLSX.utils.encode_cell(cell_address);
                        if (!ws[cell_ref]) continue;
                        if (!ws[cell_ref].s) ws[cell_ref].s = {};
                        ws[cell_ref].s.alignment = { horizontal: 'center', vertical: 'center' };
                        ws[cell_ref].s.border = {
                            top: { style: 'thin', color: { rgb: '000000' } },
                            bottom: { style: 'thin', color: { rgb: '000000' } },
                            left: { style: 'thin', color: { rgb: '000000' } },
                            right: { style: 'thin', color: { rgb: '000000' } }
                        };
                        // Header row
                        if (R === 0) {
                            ws[cell_ref].s.font = { bold: true, color: { rgb: 'FFFFFF' } };
                            ws[cell_ref].s.fill = { fgColor: { rgb: '222222' } };
                        }
                    }
                }
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Savollar');
                XLSX.writeFile(wb, 'savollar.xlsx');
            };
        }
        // Export PDF
        const exportPdfBtn = document.getElementById('export-questions-pdf');
        if (exportPdfBtn) {
            exportPdfBtn.onclick = function() {
                const doc = new jspdf.jsPDF({orientation: 'landscape'});
                doc.text('Savollar', 14, 14);
                const tableData = questions.map((q, i) => [
                    i+1, q.senderName||'', q.email||'', q.phone||'', q.message||'', q.createdAt ? new Date(q.createdAt).toLocaleString() : ''
                ]);
                doc.autoTable({
                    head: [['#', 'Ism', 'Email', 'Telefon', 'Savol', 'Sana']],
                    body: tableData,
                    startY: 20,
                    styles: { fontSize: 8 },
                    headStyles: { fillColor: [42, 106, 74] }
                });
                doc.save('savollar.pdf');
            };
        }
    } catch (err) {
        questionsList.innerHTML = '<p>Savollarni yuklashda xatolik yuz berdi.</p>';
    }
}

// Savolni o'chirish funksiyasi
async function deleteQuestion(id) {
    if (confirm('Bu savolni o\'chirishni xohlaysizmi?')) {
        try {
            const delRes = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
            if (!delRes.ok) throw new Error('O\'chirishda xatolik');
            loadQuestionsData();
            alert('Savol muvaffaqiyatli o\'chirildi!');
        } catch (err) {
            alert('O\'chirishda xatolik yuz berdi!');
        }
    }
}

function getFilteredAccountingData() {
    const accountingData = getData('accountingData');
    const currentYear = new Date().getFullYear();
    const selectedMonth = monthFilter ? monthFilter.value : '';
    if (selectedMonth && selectedMonth !== '') {
        const month = parseInt(selectedMonth);
        return accountingData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === currentYear && itemDate.getMonth() + 1 === month;
        });
    } else {
        return accountingData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === currentYear;
        });
    }
}

function renderAccountingTable() {
    if (!accountingTableBody) return;
    const accountingData = getData('accountingData');
    accountingTableBody.innerHTML = '';
    let totalIncome = 0, totalExpense = 0;
    accountingData.forEach(function(item, index) {
        const row = document.createElement('tr');
        row.innerHTML =
            '<td>' + (index + 1) + '</td>' +
            '<td>' + new Date(item.date).toLocaleDateString('uz-UZ') + '</td>' +
            '<td>' + item.amount.toLocaleString() + ' so\'m</td>' +
            '<td>' + (item.type === 'income' ? 'Daromad' : 'Xarajat') + '</td>' +
            '<td>' + (item.source || '') + '</td>' +
            '<td>' + (item.note || '') + '</td>' +
            '<td>' +
                '<button class="edit-btn" onclick="openAccountingEditModal(' + index + ')">Tahrirlash</button>' +
                '<button class="delete-btn" onclick="deleteAccounting(' + index + ')">O\'chirish</button>' +
            '</td>';
        accountingTableBody.appendChild(row);
        if (item.type === 'income') totalIncome += parseFloat(item.amount) || 0;
        if (item.type === 'expense') totalExpense += parseFloat(item.amount) || 0;
    });
    // Jadvaldan tashqarida jami qatorlar
    const summaryDiv = document.getElementById('accounting-summary');
    if (summaryDiv) {
        summaryDiv.innerHTML =
            '<div class="summary-row"><b>Jami Daromad:</b> <span>' + totalIncome.toLocaleString() + ' so\'m</span></div>' +
            '<div class="summary-row"><b>Jami Xarajat:</b> <span>' + totalExpense.toLocaleString() + ' so\'m</span></div>' +
            '<div class="summary-row"><b>Sof daromad:</b> <span>' + (totalIncome - totalExpense).toLocaleString() + ' so\'m</span></div>';
    }
}

function renderAccountingCharts() {
    const accountingData = getData('accountingData');
    const currentYear = new Date().getFullYear();
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

    let incomeData = Array(12).fill(0);
    let expenseData = Array(12).fill(0);
    let netData = Array(12).fill(0);

    accountingData.forEach(entry => {
        const entryDate = new Date(entry.date);
        if (entryDate.getFullYear() === currentYear) {
            const m = entryDate.getMonth();
            if (entry.type === 'income') incomeData[m] += parseFloat(entry.amount) || 0;
            if (entry.type === 'expense') expenseData[m] += parseFloat(entry.amount) || 0;
        }
    });
    for (let i = 0; i < 12; i++) {
        netData[i] = incomeData[i] - expenseData[i];
    }

    // Destroy old charts if they exist
    if (window.incomeChartObj) window.incomeChartObj.destroy();
    if (window.expenseChartObj) window.expenseChartObj.destroy();
    if (window.netChartObj) window.netChartObj.destroy();

    // Income chart
    window.incomeChartObj = new Chart(document.getElementById('incomeChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Oylik daromad',
                data: incomeData,
                backgroundColor: 'rgba(46, 204, 113, 0.7)'
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // Expense chart
    window.expenseChartObj = new Chart(document.getElementById('expenseChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Oylik xarajat',
                data: expenseData,
                borderColor: 'rgba(231, 76, 60, 0.9)',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // Net chart
    window.netChartObj = new Chart(document.getElementById('netChart').getContext('2d'), {
        type: 'pie',
        data: {
            labels: months,
            datasets: [{
                label: 'Oylik sof daromad',
                data: netData,
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)', 'rgba(41, 128, 185, 0.7)', 'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)', 'rgba(230, 126, 34, 0.7)', 'rgba(231, 76, 60, 0.7)',
                    'rgba(46, 204, 113, 0.7)', 'rgba(39, 174, 96, 0.7)', 'rgba(22, 160, 133, 0.7)',
                    'rgba(127, 140, 141, 0.7)', 'rgba(149, 165, 166, 0.7)', 'rgba(52, 73, 94, 0.7)'
                ]
            }]
        },
        options: {
            plugins: { legend: { display: true, position: 'bottom' } }
        }
    });
}

function getBookingStatusUz(status) {
    if (status === 'confirmed') return 'Tasdiqlangan';
    if (status === 'cancelled') return 'Bekor qilingan';
    return 'Kutilmoqda';
}

function exportBookingToExcel() {
    const bookingData = getData('bookingData');
    const data = [
        ['Xona raqami', 'Kirish sanasi', 'Chiqish sanasi', 'Sig\'imi', 'Xona turi', 'Mijoz ismi', 'Telefon', 'Manzil', 'Passport', 'Hamrohlar', 'Summa', 'To\'lov usuli', 'Holat']
    ];
    bookingData.forEach(item => {
        data.push([
            item.roomNumber || '',
            item.checkInDate || '',
            item.checkOutDate || '',
            item.roomCapacity || '',
            item.roomType || '',
            item.clientName || '',
            item.phone || '',
            item.address || '',
            item.passport || '',
            item.companions || '',
            item.amount || '',
            item.paymentMethod || '',
            getBookingStatusUz(item.status)
        ]);
    });
    const ws = XLSX.utils.aoa_to_sheet(data);
    // Set column widths
    ws['!cols'] = [
        { wch: 12 }, // Xona raqami
        { wch: 15 }, // Kirish sanasi
        { wch: 15 }, // Chiqish sanasi
        { wch: 10 }, // Sig'imi
        { wch: 14 }, // Xona turi
        { wch: 18 }, // Mijoz ismi
        { wch: 14 }, // Telefon
        { wch: 18 }, // Manzil
        { wch: 14 }, // Passport
        { wch: 16 }, // Hamrohlar
        { wch: 12 }, // Summa
        { wch: 14 }, // To'lov usuli
        { wch: 12 }  // Holat
    ];
    // Style all cells: border, center, header bold/black
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = { c: C, r: R };
            const cell_ref = XLSX.utils.encode_cell(cell_address);
            if (!ws[cell_ref]) continue;
            if (!ws[cell_ref].s) ws[cell_ref].s = {};
            ws[cell_ref].s.alignment = { horizontal: 'center', vertical: 'center' };
            ws[cell_ref].s.border = {
                top: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } }
            };
            // Header row
            if (R === 0) {
                ws[cell_ref].s.font = { bold: true, color: { rgb: 'FFFFFF' } };
                ws[cell_ref].s.fill = { fgColor: { rgb: '222222' } };
            }
        }
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Xona band qilish');
    XLSX.writeFile(wb, 'xona_band_qilish.xlsx');
}

function exportBookingToPDF() {
    const bookingData = getData('bookingData');
    const columns = ['Xona raqami', 'Kirish sanasi', 'Chiqish sanasi', 'Sig\'imi', 'Xona turi', 'Mijoz ismi', 'Telefon', 'Manzil', 'Passport', 'Hamrohlar', 'Summa', 'To\'lov usuli', 'Holat'];
    const rows = bookingData.map(item => [
        item.roomNumber || '',
        item.checkInDate || '',
        item.checkOutDate || '',
        item.roomCapacity || '',
        item.roomType || '',
        item.clientName || '',
        item.phone || '',
        item.address || '',
        item.passport || '',
        item.companions || '',
        item.amount || '',
        item.paymentMethod || '',
        getBookingStatusUz(item.status)
    ]);
    const doc = new jspdf.jsPDF({ orientation: 'landscape' });
    doc.setFontSize(16);
    doc.text('Xona band qilish', 14, 14);
    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        styles: { fontSize: 8, halign: 'center' },
        headStyles: { fillColor: [52, 152, 219] }
    });
    doc.save('xona_band_qilish.pdf');
}

function editRoomBooking(index) {
    const booking = roomBookings[index];
    if (!booking) return;

    // Misol uchun faqat statusni tahrirlash:
    const newStatus = prompt("Yangi holat (pending/confirmed/cancelled):", booking.status || "pending");
    if (newStatus === null) return;

    roomBookings[index].status = newStatus;
    setData('bookingMessages', roomBookings);
    renderRoomBookings();
    updateRoomBookingStats();
    alert('Band qilish holati tahrirlandi!');
}

function openBookingEditModal(index) {
    editingBookingIdx = index;
    const bookingData = getData('bookingData');
    const item = bookingData[index];
    if (!item) return;
    document.getElementById('edit-roomNumber').value = item.roomNumber || '';
    document.getElementById('edit-checkInDate').value = item.checkInDate || '';
    document.getElementById('edit-checkOutDate').value = item.checkOutDate || '';
    document.getElementById('edit-roomCapacity').value = item.roomCapacity || '';
    document.getElementById('edit-roomType').value = item.roomType || '';
    document.getElementById('edit-clientName').value = item.clientName || '';
    document.getElementById('edit-phone').value = item.phone || '';
    document.getElementById('edit-address').value = item.address || '';
    document.getElementById('edit-passport').value = item.passport || '';
    document.getElementById('edit-companions').value = item.companions || '';
    document.getElementById('edit-amount').value = item.amount || '';
    document.getElementById('edit-paymentMethod').value = item.paymentMethod || '';
    document.getElementById('edit-status').value = item.status || 'pending';
    bookingEditModal.style.display = 'block';
}

function closeBookingEdit() {
    bookingEditModal.style.display = 'none';
    editingBookingIdx = null;
}

if (closeBookingEditModal) closeBookingEditModal.onclick = closeBookingEdit;
if (cancelBookingEditBtn) cancelBookingEditBtn.onclick = closeBookingEdit;
window.onclick = function(event) {
    if (event.target === bookingEditModal) closeBookingEdit();
};

if (bookingEditForm) {
    bookingEditForm.onsubmit = function(e) {
        e.preventDefault();
        if (editingBookingIdx === null) return;
        const form = e.target;
        const bookingData = getData('bookingData');
        const updated = {
            ...bookingData[editingBookingIdx],
            roomNumber: form.roomNumber.value,
            checkInDate: form.checkInDate.value,
            checkOutDate: form.checkOutDate.value,
            roomCapacity: form.roomCapacity.value,
            roomType: form.roomType.value,
            clientName: form.clientName.value,
            phone: form.phone.value,
            address: form.address.value,
            passport: form.passport.value,
            companions: form.companions.value,
            amount: parseInt(form.amount.value) || 0,
            paymentMethod: form.paymentMethod.value,
            status: form.status.value
        };
        bookingData[editingBookingIdx] = updated;
        setData('bookingData', bookingData);
        renderBookingTable(getData('bookingData'));
        closeBookingEdit();
        alert('Band qilish muvaffaqiyatli tahrirlandi!');
    };
}

function openAccountingEditModal(index) {
    editingAccountingIdx = index;
    const accountingData = getData('accountingData');
    const item = accountingData[index];
    if (!item) return;
    document.getElementById('edit-accounting-amount').value = item.amount || '';
    document.getElementById('edit-accounting-type').value = item.type || 'income';
    document.getElementById('edit-accounting-source').value = item.source || '';
    document.getElementById('edit-accounting-date').value = item.date || '';
    document.getElementById('edit-accounting-note').value = item.note || '';
    accountingEditModal.style.display = 'block';
}

function closeAccountingEdit() {
    accountingEditModal.style.display = 'none';
    editingAccountingIdx = null;
}

if (closeAccountingEditModal) closeAccountingEditModal.onclick = closeAccountingEdit;
if (cancelAccountingEditBtn) cancelAccountingEditBtn.onclick = closeAccountingEdit;
window.addEventListener('click', function(event) {
    if (event.target === accountingEditModal) closeAccountingEdit();
});

if (accountingEditForm) {
    accountingEditForm.onsubmit = function(e) {
        e.preventDefault();
        if (editingAccountingIdx === null) return;
        const form = e.target;
        const accountingData = getData('accountingData');
        const updated = {
            ...accountingData[editingAccountingIdx],
            amount: parseInt(form.amount.value) || 0,
            type: form.type.value,
            source: form.source.value,
            date: form.date.value,
            note: form.note.value
        };
        accountingData[editingAccountingIdx] = updated;
        setData('accountingData', accountingData);
        renderAccountingTable();
        closeAccountingEdit();
        alert("Ma'lumot muvaffaqiyatli tahrirlandi!");
    };
}

// Qurilma turini aniqlash
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        return 'Telefon';
    }
    return 'Kompyuter';
}

// Viloyatni avtomatik aniqlash (ipinfo.io orqali)
async function getRegionAuto() {
    let region = localStorage.getItem('userRegion');
    if (!region) {
        try {
            const res = await fetch('http://ip-api.com/json/');
            if (res.ok) {
                const data = await res.json();
                console.log('IP-API DATA:', data);
                region = data.regionName || data.city || 'Noma\'lum';
                localStorage.setItem('userRegion', region);
            } else {
                region = 'Noma\'lum';
            }
        } catch (e) {
            region = 'Noma\'lum';
        }
    }
    return region;
}

// Tashrifni statistikaga yozish (asinxron)
async function logVisit() {
    const region = await getRegionAuto();
    const device = getDeviceType();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const monthStr = now.toISOString().slice(0, 7); // YYYY-MM
    const yearStr = now.getFullYear().toString();

    let stats = JSON.parse(localStorage.getItem('visitStats') || '{}');

    // Viloyat bo'yicha
    stats.regions = stats.regions || {};
    stats.regions[region] = (stats.regions[region] || 0) + 1;

    // Qurilma bo'yicha
    stats.devices = stats.devices || {};
    stats.devices[device] = (stats.devices[device] || 0) + 1;

    // Kunlik
    stats.daily = stats.daily || {};
    stats.daily[dateStr] = (stats.daily[dateStr] || 0) + 1;

    // Oylik
    stats.monthly = stats.monthly || {};
    stats.monthly[monthStr] = (stats.monthly[monthStr] || 0) + 1;

    // Yillik
    stats.yearly = stats.yearly || {};
    stats.yearly[yearStr] = (stats.yearly[yearStr] || 0) + 1;

    localStorage.setItem('visitStats', JSON.stringify(stats));
    console.log('Yangi tashrif statistikaga yozildi:', stats); // Tekshiruv uchun
}

// Statistikani chiqarish
function renderVisitStats() {
    const stats = JSON.parse(localStorage.getItem('visitStats') || '{}');
    // Viloyatlar
    let regionHtml = '<b>Viloyatlar:</b><ul>';
    if (stats.regions) {
        for (const [region, count] of Object.entries(stats.regions)) {
            regionHtml += `<li>${region}: ${count} ta</li>`;
        }
    }
    regionHtml += '</ul>';
    document.getElementById('region-stats').innerHTML = regionHtml;

    // Qurilma
    let deviceHtml = '<b>Qurilma turi:</b><ul>';
    if (stats.devices) {
        for (const [device, count] of Object.entries(stats.devices)) {
            deviceHtml += `<li>${device}: ${count} ta</li>`;
        }
    }
    deviceHtml += '</ul>';
    document.getElementById('device-stats').innerHTML = deviceHtml;

    // Kunlik
    let dailyHtml = '<b>Kunlik tashriflar:</b><ul>';
    if (stats.daily) {
        let days = Object.entries(stats.daily);
        days = days.slice(-7);
        days.forEach(([date, count]) => {
            dailyHtml += `<li>${date}: ${count} ta</li>`;
        });
    }
    dailyHtml += '</ul>';
    document.getElementById('daily-stats').innerHTML = dailyHtml;

    // Oylik
    let monthlyHtml = '<b>Oylik tashriflar:</b><ul>';
    if (stats.monthly) {
        let months = Object.entries(stats.monthly);
        months = months.slice(-6);
        months.forEach(([month, count]) => {
            monthlyHtml += `<li>${month}: ${count} ta</li>`;
        });
    }
    monthlyHtml += '</ul>';
    document.getElementById('monthly-stats').innerHTML = monthlyHtml;

    // Yillik
    let yearlyHtml = '<b>Yillik tashriflar:</b><ul>';
    if (stats.yearly) {
        for (const [year, count] of Object.entries(stats.yearly)) {
            yearlyHtml += `<li>${year}: ${count} ta</li>`;
        }
    }
    yearlyHtml += '</ul>';
    document.getElementById('yearly-stats').innerHTML = yearlyHtml;
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', async function() {
    await logVisit();
    renderVisitStats();
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
    });
}

