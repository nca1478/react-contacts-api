const isEmail = email => {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

    if (email) {
        if (!emailRegex.test(email)) {
            throw new Error(`Email Must be valid`)
        }
    }

    return true
}

const isURL = url => {
    const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/

    if (url) {
        if (!urlRegex.test(url)) {
            throw new Error(`URL Must be valid`)
        }
    }

    return true
}

module.exports = {
    isEmail,
    isURL,
}
