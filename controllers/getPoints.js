const axios = require('axios').default;
const getData = require('../utils/getData');
const UserData = require('../models/user_data');
const moment = require('moment');

module.exports = (req, res, next) => {

    axios.get(`https://everyonetest-route-planner.azurewebsites.net/api/plan/route?${req.params.data}`).then(async result => {
        if (result.data.routes.length == 0) res.status(200).send('There are not routes'); else {
            let multiple = [];
            await result.data.routes[0].legs.forEach(elem => {
                multiple.push(getData(elem.steps))
            })

            res.status(200).send(multiple[0]);
            // let data_temp = {
            //     date: moment().format('DD/MM/YYYY'),
            //     routes: multiple
            // };
            //res.status(200).send(multiple)
            //     UserData.updateMany({ user_id: res.locals.id },
            //         {
            //             $addToSet: {
            //                 data: data_temp
            //             }
            //         }).then(doc => {
            //             if (doc.nModified !== 0) res.status(200).send(data_temp);
            //             else res.status(304).send('Not Modified');
            //         })
            //  }
        }
    })
}
