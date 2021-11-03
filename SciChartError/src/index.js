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
    SciChartSurface.setRuntimeLicenseKey("LH7D0Z/cPdU6eyt8MfgTgp4YPkimtmYFfpUpNWgV9pd/Vt+ei8tO2JMHmVd86NZto+FaHsSHCyOu0hPM3q9tSXoSjD2OeaP8/MhZ9BSbft3wKoSNAduaub8H2ivNgY0S7EIyoYDP3vMN05wf3d0lNx2nZcOCgA61F/3pzHJm94sF/m4L52cDc3JJVEY5sToK1fp9ewJ2f0E9four4QNa6Z2BIu66FaY9IL/A0xaA90C9mHuXNYbWuLgtaIBTqvGOtOMpEm7KEV3HGjUVlOtrdvoJj4ATkxJojTdqkZE9mg4BWGrF8ec6RlFdMjOpP9d89n/Xpe5zFL28uvK1NxPffKzAOh4C2knWoCORI5DmhFmrHQ7B/ssfSd+oAqHzrkX0kD+1zrrJzJNyEwnOAGsy4LMg1NqfzB+cbzedVUW83osJ6zQ3IcgzGXjLzIzNR7PYnaW4ThT01yb/24sC9BpxGyWJ7y2Fuup8pDvihRLiPp4G71/I757WLsVUgeP2D9jgPd4q288rtHOYN+rGPzru+KvO0/iTOzHzZdVpEmtJ0ijNnwb7N4799ykTMjcW+9oC");

    window.postMessage({ header: 'Init', data: '' }, '*');
}

Array.prototype.clear = function () {
    this.splice(0, this.length);
};

window.addEventListener("message", function (event)
{
    if (event.data.header == "Init")
    {
        DrawChart();
    }
    else if (event.data.header == "TUData")
    {
        m_dataSeries1.clear();
        m_LabelSet = [];
        // m_LabelSet.clear();
        
        m_dataSeries1.append(0, 0.2);
        m_dataSeries1.append(1, 0.2);
        m_dataSeries1.append(2, 0.3);
        m_dataSeries1.append(3, 0.4);
        m_dataSeries1.append(4, 0.3);

        m_LabelSet.push("2021.10.01 10:33:22");
        m_LabelSet.push("2021.10.01 10:33:23");
        m_LabelSet.push("2021.10.01 10:33:24");
        m_LabelSet.push("2021.10.01 10:33:25");
        m_LabelSet.push("2021.10.01 10:33:26");
        m_labelProvider.labels = m_LabelSet;

        m_yAxis.precision = 2;

        m_sciChartSurface.zoomExtents();
    }

}, false);

async function DrawChart()
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

        dataSeries1.append(0, 0.6);
        dataSeries1.append(1, 0.9);
        dataSeries1.append(2, 0.6);
        dataSeries1.append(3, 0.9);

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

tuInit();

