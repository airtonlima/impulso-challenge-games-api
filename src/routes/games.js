const { Router } = require('express')

module.exports = app => {
    
    const router = Router();
    
    router.get('/', (req, res, next) => {
        app.services.games.listAll()
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    });

    router.get('/:id', (req, res, next) => {
        app.services.games.findById(req.params)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    });

    router.post('/', (req, res, next) => {
        app.services.games.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    });

    router.put('/:id', (req, res, next) => {
        app.services.games.update({ ...req.params, data: req.body })
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    });

    router.delete('/:id', (req, res, next) => {
        app.services.games._delete(req.params)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    });

    return router;
}