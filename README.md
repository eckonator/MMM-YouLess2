# MagicMirrorModule-YouLess2

## It´s a Fork from https://github.com/QNimbus/MMM-YouLess

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/). This module reads from a YouLess energy meter in your network to display realtime energy usage information.

## Installation

1. Navigate into your MagicMirror's `modules` folder and run:
```
$ git clone https://github.com/eckonator/MMM-YouLess2.git
```
1. Install the dependencies: 
```
$ cd MMM-YouLess2 && npm install --only=production
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-YouLess2',
            config: {
                // required settings
                youlessHost: "192.168.178.77",          // or youless.home.network.nl
                updateInterval: 30 * 1000,          	// every 30 seconds
                
                // optional settings
                totalGauge: 5000,                       // max watt for drawing circle
                gaugeUniqueId: "YouLess2_Gauge_1",      // must be unique, if you have multiple instances, rename the second one, e.g.: YouLess2_Gauge_2
                gaugeValueLabel: "Watt",                // gauge value label, directly after the value
                gaugeLabel: "Stromlast",                // gauge label in bottom of the gauge
                gaugeStyle: "Arch",                     // possible Options: Full | Arch | Semi
                
                // change it, if you know what you do
                initialLoadDelay: 0, 	            	// 0 seconds delay
                retryDelay: 2 * 1000,	            	// retry after 2 seconds
                gaugeStripe: 0,                         // possible Options: 0 | 1
                gaugeSize: 250,                         // size of the gauge
                gaugeColor: "#ffffff",                  // color of the active gauge
                gaugeBackColor: "rgba(255,255,255,.3)", // color of the inactive gauge
                gaugeCircleWidth: 16,                   // with of the gauge circle
                gaugeAnimationstep: 0,                  // filling gauge with or without animation
                gaugeAnimateCircleColors: false,        // animate circle colors
                gaugeAnimateTextColors: false,          // animate texte colors
                gaugeLabelColor: "#ffffff",             // label color
                gaugeTextSize: .11                      // text size
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `youlessHost`| *Required* Your YouLess ip address or hostname<br>**Default value:** 192.168.178.77<br>**Type:** `string`
| `updateInterval` | *Optional* Interval at which the module fetches new data<br><br>**Default value:** 30 * 1000 milliseconds (30 seconds)<br>**Type:** `int`(milliseconds)<br>
| `initialLoadDelay` | *Optional* Initial delay when module is first loaded<br><br>**Default value:** 0 milliseconds (0 seconds)<br>**Type:** `int`(milliseconds)<br>
| `retryDelay`     | *Optional* If no data is received, retry again after delay<br><br>**Default value:** 2 * 1000 milliseconds (2 seconds)<br>**Type:** `int`(milliseconds)<br>
| `totalGauge` | *Required* Max watt for drawing circle<br><br>**Default value:** 5000 Watt<br>**Type:** `int`(Watt)<br>
| `gaugeUniqueId` | *Required* Must be unique, if you have multiple instances, rename the second one, e.g.: YouLess2_Gauge_2<br><br>**Default value:** YouLess2_Gauge_1<br>**Type:** `string`<br>
| `gaugeValueLabel` | *Optional* Gauge value label, directly after the value<br><br>**Default value:** Watt<br>**Type:** `string`<br>
| `gaugeLabel` | *Optional* Gauge label in bottom of the gauge<br><br>**Default value:** Stromlast<br>**Type:** `string`<br>
| `gaugeStyle` | *Optional* Possible Options: Full / Arch / Semi<br><br>**Default value:** Arch<br>**Type:** `string`<br>
| `gaugeStripe` | *Optional* possible Options: 0/1<br><br>**Default value:** 0<br>**Type:** `boolean`<br>
| `gaugeSize` | *Optional* size of the gauge<br><br>**Default value:** 250<br>**Type:** `int` (pixel)<br>
| `gaugeColor` | *Optional* color of the active gauge<br><br>**Default value:** #ffffff<br>**Type:** `string`<br>
| `gaugeBackColor` | *Optional* color of the inactive gauge<br><br>**Default value:** rgba(255,255,255,.3)<br>**Type:** `string`<br>
| `gaugeCircleWidth` | *Optional* with of the gauge circle<br><br>**Default value:** 16<br>**Type:** `int` (pixel)<br>
| `gaugeAnimationstep` | *Optional* filling gauge with or without animation<br><br>**Default value:** 0<br>**Type:** `boolean`<br>
| `gaugeAnimateCircleColors` | *Optional* animate circle colors<br><br>**Default value:** false<br>**Type:** `boolean`<br>
| `gaugeAnimateTextColors` | *Optional* animate texte colors<br><br>**Default value:** false<br>**Type:** `boolean`<br>
| `gaugeLabelColor` | *Optional* label color<br><br>**Default value:** #ffffff<br>**Type:** `string`<br>
| `gaugeTextSize` | *Optional* text size<br><br>**Default value:** .11<br>**Type:** `int` (em)<br>

## Building from TypeScript source

Todo...

## Screenshots

![alt text][ss_01]

[ss_01]: public/images/module_ss_01.png "Example of YouLess2 module at work"