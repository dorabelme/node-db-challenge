const express = require('express');

const Tasks = require('./task-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.getTasks()
        .then(tasks => {
            console.log(tasks);

            const returnTasks = tasks.map(t => {
                return { ...t, 'completed': t.completed === 1 }
            })
            return res.json(returnTasks);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to get tasks.' });
        });
});


router.post('/', (req, res) => {
    const taskData = req.body;

    Tasks.addTask(taskData)
        .then(task => {
            res.status(201).json(task);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to create new task.' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Tasks.getTasksById(id)
        .then(task => {
            if (task) {
                Tasks.updateTasks(id, changes)
                    .then(updatedTask => {
                        return res.json(updatedTask);
                    });
            } else {
                res.status(404).json({ message: 'Could not find task with given id.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to update task.' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Tasks.removeTasks(id)
        .then(deleted => {
            if (deleted) {
                return res.status(204).end();
            } else {
                res.status(404).json({ message: 'Could not find task with given id.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to delete task.' });
        });
});

router.get('/:id/expanded', (req, res) => {
    const { id } = req.params;

    const promise1 = Tasks.getTasksById(id)
        .then(t => {
            const task = { ...t, 'completed': t.completed === 1 }
            return task
        })

    const promise2 = Tasks.findContextsForTasks(id)

    const finalPromise = Promise.all([promise1, promise2])

    finalPromise.then(arr => {
        const task = arr[0]
        const contexts = arr[1]

        var returnObject = task
        returnObject['contexts'] = contexts

        return res.json(returnObject);
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get tasks.' });
        });
});


module.exports = router;