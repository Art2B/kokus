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
    kokus: null,
    elements: [],
    lastLevelBat: null,

    // Application Constructor
    initialize: function() {
        this.kokus = new Kokus();
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
        var _self = this;
        PhoneCallTrap.onCall(function(state) {
            if(state === "RINGING")
                app.addMountain();
        });
        app.startWatch();
        document.addEventListener("batterystatus", function(data) {
            if(data.level < 50 && (app.lastLevelBat === null || app.lastLevelBat >= 50))
            app.addMountain(app);
        }, false);
        document.addEventListener("offline", function() {
            app.addHouse();
        }, false);
    },
    startWatch: function() {
        var _self = this;
        SMS.startWatch(function(){
            document.addEventListener('onSMSArrive', function(e){
                _self.addTree();
            },function(){
                alert("Redémarrer l'application si vous pouvez");
            });
        });
    },
    onBatteryStatus: function(data) {
        if(data.level < 50 && (this.lastLevelBat === null || this.lastLevelBat >= 50))
            this.addMountain();
    },
    addTree: function() {
        var rotation = {};
        rotation.x = Helpers.getRandomInt(0, 360);
        rotation.y = Helpers.getRandomInt(0, 360);
        rotation.z = Helpers.getRandomInt(0, 360);

        var tree = new Kokus.Tree(rotation, {elements: app.elements}, app.kokus);
        while(tree.collision())
        {
            rotation.x = Helpers.getRandomInt(0, 360);
            rotation.y = Helpers.getRandomInt(0, 360);
            rotation.z = Helpers.getRandomInt(0, 360);
        }

        app.elements.push(tree.create());
    },
    addMountain: function(_self) {
        var rotation = {};
        rotation.x = Helpers.getRandomInt(0, 360);
        rotation.y = Helpers.getRandomInt(0, 360);
        rotation.z = Helpers.getRandomInt(0, 360);

        var mountain = new Kokus.Mountain(rotation, {elements: app.elements}, app.kokus);
        while(mountain.collision())
        {
            rotation.x = Helpers.getRandomInt(0, 360);
            rotation.y = Helpers.getRandomInt(0, 360);
            rotation.z = Helpers.getRandomInt(0, 360);
        }

        app.elements.push(mountain.create());
    },
    addHouse: function() {
        var rotation = {};
        rotation.x = Helpers.getRandomInt(0, 360);
        rotation.y = Helpers.getRandomInt(0, 360);
        rotation.z = Helpers.getRandomInt(0, 360);
     
        var house = new Kokus.House(rotation, {elements: app.elements}, app.kokus);
        while(house.collision())
        {
            rotation.x = Helpers.getRandomInt(0, 360);
            rotation.y = Helpers.getRandomInt(0, 360);
            rotation.z = Helpers.getRandomInt(0, 360);
        }

        app.elements.push(house.create());
    },
    growUp: function() {
        if(this.elements.length % 10 && this.elements.length !== 0)
            this.kokus.dailyEvents();
    }
};
