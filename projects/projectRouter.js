const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            const returnProjects = projects.map(p => {
                return { ...p, 'completed': p.completed === 1 }
            })
            return res.json(returnProjects);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects.' });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Projects.getProjectsById(id)
        .then(project => {
            if (list) {
                res.json(project);
            } else {
                res.status(404).json({ message: 'Could not find project with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project.' });
        });
});

router.post('/', (req, res) => {
    const projectData = req.body;

    Projects.addProjects(projectData)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to create new project.' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Projects.getProjectsById(id)
        .then(project => {
            if (project) {
                Projects.updateProjects(id, changes)
                    .then(updatedProject => {
                        return res.json(updatedProject);
                    });
            } else {
                res.status(404).json({ message: 'Could not find project with given id.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to update project.' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Projects.removeProjects(id)
        .then(deleted => {
            if (deleted) {
                return res.status(204).end();
            } else {
                res.status(404).json({ message: 'Could not find project with given id.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to delete project.' });
        });
});

router.get('/:id/expanded', (req, res) => {
    const { id } = req.params;

    const promise1 = Projects.getProjectsById(id)
        .then(p => {
            const project = { ...p, 'completed': p.completed === 1 }
            return project
        })

    const promise2 = Projects.findTasksForProject(id)
        .then(_tasks => {
            const tasks = _tasks.map(t => {
                return { ...t, 'completed': t.completed === 1 }
            })

            return tasks
        })

    const promise3 = Projects.findResourcesForProject(id)

    const finalPromise = Promise.all([promise1, promise2, promise3])

    finalPromise.then(arr => {
        const project = arr[0]
        const tasks = arr[1]
        const resources = arr[2]

        var returnObject = project
        returnObject['tasks'] = tasks
        returnObject['resources'] = resources

        return res.json(returnObject);
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get projects.' });
        });
});



module.exports = router;