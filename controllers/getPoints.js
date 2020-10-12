const axios = require('axios').default;
const getData = require('../utils/getData');
const UserData = require('../models/user_data');
const moment = require('moment');

module.exports = (req, res, next) => {
    axios.get(`https://graphhopper.com/api/1/route?key=${process.env.GRAPTHHOPPER_KEY}&${req.params.data}`).then(result => {
        if (result.data.paths.length == 0) res.status(200).send('There are not routes'); else {
            let multiple = getData(result.data.paths[0].instructions);

            UserData.updateMany({ user_id: res.locals.id },
                {
                    $addToSet:
                    {
                        data:
                        {
                            routes: multiple,
                            date: moment().format('DD/MM/YYYY')
                        }
                    }
                }).then(doc => {
                    res.status(200).send(multiple);
                })
        }
    })
}
