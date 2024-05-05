
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        {
            category: 'Side Entries',
            items: [
                {
                    name: 'Roman Salad',
                    description: 'Fresh tomatoes, mozzarella, basil, and balsamic glaze.',
                    price: '$5.99',
                    image: 'salad.jpg'
                },
                {
                    name: 'Breadsticks',
                    description: 'Warm crunchy breadsticks',
                    price: '$6.50',
                    image: 'breadsticks.jpg'
                }
            ]
        },
        {
            category: 'Lunches',
            items: [
                {
                    name: 'Classic Burger',
                    description: 'A juicy beef patty with lettuce, tomato, and sauce',
                    price: '$8.99',
                    image: 'burger.jpg'
                },
                {
                    name: 'Pasta',
                    description: 'Creamy pasta made ready to eat',
                    price: '$15.99',
                    image: 'pasta.jpg'
                }
            ]
        },
        {
            category: 'Desserts',
            items: [
                {
                    name: 'Chocolate Chip Cookie',
                    description: 'Freshly baked chocolate chip cookies',
                    price: '$1.00 per cookie',
                    image: 'choccookie.jpg'
                },
                {
                    name: 'Chocolate Ice Cream',
                    description: 'Chocolate ice cream right from the freezer',
                    price: '$2.00',
                    image: 'icecream.jpg'
                }
            ]
        }
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
                    <span>${item.price}</span>
                    <label>Qty: <input type="number" name="${item.name}" min="0" max="10" value="0"></label>
                </div>
            `;
            menuItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
    }

    function validateOrder(event) {
        event.preventDefault();
        let valid = true;
        const inputs = document.querySelectorAll('#orderForm input[type="number"]');
        inputs.forEach(input => {
            if (input.value < 0 || input.value > 10) {
                alert(`Please enter a valid quantity for ${input.name}`);
                valid = false;
            }
        });
        if (valid) {
            console.log('Order placed successfully!');
        }
        return false;
    }

    displayMenuCategories(menuItems);
});