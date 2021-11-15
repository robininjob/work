import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { NumberRange } from "scichart/Core/NumberRange";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { SciChartVerticalGroup } from "scichart/Charting/LayoutManager/SciChartVerticalGroup";
import { RolloverModifier } from "scichart/Charting/ChartModifiers/RolloverModifier";
import { EAutoRange } from "scichart/types/AutoRange";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import { FastColumnRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastColumnRenderableSeries';
import { TextLabelProvider } from "scichart/Charting/Visuals/Axis/LabelProvider/TextLabelProvider";
import { ELabelAlignment } from "scichart/types/LabelAlignment";
import { CategoryAxis } from "scichart/Charting/Visuals/Axis/CategoryAxis";

import _ from 'lodash';

var m_LabelSet = [];

var m_sciChartSurface;
var m_dataSeries1;
var m_labelProvider;
var m_yAxis;

function tuInit()
{
    SciChartSurface.setRuntimeLicenseKey("zgtku5iOwc7j9lx6PKti3rRYYcENa9GCEazJ9q01mbgNAg2Oi54sLC+fcc+nHWRh1Ve/rZTAndgct0ilkEl/CAzSYh9KhCVnjMv+XmL0kLmYFOxaN+lFAGv6w8uejWDlTEbtU8u+zH8b4JbhjXL857B+/QNDNZFBjXF86YQvEvquSTgS9yZIXYU68S0Ymv8wfXoQUfcMlHj+Wc0WOnFO6Xdcp/Dg5ymE/n/BkqOIvmc0h4HLrX/eaVn7hdMd5oB+CmLkh9Izj8Lg3K/7mlpfCLE077Sty3RI4y/CLf+GT+yTOUbdD8YDIs+EZrl3tqns2UhZnrfKDgME2g7tsrNQJS8ByDhI51i0XxXaTLsVVWFk6mRM0zGuCKLxNcTvmmmgqCeFVJv5fuTCTEUbb8Blzgxx80WCvEsD14PzNa6WDxyEulfHyCWlSHPnpQA2eKTvqkpYED4bIrptlauZONdgSmffleGP6PGnVwWqvOUON3OH42VyVgRnVVNdUedcQT9RaM9E6soP4G4xtjKQ3BC3L+HkHVg4r7HLVI/r3L7JjwPhzF1ZMUZa1DXAqQMnRS56");

    window.postMessage({ header: 'Init', data: '' }, '*');
}

Array.prototype.clear = function () {
    this.splice(0, this.length);
};

window.addEventListener("message", function (event)
{
    if (event.data.header == "Init")
    {
        //DrawChart1();
        DrawChart2();
    }
    else if (event.data.header == "TUData")
    {
        m_dataSeries1.clear();
        m_LabelSet = [];
        // m_LabelSet.clear();
        
        m_dataSeries1.append(0, 0.2);
        m_dataSeries1.append(1, 0.4);
        m_dataSeries1.append(2, 0.4);
        m_dataSeries1.append(3, 0.3);
        m_dataSeries1.append(4, 0.4);

        m_LabelSet.push("2021.10.01 10:33:22");
        m_LabelSet.push("2021.10.01 10:33:23");
        m_LabelSet.push("2021.10.01 10:33:24");
        m_LabelSet.push("2021.10.01 10:33:25");
        m_LabelSet.push("2021.10.01 10:33:26");
        m_labelProvider.labels = m_LabelSet;

        m_yAxis.precision = 2;

        var yRange = m_yAxis.getMaximumRange();

        alert(yRange);
        // xAxis.visibleRange = new NumberRange(ContentsRet.dMin_xS, ContentsRet.dMax_xE);
        m_yAxis.visibleRange = new NumberRange(0.1, 0.8);

        yRange = m_yAxis.getMaximumRange();
        alert(yRange);


        m_sciChartSurface.zoomExtents();
    }

}, false);

async function DrawChart1()
{
    const createRealTimeChart = async () =>
    {
        // Create a SciChartSurface
        const { sciChartSurface, wasmContext } = await SciChartSurface.create("cc_Chart");

        m_sciChartSurface = sciChartSurface;

        // Create Y Axis and add to the chart
        const yAxis = new NumericAxis(wasmContext, {
            axisTitle: "Data",
            axisAlignment: EAxisAlignment.Left,
            autoRange: EAutoRange.Never,
            growBy: new NumberRange(0.01, 0.01),
            autoTicks: false,
            majorDelta: 0.1,
            minorDelta: 0.02,            
        });
        sciChartSurface.yAxes.add(yAxis);

        m_yAxis = yAxis;

        // Create an X Axis and add to the chart
        const xAxis = new CategoryAxis(wasmContext);

        m_LabelSet.push("2021.10.01 10:33:22");
        m_LabelSet.push("2021.10.01 10:33:23");
        m_LabelSet.push("2021.10.01 10:33:24");
        m_LabelSet.push("2021.10.01 10:33:25");

        var labelProvider = new TextLabelProvider({
            labels: m_LabelSet
        });

        m_labelProvider = labelProvider;

        labelProvider.rotation = 30;
        labelProvider.maxLength = 11;
        xAxis.labelProvider = labelProvider;
        xAxis.labelStyle.alignment = ELabelAlignment.Center;
        sciChartSurface.xAxes.add(xAxis);

        // Create data for line series
        const dataSeries1 = new XyDataSeries(wasmContext);
        m_dataSeries1 = dataSeries1;

        dataSeries1.append(0, 0.2);
        dataSeries1.append(1, 0.4);
        dataSeries1.append(2, 0.4);
        dataSeries1.append(3, 0.3);

        const lineSeries = new FastLineRenderableSeries(wasmContext, {
            dataSeries: dataSeries1,
            stroke: "#ff6600",
            strokeThickness: 5
        });

        sciChartSurface.renderableSeries.add(lineSeries);

        sciChartSurface.chartModifiers.add(
            new ZoomPanModifier(),
            new MouseWheelZoomModifier(),
            new ZoomExtentsModifier()
        );

        return { sciChartSurface, wasmContext };
    };

    var res = await Promise.all([createRealTimeChart()]);
    res.forEach((el) => {
        el.sciChartSurface.zoomExtents();
    });
}

async function DrawChart2() {
    const createRealTimeChart = async () => {
        // Create a SciChartSurface
        const { sciChartSurface, wasmContext } = await SciChartSurface.create("cc_Chart");

        // Create an X Axis and add to the chart
        const xAxis = new NumericAxis(wasmContext, {
            axisTitle: "x1",
            growBy: new NumberRange(0.01, 0.01),
            autoRange: EAutoRange.Never
        });
        sciChartSurface.xAxes.add(xAxis);

        // Create Y Axis and add to the chart
        const yAxis = new NumericAxis(wasmContext, {
            axisTitle: "Data",
            axisAlignment: EAxisAlignment.Left,
            autoRange: EAutoRange.Never,
            growBy: new NumberRange(0.01, 0.01),
            autoTicks: false,
            majorDelta: 0.1,
            minorDelta: 0.02,
        });
        sciChartSurface.yAxes.add(yAxis);

        // Create data for line series
        const dataSeries1 = new XyDataSeries(wasmContext);

        dataSeries1.append(1200, 0.2);
        dataSeries1.append(1400, 0.3);
        dataSeries1.append(2800, 0.4);
        dataSeries1.append(3500, 0.4);

        const lineSeries = new FastLineRenderableSeries(wasmContext, {
            dataSeries: dataSeries1,
            stroke: "#ff6600",
            strokeThickness: 0,
            pointMarker: new EllipsePointMarker(wasmContext, {
                width: 7,
                height: 7,
                fill: "white",
                stroke: "#ff6600",
                strokeThickness: 1
            })
        });

        sciChartSurface.renderableSeries.add(lineSeries);

        sciChartSurface.chartModifiers.add(
            new ZoomPanModifier(),
            new MouseWheelZoomModifier(),
            new ZoomExtentsModifier(),
            new RolloverModifier()
        );

        return { sciChartSurface, wasmContext };
    };

    var res = await Promise.all([createRealTimeChart()]);
    res.forEach((el) => {
        el.sciChartSurface.zoomExtents();
    });
}

tuInit();

