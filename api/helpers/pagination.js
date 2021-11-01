const QTY_PAGINATE = 5

const paginate = page => {
    page = Number(page)
    const limit = QTY_PAGINATE
    const skip = page !== 0 ? (page - 1) * QTY_PAGINATE : 0
    const pagination = {
        pagination: {
            prev_page: page > 1 ? page - 1 : null,
            page: page === 0 ? 1 : page,
            next_page: page === 0 ? page + 2 : page + 1,
            length: QTY_PAGINATE,
        },
    }
    return {
        limit,
        skip,
        pagination,
    }
}

module.exports = {
    paginate,
}
