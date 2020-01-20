
module.exports = (str) => {
			var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
			str = str.replace(/ /g, '');
			for (var i = 0; i < specialChars.length; i++) {
			    str = str.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
			}
			return str.toLowerCase();
		}