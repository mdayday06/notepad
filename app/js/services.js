"use strict";

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular
  .module("myApp.services", [])
  .value("version", "0.1")
  .factory("notesFactory", function() {
    return {
      put: function(note) {
        localStorage.setItem("note" + note.id, JSON.stringify(note));
        return this.getAll();
      },
      get: function(index) {
        return JSON.parse(localStorage.getItem("note" + index));
      },
      getAll: function() {
        var notes = [];
        for (var i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i).indexOf("note") !== -1) {
            var note = localStorage.getItem(localStorage.key(i));
            notes.push(JSON.parse(note));
          }
        }
        return notes;
      },
      delete: function(index) {
        if (index == undefined) {
          return;
        }
        var key = "note" + index;
        localStorage.removeItem(key);
        this.getAll();
      }
    };
  });
