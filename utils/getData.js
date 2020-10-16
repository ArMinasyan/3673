module.exports = arr => {
    let new_arr = [];
    arr.forEach(elem => {
        new_arr.push({
            distance: elem.distance.text,
            duration: elem.duration.text,
            start: {
                latitude: parseFloat(elem.start_location.lat),
                longitude: parseFloat(elem.start_location.lng)
            },
            end: {
                latitude: parseFloat(elem.end_location.lat),
                longitude: parseFloat(elem.end_location.lng)
            }
        })
    });

    return new_arr
}
