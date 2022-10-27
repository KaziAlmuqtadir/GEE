var bd = ee.FeatureCollection("users/abir13/BD_admn/BGD_adm3")

// var sylhet = bd.filter(ee.Filter.eq("NAME_2", "Sylhet"))
Map.addLayer(bd)

// Import the precipitation datasets( GPM 3h)
var dataset = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
                  .filter(ee.Filter.date('2020-06-01', '2020-06-02'));
// Select your required bands
var precipitation = dataset.select('hourlyPrecipRate');
var precipitationVis = {
  min: 0.0,
  max: 30.0,
  palette:
      ['1621a2', 'ffffff', '03ffff', '13ff03', 'efff00', 'ffb103', 'ff2300'],
};
//Map.setCenter(-90.7, 26.12, 2);
Map.addLayer(precipitation.mean().clip(bd), precipitationVis, 'Precipitation');

var chart = ui.Chart.image.series({
  imageCollection: precipitation,
  region: bd,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: "system:time_start"
})

// For chart styling
var setOption = {
  title: "Hourly precipitation for BD",
  hAxis: {
    title: "Time",
    titleTextStyle: {
      italic: false, bold: true
    },
    gridlines: {
      color: "FFFFFF"
    },
  },
  vAxis: {
    title: "Hourly pricipitation rate(mm/hr)",
    titleTextStyle: {
      italic: false, bold: true
    },
    gridlines: {
      color: "FFFFFF"
    },
    format: "short",
    baselineColor: "ffffff"
  },
  series: {
    0: {
      lineWidth: 3, color: "e37d05", pointSize: 7
    },
    1: {
      lineWidth: 7, color: "1d6b99", lineDashStyle: [4, 4]
    },
  },
  chartArea: {backgroundColor: "ebebeb"}
}

// Apply custom style properties to the chart
var final_chart = chart.setOptions(setOption);
print(final_chart)
