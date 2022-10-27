var geometry = ee.FeatureCollection("users/abir13/BD_admn/BGD_adm3")
            .filterMetadata('NAME_2', 'equals', 'Sylhet');
// Add area and center it
Map.addLayer(aoi, {},  'area');
Map.centerObject(aoi, 12);

// Adjust date
var start_date = "2021-01-01";
var end_date = "2021-12-31";

// Add no2 layer
var no2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var band_vizNO2 = {
  min: 0,
  max: 0.0002,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(no2, band_vizNO2, 'S5P N02');

// Add CO layer
var co = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var band_vizCO = {
  min: 0,
  max: 0.05,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(co, band_vizCO, 'S5P CO');

// Add o3 layer
var o3 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3')
  .select('O3_column_number_density')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var band_vizO3 = {
  min: 0.12,
  max: 0.15,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(o3, band_vizO3, 'S5P O3');

// Add SO2 Layer
var so2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var band_vizSO2 = {
  min: 0.0,
  max: 0.0005,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(so2, band_vizSO2, 'S5P SO2');


// Add ch4 layer
var ch4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4")
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate(start_date, end_date)
  .mean()
  .clip(aoi);

var band_vizch4 = {
  min: 0,
  max: 0.0002,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(ch4, band_vizch4, 'S5P CH4');

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