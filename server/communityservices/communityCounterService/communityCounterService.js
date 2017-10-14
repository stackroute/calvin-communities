const counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');

module.exports = function (eventMessage) {
  counterctrl.onevent(eventMessage.domain, eventMessage.event, eventMessage.body, () => {
  });
};
