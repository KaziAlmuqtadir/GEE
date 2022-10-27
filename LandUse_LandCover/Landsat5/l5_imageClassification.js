Map.setOptions('satellite')
var aoi = ee.FeatureCollection("users/Kazi_Almuqtadir13/Remakalenga");

Map.addLayer(aoi, {color: 'green'});
Map.centerObject(aoi, 14)

// Applies scaling factors.
function applyScaleFactors_l5(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
}

// Add indices to image
var indices_l5 = function(img) {
  var ndvi = img.normalizedDifference(['SR_B4', 'SR_B3']).rename('NDVI');
  var ndbi = img.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDBI');
  
  return img.addBands(ndvi).addBands(ndbi)
}

var l5 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
        .filterBounds(aoi)
        .filterDate('2003-12-01', '2004-02-02')
        .filterMetadata('CLOUD_COVER', 'less_than', 5)
        .map(applyScaleFactors_l5)
        .map(indices_l5)
        .median()
        .clip(aoi);

var bands_l5 = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'NDVI', 'NDBI'];
var l5 = l5.select(bands_l5)
print(l5);

var visParams = {"opacity":1,"bands":["SR_B4","SR_B3","SR_B2"],
"min":0.031267299999999984,"max":0.33317769999999997,"gamma":1};
Map.addLayer(l5, visParams, 'False Color', 0)

var trueVis = {"opacity":1,"bands":["SR_B3","SR_B2","SR_B1"],
"min":0.01554774999999999,"max":0.09223975000000002,"gamma":1};
Map.addLayer(l5, trueVis, 'True Color', 0)

var ndviVis = {
  min: 0.435724151134491,
  max: 0.8271298289299012,
  palette: [
    '9d620a', 'da880d', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};

var ndbiVis = {
  min: -0.45513271376490594,
  max: 0.060567109137773516,
  palette: [
    'white', 'red']
}

Map.addLayer(l5.select('NDVI'), ndviVis, 'NDVI', 0)
Map.addLayer(l5.select('NDBI'), ndbiVis, 'NDBI', 0)

var training_points = water.merge(bareland).merge(buildup).merge(grassland).merge(lowDense).merge(highDense);

var bands = ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'NDVI', 'NDBI'];
var training_data = l5.select(bands)
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

var classified_image = l5.classify(classifier);

var Vis = {
  min: 0,
  max: 5,
  palette: [
    '04076c', 'ffc82d', 'ff0b33', '8ad800', '3e8601', '012e01'
  ],
};

Map.addLayer(classified_image, Vis, 'Classified Image', 0);

//////////////////////////////////////////////////////////////////////////////////////////////


// var l5_2012 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
//         .filterBounds(aoi)
//         .filterDate('2010-12-01', '2011-02-02')
//         .filterMetadata('CLOUD_COVER', 'less_than', 5)
//         .map(applyScaleFactors_l5)
//         .map(indices_l5)
//         .median()
//         .clip(aoi);

// var l5_2012 = l5_2012.select(bands_l5)
// print(l5_2012);

// Map.addLayer(l5_2012)

// var classified_image_2012 = l5_2012.classify(classifier);

// var Vis = {
//   min: 0,
//   max: 5,
//   palette: [
//     '04076c', 'ffc82d', 'ff0b33', '8ad800', '3e8601', '012e01'
//   ],
// };

// Map.addLayer(classified_image_2012, Vis, 'Classified Image 2012', 0);

