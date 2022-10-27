var roi = 
    /* color: #98ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[91.90537077146782, 25.012102450961983],
          [91.90537077146782, 25.008368889045318],
          [91.91137891966117, 25.008368889045318],
          [91.91137891966117, 25.012102450961983]]], null, false),
    water = /* color: #0839d6 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([91.88856718732232, 21.69169284697526]),
            {
              "lc": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([91.88885686589593, 21.69131900576174]),
            {
              "lc": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([91.88944695187921, 21.690720857801992]),
            {
              "lc": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([91.88983318997735, 21.690262276017418]),
            {
              "lc": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89041254712457, 21.689803692772962]),
            {
              "lc": 0,
              "system:index": "4"
            })]),
    saltFarm = 
    /* color: #3ce9ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([91.95732866071164, 21.674294944790763]),
            {
              "lc": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95791874669492, 21.672978860535466]),
            {
              "lc": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89718244267816, 21.690083687964368]),
            {
              "lc": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89723608685846, 21.690263133406848]),
            {
              "lc": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89757404519433, 21.69102577404347]),
            {
              "lc": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89482746316308, 21.690761591796377]),
            {
              "lc": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89536926938409, 21.691050696871965]),
            {
              "lc": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([91.90678277081437, 21.693968734421833]),
            {
              "lc": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([91.90485158032365, 21.691456542514203]),
            {
              "lc": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([91.90601029461808, 21.6928522100947]),
            {
              "lc": 1,
              "system:index": "9"
            })]),
    bareland = 
    /* color: #e9f200 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([91.95439904344661, 21.673243193999486]),
            {
              "lc": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95490329874141, 21.67306372736287]),
            {
              "lc": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95521443498714, 21.67288924569645]),
            {
              "lc": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95403426302059, 21.673337912412073]),
            {
              "lc": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95327788007839, 21.67270479341947]),
            {
              "lc": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95335834634884, 21.67251535570019]),
            {
              "lc": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89226327134485, 21.689933292533503]),
            {
              "lc": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89235983086938, 21.689748862069926]),
            {
              "lc": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89113674355859, 21.6907956264328]),
            {
              "lc": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89262268735284, 21.690541412929722]),
            {
              "lc": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([91.9330283184943, 21.598674353440646]),
            {
              "lc": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([91.93331263264987, 21.598479830848]),
            {
              "lc": 2,
              "system:index": "11"
            })]),
    buildup = 
    /* color: #ff0000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([91.92802820943295, 21.676388690435708]),
            {
              "lc": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95738230489194, 21.67383631073231]),
            {
              "lc": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95674865854366, 21.672545266935572]),
            {
              "lc": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([91.9572421850024, 21.67253031131865]),
            {
              "lc": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95732801569088, 21.6724405775846]),
            {
              "lc": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95714026105983, 21.671727690935285]),
            {
              "lc": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([91.87782348502623, 21.696137278424477]),
            {
              "lc": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([91.88640655387388, 21.698888634993423]),
            {
              "lc": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([91.88728631843077, 21.700503537190215]),
            {
              "lc": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([91.93340382775638, 21.599123250733452]),
            {
              "lc": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([91.9378562947211, 21.598789071770135]),
            {
              "lc": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([91.93698725900028, 21.598529708460784]),
            {
              "lc": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([91.93514189919803, 21.599412539362124]),
            {
              "lc": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([91.9316603918967, 21.599736741448442]),
            {
              "lc": 3,
              "system:index": "13"
            })]),
    agri = 
    /* color: #4ce022 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([91.953567558652, 21.67251535570019]),
            {
              "lc": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95384650838955, 21.67251535570019]),
            {
              "lc": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95335834634884, 21.672246154302524]),
            {
              "lc": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95318668497188, 21.671971967177118]),
            {
              "lc": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95567041051967, 21.672983964341572]),
            {
              "lc": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91666813590923, 21.67815890451767]),
            {
              "lc": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91723676422039, 21.67596548287658]),
            {
              "lc": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91563816764751, 21.676085124917613]),
            {
              "lc": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91485496261517, 21.67696249685102]),
            {
              "lc": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([91.9160673210899, 21.67759559714504]),
            {
              "lc": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91427560546795, 21.677590612114212]),
            {
              "lc": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91806288459698, 21.677161898818415]),
            {
              "lc": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91690953472057, 21.6762496325619]),
            {
              "lc": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91544504859844, 21.676513841415883]),
            {
              "lc": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([91.9126448223869, 21.676583632353076]),
            {
              "lc": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([91.91611023643414, 21.678049234228318]),
            {
              "lc": 4,
              "system:index": "15"
            })]),
    forest = 
    /* color: #0d6405 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([91.9507405103503, 21.67284437894809]),
            {
              "lc": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95191531789882, 21.671593089563952]),
            {
              "lc": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95423811090572, 21.672076656868345]),
            {
              "lc": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95433467043026, 21.671343827433404]),
            {
              "lc": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([91.9555845798312, 21.672081642089854]),
            {
              "lc": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([91.93736530923053, 21.601867403338783]),
            {
              "lc": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([91.93225838326617, 21.593487916513208]),
            {
              "lc": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([91.956720129482, 21.59648064607202]),
            {
              "lc": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([91.97811444223481, 21.58437439859715]),
            {
              "lc": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([91.96687062204438, 21.582299272515115]),
            {
              "lc": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([91.93464119852143, 21.58569129011248]),
            {
              "lc": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95157830917039, 21.62327359448327]),
            {
              "lc": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95106332503953, 21.62231610513375]),
            {
              "lc": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([91.95149247848191, 21.621119234527768]),
            {
              "lc": 5,
              "system:index": "13"
            })]),
    mangrove = 
    /* color: #699d0d */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([91.87500441090928, 21.52852363827587]),
            {
              "lc": 6,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([91.86401808278428, 21.527884895189533]),
            {
              "lc": 6,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([91.87706434743272, 21.564927348773136]),
            {
              "lc": 6,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([91.87157118337022, 21.605152395660248]),
            {
              "lc": 6,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([91.88750919603818, 21.511987227207076]),
            {
              "lc": 6,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89712223314756, 21.50726090605706]),
            {
              "lc": 6,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89059910082334, 21.529299047753838]),
            {
              "lc": 6,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([91.89798054003232, 21.502629277480953]),
            {
              "lc": 6,
              "system:index": "7"
            })]);