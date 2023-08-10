'use strict';
var DashboardComponent = new function () {
    let mThis = this;
    this.title_prop = "Dashboard";
    this.self = $('#_main_dashboardComponent');

    this.barChart = mThis.self.find('#_db_chart');
    this.elCalendar = mThis.self.find('#_db_calendar');

    this.init = () => {};

    this.displayBarChart = (onFinish = null) => {
        if (mThis.chart) {
            mThis.chart.clear().destroy();
            mThis.barChart.empty();
            mThis.chart = null;
        }

        if (!mThis.chart) {
            mThis.chart = new Chart(mThis.barChart, {
                type: 'bar',
                data: {
                    labels: [
                        'Collections',
                        'Fees',
                        'Expenses'
                    ],
                    datasets: [{
                        label: "Fee Collection & Expenses",
                        data: [
                            '90',
                            '80',
                            '70'
                        ],
                        backgroundColor: [
                            '#ff6384',
                            '#36a2eb',
                            '#cc65fe'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 16
                                }
                            }
                        },
                        title: {
                            align: 'start',
                            position: 'top'
                        }
                    },
                    responsive: true,
                    onResize: () => {
                        let w = mThis.barChart.parent().width(),
                            h = mThis.barChart.parent().height();
                        mThis.barChart.width(w).height(h);
                    }
                }
            });
        }
        if(typeof onFinish === 'function') onFinish();
    };

    this.show = (options) => {
        if (!options) options = {};
        mThis.displayBarChart(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    };
};

window.addEventListener('DOMContentLoaded', () => {
    DashboardComponent.init();
});