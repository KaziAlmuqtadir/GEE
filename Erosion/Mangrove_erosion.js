var gsw = ee.Image("JRC/GSW1_3/GlobalSurfaceWater"),
    sbans = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[88.05380679940347, 22.578204244746438],
          [88.05380679940347, 20.863634926254296],
          [90.69052554940347, 20.863634926254296],
          [90.69052554940347, 22.578204244746438]]], null, false);

// Water Classification Layer Visualization
var transitionViz = {min: 0, max: 10, palette: ['ffffff','0000ff','22b14c', 'd1102d', '99d9ea',
                              'b5e61d','e6a1aa','ff7f27','ffc90e','7f7f7f', 'c3c3c3']}

var shorelineTransition = gsw.select(5)


var viz = {min: 0, max:10, palette:['000000',  '000000',  '0000FF','008000', '0000FF', '0000FF', '008000','0000FF','008000','0000FF','0000FF']}

Map.addLayer(shorelineTransition,transitionViz ,"surface water change");
Map.addLayer(shorelineTransition,viz ,"shoreline erosion and accretion");



/////////////////////////////////////////////////////////////
//convert groups into bands
/////////////////////////////////////////////////////////////
//JRC band 5 classes into image bands

var classBand = gsw.select(5)
var classes = ee.Image.constant(ee.List.sequence(0, 10))
var oneHotBands = classBand.eq(classes)
print(oneHotBands)


//////////////////////////////////////////////
////                  /////
//////////////////////////////////////////////

//New Perm occurance image

var newPerm = oneHotBands.select(2);
print(newPerm)
Map.addLayer(newPerm.clip(sbans), viz, "newPerm_unmasked");
var newPerm = newPerm.addBands(gsw.select("change_norm")).updateMask(newPerm.gt(0.9));
print(newPerm)
Map.addLayer(newPerm.select(1).clip(sbans), viz, "newPerm");




//////////////////////////////////////////////
////            SB New Seasonal          /////
//////////////////////////////////////////////

//New Perm occurance image

var newSea = oneHotBands.select(5);
var newSea = newSea.addBands(gsw.select("change_norm")).updateMask(newSea.gt(0.9));
Map.addLayer(newSea.select(1).clip(sbans), viz, "newSea");






//////////////////////////////////////////////
////        SB Ephemeral Seasonal        /////
//////////////////////////////////////////////

//Ephemeral Seasonal occurance image

var ephSea = oneHotBands.select(10);
var ephSea = ephSea.addBands(gsw.select("change_norm")).updateMask(ephSea.gt(0.9));
Map.addLayer(ephSea.select(1).clip(sbans), viz, "ephSea");


//Sundarban Area
var areaSban = ee.Image.pixelArea().divide(1e6).addBands(shorelineTransition).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'transition',
  }),
  geometry: sbans,
  scale:100,
  maxPixels: 1e15
});
print(areaSban, " Sundarban");


///////////////////////////////////////////////////////////////////////////////
/////                                LEGEND                               /////
///////////////////////////////////////////////////////////////////////////////

//legend variables
var legendNames = [
 'No change',
 'Permanent',
 'New permanent',
 'Lost permanent',
 'Seasonal',
 'New seasonal',
 'Lost seasonal',
 'Seasonal to permanent',
 'Permanent to seasonal',
 'Ephemeral permanent',
 'Ephemeral seasonal',
];

var legendPalette = [
  'ffffff',
  '0000ff',
  '22b14c',
  'd1102d',
  '99d9ea',
  'b5e61d',
  'e6a1aa',
  'ff7f27',
  'ffc90e',
  '7f7f7f',
  'c3c3c3',
];

// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Global SUrface Water Transition',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);


// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });

  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });

  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

for (var i = 0; i < legendNames.length; i++){
  legend.add(makeRow(legendPalette[i],legendNames[i]));
}

// Add the legend to the map.
Map.add(legend);
Map.centerObject(sbans)


