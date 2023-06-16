const express = require('express');
const { InternalServerError } = require('../errors/Errors');

module.exports = app => {

    const router = express.Router();

    const app_path = process.env.app_path || '';

    router.use('/games', app.routes.games);

    app.use(`${ app_path }/api`, router);

    app.use((err, req, res, next) => {        
        if (err)
        {
            const { type, status, message, stack, response } = err;

            if (type)
                res.status(status).json({ type, message, stack });
            else
                if (response)
                    res.status(response.status).json(response.data);
                else 
                    res.status(500).json(new InternalServerError(message, stack)); 
        }
        next(err);
    });
}