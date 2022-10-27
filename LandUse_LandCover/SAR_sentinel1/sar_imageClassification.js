var aoi = ee.FeatureCollection("users/Kazi_Almuqtadir13/BGD_ADM/BGD_adm3_upazilla")
              .filterMetadata('NAME_1', 'equals', 'Sylhet');
              
// Load sentinel-1 C-Band SAR Ground Range collection (log scale, VV, descending)
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filter(ee.Filter.eq('instrumentMode', 'IW'))
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
                    .filterMetadata('resolution_meters', 'equals', 10)
                    .filterBounds(aoi)
                    .select('VV');
print(collectionVV, 'Collection VV');

// Load sentinel-1 C-Band SAR Ground Range collection (log scale, VH, descending)
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filter(ee.Filter.eq('instrumentMode', 'IW'))
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
                    .filterMetadata('resolution_meters', 'equals', 10)
                    .filterBounds(aoi)
                    .select('VH');
print(collectionVH, 'Collection VH');

// Filter by date
var SARVV = collectionVV.filterDate('2020-05-01', '2020-10-11').median().clip(aoi);
var SARVH = collectionVH.filterDate('2020-05-01', '2020-10-11').median().clip(aoi);

// Add the SAR images to 'Layers'
Map.centerObject(aoi, 9);
Map.addLayer(SARVV, {min: -28.33, max: 2.67}, 'SAR VV', 0);
Map.addLayer(SARVH, {min: -31.08, max: -5.52}, 'SAR VH', 0);

// Create a Function that masks cloud shadow and clous
// Function to cloud mas from the pixcel qa band of Landsat 8 SR data
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indication clear conditions
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
  .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to reflectance, without the QA bands
  return image.updateMask(mask).divide(10000)
  .select("B[0-9]*")
  .copyProperties(image, ['system:time_start']);
}

// Extract the images from the Landsat 8 collection
var collectionl8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                    .filterDate('2020-05-01', '2020-10-11')
                    .filterBounds(aoi)
                    .map(maskL8sr)
                    .median()
                    .clip(aoi);

print(collectionl8, 'Landsat');

// Calculate NDVI and Create and image that contains
// all Landsat 8 bands and NDVI
var comp = collectionl8;
var ndvi = comp.normalizedDifference(['B5', 'B4']).rename('NDVI');
var composite = ee.Image.cat(comp,ndvi);

// Add images to layers
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.2}, 'Optical', 0);

// Apply filter to reduce speckle
var smoothing_radius = 50;
var SARVV_filtered = SARVV.focal_mean(smoothing_radius, 'circle', 'meters');
var SARVH_filtered = SARVH.focal_mean(smoothing_radius, 'circle', 'meters');

// Display the SAR filtered images
Map.addLayer(SARVV_filtered, {min: -27.9, max: 3.64}, 'SAR VV Filtered', 0);
Map.addLayer(SARVH_filtered, {min: -31.9, max: -3.9}, 'SAR VH Filtered', 0);

// Merge feature Collection
var newfc = water_body.merge(bare_land).merge(built_up).merge(vegetation1).merge(Forest);

// Define the SAR bands to train your data
var final = ee.Image.cat(SARVV, SARVH);
var bands = ['VH', 'VV'];
var training = final.select(bands).sampleRegions({
  collection: newfc,
  properties: ['LC'],
  scale: 30
});

// Train the classifier
var classifier = ee.Classifier.smileCart().train({
  features: training,
  classProperty: 'LC',
  inputProperties: bands
});

// Run the classifier
var classified = final.select(bands).classify(classifier);

// Display the classification

var Vis = {
  min: 0,
  max: 4,
  palette: [
    '0b4a8b', 'fffd16', 'c20017', '6dff08', '226c0d'
  ],
};

Map.addLayer(classified, Vis, 'SAR Classification');

// Create a confusion metrix to present the accuracy
print('RF- SAR error matrix: ', classifier.confusionMatrix());
print('RF- SAR accuracy: ', classifier.confusionMatrix().accuracy());


////////////////////////////////////////////////////////////////////////

// Define the landsat bands to train your data
var bandsl8 = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'NDVI'];
var trainingl8 = composite.select(bandsl8).sampleRegions({
  collection: newfc,
  properties: ['LC'],
  scale: 30
});

// Train the classifier
var classifierl8 = ee.Classifier.smileCart().train({
  features: trainingl8,
  classProperty: 'LC',
  inputProperties: bandsl8
});

// Run the classification
var classifiedl8 = composite.select(bandsl8).classify(classifierl8);

// Display the classification
Map.addLayer(classifiedl8, Vis, 'Optical Classification')

// Create a confusion matrix
print('RF-L8 error matrix: ', classifierl8.confusionMatrix());
print('RF-L8 accuracy: ', classifierl8.confusionMatrix().accuracy());