const functions = require("firebase-functions");
const twilio = require("twilio");


const DBPATH = "/send/sms/{messageId}"; // objects stored here trigger SMS
const SSID = functions.config().twilio.sid;
const AUTH = functions.config().twilio.auth;
const TWILIO_NUMBER = "+34931070651";

// Firebase trigger Function to send an SMS
exports.sendSMS = functions.database.ref(DBPATH).onCreate((snapshot, context) => {

  // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log(original, "created DB ref")
      const sms = original;
      const DEST_NUMBER = sms.number; // text for SMS contained in alertText property
      const DEST_TEXT = sms.text;
      const client = new twilio(SSID, AUTH); // TODO: Add values for your Twilio account
    client.messages.create({
      to: DEST_NUMBER, // TODO: add destination number
      from: TWILIO_NUMBER, // TODO: add your Twilio outbound number
      body: DEST_TEXT
    })
    .then((message) =>{ console.log(message.sid);
    return;
    })
    .catch((err)=> {console.log('error with sms', err)
      return;
  })



      // client.messages.create(
      //   {
      //     to: DEST_NUMBER, // TODO: add destination number
      //     from: TWILIO_NUMBER, // TODO: add your Twilio outbound number
      //     body: DEST_TEXT
      //   },
      //   err => {
      //     if (err) {
      //       // didn't go through, let's fulfill promise with a rejection
      //       console.error(err.message);
      //       // reject();
      //       return;
      //     }
      //     res.end();
      //     return;
      //     // success -- let's record this, then remove the alert from the queue
      //     // const ALERT_RECORD_PATH = '/alerts/records';
      //     // db.ref(`${ALERT_RECORD_PATH}/${alert.GUID}`).set(alert).then(() => {
      //     //   db.ref(`${ALERT_QUEUE_PATH}/${alert.GUID}`).remove().then(() =>
      //     //     resolve()).catch(() => reject());
      //     // }).catch(() => reject());
      //   }
      // );
    });
