document.addEventListener('DOMContentLoaded', () => {
    // --- Tilni boshqarish logikasi ---
    const translations = {
        uz: {
            // General
            home: "Bosh Sahifa",
            about: "Biz Haqimizda",
            treatments: "Davolash",
            rooms: "Xonalar",
            gallery: "Galereya",
            bookNow: "Hozir band qilish",
            viewMore: "Batafsil ko'rish",
            send: "Yuborish",
            read_more: "Batafsil o'qish",
            created_at: "Yaratilgan:",
            sending_message: "Yuborilmoqda...",
            booking_success: "Band qilish muvaffaqiyatli amalga oshirildi!",
            booking_error: "Band qilishda xato yuz berdi.",
            fill_all_fields: "Iltimos, barcha majburiy maydonlarni to'ldiring.",
            noNewsAvailable: "Hozircha yangiliklar mavjud emas.",
            newsLoadError: "Yangiliklarni yuklashda xato yuz berdi.",
            noDataFound: "Ma'lumotlar topilmadi!",
            income: "Daromad",
            expense: "Xarajat",
            date: "Sana",
            amount: "Summa",
            type: "Turi",
            sourceCategory: "Manba/Kategoriya",
            note: "Izoh",
            accountingReportTitle: "Buxgalteriya hisobi",
            accountingSheetName: "Buxgalteriya",
            server_not_found: "Server topilmadi yoki ulanishda xato yuz berdi.",
            send_question: "Savol yuborish",
            question_form_title: "Savol Yuborish",
            question_placeholder: "Savolingizni yozing...",
            question_sent_success: "Savol muvaffaqiyatli yuborildi!",
            question_error: "Savol yuborishda xato yuz berdi.",

            // Header
            sanatoriumName: "Oltinsoy Xususiy Sanatoriyasi",
            // Hero Section
            heroTitle: "Tabiat Nafosati va Sog'lom Hayot",
            heroDescription: "Oltinsoy Xususiy Sanatoriyasi - bu sizning sog'lig'ingiz va ruhingizni yoshartirish uchun ideal joy. Bizning shifobaxsh muhitimizda tabiiy go'zallik va zamonaviy tibbiy xizmatlar uyg'unlashgan.",
            // About Section
            aboutTitle: "Biz Haqimizda",
            aboutText: "Oltinsoy Xususiy Sanatoriyasi noyob tabiiy resurslar va ilg'or tibbiy texnologiyalarni birlashtirgan holda mijozlarimizga eng yuqori sifatli davolash va dam olish xizmatlarini taklif etadi. Bizning mutaxassislarimiz har bir mehmonning shaxsiy ehtiyojlariga e'tibor qaratib, sog'liqni tiklash va farovonlikni ta'minlaydi. Bizning sanatoriyamizda siz toza havo, shifobaxsh suvlar va tinch muhitdan bahramand bo'lishingiz mumkin, bu esa to'liq tiklanishga yordam beradi.",
            // Treatments Section
            treatmentsTitle: "Bizning Davolash Usullari",
            treatment1Title: "Balneoterapiya",
            treatment1Desc: "Mineral suvlar bilan davolash, surunkali kasalliklarni yengillashtirish.",
            treatment2Title: "Fizioterapiya",
            treatment2Desc: "Fizik omillar orqali davolash, harakatni yaxshilash.",
            treatment3Title: "Dietoterapiya",
            treatment3Desc: "Maxsus ovqatlanish dasturlari, ovqat hazmini yaxshilash.",
            treatment4Title: "Loyiqa bilan davolash",
            treatment4Desc: "Tabiiy loydan foydalanish, yallig'lanishni kamaytirish.",
            // Rooms Section
            roomsTitle: "Qulay Xonalarimiz",
            roomStandardTitle: "Standart Xona",
            roomStandardDesc: "Qulay va shinam, barcha qulayliklar mavjud.",
            roomDeluxeTitle: "Lyuks Xona",
            roomDeluxeDesc: "Keng va hashamatli, yuqori darajadagi xizmat.",
            roomFamilyTitle: "Oilaviy Xona",
            roomFamilyDesc: "Kattaroq oilalar uchun mo'ljallangan, ikki xonali.",
            // Gallery Section
            galleryTitle: "Galereyamiz",
            // News Section
            newsTitle: "So'nggi Yangiliklar",
            // Booking Form
            bookingFormTitle: "Band Qilish",
            roomType: "Xona turi:",
            standardRoom: "Standart Xona",
            deluxeRoom: "Lyuks Xona",
            familyRoom: "Oilaviy Xona",
            checkInDate: "Kelish sanasi:",
            checkOutDate: "Ketish sanasi:",
            nights: "Tunlar soni:",
            guests: "Mehmonlar soni:",
            fullName: "To'liq ism:",
            yourEmail: "Sizning emailingiz:",
            phoneNumber: "Telefon raqami:",
            bookNowButton: "Hozir Band Qilish",
            contact: "Aloqa",
            address: "Navoiy viloyati, Xatirchi tumani, Oltinsoy massivi Baxshijar mahhalasi, Markaziy qishlog'i",
            workingHours: "Har kuni 08:00 - 20:00",
            mapTitle: "Sanatoriya manzili xaritada",
            contactInfoHeading: "Aloqa Ma'lumotlari",
            phone1: "+998 (94) 255-66-66",
            phone2: "+998 (93) 436-63-63",
            email: "info@oltinsoy.uz",
            siteTitle: "Oltinsoy Xususiy Sanatoriyasi - Tabiat Nafosati va Sog'lom Hayot",
            treatmentsDescription: "Oltinsoy Xususiy Sanatoriyasida sizga turli kasalliklarni davolash va sog'ligingizni yaxshilash uchun keng turdagi muolajalar taklif etiladi. Bizning mutaxassislarimiz sizning ehtiyojlaringizga mos keladigan individual davolash rejalarini ishlab chiqadilar.",
            treatmentMineralBathTitle: "Mineral vanna",
            treatmentMineralBathDesc: "Tanani minerallar bilan boyitish va umumiy sog'liqni yaxshilash uchun foydali muolaja.",
            treatmentParaffinTitle: "Parafin",
            treatmentParaffinDesc: "Mushaklar va bo'g'imlardagi og'riqlarni yengillashtirish, qon aylanishini yaxshilash uchun issiq parafin terapiyasi.",
            treatmentElectrophoresisTitle: "Elektrofarez",
            treatmentElectrophoresisDesc: "Dori vositalarini elektr toki yordamida teriga chuqur singdirish, og'riqni kamaytirish va shishlarni yo'qotish.",
            treatmentElectronTitle: "Elektron",
            treatmentElectronDesc: "Elektron vositalar yordamida turli terapevtik muolajalar.",
            treatmentUziTitle: "UZI",
            treatmentUziDesc: "Ichki organlarni ultratovush yordamida tekshirish va tashxis qo'yish.",
            treatmentHydroBathTitle: "Gidrovanna",
            treatmentHydroBathDesc: "Suv bosimi va harorati yordamida tanani bo'shashtirish va qon aylanishini yaxshilash.",
            treatmentSpineTitle: "Umurtqa",
            treatmentSpineDesc: "Umurtqa pog'onasi kasalliklarini davolashga qaratilgan maxsus muolajalar.",
            treatmentFractureTherapyTitle: "Sinish (Terapiya)",
            treatmentFractureTherapyDesc: "Suyak sinishidan keyingi reabilitatsiya va tiklanish muolajalari.",
            treatmentFractureLampTitle: "Sinish chiroq",
            treatmentFractureLampDesc: "Yorug'lik terapiyasi orqali tanani tiklash va og'riqlarni kamaytirish.",
            treatmentDarsivalTitle: "Darsival",
            treatmentDarsivalDesc: "Maxsus davolash usullari va preparatlarni o'z ichiga olgan kompleks terapiya.",
            treatmentInfogavatsyaTitle: "Infogavatsya",
            treatmentInfogavatsyaDesc: "Organizmga kerakli moddalarni tomir orqali yuborish, quvvatni tiklash.",
            treatmentVB4Title: "VB4",
            treatmentVB4Desc: "Organizmga vitaminlar va biologik faol moddalarni kiritish orqali mustahkamlash.",
            treatmentPartialMassageTitle: "Massaj (Qisman)",
            treatmentPartialMassageDesc: "Ma'lum bir tana qismiga qaratilgan, og'riqni yengillashtiruvchi massaj.",
            treatmentPaidTitle: "Pullik davolash",
            treatmentPaidDesc: "Maxsus, yuqori sifatli va qo'shimcha xizmatlarni o'z ichiga olgan davolash turlari.",
            treatmentEktTitle: "EKT",
            treatmentEktDesc: "Nerv tizimi va ruhiy holatni yaxshilashga qaratilgan elektrostimulyatsiya.",
            treatmentOzoneTitle: "Ozon terapiyasi",
            treatmentOzoneDesc: "Ozon yordamida qonni boyitish, immunitetni oshirish va yallig'lanishni kamaytirish.",
            treatmentSilverGloveTitle: "Kumush qolqop",
            treatmentSilverGloveDesc: "Kumush ionlari asosidagi davolash, bakteriyalarga qarshi kurashish va tanani tozalash.",
            treatmentLymphDrainageTitle: "Limfa drenaji",
            treatmentLymphDrainageDesc: "Limfa tizimini faollashtirish, shishlarni kamaytirish va detoksifikatsiya.",
            treatmentFireBankTitle: "Olovli bank",
            treatmentFireBankDesc: "Tana yuzasiga issiq bankalar qo'yish orqali qon aylanishini yaxshilash va og'riqni kamaytirish.",
            treatmentAttentionTitle: "E'tiborsizlik (Muolaja)",
            treatmentAttentionDesc: "Maxsus terapiyalar orqali diqqatni jamlash va psixologik holatni yaxshilash.",
            treatmentDeepMassageTitle: "Massaj (Chuqur)",
            treatmentDeepMassageDesc: "Mushaklarga chuqur ta'sir ko'rsatuvchi, taranglikni bartaraf etuvchi massaj.",
            // --- ADDITIONAL TRANSLATIONS FOR ROOMS, GALLERY, CONTACT FORM ---
            roomsDescription: "Qulay va shinam xonalarimizda qolib, go'zal tabiatdan bahramand bo'ling. Har bir xona dam olishingiz uchun barcha sharoitlarga ega. Bizning xonalarimizda siz toza havo, shifobaxsh muhit va tinch dam olish imkoniyatiga ega bo'lasiz. Har bir xona zamonaviy jihozlangan va sizning qulayligingiz uchun mo'ljallangan.",
            room1Title: "Standart xona",
            room1Text: "Bir yoki ikki kishi uchun qulay va shinam xona. Zamonaviy jihozlangan, toza va shifobaxsh muhitda dam olish imkoniyati.",
            room2Title: "Oilaviy xona",
            room2Text: "Kattaroq oilalar uchun mo'ljallangan keng va qulay xona. Oilaviy dam olish uchun barcha sharoitlar yaratilgan.",
            room3Title: "Lyuks xona",
            room3Text: "Qo'shimcha qulayliklar va hashamatli dizayn bilan jihozlangan xona. Yuqori darajadagi dam olish va qulaylik uchun.",
            galleryDescription: "Sanatoriyamizning go'zal manzaralari va qulay sharoitlari haqida tasavvurga ega bo'lish uchun fotosuratlarimizni ko'rib chiqing.",
            contactFormTitle: "Biz bilan bog'lanish",
            fullName: "To'liq ism:",
            yourEmail: "Sizning emailingiz:",
            phoneNumber: "Telefon raqami:",
            question_placeholder: "Savolingizni yozing...",
            send_question: "Savol yuborish",
            aboutFeature1Title: "Sog'likni tiklash",
            aboutFeature1Text: "Eng so'nggi tibbiy texnologiyalar yordamida sog'ligingizni tiklang va mustahkamlang.",
            aboutFeature2Title: "Tabiiy muhit",
            aboutFeature2Text: "Toza havo, go'zal tabiat va sokin muhitda dam oling.",
            aboutFeature3Title: "Dam olish va yoshartirish",
            aboutFeature3Text: "Spa-muolajalar va maxsus dasturlar bilan yosharing.",
        },
        ru: {
            // General
            home: "Главная",
            about: "О нас",
            treatments: "Лечение",
            rooms: "Номера",
            gallery: "Галерея",
            bookNow: "Забронировать сейчас",
            viewMore: "Подробнее",
            send: "Отправить",
            read_more: "Читать далее",
            created_at: "Создано:",
            sending_message: "Отправка...",
            booking_success: "Бронирование успешно завершено!",
            booking_error: "Произошла ошибка при бронировании.",
            fill_all_fields: "Пожалуйста, заполните все обязательные поля.",
            noNewsAvailable: "Пока нет новостей.",
            newsLoadError: "Произошла ошибка при загрузке новостей.",
            noDataFound: "Данные не найдены!",
            income: "Доход",
            expense: "Расход",
            date: "Дата",
            amount: "Сумма",
            type: "Тип",
            sourceCategory: "Источник/Категория",
            note: "Примечание",
            accountingReportTitle: "Бухгалтерский отчет",
            accountingSheetName: "Бухгалтерия",
            server_not_found: "Сервер не найден или произошла ошибка подключения.",
            send_question: "Отправить вопрос",
            question_form_title: "Отправить Вопрос",
            question_placeholder: "Ваш вопрос...",
            question_sent_success: "Вопрос успешно отправлен!",
            question_error: "Произошла ошибка при отправке вопроса.",

            // Header
            sanatoriumName: "Санаторий Олтинсой",
            // Hero Section
            heroTitle: "Красота Природы и Здоровый Образ Жизни",
            heroDescription: "Санаторий Олтинсой - идеальное место для оздоровления и омоложения вашего тела и духа. В нашей целительной атмосфере сочетаются природная красота и современные медицинские услуги.",
            // About Section
            aboutTitle: "О нас",
            aboutText: "Санаторий Олтинсой предлагает нашим клиентам высококачественные услуги лечения и отдыха, сочетая уникальные природные ресурсы с передовыми медицинскими технологиями. Наши специалисты уделяют внимание индивидуальным потребностям каждого гостя, обеспечивая восстановление здоровья и благополучие. В нашем санатории вы можете насладиться чистым воздухом, целебными водами и спокойной обстановкой, что способствует полному восстановлению.",
            // Treatments Section
            treatmentsTitle: "Наши Методы Лечения",
            treatment1Title: "Бальнеотерапия",
            treatment1Desc: "Лечение минеральными водами, облегчение хронических заболеваний.",
            treatment2Title: "Физиотерапия",
            treatment2Desc: "Лечение физическими факторами, улучшение подвижности.",
            treatment3Title: "Диетотерапия",
            treatment3Desc: "Специальные программы питания, улучшение пищеварения.",
            treatment4Title: "Грязелечение",
            treatment4Desc: "Использование природной грязи, уменьшение воспалений.",
            // Rooms Section
            roomsTitle: "Наши Уютные Номера",
            roomStandardTitle: "Стандартный Номер",
            roomStandardDesc: "Удобный и уютный, со всеми удобствами.",
            roomDeluxeTitle: "Номер Люкс",
            roomDeluxeDesc: "Просторный и роскошный, с высоким уровнем обслуживания.",
            roomFamilyTitle: "Семейный Номер",
            roomFamilyDesc: "Предназначен для больших семей, двухкомнатный.",
            // Gallery Section
            galleryTitle: "Наша Галерея",
            // News Section
            newsTitle: "Последние Новости",
            // Booking Form
            bookingFormTitle: "Бронирование",
            roomType: "Тип номера:",
            standardRoom: "Стандартный номер",
            deluxeRoom: "Люкс номер",
            familyRoom: "Семейный номер",
            checkInDate: "Дата заезда:",
            checkOutDate: "Дата выезда:",
            nights: "Количество ночей:",
            guests: "Количество гостей:",
            fullName: "Полное имя:",
            yourEmail: "Ваш email:",
            phoneNumber: "Номер телефона:",
            bookNowButton: "Забронировать сейчас",
            contact: "Контакты",
            address: "Навоийская область, Хатырчинский район, массив Олтинсой, махалля Бахшижар, Центральный кишлак",
            workingHours: "Каждый день 08:00 - 20:00",
            mapTitle: "Адрес санатория на карте",
            contactInfoHeading: "Контактная информация",
            phone1: "+998 (94) 255-66-66",
            phone2: "+998 (93) 436-63-63",
            email: "info@oltinsoy.uz",
            siteTitle: "Oltinsoy Частный Санаторий - Природа и Здоровье",
            treatmentsDescription: "В санатории Олтинсой вам предлагается широкий спектр процедур для лечения различных заболеваний и улучшения здоровья. Наши специалисты разрабатывают индивидуальные лечебные программы, соответствующие вашим потребностям.",
            treatmentMineralBathTitle: "Минеральная ванна",
            treatmentMineralBathDesc: "Полезная процедура для обогащения организма минералами и улучшения общего состояния здоровья.",
            treatmentParaffinTitle: "Парафин",
            treatmentParaffinDesc: "Горячая парафиновая терапия для облегчения болей в мышцах и суставах, улучшения кровообращения.",
            treatmentElectrophoresisTitle: "Электрофорез",
            treatmentElectrophoresisDesc: "Введение лекарств с помощью электрического тока для снятия боли и отеков.",
            treatmentElectronTitle: "Электрон",
            treatmentElectronDesc: "Различные терапевтические процедуры с использованием электронных устройств.",
            treatmentUziTitle: "УЗИ",
            treatmentUziDesc: "Ультразвуковое исследование и диагностика внутренних органов.",
            treatmentHydroBathTitle: "Гидрованна",
            treatmentHydroBathDesc: "Расслабление тела и улучшение кровообращения с помощью давления и температуры воды.",
            treatmentSpineTitle: "Позвоночник",
            treatmentSpineDesc: "Специальные процедуры для лечения заболеваний позвоночника.",
            treatmentFractureTherapyTitle: "Перелом (Терапия)",
            treatmentFractureTherapyDesc: "Реабилитация и восстановление после переломов костей.",
            treatmentFractureLampTitle: "Лампа для переломов",
            treatmentFractureLampDesc: "Светотерапия для восстановления и уменьшения болей.",
            treatmentDarsivalTitle: "Дарсивал",
            treatmentDarsivalDesc: "Комплексная терапия с использованием специальных методов и препаратов.",
            treatmentInfogavatsyaTitle: "Инфогавация",
            treatmentInfogavatsyaDesc: "Введение необходимых веществ в организм через вену для восстановления сил.",
            treatmentVB4Title: "VB4",
            treatmentVB4Desc: "Укрепление организма с помощью витаминов и биологически активных веществ.",
            treatmentPartialMassageTitle: "Массаж (Частичный)",
            treatmentPartialMassageDesc: "Массаж, направленный на определенную часть тела для снятия боли.",
            treatmentPaidTitle: "Платное лечение",
            treatmentPaidDesc: "Специальные, высококачественные и дополнительные услуги.",
            treatmentEktTitle: "ЭКТ",
            treatmentEktDesc: "Электростимуляция для улучшения нервной системы и психического состояния.",
            treatmentOzoneTitle: "Озонотерапия",
            treatmentOzoneDesc: "Обогащение крови озоном, повышение иммунитета и уменьшение воспаления.",
            treatmentSilverGloveTitle: "Серебряная перчатка",
            treatmentSilverGloveDesc: "Лечение на основе ионов серебра для борьбы с бактерияларга и очищения организма.",
            treatmentLymphDrainageTitle: "Лимфодренаж",
            treatmentLymphDrainageDesc: "Активация лимфатической системы, уменьшение отеков и детоксикация.",
            treatmentFireBankTitle: "Огненная банка",
            treatmentFireBankDesc: "Улучшение кровообращения и уменьшение боли с помощью горячих банок.",
            treatmentAttentionTitle: "Внимание (Терапия)",
            treatmentAttentionDesc: "Специальные терапии для концентрации внимания и улучшения психологического состояния.",
            treatmentDeepMassageTitle: "Массаж (Глубокий)",
            treatmentDeepMassageDesc: "Глубокий массаж для снятия напряжения в мышцах.",
            // --- ADDITIONAL TRANSLATIONS FOR ROOMS, GALLERY, CONTACT FORM ---
            roomsDescription: "Остановитесь в наших уютных и комфортабельных номерах и насладитесь прекрасной природой. Каждый номер оснащен всем необходимым для вашего отдыха. В наших номерах вы сможете дышать свежим воздухом, наслаждаться целебной атмосферой и спокойствием. Каждый номер современно оборудован и предназначен для вашего удобства.",
            room1Title: "Стандартный номер",
            room1Text: "Уютный и комфортабельный номер для одного или двух человек. Современно оборудован, чистый и целебная атмосфера для отдыха.",
            room2Title: "Семейный номер",
            room2Text: "Просторный и удобный номер для больших семей. Все условия для семейного отдыха созданы.",
            room3Title: "Люкс номер",
            room3Text: "Номер с дополнительными удобствами и роскошным дизайном. Для высокого уровня отдыха и комфорта.",
            galleryDescription: "Ознакомьтесь с нашими фотографиями, чтобы получить представление о красивых пейзажах и комфортных условиях нашего санатория.",
            contactFormTitle: "Связаться с нами",
            fullName: "Полное имя:",
            yourEmail: "Ваш email:",
            phoneNumber: "Номер телефона:",
            question_placeholder: "Введите ваш вопрос...",
            send_question: "Отправить вопрос",
            aboutFeature1Title: "Восстановление здоровья",
            aboutFeature1Text: "Восстановите и укрепите свое здоровье с помощью современных медицинских технологий.",
            aboutFeature2Title: "Природная среда",
            aboutFeature2Text: "Отдыхайте на свежем воздухе, наслаждайтесь красивой природой и спокойной атмосферой.",
            aboutFeature3Title: "Отдых и омоложение",
            aboutFeature3Text: "Омолодитесь с помощью спа-процедур и специальных программ.",
        },
        en: {
            // General
            home: "Home",
            about: "About Us",
            treatments: "Treatments",
            rooms: "Rooms",
            gallery: "Gallery",
            bookNow: "Book Now",
            viewMore: "View More",
            send: "Send",
            read_more: "Read More",
            created_at: "Created At:",
            sending_message: "Sending...",
            booking_success: "Booking completed successfully!",
            booking_error: "An error occurred during booking.",
            fill_all_fields: "Please fill in all required fields.",
            noNewsAvailable: "No news available yet.",
            newsLoadError: "An error occurred while loading news.",
            noDataFound: "No data found!",
            income: "Income",
            expense: "Expense",
            date: "Date",
            amount: "Amount",
            type: "Type",
            sourceCategory: "Source/Category",
            note: "Note",
            accountingReportTitle: "Accounting Report",
            accountingSheetName: "Accounting",
            server_not_found: "Server not found or connection error occurred.",
            send_question: "Send Question",
            question_form_title: "Send a Question",
            question_placeholder: "Your question...",
            question_sent_success: "Question sent successfully!",
            question_error: "An error occurred while sending the question.",

            // Header
            sanatoriumName: "Oltinsoy Sanatorium",
            // Hero Section
            heroTitle: "Nature's Serenity and Healthy Living",
            heroDescription: "Oltinsoy Sanatorium is an ideal place to rejuvenate your health and spirit. Our healing environment combines natural beauty with modern medical services.",
            // About Section
            aboutTitle: "About Us",
            aboutText: "Oltinsoy Sanatorium offers high-quality treatment and relaxation services to our clients, combining unique natural resources with advanced medical technologies. Our specialists pay attention to the individual needs of each guest, ensuring health restoration and well-being. At our sanatorium, you can enjoy fresh air, healing waters, and a peaceful environment, which contributes to complete recovery.",
            // Treatments Section
            treatmentsTitle: "Our Treatment Methods",
            treatment1Title: "Balneotherapy",
            treatment1Desc: "Treatment with mineral waters, alleviating chronic diseases.",
            treatment2Title: "Physiotherapy",
            treatment2Desc: "Treatment with physical factors, improving mobility.",
            treatment3Title: "Dietotherapy",
            treatment3Desc: "Special dietary programs, improving digestion.",
            treatment4Title: "Mud Therapy",
            treatment4Desc: "Use of natural mud, reducing inflammation.",
            // Rooms Section
            roomsTitle: "Our Comfortable Rooms",
            roomStandardTitle: "Standard Room",
            roomStandardDesc: "Comfortable and cozy, with all amenities.",
            roomDeluxeTitle: "Deluxe Room",
            roomDeluxeDesc: "Spacious and luxurious, with high-level service.",
            roomFamilyTitle: "Family Room",
            roomFamilyDesc: "Designed for larger families, two rooms.",
            // Gallery Section
            galleryTitle: "Our Gallery",
            // News Section
            newsTitle: "Latest News",
            // Booking Form
            bookingFormTitle: "Booking",
            roomType: "Room Type:",
            standardRoom: "Standard Room",
            deluxeRoom: "Deluxe Room",
            familyRoom: "Family Room",
            checkInDate: "Check-in Date:",
            checkOutDate: "Check-out Date:",
            nights: "Number of Nights:",
            guests: "Number of Guests:",
            fullName: "Full Name:",
            yourEmail: "Your Email:",
            phoneNumber: "Phone Number:",
            bookNowButton: "Book Now",
            contact: "Contact",
            address: "Navoi region, Khatirchi district, Oltinsoy massif, Bakhshijar mahalla, Central village",
            workingHours: "Every day 08:00 - 20:00",
            mapTitle: "Sanatorium address on the map",
            contactInfoHeading: "Contact Information",
            phone1: "+998 (94) 255-66-66",
            phone2: "+998 (93) 436-63-63",
            email: "info@oltinsoy.uz",
            siteTitle: "Oltinsoy Private Sanatorium - Nature & Healthy Life",
            treatmentsDescription: "Oltinsoy Sanatorium offers a wide range of treatments for various diseases and to improve your health. Our specialists develop individual treatment plans tailored to your needs.",
            treatmentMineralBathTitle: "Mineral Bath",
            treatmentMineralBathDesc: "A beneficial procedure to enrich the body with minerals and improve overall health.",
            treatmentParaffinTitle: "Paraffin",
            treatmentParaffinDesc: "Hot paraffin therapy to relieve muscle and joint pain, improve blood circulation.",
            treatmentElectrophoresisTitle: "Electrophoresis",
            treatmentElectrophoresisDesc: "Delivering medications deep into the skin using electric current to reduce pain and swelling.",
            treatmentElectronTitle: "Electron",
            treatmentElectronDesc: "Various therapeutic procedures using electronic devices.",
            treatmentUziTitle: "Ultrasound (UZI)",
            treatmentUziDesc: "Ultrasound examination and diagnosis of internal organs.",
            treatmentHydroBathTitle: "Hydro Bath",
            treatmentHydroBathDesc: "Relaxing the body and improving blood circulation using water pressure and temperature.",
            treatmentSpineTitle: "Spine",
            treatmentSpineDesc: "Special procedures aimed at treating spinal diseases.",
            treatmentFractureTherapyTitle: "Fracture (Therapy)",
            treatmentFractureTherapyDesc: "Rehabilitation and recovery procedures after bone fractures.",
            treatmentFractureLampTitle: "Fracture Lamp",
            treatmentFractureLampDesc: "Light therapy for recovery and pain relief.",
            treatmentDarsivalTitle: "Darsival",
            treatmentDarsivalDesc: "Comprehensive therapy including special methods and medications.",
            treatmentInfogavatsyaTitle: "Infogavatsya",
            treatmentInfogavatsyaDesc: "Intravenous administration of necessary substances to restore energy.",
            treatmentVB4Title: "VB4",
            treatmentVB4Desc: "Strengthening the body with vitamins and biologically active substances.",
            treatmentPartialMassageTitle: "Massage (Partial)",
            treatmentPartialMassageDesc: "Massage focused on a specific body part to relieve pain.",
            treatmentPaidTitle: "Paid Treatment",
            treatmentPaidDesc: "Special, high-quality and additional services.",
            treatmentEktTitle: "ECT",
            treatmentEktDesc: "Electrostimulation aimed at improving the nervous system and mental state.",
            treatmentOzoneTitle: "Ozone Therapy",
            treatmentOzoneDesc: "Enriching the blood with ozone, boosting immunity and reducing inflammation.",
            treatmentSilverGloveTitle: "Silver Glove",
            treatmentSilverGloveDesc: "Silver ion-based treatment to fight bacteria and cleanse the body.",
            treatmentLymphDrainageTitle: "Lymph Drainage",
            treatmentLymphDrainageDesc: "Activating the lymphatic system, reducing swelling and detoxification.",
            treatmentFireBankTitle: "Fire Bank",
            treatmentFireBankDesc: "Improving blood circulation and reducing pain by applying hot banks to the body.",
            treatmentAttentionTitle: "Attention (Therapy)",
            treatmentAttentionDesc: "Special therapies to improve concentration and psychological state.",
            treatmentDeepMassageTitle: "Massage (Deep)",
            treatmentDeepMassageDesc: "Deep massage to relieve muscle tension.",
            // --- ADDITIONAL TRANSLATIONS FOR ROOMS, GALLERY, CONTACT FORM ---
            roomsDescription: "Stay in our comfortable and cozy rooms and enjoy the beautiful nature. Each room is equipped with everything you need for your rest. In our rooms, you will enjoy fresh air, a healing environment, and peaceful relaxation. Every room is modernly equipped and designed for your comfort.",
            room1Title: "Standard Room",
            room1Text: "A comfortable and cozy room for one or two people. Modernly equipped, clean, and a healing environment for relaxation.",
            room2Title: "Family Room",
            room2Text: "A spacious and comfortable room for larger families. All conditions for family rest are provided.",
            room3Title: "Deluxe Room",
            room3Text: "A room with additional amenities and luxurious design. For a high level of rest and comfort.",
            galleryDescription: "View our photos to get an idea of the beautiful scenery and comfortable conditions of our sanatorium.",
            contactFormTitle: "Contact Us",
            fullName: "Full Name:",
            yourEmail: "Your email:",
            phoneNumber: "Phone number:",
            question_placeholder: "Type your question...",
            send_question: "Send Question",
            aboutFeature1Title: "Health Recovery",
            aboutFeature1Text: "Restore and strengthen your health with the latest medical technologies.",
            aboutFeature2Title: "Natural Environment",
            aboutFeature2Text: "Relax in fresh air, enjoy beautiful nature and a peaceful atmosphere.",
            aboutFeature3Title: "Relaxation and Rejuvenation",
            aboutFeature3Text: "Rejuvenate with spa treatments and special programs.",
        },
        kz: {
            // General
            home: "Басты бет",
            about: "Біз туралы",
            treatments: "Емдеу",
            rooms: "Бөлмелер",
            gallery: "Галерея",
            bookNow: "Қазір брондау",
            viewMore: "Толығырақ",
            send: "Жіберу",
            read_more: "Толығырақ оқу",
            created_at: "Жасалған:",
            sending_message: "Жіберілуде...",
            booking_success: "Брондау сәтті аяқталды!",
            booking_error: "Брондау кезінде қате орын алды.",
            fill_all_fields: "Барлық қажетті өрістерді толтырыңыз.",
            noNewsAvailable: "Әзірге жаңалықтар жоқ.",
            newsLoadError: "Жаңалықтарды жүктеу кезінде қате орын алды.",
            noDataFound: "Деректер табылмады!",
            income: "Табыс",
            expense: "Шығыс",
            date: "Күні",
            amount: "Сома",
            type: "Түрі",
            sourceCategory: "Дереккөз/Санат",
            note: "Ескерту",
            accountingReportTitle: "Бухгалтерлік есеп",
            accountingSheetName: "Бухгалтерия",
            server_not_found: "Сервер табылмады немесе қосылу кезінде қате орын алды.",
            send_question: "Сұрақ жіберу",
            question_form_title: "Сұрақ Жіберу",
            question_placeholder: "Сіздің сұрағыңыз...",
            question_sent_success: "Сұрақ сәтті жіберілді!",
            question_error: "Сұрақ жіберу кезінде қате орын алды.",

            // Header
            sanatoriumName: "Олтинсой Санаторийі",
            // Hero Section
            heroTitle: "Табиғаттың Тыныштығы және Салауатты Өмір",
            heroDescription: "Олтинсой Санаторийі - денсаулығыңызды және рухыңызды жасартуға арналған тамаша орын. Біздің емдік ортамызда табиғи сұлулық пен заманауи медициналық қызметтер үйлеседі.",
            // About Section
            aboutTitle: "Біз туралы",
            aboutText: "Олтинсой Санаторийі бірегей табиғи ресурстар мен озық медициналық технологияларды біріктіре отырып, клиенттерімізге жоғары сапалы емдеу және демалыс қызметтерін ұсынады. Біздің мамандарымыз әрбір қонақтың жеке қажеттіліктеріне назар аударып, денсаулықты қалпына келтіруді және әл-ауқатты қамтамасыз етеді. Біздің санаторийде сіз таза ауадан, емдік сулардан және тыныш ортадан ләззат ала аласыз, бұл толық қалпына келуге ықпал етеді.",
            // Treatments Section
            treatmentsTitle: "Біздің Емдеу Әдістеріміз",
            treatment1Title: "Бальнеотерапия",
            treatment1Desc: "Минералды сулармен емдеу, созылмалы ауруларды жеңілдету.",
            treatment2Title: "Физиотерапия",
            treatment2Desc: "Физикалық факторлар арқылы емдеу, қозғалысты жақсарту.",
            treatment3Title: "Диетотерапия",
            treatment3Desc: "Арнайы тамақтану бағдарламалары, ас қорытуды жақсарту.",
            treatment4Title: "Балшықпен емдеу",
            treatment4Desc: "Табиғи балшықты қолдану, қабынуды азайту.",
            // Rooms Section
            roomsTitle: "Біздің Ыңғайлы Бөлмелеріміз",
            roomStandardTitle: "Стандартты бөлме",
            roomStandardDesc: "Ыңғайлы және жайлы, барлық ыңғайлылықтармен.",
            roomDeluxeTitle: "Люкс бөлме",
            roomDeluxeDesc: "Кең және сәнді, жоғары деңгейдегі қызмет көрсетумен.",
            roomFamilyTitle: "Отбасылық бөлме",
            roomFamilyDesc: "Үлкен отбасыларға арналған, екі бөлмелі.",
            // Gallery Section
            galleryTitle: "Біздің Галерея",
            // News Section
            newsTitle: "Соңғы Жаңалықтар",
            // Booking Form
            bookingFormTitle: "Брондау",
            roomType: "Бөлме түрі:",
            standardRoom: "Стандартты бөлме",
            deluxeRoom: "Люкс бөлме",
            familyRoom: "Отбасылық бөлме",
            checkInDate: "Келу күні:",
            checkOutDate: "Кету күні:",
            nights: "Түндер саны:",
            guests: "Қонақтар саны:",
            fullName: "Толық аты-жөні:",
            yourEmail: "Сіздің email:",
            phoneNumber: "Телефон нөірі:",
            bookNowButton: "Қазір брондау",
            contact: "Байланыс",
            address: "Навои облысы, Хатырчи ауданы, Олтинсой массиві, Бахшижар махалласы, Орталық ауыл",
            workingHours: "Күн сайын 08:00 - 20:00",
            mapTitle: "Санаторий мекенжайы картада",
            contactInfoHeading: "Байланыс ақпараты",
            phone1: "+998 (94) 255-66-66",
            phone2: "+998 (93) 436-63-63",
            email: "info@oltinsoy.uz",
            siteTitle: "Oltinsoy Жеке Санаторийі - Табиғат пен Денсаулық",
            treatmentsDescription: "Олтинсой санаторийінде әртүрлі ауруларды емдеу және денсаулықты жақсарту үшін кең ауқымды процедуралар ұсынылады. Біздің мамандар сіздің қажеттіліктеріңізге сәйкес жеке емдеу бағдарламаларын әзірлейді.",
            treatmentMineralBathTitle: "Минералды ванна",
            treatmentMineralBathDesc: "Денені минералдармен байыту және жалпы денсаулықты жақсарту үшін пайдалы процедура.",
            treatmentParaffinTitle: "Парафин",
            treatmentParaffinDesc: "Бұлшықеттер мен буындардағы ауырсынуды жеңілдету, қан айналымын жақсарту үшін ыстық парафин терапиясы.",
            treatmentElectrophoresisTitle: "Электрофорез",
            treatmentElectrophoresisDesc: "Дәрі-дәрмектерді электр тогы арқылы теріге терең енгізу, ауырсынуды және ісінуді азайту.",
            treatmentElectronTitle: "Электрон",
            treatmentElectronDesc: "Электрондық құрылғыларды қолданатын әртүрлі терапиялық процедуралар.",
            treatmentUziTitle: "УДЗ",
            treatmentUziDesc: "Ішкі ағзаларды ультрадыбыстық зерттеу және диагностика.",
            treatmentHydroBathTitle: "Гидрованна",
            treatmentHydroBathDesc: "Су қысымы мен температурасы арқылы денені босаңсыту және қан айналымын жақсарту.",
            treatmentSpineTitle: "Омыртқа",
            treatmentSpineDesc: "Омыртқа ауруларын емдеуге арналған арнайы процедуралар.",
            treatmentFractureTherapyTitle: "Сынық (Терапия)",
            treatmentFractureTherapyDesc: "Сүйек сынғаннан кейінгі оңалту және қалпына келтіру процедуралары.",
            treatmentFractureLampTitle: "Сынық шамы",
            treatmentFractureLampDesc: "Жарық терапиясы арқылы қалпына келтіру және ауырсынуды азайту.",
            treatmentDarsivalTitle: "Дарсивал",
            treatmentDarsivalDesc: "Арнайы әдістер мен препараттарды қамтитын кешенді терапия.",
            treatmentInfogavatsyaTitle: "Инфогавация",
            treatmentInfogavatsyaDesc: "Қажетті заттарды тамыр арқылы енгізу, қуатты қалпына келтіру.",
            treatmentVB4Title: "VB4",
            treatmentVB4Desc: "Денені витаминдер мен биологиялық белсенді заттармен нығайту.",
            treatmentPartialMassageTitle: "Массаж (Жартылай)",
            treatmentPartialMassageDesc: "Дененің белгілі бір бөлігіне бағытталған, ауырсынуды жеңілдететін массаж.",
            treatmentPaidTitle: "Ақылы емдеу",
            treatmentPaidDesc: "Арнайы, жоғары сапалы және қосымша қызметтерді қамтитын емдеу түрлері.",
            treatmentEktTitle: "ЭКТ",
            treatmentEktDesc: "Жүйке жүйесін және психикалық жағдайды жақсартуға бағытталған электростимуляция.",
            treatmentOzoneTitle: "Озон терапиясы",
            treatmentOzoneDesc: "Қанды озонмен байыту, иммунитетті арттыру және қабынуды азайту.",
            treatmentSilverGloveTitle: "Күміс қолғап",
            treatmentSilverGloveDesc: "Күміс иондарына негізделген емдеу, бактерияларға қарсы күресу және денені тазарту.",
            treatmentLymphDrainageTitle: "Лимфа дренажы",
            treatmentLymphDrainageDesc: "Лимфа жүйесін белсендіру, ісінуді азайту және детоксикация.",
            treatmentFireBankTitle: "Отты банка",
            treatmentFireBankDesc: "Денеге ыстық банкілерді қою арқылы қан айналымын жақсарту және ауырсынуды азайту.",
            treatmentAttentionTitle: "Назар аудармау (Терапия)",
            treatmentAttentionDesc: "Арнайы терапиялар арқылы назарды шоғырландыру және психологиялық жағдайды жақсарту.",
            treatmentDeepMassageTitle: "Массаж (Терең)",
            treatmentDeepMassageDesc: "Бұлшықеттерге терең әсер ететін, кернеуді жоятын массаж.",
            // --- ADDITIONAL TRANSLATIONS FOR ROOMS, GALLERY, CONTACT FORM ---
            roomsDescription: "Біздің жайлы және ыңғайлы бөлмелерімізде тұрып, әдемі табиғаттан ләззат алыңыз. Әр бөлме сіздің демалысыңыз үшін барлық жағдайлармен жабдықталған. Бөлмелерімізде сіз таза ауа, шипалы орта және тыныш демалысқа ие боласыз. Әр бөлме заманауи жабдықталған және сіздің ыңғайыңыз үшін арналған.",
            room1Title: "Стандарт бөлме",
            room1Text: "Бір немесе екі адамға арналған ыңғайлы және жайлы бөлме. Заманауи жабдықталған, таза және шипалы ортада демалу мүмкіндігі.",
            room2Title: "Отбасылық бөлме",
            room2Text: "Үлкен отбасыларға арналған кең және ыңғайлы бөлме. Отбасылық демалыс үшін барлық жағдайлар жасалған.",
            room3Title: "Люкс бөлме",
            room3Text: "Қосымша ыңғайлылықтар мен сәнді дизайнмен жабдықталған бөлме. Жоғары деңгейдегі демалыс пен жайлылық үшін.",
            galleryDescription: "Санаториямыздың әдемі көріністері мен ыңғайлы жағдайлары туралы түсінік алу үшін фотосуреттерімізді қараңыз.",
            contactFormTitle: "Бізбен байланысу",
            fullName: "Толық аты-жөні:",
            yourEmail: "Сіздің email:",
            phoneNumber: "Телефон нөмірі:",
            question_placeholder: "Сұрағыңызды жазыңыз...",
            send_question: "Сұрақ жіберу",
            aboutFeature1Title: "Денсаулықты қалпына келтіру",
            aboutFeature1Text: "Соңғы медициналық технологиялар арқылы денсаулығыңызды қалпына келтіріңіз және нығайтыңыз.",
            aboutFeature2Title: "Табиғи орта",
            aboutFeature2Text: "Таза ауада демалыңыз, әдемі табиғат пен тыныш атмосферадан ләззат алыңыз.",
            aboutFeature3Title: "Демалыс және жасару",
            aboutFeature3Text: "Спа-процедуралар мен арнайы бағдарламалар арқылы жасарыңыз.",
        }
    };

    const supportedLangs = ['uz', 'ru', 'en', 'kz'];
    let currentLang = localStorage.getItem('lang') || 'uz';

    // Tilni o'zgartirish funksiyasi
    const setLanguage = (lang) => {
        if (!supportedLangs.includes(lang)) lang = 'uz';
        currentLang = lang;

        // Matnni yangilash
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update document title
        document.title = translations[lang].siteTitle || 'Oltinsoy Xususiy Sanatoriyasi';

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update document title
        const sanatoriumName = translations[lang].sanatoriumName || "Sanatorium";
        const heroTitle = translations[lang].heroTitle || "Title";
        document.title = `${sanatoriumName} - ${heroTitle}`;

        localStorage.setItem('lang', lang);
        loadNews(); // Reload news with new language
    };

    // Language switcher event listeners
    const langButtons = {
        'lang-uz': 'uz',
        'lang-ru': 'ru',
        'lang-en': 'en',
        'lang-kz': 'kz'
    };

    Object.entries(langButtons).forEach(([id, lang]) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => setLanguage(lang));
        }
    });

    // --- Dynamic Content Loading Functions ---

    // Load News
    async function loadNews() {
        const newsContainer = document.getElementById('news-list');
        if (!newsContainer) return;

        newsContainer.innerHTML = 'Loading news...';
        try {
            const response = await fetch('http://localhost:3000/api/news');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const news = await response.json();

            newsContainer.innerHTML = '';
            if (news.length === 0) {
                newsContainer.innerHTML = `<p>${translations[currentLang].noNewsAvailable || 'Hozircha yangiliklar mavjud emas.'}</p>`;
                return;
            }

            news.forEach(item => {
                const titleKey = `title_${currentLang}`;
                const contentKey = `content_${currentLang}`;
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card', 'reveal');
                newsCard.innerHTML = `
                    ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item[titleKey] || item.title_uz}" loading="lazy">` : ''}
                    <div class="news-content">
                        <h3>${item[titleKey] || item.title_uz}</h3>
                        <p>${(item[contentKey] || item.content_uz).substring(0, 150) + '...'}</p>
                        <a href="news-detail.html?id=${item.id}&lang=${currentLang}" class="read-more">${translations[currentLang].read_more} →</a>
                        <span class="news-date">${translations[currentLang].created_at} ${item.created_at ? new Date(item.created_at).toLocaleDateString(currentLang) : ''}</span>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
            revealOnScroll();
        } catch (error) {
            console.error('Error loading news:', error);
            newsContainer.innerHTML = `<p>${translations[currentLang].newsLoadError || 'Yangiliklarni yuklashda xato yuz berdi.'}</p>`;
        }
    }

    // Handle Question Form Submission
    const questionForm = document.getElementById('question-form');
    const questionStatusMessage = document.getElementById('question-status-message');

    if (questionForm) {
        questionForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(questionForm);
            const data = Object.fromEntries(formData.entries());

            // Validate required fields
            if (!data.senderName || !data.email || !data.message) {
                questionStatusMessage.textContent = translations[currentLang].fill_all_fields;
                questionStatusMessage.className = 'form-message';
                questionStatusMessage.classList.add('error');
                questionStatusMessage.classList.remove('success');
                return;
            }

            questionStatusMessage.textContent = translations[currentLang].sending_message;
            questionStatusMessage.className = 'form-message';
            questionStatusMessage.classList.remove('success', 'error');

            try {
                const response = await fetch('http://localhost:3000/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        senderName: data.senderName,
                        email: data.email,
                        phone: data.phone || '',
                        message: data.message,
                        type: 'question',
                        createdAt: new Date().toISOString()
                    })
                });

                if (!response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const result = await response.json();
                        throw new Error(result.error || translations[currentLang].question_error);
                    } else {
                        const text = await response.text();
                        console.error('Non-JSON response received:', text);
                        throw new Error(translations[currentLang].server_not_found);
                    }
                }

                const result = await response.json();

                questionStatusMessage.textContent = translations[currentLang].question_sent_success;
                questionStatusMessage.classList.add('success');
                questionForm.reset();
            } catch (error) {
                console.error('Question form submission error:', error);
                questionStatusMessage.textContent = `${translations[currentLang].question_error} ${error.message || ''}`;
                questionStatusMessage.classList.add('error');
            }
        });
    }

    // Handle Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    const bookingStatusMessage = document.getElementById('booking-status-message');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());

            if (!data.checkInDate || !data.checkOutDate || !data.fullName || !data.roomType || !data.guests) {
                bookingStatusMessage.textContent = translations[currentLang].fill_all_fields;
                bookingStatusMessage.classList.add('error');
                bookingStatusMessage.classList.remove('success');
                return;
            }

            const checkIn = new Date(data.checkInDate);
            const checkOut = new Date(data.checkOutDate);
            const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
            const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
            data.nights = nights;

            bookingStatusMessage.textContent = translations[currentLang].sending_message;
            bookingStatusMessage.className = 'form-message';
            bookingStatusMessage.classList.remove('success', 'error');

            try {
                const response = await fetch('http://localhost:3000/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const result = await response.json();
                        throw new Error(result.error || translations[currentLang].booking_error);
                    } else {
                        const text = await response.text();
                        console.error('Non-JSON response received:', text);
                        throw new Error(translations[currentLang].server_not_found);
                    }
                }

                const result = await response.json();

                bookingStatusMessage.textContent = translations[currentLang].booking_success;
                bookingStatusMessage.classList.add('success');
                bookingForm.reset();
                const checkInInput = document.getElementById('checkInDate');
                const checkOutInput = document.getElementById('checkOutDate');
                if (checkInInput && checkInInput._flatpickr) checkInInput._flatpickr.clear();
                if (checkOutInput && checkOutInput._flatpickr) checkOutInput._flatpickr.clear();
            } catch (error) {
                console.error('Booking form submission error:', error);
                bookingStatusMessage.textContent = `${translations[currentLang].booking_error} ${error.message || ''}`;
                bookingStatusMessage.classList.add('error');
            }
        });
    }

    // --- UI Interactions ---

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Reveal Animation on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Initialize Flatpickr for Date Pickers
    if (typeof flatpickr !== 'undefined') {
        const checkInInput = document.getElementById('checkInDate');
        const checkOutInput = document.getElementById('checkOutDate');

        if (checkInInput && checkOutInput) {
            const checkInPicker = flatpickr(checkInInput, {
                dateFormat: "Y-m-d",
                minDate: "today",
                onChange: function(selectedDates, dateStr, instance) {
                    if (selectedDates.length > 0) {
                        checkOutPicker.set('minDate', selectedDates[0]);
                        if (checkOutPicker.selectedDates.length > 0 && checkOutPicker.selectedDates[0] < selectedDates[0]) {
                            checkOutPicker.clear();
                        }
                    } else {
                        checkOutPicker.set('minDate', 'today');
                    }
                }
            });

            const checkOutPicker = flatpickr(checkOutInput, {
                dateFormat: "Y-m-d",
                minDate: "today"
            });
        }
    }

    // Image Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-grid a');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                lightbox.style.display = 'block';
                lightboxImg.src = item.href;
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- PDF Export ---
    const exportPdfBtn = document.getElementById('export-pdf');
    if (exportPdfBtn && typeof window.jspdf !== 'undefined') {
        exportPdfBtn.addEventListener('click', function() {
            const data = JSON.parse(localStorage.getItem('accountingData') || '[]');
            if (!data.length) {
                alert(translations[currentLang].noDataFound || "Ma'lumotlar topilmadi!");
                return;
            }
            const rows = data.map(item => [
                item.date,
                item.amount,
                item.type === 'income' ? translations[currentLang].income || 'Daromad' : translations[currentLang].expense || 'Xarajat',
                item.category || '',
                item.description || ''
            ]);
            const headers = [
                [
                    translations[currentLang].date || 'Sana',
                    translations[currentLang].amount || 'Summa',
                    translations[currentLang].type || 'Turi',
                    translations[currentLang].sourceCategory || 'Manba/Kategoriya',
                    translations[currentLang].note || 'Izoh'
                ]
            ];
            const doc = new window.jspdf.jsPDF();
            doc.text(translations[currentLang].accountingReportTitle || 'Buxgalteriya hisobi', 14, 16);
            doc.autoTable({ head: headers, body: rows, startY: 22, styles: { fontSize: 10 } });
            doc.save('buxgalteriya.pdf');
        });
    } else if (!exportPdfBtn) {
        console.warn("PDF eksport tugmasi (export-pdf) topilmadi.");
    } else if (typeof window.jspdf === 'undefined') {
        console.error("jsPDF kutubxonasi yuklanmagan. PDF eksporti ishlamaydi.");
    }

    // --- Excel Export ---
    const exportExcelBtn = document.getElementById('export-excel');
    if (exportExcelBtn && typeof XLSX !== 'undefined') {
        exportExcelBtn.addEventListener('click', function() {
            const data = JSON.parse(localStorage.getItem('accountingData') || '[]');
            if (!data.length) {
                alert(translations[currentLang].noDataFound || "Ma'lumotlar topilmadi!");
                return;
            }
            const rows = [
                [
                    translations[currentLang].date || 'Sana',
                    translations[currentLang].amount || 'Summa',
                    translations[currentLang].type || 'Turi',
                    translations[currentLang].sourceCategory || 'Manba/Kategoriya',
                    translations[currentLang].note || 'Izoh'
                ]
            ];
            data.forEach(item => {
                rows.push([
                    item.date,
                    item.amount,
                    item.type === 'income' ? translations[currentLang].income || 'Daromad' : translations[currentLang].expense || 'Xarajat',
                    item.category || '',
                    item.description || ''
                ]);
            });
            const worksheet = XLSX.utils.aoa_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, translations[currentLang].accountingSheetName || 'Buxgalteriya');
            XLSX.writeFile(workbook, 'buxgalteriya.xlsx');
        });
    } else if (!exportExcelBtn) {
        console.warn("Excel eksport tugmasi (export-excel) topilmadi.");
    } else if (typeof XLSX === 'undefined') {
        console.error("XLSX kutubxonasi yuklanmagan. Excel eksporti ishlamaydi.");
    }

    // Rasmli fon almashish
    const backgroundImages = [
        'images/fon.jpg',
        'images/fon1.jpg',
        'images/uzoqdan.jpg',
        'images/Sanatoriya tashqi ko\'rinishi.jpg'
    ];

    let currentBgIndex = 0;

    function changeBackground() {
        currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
        document.body.style.backgroundImage = `url('${backgroundImages[currentBgIndex]}')`;

        console.log(`Fon o'zgartirildi: ${backgroundImages[currentBgIndex]}`);
    }

    // Har 15 soniyada fon almashadi
    setInterval(changeBackground, 15000);

    // Qo'lda fon almashish uchun
    function manualChangeBackground() {
        const backgrounds = [
            'url("images/Sanatoriyaning tashqi ko\'rinishi.jpg")',
            'url("images/uzoqdan.jpg")',
            'url("images/fon.jpg")',
            'url("images/fon1.jpg")'
        ];

        const currentBg = document.body.style.backgroundImage;
        const currentIndex = backgrounds.indexOf(currentBg);
        const nextIndex = (currentIndex + 1) % backgrounds.length;

        document.body.style.backgroundImage = backgrounds[nextIndex];
        localStorage.setItem('currentBackground', backgrounds[nextIndex]);
    }

    // Modal functionality
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close');
    const roomTypeSelect = document.getElementById('roomType');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const totalPriceSpan = document.getElementById('totalPrice');
    const priceDetailsP = document.getElementById('priceDetails');

    // Open modal when booking buttons are clicked
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-small')) {
            e.preventDefault();
            openModal();
        }
    });

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Open modal
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;
        checkOutInput.min = today;
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }

    // Calculate price based on room type and dates
    function calculatePrice() {
        const roomType = roomTypeSelect.value;
        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;

        if (!roomType || !checkIn || !checkOut) {
            totalPriceSpan.textContent = '0';
            priceDetailsP.textContent = 'Xona turini va sanalarni tanlang';
            return;
        }

        // Get prices from localStorage (set by admin panel)
        let roomPricing = {
            standart: 500000,
            oilaviy: 800000,
            lyuks: 1200000
        };

        try {
            const savedPricing = JSON.parse(localStorage.getItem('roomPricing'));
            if (savedPricing) {
                roomPricing = { ...roomPricing, ...savedPricing };
            }
        } catch (error) {
            console.error('Error loading room pricing:', error);
        }

        const pricePerDay = roomPricing[roomType] || 500000;

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const daysDiff = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        if (daysDiff <= 0) {
            totalPriceSpan.textContent = '0';
            priceDetailsP.textContent = 'Ketish sanasi kelish sanasidan keyin bo\'lishi kerak';
            return;
        }

        const totalPrice = pricePerDay * daysDiff;
        totalPriceSpan.textContent = totalPrice.toLocaleString();
        priceDetailsP.textContent = `${daysDiff} kun × ${pricePerDay.toLocaleString()} so'm = ${totalPrice.toLocaleString()} so'm`;
    }

    // Update price when inputs change
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', calculatePrice);
    }
    if (checkInInput) {
        checkInInput.addEventListener('change', calculatePrice);
    }
    if (checkOutInput) {
        checkOutInput.addEventListener('change', calculatePrice);
    }

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const bookingData = {
                senderName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                roomType: formData.get('roomType'),
                checkIn: formData.get('checkIn'),
                checkOut: formData.get('checkOut'),
                region: formData.get('region'),
                district: formData.get('district'),
                totalPrice: totalPriceSpan.textContent,
                type: 'booking',
                createdAt: new Date().toISOString()
            };

            fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Band qilish muvaffaqiyatli yuborildi!');
                closeModal();
                bookingForm.reset();
                totalPriceSpan.textContent = '0';
                priceDetailsP.textContent = 'Xona turini va sanalarni tanlang';
            })
            .catch(error => {
                alert('Band qilishda xatolik yuz berdi!');
                console.error('Booking error:', error);
            });
        });
    }

    // Function to send booking data to messages management
    function sendBookingToMessagesManagement(bookingData, message) {
        const roomTypeNames = {
            'standart': 'Standart xona',
            'oilaviy': 'Oilaviy xona',
            'lyuks': 'Lyuks xona'
        };

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

        const roomTypeName = roomTypeNames[bookingData.roomType] || bookingData.roomType;
        const regionName = regionNames[bookingData.region] || bookingData.region;

        // Create message for booking
        const bookingMessageText = `Xona band qilish so'rovi:

Xona turi: ${roomTypeName}
Kelish sanasi: ${bookingData.checkIn}
Ketish sanasi: ${bookingData.checkOut}
Jami narx: ${bookingData.totalPrice} so'm

Mijoz ma'lumotlari:
Ism: ${bookingData.fullName}
Telefon: ${bookingData.phone}
Email: ${bookingData.email}
Viloyat: ${regionName}
Tuman/Shahar: ${bookingData.district}`;

        const bookingMessage = {
            senderName: bookingData.fullName,
            email: bookingData.email,
            phone: bookingData.phone,
            message: message || bookingMessageText,
            type: 'booking',
            roomType: bookingData.roomType,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            totalPrice: bookingData.totalPrice,
            region: bookingData.region,
            district: bookingData.district,
            createdAt: new Date().toISOString()
        };

        // Send to server
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingMessage)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Booking message saved:', data);
        })
        .catch(error => {
            console.error('Error saving booking message:', error);
            // Fallback: save to localStorage
            saveBookingToLocalStorage(bookingMessage);
        });
    }

    // Fallback function to save booking to localStorage
    function saveBookingToLocalStorage(bookingMessage) {
        try {
            let messages = JSON.parse(localStorage.getItem('bookingMessages') || '[]');
            messages.push(bookingMessage);
            localStorage.setItem('bookingMessages', JSON.stringify(messages));
            console.log('Booking message saved to localStorage');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Make closeModal function globally available
    window.closeModal = closeModal;

    // Function to update room prices in the modal
    function updateRoomPrices() {
        let roomPricing = {
            standart: 500000,
            oilaviy: 800000,
            lyuks: 1200000
        };

        try {
            const savedPricing = JSON.parse(localStorage.getItem('roomPricing'));
            if (savedPricing) {
                roomPricing = { ...roomPricing, ...savedPricing };
            }
        } catch (error) {
            console.error('Error loading room pricing:', error);
        }

        // Update option texts with current prices in modal
        const roomTypeSelect = document.getElementById('roomType');
        if (roomTypeSelect) {
            const options = roomTypeSelect.querySelectorAll('option');
            options.forEach(option => {
                const roomType = option.value;
                if (roomType && roomPricing[roomType]) {
                    option.textContent = `${option.textContent.split(' - ')[0]} - ${roomPricing[roomType].toLocaleString()} so'm`;
                }
            });
        }
    }

    // Initial load
    setLanguage(currentLang);
    loadNews();
    updateRoomPrices();

    // Update prices when modal opens
    if (typeof openModal === 'function') {
        const originalOpenModal = openModal;
        openModal = function() {
            originalOpenModal();
            updateRoomPrices();
        };
    }

    // Social links dynamic update
    const fbLink = document.getElementById('fb-link');
    const igLink = document.getElementById('ig-link');
    const tgLink = document.getElementById('tg-link');
    try {
        const social = JSON.parse(localStorage.getItem('socialLinks') || '{}');
        if (fbLink && social.fb) {
            fbLink.href = social.fb.startsWith('http') ? social.fb : 'https://facebook.com/' + social.fb.replace(/^@/, '');
        }
        if (igLink && social.ig) {
            igLink.href = social.ig.startsWith('http') ? social.ig : 'https://instagram.com/' + social.ig.replace(/^@/, '');
        }
        if (tgLink && social.tg) {
            tgLink.href = social.tg.startsWith('http') ? social.tg : 'https://t.me/' + social.tg.replace(/^@/, '');
        }
    } catch (e) {}
});