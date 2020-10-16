module.exports = arr => {
    let new_arr = [];
    arr.forEach(elem => {
        new_arr.push({
            distance: elem.distance.text,
            duration: elem.duration.text,
            start: [elem.start_location.lat, elem.start_location.lng],
            end: [elem.end_location.lat, elem.end_location.lng]
        })
    });

    return new_arr
}
