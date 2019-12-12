const toLocalTime = (utc_timestamp) => {
    let timestamp = new Date(utc_timestamp)
    let options = {
        year: "numeric", 
        month: "long",
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit"
    };
    return timestamp.toLocaleString('en-gb', options)
}

export default toLocalTime