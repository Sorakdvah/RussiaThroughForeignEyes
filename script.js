document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSection = document.getElementById('content');

    // Данные о книгах
    const books = {
        'book1': {
            id: 'book1',
            title: 'Я фотографирую Россию',
            author: 'Джеймс Эвард Эбби',
            year: '1934',
            image: 'cover.jpg',
            description: `
            Джеймс Эдвард Эбби начал карьеру разъездного фотокорреспондента в 1910 году. Он снимал диктаторов и артистов: от Адольфа Гитлера и Бенито Муссолини до Чарли Чаплина и Анны Павловой, запечатлел мексиканскую революцию и гражданскую войну в Испании, зарождение звукового кинематографа в Голливуде и разгул преступности в Чикаго. К услугам Эбби прибегали <i>Нью-Йорк Таймс</i>, <i>Вог</i> и многие другие издания, что позволило ему уже к 1930-м годам стать одним из самых известных и публикуемых фотографов в мире. «Я — эксперт в области сенсаций», — иронично отзывался о себе он сам. Но, бесспорно, самым сенсационным его материалом стала кремлевская фотосессия Иосифа Сталина. Влекомый идеей запечатлеть советского диктатора, в 1932 году Эбби приехал в СССР. Авантюрная и, казалось, безнадежная затея не только увенчалась грандиозным успехом, но и превратилась в восьмимесячное приключение, которое и легло в основу этой книги.
            `
        }
    };

    // Шаблоны контента
    const contents = {
        'about': `
            <div class="content-section">
                <h2>О проекте</h2>
                <img height="150" src="https://sorakdvah.github.io/RussiaThroughForeignEyes/q.jpg" alt="О проекте" class="map-image">
                <p>Путевой очерк до сих пор остается одним из моих любимых литературных жанров, особенно если написан он был непрофессиональным писателем. И в своей любви я не одинок, ведь все эти, порой разрозненные и обрывочные, записки очаровывают читателя еще со времен Геродота. Собранные зачастую из обрывков дневников, иногда талантливые, нередко абсолютно бездарные, они позволяют пройти уникальный путь, зафиксированный в моменте истории, взглянуть на известные события и явления с новой, подчас неожиданной стороны.</p>
                <p>При всей любви к целому миру я, все же, хочу посвятить этот проект сбору и переводу редких материалов (прежде не выходивших на русском языке), исследующих хорошо известную всем нам местность — Россию. Даже поверхностные, субъективные и предвзятые путевые заметки зачастую дают тот необходимый взгляд со стороны на привычные вещи, порой становясь уникальным слепком целой эпохи.</p>
            </div>
        `,
        'library': `
            <div class="content-section">
                <h2>Библиотека</h2>
                <div class="library-grid">
                    ${Object.values(books).map(book => `
                        <div class="library-item" data-book-id="${book.id}">
                            <div class="book-image-container">
                                <img src="${book.image}" alt="${book.title}" class="book-image">
                            </div>
                            <div class="book-info">
                                <h3>${book.title}</h3>
                                <p>${book.author}, ${book.year}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `,
        'contacts': `
            <div class="content-section">
                <h2>Контакты</h2>
                <img src="https://sorakdvah.github.io/RussiaThroughForeignEyes/mail.jpg" width="150" alt="Карта" class="map-image">
                <div class="contact-info">
                    <h3>Обратная связь:</h3>
                    <p>Сообщения об обнаруженных ошибках или неточностях, а также благодарности, критику или угрозы, пожалуйста, направляйте по адресу: <b>russiathroughforeigneyes@gmail.com</b></p>
                </div>
            </div>
        `
    };

    // Функция для отображения детальной страницы книги
    function showBookDetail(bookId) {
        const book = books[bookId];
        if (!book) return;

        const bookDetailHTML = `
            <div class="book-detail">
                <a href="#" class="back-to-library" data-action="back-to-library">← Вернуться к списку книг</a>
                <div class="book-detail-header">
                    <img src="${book.image}" alt="${book.title}" class="book-detail-image">
                    <div class="book-detail-info">
                        <h1 class="book-detail-title">${book.title}</h1>
                        <p class="book-detail-author">${book.author}, ${book.year}</p>
                        <p class="book-detail-description">${book.description}</p>
                        <a href="reader.html" class="read-button">Читать</a>
                    </div>
                </div>
            </div>
        `;

        contentSection.innerHTML = bookDetailHTML;
        window.location.hash = `book-${bookId}`;

        // Обработчик для кнопки "Вернуться к списку книг"
        document.querySelector('.back-to-library').addEventListener('click', function(e) {
            e.preventDefault();
            updateContent('library');
            window.location.hash = 'library';
        });
    }

    // Функция для обновления контента
    function updateContent(section) {
        contentSection.innerHTML = contents[section] || 'Раздел не найден';

        // Добавляем обработчики для книг, если это страница библиотеки
        if (section === 'library') {
            document.querySelectorAll('.library-item').forEach(item => {
                item.addEventListener('click', function() {
                    const bookId = this.dataset.bookId;
                    showBookDetail(bookId);
                });
            });
        }
    }

    // Функция для установки активного пункта меню
    function setActiveMenuItem(section) {
        menuItems.forEach(item => {
            const itemSection = item.getAttribute('href').replace('#', '');
            if (itemSection === section) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Обработчики событий для пунктов меню
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').replace('#', '');
            setActiveMenuItem(section);
            updateContent(section);
            window.location.hash = section;
        });
    });

    // При загрузке страницы показываем раздел "О проекте"
    setActiveMenuItem('about');
    updateContent('about');
});
