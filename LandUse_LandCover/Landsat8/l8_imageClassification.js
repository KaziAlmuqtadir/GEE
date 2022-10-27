Map.setOptions('satellite')
var aoi = ee.FeatureCollection("users/Kazi_Almuqtadir13/bdForest/Remakalenga");

Map.addLayer(aoi, {color: 'green'});
Map.centerObject(aoi, 14)

// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}

// Add indices to image
var indices = function(img) {
  var ndvi = img.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  var ndbi = img.normalizedDifference(['SR_B6', 'SR_B5']).rename('NDBI');
  
  return img.addBands(ndvi).addBands(ndbi)
}

// var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
//         .filterBounds(aoi)
//         .filterDate('2021-11-27', '2021-11-31')
//         .filterMetadata('CLOUD_COVER', 'less_than', 5)
//         .map(applyScaleFactors)
//         .map(indices)
//         .sort('CLOUD_COVER')
//         .first()
//         .clip(aoi);
var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
        .filterBounds(aoi)
        .filterDate('2021-12-01', '2022-02-01')
        .map(applyScaleFactors)
        .map(indices)
        .sort('CLOUD_COVER')
        .first()
        .clip(aoi)

var l8 = l8.select("SR_B1", "SR_B2", "SR_B3", "SR_B4", "SR_B5", "SR_B6", "SR_B7", "NDVI", "NDBI")
print(l8);

var visParams = {"opacity":1,"bands":["SR_B5","SR_B4","SR_B3"],
"min":0.025539049999999994,"max":0.29933345,"gamma":1};
Map.addLayer(l8, visParams, 'False Color')

var trueVis = {"opacity":1,"bands":["SR_B4","SR_B3","SR_B2"],
"min":0.01554774999999999,"max":0.09223975000000002,"gamma":1};
Map.addLayer(l8, trueVis, 'True Color')

var ndviVis = {
  min: 0.35404199957847593,
  max: 0.833727115392685,
  palette: [
    '26089d', 'da880d', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};

var NDBIVis = {
  min: -0.45513271376490594,
  max: 0.060567109137773516,
  palette: [
    'white', 'red']
}

Map.addLayer(l8.select('NDVI'), ndviVis, 'NDVI')
Map.addLayer(l8.select('NDBI'), NDBIVis, 'NDBI', 0)

var training_points = water.merge(bareland).merge(buildup).merge(grassland).merge(lowDense).merge(highDense);

var bands = ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'NDVI', 'NDBI'];
var training_data = l8.select(bands)
                    .sampleRegions({collection: training_points,
                      properties: ['lc'],
                      scale: 30
                    });

var classifier = ee.Classifier.smileRandomForest(1000);

var classifier = classifier.train({
  features: training_data,
  classProperty: 'lc',
  inputProperties: bands
});

var classified_image = l8.classify(classifier);

var Vis = {
  min: 0,
  max: 5,
  palette: [
    '0b4a8b', 'ffc82d', 'ff0b33', '66a000', '3e8601', '012e01'
  ],
};

Map.addLayer(classified_image, Vis, 'Classified Image');
