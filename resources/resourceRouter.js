const express = require('express');

const Resources = require('./resource-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.getResources()
        .then(resources => {
            res.json(resources);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get resources.' });
        });
});


router.post('/', (req, res) => {
    const resourceData = req.body;

    Resources.addResource(resourceData)
        .then(resource => {
            res.status(201).json(resource);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new resource.' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Resources.getResourceById(id)
        .then(resource => {
            if (resource) {
                Resources.updateResources(id, changes)
                    .then(updatedResource => {
                        return res.json(updatedResource);
                    });
            } else {
                res.status(404).json({ message: 'Could not find resource with given id.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to update resource.' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Resources.removeResources(id)
        .then(deleted => {
            if (deleted) {
                return res.status(204).end();
            } else {
                res.status(404).json({ message: 'Could not find resource with given id.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to delete resource.' });
        });
});


module.exports = router;