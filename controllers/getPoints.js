const axios = require('axios').default;
const getData = require('../utils/getData');
const UserData = require('../models/user_data');
const moment = require('moment');

module.exports = (req, res, next) => {
    axios.get(`https://everyonetest-route-planner.azurewebsites.net/api/plan/route?${req.params.data}`).then(result => {
        if (result.data.routes.length == 0) res.status(200).send('There are not routes'); else {
            let multiple = [];
            result.data.routes[0].legs.forEach(elem => {
                multiple.push(getData(elem.steps))
            })

            UserData.updateMany({ user_id: res.locals.id },
                {
                    $addToSet: {
                        data: {
                            date: moment().format('DD/MM/YYYY'),
                            routes: multiple
                        }
                    }
                }).then(doc => {
                    res.status(200).send(multiple);
                })
        }
    })
}
