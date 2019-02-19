const margin = 60;
const height = 450 - 2*margin;
const width = 800 - 2*margin;
const yScale = d3.scaleLinear();
const xScale = d3.scaleBand();
const def_bincount = 10;

const properties = [
    {"name": "teaching", "property": "teaching"},
    {"name": "international", "property": "international"},
    {"name": "research", "property": "research"},
    {"name": "citations", "property": "citations"},
    {"name": "income", "property": "income"},
    {"name": "total_score", "property": "total_score"},
    {"name": "num_students", "property": "num_students"},
    {"name": "student_staff_ratio", "property": "student_staff_ratio"},
    {"name": "international_students", "property": "international_students"},
    // {"name": "female_male_ratio", "property": "female_male_ratio"},
    {"name": "year", "property": "year"}
];

const data_file = 'res/timesData.csv';