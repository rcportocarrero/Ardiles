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
var myDB;
var nombre_completo = '';
var itemsToarray = new Array();
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
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //myDB = window.sqlitePlugin.openDatabase({name: "ardiles.sqlite"});
        myDB = window.sqlitePlugin.importPrepopulatedDatabase({file: "ardiles.sqlite", "importIfExists": true});
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*   var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    */
     myDB.transaction(function(tx) {
      tx.executeSql("select dni,nombres,ape_pat,ape_mat from tb_clientes;", [], function(tx, res) {
        console.log("res.rows.length: " + res.rows.length + " -- should be 1");
        console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
        $('#movie-list').empty();
        $.each(res.rows,function(index){
            itemsToarray.push(res.rows.item(index));
            var row = res.rows.item(index);
            nombre_completo = row['nombres']+' '+row['ape_pat']+' '+row['ape_mat'];
            $('#movie-list').append('<li data-filtertext="'+nombre_completo+'" ><a href="" data-id="' + row['id'] + '"><h3>' + nombre_completo + '</h3><p>Línea de crédito: 133</p></a></li>');
        });
        $('#movie-list').listview('refresh');
      });

    }, function(e) {
      console.log("ERROR: " + e.message);
    });
  });

        console.log('Received Event: ' + id);
    }
};

app.initialize();
