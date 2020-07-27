const actionController = require('../controllers/actions');

function limit(num) {
    return this.filter((x, i) => {
        if(i <= (num - 1)) {
            return true;
        }
    })
} 

function skip(num) {
    return this.filter((x, i) => {
        if(i > (num - 1)) {
            return true;
        }
    })
}

Array.prototype.limit = limit;
Array.prototype.skip = skip;

const ITEMS_PER_PAGE = 15;
let keyword = "";
let result;

exports.postSearch = (req, res, next) => {
    keyword = req.body.search.toUpperCase();
    result = [];
    actionController.outer.map(p => {
        if((typeof p.company_name === "string" && p.company_name.includes(keyword) == true) || (typeof p.security_name === "string" && p.security_name.includes(keyword) == true)) {
            result.push(p);
        }
    })
    res.redirect('/search');
}

exports.getSearch = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems = result.length;
    let new_arr = result.skip((page - 1) * ITEMS_PER_PAGE);
    new_arr = new_arr.limit(ITEMS_PER_PAGE);
    res.render('search/search', {
        pageTitle: 'Search',
        data: new_arr,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    })
}