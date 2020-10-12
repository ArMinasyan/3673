const getData = arr => {
    let new_arr = [];
    arr.forEach(elem => {
        new_arr.push({
            sign: elem.sign,
            distance: elem.distance,
            time: elem.time,
            street_name: elem.street_name,
            text: elem.text
        })
    });

    return new_arr
}

module.exports = getData;