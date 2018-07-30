var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(pieChart.getCurrentDataIndex(e));
    },        
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name: '临汾',
                data: 15,
            }, {
                name: '三和',
                data: 35,
            }, {
                name: '青龙组',
                data: 78,
            }, {
                name: '枞阳',
                data: 63,
            }, {
                name: '独墅湖',
                data: 35,
            }, {
                name: '漕河泾',
                data: 78,
            }, {
                name: '张江',
                data: 63,
            }, {
                name: '全椒',
                data: 35,
            }, {
                name: '南京东路',
                data: 78,
            }, {
                name: '其他',
                data: 78,
            }],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
    }
});