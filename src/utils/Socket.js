// src/utils/socket.js

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClientUser = null;
let stompClientDriver = null;

//
// ==== USER SOCKET CONNECTION ====
//

export function connectUserSocket({ username, latitude, longitude, onConnect, onError, onMessage }) {
  const socket = new SockJS("https://quick-ambulance-location.onrender.com/ws");
  stompClientUser = Stomp.over(socket);
  console.log("📡 Connecting as user:", username);

  stompClientUser.connect({}, function (frame) {
    console.log('✅ User WebSocket connected:', frame);
    if (onConnect) onConnect(frame);

    // Subscribe to updates about nearby ambulances
    stompClientUser.subscribe(`/topic/nearby-ambulance/${username}`, function (response) {
      const body = JSON.parse(response.body);
      if (onMessage) onMessage(body);
    });

    // Send user location periodically
    function sendLocation() {
      const payload = { username, longitude, latitude };
      stompClientUser.send("/app/driver-locations", {}, JSON.stringify(payload));
    }

    sendLocation(); // send once
    setInterval(sendLocation, 3000); // send every 3s

  }, function (error) {
    console.error("❌ User WebSocket connection error:", error);
    if (onError) onError(error);
  });
}

export function bookRide({ username, latitude, longitude }) {
  if (!stompClientUser || !stompClientUser.connected) {
    console.error("❌ WebSocket not connected. Cannot book.");
    return;
  }

  const bookingPayload = { username, latitude, longitude };
  console.log("📨 Sending booking to /app/book", bookingPayload);
  stompClientUser.send("/app/book", {}, JSON.stringify(bookingPayload));
}

export function disconnectUserSocket() {
  if (stompClientUser && stompClientUser.connected) {
    stompClientUser.disconnect(() => console.log("🔌 User socket disconnected."));
  }
}

//
// ==== DRIVER SOCKET CONNECTION ====
//

export function connectDriverSocket({ driverUsername, onAlert, onError, onConnect }) {
  const socket = new SockJS("https://quick-ambulance-location.onrender.com/ws");
  stompClientDriver = Stomp.over(socket);
  console.log("📡 Connecting as driver:", driverUsername);

  stompClientDriver.connect({}, function (frame) {
    console.log("✅ Driver WebSocket connected:", frame);
    if (onConnect) onConnect(frame);

    // Listen for booking alerts
    stompClientDriver.subscribe(`/topic/alert/${driverUsername}`, function (message) {
      const body = safeParse(message.body);
      if (onAlert) onAlert(body);
    });

    // Optional: Listen for backend errors
    stompClientDriver.subscribe(`/topic/error/${driverUsername}`, function (errorMsg) {
      const errorText = errorMsg.body;
      console.error("❌ Error for driver:", errorText);
    });

  }, function (error) {
    console.error("❌ Driver WebSocket connection error:", error);
    if (onError) onError(error);
  });
}

export function sendDriverLiveLocation({ username, latitude, longitude }) {
  if (!stompClientDriver || !stompClientDriver.connected) {
    console.error("❌ Driver WebSocket not connected. Cannot send location.");
    return;
  }

  const locationPayload = { username, latitude, longitude };
  stompClientDriver.send("/app/live-location", {}, JSON.stringify(locationPayload));
  console.log("📍 Sent driver live location:", locationPayload);
}

export function disconnectDriverSocket() {
  if (stompClientDriver && stompClientDriver.connected) {
    stompClientDriver.disconnect(() => console.log("🔌 Driver socket disconnected."));
  }
}

//
// ==== RIDE ACCEPTANCE ====
//

export function acceptRide({ userUsername, driverUsername, latitude, longitude }) {
  if (!stompClientDriver || !stompClientDriver.connected) {
    console.error("❌ Driver WebSocket not connected. Cannot accept ride.");
    return;
  }

  const payload = {
    userUsername: userUsername,
    driverUsername: driverUsername,
    longitude: longitude,
    latitude: latitude,
  };

  stompClientDriver.send("/app/accept", {}, JSON.stringify(payload));
  console.log("✅ Acceptance sent to /app/accept:", payload);
}


export function subscribeToAcceptance({ userUsername, driverUsername, onUserUpdate, onDriverUpdate }) {
  if (stompClientUser && stompClientUser.connected && userUsername) {
    stompClientUser.subscribe(`/topic/user/${userUsername}`, (msg) => {
      const body = safeParse(msg.body);
      console.log("📩 User notified with driver info:", body);
      if (onUserUpdate) onUserUpdate(body);
    });
  }

  if (stompClientDriver && stompClientDriver.connected && driverUsername) {
    stompClientDriver.subscribe(`/topic/driver/${driverUsername}`, (msg) => {
      const body = safeParse(msg.body);
      console.log("📩 Driver notified with user info:", body);
      if (onDriverUpdate) onDriverUpdate(body);
    });
  }
}

export const subscribeToDriverLocation = ({ driverUsername, onLocationUpdate }) => {
  const socket = new SockJS('YOUR_SOCKET_URL'); // replace with your WebSocket URL
  const stompClient = Stomp.over(socket);
  
  stompClient.connect({}, function (frame) {
    // Subscribe to the driver's location updates
    stompClient.subscribe(`/topic/driver-location/${driverUsername}`, function (messageOutput) {
      const location = JSON.parse(messageOutput.body);
      console.log('Driver Location Update:', location);

      // Call the provided callback function with the new location
      onLocationUpdate(location);
    });
  });
};


//
// ==== UTIL ====
//

function safeParse(body) {
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}
