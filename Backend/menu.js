document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { name: 'Roman Salad', description: 'Fresh tomatoes, mozzarella, basil, and balsamic glaze.', price: 5.99, image: 'salad.jpg' },
        { name: 'Breadsticks', description: 'Warm crunchy breadsticks', price: 6.50, image: 'breadsticks.jpg' },
        { name: 'Classic Burger', description: 'A juicy beef patty with lettuce, tomato, and sauce', price: 8.99, image: 'burger.jpg' },
        { name: 'Pasta', description: 'Creamy pasta made ready to eat', price: 15.99, image: 'pasta.jpg' },
        { name: 'Chocolate Chip Cookie', description: 'Freshly baked chocolate chip cookies', price: 1.00, image: 'choccookie.jpg' },
        { name: 'Chocolate Ice Cream', description: 'Chocolate ice cream right from the freezer', price: 2.00, image: 'icecream.jpg' }
    ];

    const categoriesContainer = document.getElementById('menu_cat');
    const menuItemsContainer = document.getElementById('menu_item');

    function displayMenuCategories(categories) {
        categoriesContainer.innerHTML = '';
        categories.forEach((category, index) => {
            const button = document.createElement('button');
            button.textContent = category.category;
            button.addEventListener('click', () => displayMenuItems(category.items));
            categoriesContainer.appendChild(button);
            if (index === 0) {
                displayMenuItems(category.items);
            }
        });
    }

    function displayMenuItems(items) {
        menuItemsContainer.innerHTML = '';
        items.forEach(item => {
            const itemHtml = `
                <div class="menu-item">
                    <h2>${item.name}</h2>
                    <img src="Pictures/${item.image}" alt="${item.name}">
                    <p>${item.description}</p>
                    <span>$${item.price.toFixed(2)}</span>
                    <label>Qty: <input type="number" name="${item.name}" min="0" max="10" value="0"></label>
                </div>
            `;
            menuItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
    }

    function validateOrder(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const jsonData = {};

        data.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch('/process-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(result => {
                    throw new Error(result.errors.join(', '));
                });
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                window.location.href = `/order-confirmation?total=${result.total}`;
            } else {
                alert(`Order failed: ${result.errors.join(', ')}`);
            }
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });

        return false;
    }

    displayMenuCategories([
        { category: 'Side Entries', items: menuItems.slice(0, 2) },
        { category: 'Lunches', items: menuItems.slice(2, 4) },
        { category: 'Desserts', items: menuItems.slice(4) }
    ]);
    document.getElementById('orderForm').onsubmit = validateOrder;
});




