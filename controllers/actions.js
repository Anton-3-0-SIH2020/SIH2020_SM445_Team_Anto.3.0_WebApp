const fetch = require('node-fetch');

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

let outer = new Array();
const ITEMS_PER_PAGE = 15;

fetch('https://corporate-action-rest-api.herokuapp.com/api/bse_latestca', {
    method: 'GET'
})
.then(response => {
    return response.json();
})
.then(data => {
    for(let i of data.latest_ca) {
        outer.push(i);
    }
    fetch('https://corporate-action-rest-api.herokuapp.com/api/nse_latestca', {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        for(let i of data.latest_ca) {
            outer.push(i);
        }
        fetch('https://corporate-action-rest-api.herokuapp.com/api/mc_latestca', {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            for(let i of data.latest_ca) {
                outer.push(i);
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
})
.catch(err => {
    console.log(err);
})

exports.getActionsBse = (req, res, next) => {
    let arr = new Array();
    const page = +req.query.page || 1;
    fetch('https://corporate-action-rest-api.herokuapp.com/api/bse_latestca', {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        for(let i of data.latest_ca) {
            arr.push(i);
        }
        const totalItems = arr.length;
        let new_arr = arr.skip((page - 1) * ITEMS_PER_PAGE);
        new_arr = new_arr.limit(ITEMS_PER_PAGE);
        res.render('actions/bse', {
            pageTitle: 'BSE',
            data: new_arr,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        })
    })
}

exports.getActionsNse = (req, res, next) => {
    let arr = new Array();
    const page = +req.query.page || 1;
    fetch('https://corporate-action-rest-api.herokuapp.com/api/nse_latestca', {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        for(let i of data.latest_ca) {
            arr.push(i);
        }
        const totalItems = arr.length;
        let new_arr = arr.skip((page - 1) * ITEMS_PER_PAGE);
        new_arr = new_arr.limit(ITEMS_PER_PAGE);
        res.render('actions/nse', {
            pageTitle: 'NSE',
            data: new_arr,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        })
    })
}

exports.getActionsMc = (req, res, next) => {
    let arr = new Array();
    const page = +req.query.page || 1;
    fetch('https://corporate-action-rest-api.herokuapp.com/api/mc_latestca', {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        for(let i of data.latest_ca) {
            arr.push(i);
        }
        const totalItems = arr.length;
        let new_arr = arr.skip((page - 1) * ITEMS_PER_PAGE);
        new_arr = new_arr.limit(ITEMS_PER_PAGE);
        res.render('actions/mc', {
            pageTitle: 'MC',
            data: new_arr,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        })
    })
}

exports.outer = outer;