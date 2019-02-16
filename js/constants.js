const margin = 60;
const height = 450 - 2*margin;
const width = 800 - 2*margin;
const yScale = d3.scaleLinear();
const xScale = d3.scaleBand();
const def_bincount = 10;

const properties = [
    {"name": "Price", "property": "price"},
    {"name": "#Bedrooms", "property": "bedrooms"},
    {"name": "#Bathrooms", "property": "bathrooms"},
    {"name": "Living Space", "property": "sqft_living"},
    {"name": "Lot Space", "property": "sqft_lot"},
    {"name": "#Floors", "property": "floors"},
    {"name": "Grade", "property": "grade"},
    {"name": "Living Space Above", "property": "sqft_above"},
    {"name": "Year Built", "property": "yr_built"},
    {"name": "Year Renovated", "property": "yr_renovated"},
    {"name": "Zipcode", "property": "zipcode"},
    {"name": "Basement Area", "property": "sqft_basement"}
];

// const properties = [
//     {"name": "Video Uploads", "property": "Video Uploads"},
//     {"name": "Subscribers", "property": "Subscribers"},
//     {"name": "Video views", "property": "Video views"}
// ];

const data_file = 'res/data.csv';