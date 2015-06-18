/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        PhoneCallTrap.onCall(function(state) {
            console.log("CHANGE STATE: " + state);

            switch (state) {
                case "RINGING":
                    alert("Phone is ringing");
                    break;
                case "OFFHOOK":
                    alert("Phone is off-hook");
                    break;

                case "IDLE":
                    alert("Phone is idle");
                    break;
            }
        });
        app.startWatch();
        window.addEventListener("batterystatus", app.onBatteryStatus, false);
        window.addEventListener("offline", app.onOffline, false);
    },
    startWatch: function() {
        SMS.startWatch(function(){
            document.addEventListener('onSMSArrive', function(e){
                var sms = e.data;
                alert( sms.body );
            },function(){
                alert("Can't start watch");
            });
        });
    },
    onBatteryStatus: function(data) {
        alert(data.level);
        Main.createMountain({x: 0, y: 0, z:0});
    },
    onOffline: function() {
        alert("J'ai plus internet");
    }
};
