
Map.centerObject(roi, 11);
var s2 = ee.ImageCollection("COPERNICUS/S2_SR")
          .filterBounds(roi)
          .filterDate('2021-02-01', '2021-06-23')
          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
          .mean()
          .clip(roi);
var visParam = {"opacity":1,"bands":["B8","B4","B3"],
"min":822.7953846153846,
"max":3068.9738461538464,"gamma":1};

Map.addLayer(s2, visParam);

var training_points = water.merge(forest).merge(agricultural).merge(settlement);

var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B11', 'B12'];
var training_data = s2.select(bands)
                    .sampleRegions({collection: training_points,
                      properties: ['LC'],
                      scale: 10
                    });

var classifier = ee.Classifier.smileCart();

var classifier = classifier.train({
  features: training_data,
  classProperty: 'LC',
  inputProperties: bands
});

var classified_image = s2.classify(classifier);


// var finalImage = classified_image.reduceRegion({
//   reducer:ee.Reducer.mean(),
//   scale:        10,
//   tileScale:   16, 
//   maxPixels: 1e13
// });

var Vis = {
  min: 0,
  max: 3,
  palette: [
    '0b4a8b', '226c0d', '6dff08', 'df1129'
  ],
};

Map.addLayer(classified_image, Vis, 'Classified Image');

Export.image.toDrive({
  image: classified_image,
  description: "Export_lulc",
  folder: "GEE",
  scale: 10,
  maxPixels: 1e13
});