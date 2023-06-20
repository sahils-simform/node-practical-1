const moment = require("moment-timezone");
const timezones = require("../timezone.json");

const convertTimezone = (req, res) => {
  try {
    const { CURRENT_TIME, CURRENT_TIMEZONE, CONVERT_TO_TIMEZONE } = req.body;

    if (!CURRENT_TIME || !CURRENT_TIMEZONE || !CONVERT_TO_TIMEZONE) {
      throw new Error(
        "Invalid input. Please provide CURRENT_TIME, CURRENT_TIMEZONE, and CONVERT_TO_TIMEZONE."
      );
    }

    const currentTz = timezones.find((tz) => tz.abbr === CURRENT_TIMEZONE);
    const convertToTz = timezones.find((tz) => tz.abbr === CONVERT_TO_TIMEZONE);

    if (!currentTz || !convertToTz) {
      throw new Error("Invalid timezone abbreviation");
    }

    const currentTime = moment.tz(CURRENT_TIME, currentTz.timezone);

    const convertedTime = currentTime
      .clone()
      .tz(convertToTz.timezone)
      .format("hh:mm A");

    return res.json({ CONVERTED_TIME: convertedTime });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  convertTimezone,
};
