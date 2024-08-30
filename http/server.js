const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'Lazarus', email: 'lazminutes@telkom.co.id' },
    { id: 2, name: 'Damia', email: 'damia@telkom.co.id' },
    { id: 3, name: 'Lathifa', email: 'lathifa@telkom.co.id' }
];

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
