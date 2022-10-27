//------------------------------------------------------------------//
/*Forest monitoring and Mapping with SAR*/
/*Developed by: NASA Arset*/

// Define Region of Interest
var roi = ee.FeatureCollection("abir13/forests/ratargul_swamp_forest");

// Load Sentinel-1 C-band SAR Ground Range collection (log scale, VV, descending)
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')    
                  .filter(ee.Filter.eq('instrumentMode', 'IW'))    
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))    
                  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))    
                  .filterMetadata('resolution_meters', 'equals' , 10)    
                  .filterBounds(roi)    
                  .select('VV');
print(collectionVV, 'Collection VV');

// Load Sentinel 1 C-Band SAR Ground Range collection (log scale, VH, Descending)
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
                  .filter(ee.Filter.eq('instrumentMode', 'IW'))
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
                  .filterMetadata('resolution_meters', 'equals', 10)
                  .filterBounds(roi)
                  .select('VH');
print(collectionVH, 'Collection VH')

// Filter by date
var first2016VV = collectionVV.filterDate('2016-08-05', '2016-08-16').mosaic();
var second2018VV = collectionVV.filterDate('2018-08-05', '2018-08-16').mosaic();
var third2019VV = collectionVV.filterDate('2019-08-01', '2019-08-15').mosaic();
var first2016VH = collectionVH.filterDate('2016-08-05', '2016-08-16').mosaic();
var second2018VH = collectionVH.filterDate('2018-08-05', '2018-08-16').mosaic();
var third2019VH = collectionVH.filterDate('2019-08-01', '2019-08-15').mosaic();

// DIsplay Map
Map.centerObject(roi, 14);
Map.addLayer(first2016VV, {min:-15,max:0}, '2016 VV', 0);
Map.addLayer(second2018VV, {min:-15,max:0}, '2018 VV', 0);
Map.addLayer(third2019VV, {min:-15,max:0}, '2019 VV', 0);
Map.addLayer(first2016VH, {min:-25,max:0}, '2016 VH', 0);
Map.addLayer(second2018VH, {min:-25,max:0}, '2018 VH', 0);
Map.addLayer(third2019VH, {min:-25,max:0}, '2019 VH', 0);
Map.addLayer(first2016VH.addBands(second2018VH).addBands(third2019VH),
{min: -25, max: -8}, '2016/2018/2019 composite', 0);
Map.addLayer(roi, {}, 'Lawachara');

// Apply filter to reduce speckle
var SMOOTHING_RADIUS = 25;
var first2016VV_filtered = first2016VV.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var first2016VH_filtered = first2016VH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var second2018VV_filtered = second2018VV.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var second2018VH_filtered = second2018VH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var third2019VV_filtered = third2019VV.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var third2019VH_filtered = third2019VH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');

//Display filtered images
Map.addLayer(first2016VV_filtered, {min:-15,max:0}, '2016 VV Filtered',0);
Map.addLayer(first2016VH_filtered, {min:-27,max:0}, '2016 VH Filtered',0);
Map.addLayer(second2018VV_filtered, {min:-15,max:0}, '2018 VV Filtered',0);
Map.addLayer(second2018VH_filtered, {min:-27,max:0}, '2018 VH Filtered',0);
Map.addLayer(third2019VV_filtered, {min:-15,max:0}, '2019 VV Filtered',0);
Map.addLayer(third2019VH_filtered, {min:-27,max:0}, '2019 VH Filtered',0);
Map.addLayer(first2016VH_filtered.addBands(second2018VH_filtered).addBands(third2019VH_filtered),
{min: -25, max: -8}, '2016/2018/2019 HV filtered RGB', 0);

// Calculate the ratio between bedore and after
var ratio1618VH = first2016VH_filtered.subtract(second2018VH_filtered);
var ratio1618VV= first2016VV_filtered.subtract(second2018VV_filtered);
var ratio1819VH= second2018VH_filtered.subtract(third2019VH_filtered);
var ratio1819VV= second2018VV_filtered.subtract(third2019VV_filtered);

// Display the ratio images
Map.addLayer(ratio1618VH, {min: -9,max:9}, 'Ratio VH 2016/2018', 0);
Map.addLayer(ratio1618VV, {min: -9,max:9}, 'Ratio VV 2016/2018', 0);
Map.addLayer(ratio1819VH, {min: -9,max:9}, 'Ratio VH 2018/2019', 0);
Map.addLayer(ratio1819VV, {min: -9,max:9}, 'Ratio VV 2018/2019', 0);

// Calculate histograms for each image
print(ui.Chart.image.histogram({image:ratio1618VH, region:roi, scale:25}));
print(ui.Chart.image.histogram({image:ratio1819VH, region:roi, scale:25}));

// Combine the mean and standard deviation reducers
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
});

// Calcute the mean and standard deviation for each ratio image
var stats1618 = ratio1618VH.reduceRegion({
  reducer: reducers,
  geometry: roi,
  scale: 10
});
var stats1819 = ratio1819VH.reduceRegion({
  reducer: reducers,
  geometry: roi,
  scale: 10
});

// Print the mean and stdDev for each difference image
print('stats:', stats1618, stats1819);

// Apply Thersholds based on <stdDev * 1.5 to create a vegetation regrowth mask
var RATIO_UPPER_THRESHOLD1618 = 2.4081432930041764*1.5
var RATIO_UPPER_THRESHOLD1819 = 2.176339036149694*1.5
var ratio1618VH_thresholded = ratio1618VH.gt(RATIO_UPPER_THRESHOLD1618);
var ratio1819VH_thresholded = ratio1819VH.gt(RATIO_UPPER_THRESHOLD1819);

// Display Masks
Map.addLayer(ratio1618VH_thresholded.updateMask(ratio1618VH_thresholded),
{palette:"FF0000"},'Vegetation Loss 16/18',1);
Map.addLayer(ratio1819VH_thresholded.updateMask(ratio1819VH_thresholded),
{palette:"FF0000"},'Vegetation Loss 18/19',1);

// Compare differences in vegetaiton loss between 16/18 and 18/19
var area_loss1618 = ratio1618VH_thresholded.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 10
});
var area_loss1819 = ratio1819VH_thresholded.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 10
})

// Print the mean and stdDev for each ratio image
print('stats:', area_loss1618, area_loss1819);
