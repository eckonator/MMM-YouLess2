/* Magic Mirror
 * Module: MMM-YouLess2
 *
 * By M. Eckert
 * MIT Licensed.
 */

Module.register("MMM-YouLess2", {
	// Module config defaults.
	defaults: {
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
	},

	start: function () {
		this.loaded = false;
		this.powerUsage = -1;
		Log.info("Starting module: " + this.name);

		this.scheduleUpdate(this.config.initialLoadDelay);
	},

	getStyles: function () {
		return [
			this.file("public/css/styles.css"),
			"font-awesome.css",
		];
	},

	getScripts: function () {
		return [
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",  // this file will be loaded from the jquery servers.
			this.file("public/js/GaugeMeter.js"),
		];
	},

	getDom: function () {
		var wrapper = jQuery(document.createElement("div")).addClass("GaugeMeter").attr("id", this.config.gaugeUniqueId);
		var obj = {
			percent: ((this.powerUsage / this.config.totalGauge) * 100),
			size: this.config.gaugeSize,
			color: this.config.gaugeColor,
			back: this.config.gaugeBackColor,
			width: this.config.gaugeCircleWidth,
			style: this.config.gaugeStyle,
			stripe: this.config.gaugeStripe,
			animationstep: this.config.gaugeAnimationstep,
			animate_gauge_colors: this.config.gaugeAnimateCircleColors,
			animate_text_colors: this.config.gaugeAnimateTextColors,
			label: this.config.gaugeLabel,
			label_color: this.config.gaugeLabelColor,
			text: this.powerUsage,
			text_size: this.config.gaugeTextSize
		}
		wrapper.data(obj);
		wrapper.gaugeMeter();
		return wrapper[0];
	},

	updatePowerUsage: function () {
		var self = this;

		this.sendSocketNotification("QUERY");

		// Use default timeout if already loaded, else use the retryDelay if module hasn't loaded yet
		self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
	},

	processPowerUsage: function (data) {
		if (data) {
			var spanSeletor = "#" + this.config.gaugeUniqueId + " span";
			var oldWatt = jQuery(spanSeletor).text();

			jQuery(spanSeletor).attr("data-after", this.config.gaugeValueLabel);

			this.powerUsageHigh = this.powerUsageHigh < data.pwr ? data.pwr : this.powerUsageHigh;
			this.powerUsage = data.pwr;
			this.loaded = true;

			jQuery("#YouLess2Gauge").gaugeMeter({
				percent: ((this.powerUsage / this.config.totalGauge) * 100)
			});

			this.animateValue(spanSeletor, oldWatt, this.powerUsage, 500);
		}
	},

	/* scheduleUpdate()
 	 * Schedule next update.
 	 *
 	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
 	 */
	scheduleUpdate: function (delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function () {
			self.updatePowerUsage();
		}, nextLoad);
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "DOM_OBJECTS_CREATED") {
			this.loaded = true;
			this.sendSocketNotification("CONFIG", this.config);
		}
	},

	socketNotificationReceived: function (notification, payload) {
		var self = this;

		var responseReceived = function (payload) {
			self.processPowerUsage(JSON.parse(payload));
		};

		var acceptedNotifications = {
			"RESPONSE": responseReceived,
		};

		// Call appropriate handler for socket notification
		acceptedNotifications[notification] && typeof acceptedNotifications[notification] === "function" && acceptedNotifications[notification](payload);
	},

	animateValue: function (element, start, end, duration) {
		// assumes integer values for start and end

		var obj = jQuery(element);
		var range = end - start;
		// no timer shorter than 50ms (not really visible any way)
		var minTimer = 50;
		// calc step time to show all interediate values
		var stepTime = Math.abs(Math.floor(duration / range));

		// never go below minTimer
		stepTime = Math.max(stepTime, minTimer);

		// get current time and calculate desired end time
		var startTime = new Date().getTime();
		var endTime = startTime + duration;
		var timer;

		function run() {
			var now = new Date().getTime();
			var remaining = Math.max((endTime - now) / duration, 0);
			var value = Math.round(end - (remaining * range));
			obj.html(value);
			if (value == end) {
				clearInterval(timer);
			}
		}

		timer = setInterval(run, stepTime);
		run();
	}
});