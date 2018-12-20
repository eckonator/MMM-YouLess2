/* Magic Mirror
 * Node Helper: MMM-YouLess2
 *
 * By M. Eckert
 * MIT Licensed.
 */

var request = require("request");
var NodeHelper = require("node_helper");

var nodeHelper = NodeHelper.create({
	config: {},

	// Override start method.
	start: function () {
	},

	// Override socketNotificationReceived method.
	socketNotificationReceived: function (notification, payload) {
		var self = this;

		var config = function (payload) {
			self.config = payload;
		};

		var query = function (payload) {
			var options = {
				uri: `http://${self.config.youlessHost}/a?f=j`,
				method: "GET",
			};

			request(options, function (error, response, body) {
				if (response && response.statusCode === 200) {
					self.sendSocketNotification("RESPONSE", body);
				}
			});
		};

		var acceptedNotifications = {
			"CONFIG": config,
			"QUERY": query,
		};

		// Call appropriate handler for socket notification
		acceptedNotifications[notification] && typeof acceptedNotifications[notification] === "function" && acceptedNotifications[notification](payload);
	},
});

module.exports = nodeHelper;