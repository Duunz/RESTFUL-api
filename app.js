const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const fakeData = [];

//CRUD paths for tasks
//GET all the tasks
app.get('/tasks', (req, res) => {
    res.json(fakeData);
});

//GET tasks by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = fakeData.find(task => task.id === taskId);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  });
  
//POST new task
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    fakeData.push(newTask);
    res.status(201).json(newTask);
});
  
//PUT update task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const index = fakeData.findIndex(task => task.id === taskId);
  
    if (index !== -1) {
      fakeData[index] = updatedTask;
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
});
  
//DELETE task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const index = fakeData.findIndex(task => task.id === taskId);
  
    if (index !== -1) {
      const deletedTask = fakeData.splice(index, 1);
      res.json(deletedTask[0]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
});
  
//Starts the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
