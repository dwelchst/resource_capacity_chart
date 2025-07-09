// Data for skills
const new_skills = [
  {
    "name": "Engineering",
    "week": [
      {
        "Week": 1,
        "Demand": 68,
        "Capacity": 80
      },
      {
        "Week": 2,
        "Demand": 80,
        "Capacity": 80
      },
      {
        "Week": 3,
        "Demand": 84,
        "Capacity": 80
      },
      {
        "Week": 4,
        "Demand": 40,
        "Capacity": 88
      }
    ]
  },
  {
    "name": "Permitting",
    "week": [
      {
        "Week": 1,
        "Demand": 38,
        "Capacity": 40
      },
      {
        "Week": 2,
        "Demand": 24,
        "Capacity": 40
      },
      {
        "Week": 3,
        "Demand": 44,
        "Capacity": 40
      },
      {
        "Week": 4,
        "Demand": 40,
        "Capacity": 40
      }
    ]
  },
  {
    "name": "Inspection",
    "week": [
      {
        "Week": 1,
        "Demand": 100,
        "Capacity": 120
      },
      {
        "Week": 2,
        "Demand": 108,
        "Capacity": 120
      },
      {
        "Week": 3,
        "Demand": 96,
        "Capacity": 120
      },
      {
        "Week": 4,
        "Demand": 98,
        "Capacity": 80
      }
    ]
  },
  {
    "name": "Construction",
    "week": [
      {
        "Week": 1,
        "Demand": 138,
        "Capacity": 120
      },
      {
        "Week": 2,
        "Demand": 116,
        "Capacity": 120
      },
      {
        "Week": 3,
        "Demand": 44,
        "Capacity": 120
      },
      {
        "Week": 4,
        "Demand": 118,
        "Capacity": 120
      }
    ]
  }
];

// Get the maximum week number from the data
function getMaxWeek() {
    let maxWeek = 0;
    new_skills.forEach(skill => {
        skill.week.forEach(weekData => {
            if (weekData.Week > maxWeek) {
                maxWeek = weekData.Week;
            }
        });
    });
    return maxWeek;
}

// Process data to show each skill as separate grouped bars
function processData() {
    const maxWeek = getMaxWeek();
    const categories = [];
    const series = [];

    // Create categories with spacing between weeks
    for (let week = 1; week <= maxWeek; week++) {
        new_skills.forEach((skill, index) => {
            categories.push(`${skill.name}`);
        });
        // Add empty category for spacing between weeks (except after last week)
        if (week < maxWeek) {
            categories.push(''); // Empty category for spacing
        }
    }

    // Create demand and capacity data with nulls for spacing
    const demandData = [];
    const capacityData = [];
    const skillNames = []; // Array to store skill names for each data point

    for (let week = 1; week <= maxWeek; week++) {
        new_skills.forEach(skill => {
            const weekData = skill.week.find(w => w.Week === week);
            if (weekData) {
                demandData.push(weekData.Demand);
                capacityData.push(weekData.Capacity);
                skillNames.push(skill.name); // Store the skill name for this data point
            } else {
                demandData.push(0);
                capacityData.push(0);
                skillNames.push(skill.name); // Store the skill name even for zero values
            }
        });
        // Add null values for spacing between weeks (except after last week)
        if (week < maxWeek) {
            demandData.push(null);
            capacityData.push(null);
            skillNames.push(null); // Add null for spacing
        }
    }

    // Create series for demand and capacity
    series.push({
        name: 'Demand',
        data: demandData,
        color: '#135c63',
        type: 'column',
        pointWidth: 45
    });

    series.push({
        name: 'Capacity',
        data: capacityData,
        color: '#67b29d',
        type: 'column',
        pointWidth: 20,
        borderWidth: 0
    });

    return {
        categories: categories,
        series: series,
        skillNames: skillNames, // Include skill names in return
        maxWeek: maxWeek
    };
}

// Create the chart
function createChart() {
    const data = processData();

    Highcharts.chart('chart-container', {
        chart: {
            type: 'column',
            backgroundColor: '#ffffff',
            style: {
                fontFamily: 'Arial, sans-serif'
            }
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: data.categories,
            title: {
                text: 'Skills by Week',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            },
            plotBands: [{
                from: -0.5,
                to: new_skills.length - 0.5,
                color: 'rgba(200, 200, 200, 0.1)',
                label: {
                    text: 'Week 1',
                    style: {
                        color: '#666'
                    }
                }
            }, {
                from: new_skills.length + 0.5,
                to: new_skills.length * 2 + 0.5,
                color: 'rgba(150, 150, 150, 0.1)',
                label: {
                    text: 'Week 2',
                    style: {
                        color: '#666'
                    }
                }
            }, {
                from: new_skills.length * 2 + 1.5,
                to: new_skills.length * 3 + 1.5,
                color: 'rgba(200, 200, 200, 0.1)',
                label: {
                    text: 'Week 3',
                    style: {
                        color: '#666'
                    }
                }
            }, {
                from: new_skills.length * 3 + 2.5,
                to: new_skills.length * 4 + 2.5,
                color: 'rgba(150, 150, 150, 0.1)',
                label: {
                    text: 'Week 4',
                    style: {
                        color: '#666'
                    }
                }
            }],
            plotLines: [{
                color: '#ccc',
                width: 1,
                value: new_skills.length - 0.5
            }, {
                color: '#ccc',
                width: 1,
                value: new_skills.length * 2 + 0.5
            }, {
                color: '#ccc',
                width: 1,
                value: new_skills.length * 3 + 1.5
            }]
        },
        yAxis: {
            title: {
                text: 'Hours',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            },
            min: 0
        },
        tooltip: {
            formatter: function() {
                // Skip empty categories used for spacing
                if (this.y === null || data.skillNames[this.point.index] === null) {
                    return false;
                }
                
                // Calculate which week this bar belongs to based on point index
                const pointIndex = this.point.index;
                let week = 1;
                let skillsPerWeek = new_skills.length;
                
                // Each week has skillsPerWeek + 1 positions (including spacing)
                // Week 1: indices 0-3, Week 2: indices 5-8, Week 3: indices 10-13, Week 4: indices 15-18
                if (pointIndex >= skillsPerWeek * 3 + 3) {
                    week = 4;
                } else if (pointIndex >= skillsPerWeek * 2 + 2) {
                    week = 3;
                } else if (pointIndex >= skillsPerWeek + 1) {
                    week = 2;
                } else {
                    week = 1;
                }
                
                // Get the skill name from our skillNames array
                const skillName = data.skillNames[this.point.index];
                
                return `<b>Week ${week} - ${skillName}</b><br/>
                        ${this.series.name}: <b>${this.y} hours</b>`;
            }
        },
        plotOptions: {
            column: {
                grouping: false,
                pointPadding: 0.05, // Reduce padding between bars
                groupPadding: 0.1,  // Reduce padding between groups
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: data.series,
        legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
        },
        credits: {
            enabled: false
        }
    });
}

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', createChart);