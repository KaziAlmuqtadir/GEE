var aoi = ee.FeatureCollection("users/abir13/BD_admn/BGD_adm3")
            .filterMetadata('NAME_2', 'equals', 'Sylhet');
// Add area and center it
Map.addLayer(aoi, {},  'area');
Map.centerObject(aoi, 10);

// Adjust date
var start_date = "2021-01-01";
var end_date = "2021-12-31";

//// create function to adjust vis params 
///  upper and lower limits

var reduceMax = function(image){
  return ee.data.computeValue(
    ee.Number.parse(image.reduceRegion({
      reducer: ee.Reducer.max(),
      geometry: aoi,
      scale: 1000
  }).values().join()));
};

var reduceMin = function(image){
  return ee.data.computeValue(
    ee.Number.parse(image.reduceRegion({
      reducer: ee.Reducer.min(),
      geometry: aoi,
      scale: 1000
    }).values().join()));
};

// Add no2 layer
var no2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var no2Min = reduceMin(no2);
var no2Max = reduceMax(no2);
var band_vizNO2 = {
  min: no2Min,
  max: no2Max,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

// Add CO layer
var co = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var coMin = reduceMin(co);
var coMax = reduceMax(co);
var band_vizCO = {
  min: coMin,
  max: coMax,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

// Add o3 layer
var o3 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3')
  .select('O3_column_number_density')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var o3Min = reduceMin(o3);
var o3Max = reduceMax(o3);
var band_vizO3 = {
  min: o3Min,
  max: o3Max,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

// Add SO2 Layer
var so2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var so2Min = reduceMin(so2);
var so2Max = reduceMax(so2);
var band_vizSO2 = {
  min: so2Min,
  max: so2Max,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};


// Add ch4 layer
var ch4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4")
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var ch4Min = reduceMin(ch4);
var ch4Max = reduceMax(ch4);
var band_vizch4 = {
  min: ch4Min,
  max: ch4Max,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

// Add layers
Map.addLayer(no2, band_vizNO2, 'S5P N02');
Map.addLayer(co, band_vizCO, 'S5P CO', 0);
Map.addLayer(o3, band_vizO3, 'S5P O3', 0);
Map.addLayer(so2, band_vizSO2, 'S5P SO2', 0);
Map.addLayer(ch4, band_vizch4, 'S5P CH4', 0);


// Export images
Export.image.toDrive({
  image: ch4,
  description: "Export_CH4",
  folder: "GEE",
  region: aoi,
  fileNamePrefix: "CH4_20",
  scale: 30,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: co,
  description: "Export_CO",
  folder: "GEE",
  region: aoi,
  fileNamePrefix: "CO_20",
  scale: 30,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: o3,
  description: "Export_O3",
  folder: "GEE",
  region: aoi,
  fileNamePrefix: "O3_20",
  scale: 30,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: so2,
  description: "Export_SO2",
  folder: "GEE",
  region: aoi,
  fileNamePrefix: "SO2_20",
  scale: 30,
  maxPixels: 1e13
});