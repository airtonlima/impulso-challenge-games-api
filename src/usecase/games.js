const mongodb = require('../database/mongodb');
const { RequiredFieldViolation, ValidationError } = require('../errors/Errors')

module.exports = app => {

    const model = async () => {
        const db = await mongodb.connect();
        return db.model('Game', app.database.schemas.game);
    };

    const listAll = async () => {
        try {           
            const ModelGame = await model();
            const games = await ModelGame.find({});
            return { games };
        } catch (err) {
            throw err;
        }
    };

    const findById = async ({ id }) => {
        try {
            const ModelGame = await model();
            const game = await ModelGame.findById(id).exec();
            return { game };
        } catch (err) {
            throw err;
        }
    };

    const create = async params => {
        try 
        {
            paramsValidation(params);
            
            const ModelGame = await model();
            const game = new ModelGame();
            
            const { name, image, platform, platform_name } = params;

            game.name = name;
            game.image = image;
            game.platform = platform;
            game.platform_name = platform_name;
            
            const result = await game.save();

            return { game: result };

        } catch (err) {
            throw err;
        }
    };


    const update = async ({ id, data }) => {
        try {
            paramsValidation(data);
            const filter = { _id: id };
            const ModelGame = await model();
            return await ModelGame.updateOne(filter, data);
        } catch (err) {
            throw err;
        }
    };


    const _delete = async ({ id }) => {
        try {
            const ModelGame = await model();
            return await ModelGame.deleteOne({ _id: id });
        } catch (err) {
            throw err;
        }
    };

    const paramsValidation = params => {
        
        const { name, image, platform } = params;
        
        if (!name) 
            throw new RequiredFieldViolation('name');
        if (!image) 
            throw new RequiredFieldViolation('image');
        if (!platform)
            throw new RequiredFieldViolation('platform');
        else 
            if (![1,2,3].includes(platform))
                throw new ValidationError('Invalid value informed in the platform field.');
            else {    
                if (platform == 1)
                    params.platform_name = 'Playstation'
                if (platform == 2)
                    params.platform_name = 'Xbox'
                if (platform == 3)
                    params.platform_name = 'Nintendo'
            }
    };

    return { listAll, findById, create, update, _delete };
}