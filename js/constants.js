const margin = 60;
const height = 450 - 2*margin;
const width = 800 - 2*margin;
const yScale = d3.scaleLinear();
const xScale = d3.scaleBand();
const def_bincount = 10;

const properties = [
    {"name": "Total Uni. Score", "property": "total_score", x_label: "University Score ( Total )", y_label: "University count", title: "total score for university, used to determine rank", active: true},
    {"name": "Teaching Score", "property": "teaching", x_label: "Score ( based on teaching )", y_label: "University count", title: "university score for teaching (the learning environment)"},
    {"name": "International Outlook", "property": "international", x_label: "Score", y_label: "University count", title: "university score international outlook (staff, students, research)"},
    {"name": "Research Score", "property": "research", x_label: "Score ( based on research )", y_label: "University count", title: "university score for research (volume, income and reputation)"},
    {"name": "Citations Score", "property": "citations", x_label: "Score ( based on citations )", y_label: "University count", title: "university score for citations ( Research Influence )"},
    {"name": "Income Score", "property": "income", x_label: "Score ( based on income )", y_label: "University count", title: "university score for industry income ( Industry influence )"},
    {"name": "Number of Students", "property": "num_students", x_label: "Student count", y_label: "University count", title: "number of students at the university"},
    {"name": "Student/Staff Ratio", "property": "student_staff_ratio", x_label: "Student/Staff Ratio", y_label: "University count", title: "Number of students divided by number of staff"},
    {"name": "International students", "property": "international_students", x_label: "Percent buckets", y_label: "University count", title: "Percentage of students who are international"},
    // {"name": "female_male_ratio", "property": "female_male_ratio"},
    // {"name": "year", "property": "year", x_label: "Teaching scores", y_label: "University count", title: "Distribution of universities based on teaching scores"}
];

const data_file = 'res/timesData.csv';