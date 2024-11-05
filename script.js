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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
            `
        }
    };

    // Шаблоны контента
    const contents = {
        'about': `
            <div class="content-section">
                <h2>О проекте</h2>
                <img width="100" src="https://cs13.pikabu.ru/avatars/3025/x3025849-1117298403.png" alt="О проекте" class="section-image">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                <img src="https://www.alfaakb.ru/upload/information_system_5/0/2/9/item_29/item_29.png" width="50" height="50" alt="Карта" class="map-image">
                <div class="contact-info">
                    <h3>Помочь проекту или задать вопрос</h3>
                    <p>Email: info@example.org</p>
                    <p>Телефон: +7 (XXX) XXX-XX-XX</p>
                    <p>Адрес: г. Москва, ул. Уличная, д. 42</p>
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
                        <a href="RussiaThroughForeignEyes/reader.html" class="read-button">Читать</a>
                    </div>
                </div>
            </div>
        `;

        contentSection.innerHTML = bookDetailHTML;

        // Сохраняем состояние в localStorage
        localStorage.setItem('currentState', JSON.stringify({
            section: 'library',
            bookId: bookId
        }));

        // Обновляем URL
        window.location.hash = `book-${bookId}`;

        // Обработчик для кнопки "Вернуться к списку книг"
        document.querySelector('.back-to-library').addEventListener('click', function(e) {
            e.preventDefault();
            updateContent('library');
            window.location.hash = 'library';
            localStorage.setItem('currentState', JSON.stringify({
                section: 'library'
            }));
        });
    }

    // Функция для обновления контента
    function updateContent(section) {
        contentSection.innerHTML = contents[section] || 'Раздел не найден';

        // Сохраняем текущий раздел в localStorage
        localStorage.setItem('currentState', JSON.stringify({
            section: section
        }));

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

    // Обработка начального состояния
    function handleInitialState() {
        const hash = window.location.hash.replace('#', '');
        const savedState = localStorage.getItem('currentState');
        
        if (savedState) {
            const state = JSON.parse(savedState);
            
            if (state.bookId) {
                setActiveMenuItem('library');
                showBookDetail(state.bookId);
            } else {
                setActiveMenuItem(state.section);
                updateContent(state.section);
            }
        } else if (hash) {
            if (hash.startsWith('book-')) {
                const bookId = hash.replace('book-', '');
                setActiveMenuItem('library');
                showBookDetail(bookId);
            } else {
                setActiveMenuItem(hash);
                updateContent(hash);
            }
        } else {
            // Если нет сохраненного состояния и хэша, показываем страницу "О проекте"
            setActiveMenuItem('about');
            updateContent('about');
        }
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

    // Обработка начального состояния при загрузке страницы
    handleInitialState();
});