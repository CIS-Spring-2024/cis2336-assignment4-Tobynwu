
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Menu items for calculation
const menuItems = [
    { name: 'Roman Salad', price: 5.99 },
    { name: 'Breadsticks', price: 6.50 },
    { name: 'Classic Burger', price: 8.99 },
    { name: 'Pasta', price: 15.99 },
    { name: 'Chocolate Chip Cookie', price: 1.00 },
    { name: 'Chocolate Ice Cream', price: 2.00 }
];

// Setting up Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ success: false, errors: ['Invalid JSON input'] });
    }
    next();
});

// Order processing route
app.post('/process-order', (req, res) => {
    const order = req.body;
    let total = 0;
    let errors = [];

    // Calculate total
    menuItems.forEach(item => {
        const qty = parseInt(order[item.name]) || 0;
        if (qty < 0 || qty > 10) {
            errors.push(`Invalid quantity for ${item.name}`);
        } else {
            total += qty * item.price;
        }
    });

    // Respond with errors if any
    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    res.json({ success: true, total: total.toFixed(2) });
});

// Order confirmation page route
app.get('/order-confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, 'order-confirmation.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
