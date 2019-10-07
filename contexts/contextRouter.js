const express = require('express');

const Contexts = require('./context-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Contexts.getContexts()
        .then(contexts => {
            res.json(contexts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get contexts.' });
        });
});


router.post('/', (req, res) => {
    const contextData = req.body;

    Contexts.addContext(contextData)
        .then(context => {
            res.status(201).json(context);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to create new context.' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Contexts.getContextById(id)
        .then(context => {
            if (context) {
                Contexts.updateContexts(id, changes)
                    .then(updatedContext => {
                        return res.json(updatedContext);
                    });
            } else {
                res.status(404).json({ message: 'Could not find context with given id.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to update context.' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Contexts.removeContexts(id)
        .then(deleted => {
            if (deleted) {
                return res.status(204).end();
            } else {
                res.status(404).json({ message: 'Could not find context with given id.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to delete context.' });
        });
});


module.exports = router;