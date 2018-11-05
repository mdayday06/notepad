"use strict";

/* Directives */

angular
  .module("myApp.directives", [])
  .directive("appVersion", [
    "version",
    function(version) {
      return function(scope, elm, attrs) {
        elm.text(version);
      };
    }
  ])
  .directive("helloWorld", function() {
    return {
      restrict: "AE",
      replace: true,
      template: '<p style="background-color:{{color}}">Hello World',
      link: function(scope, elem, attrs) {
        elem.bind("click", function() {
          elem.css("background-color", "white");
          scope.$apply(function() {
            scope.color = "white";
          });
        });
        elem.bind("mouseover", function() {
          elem.css("cursor", "pointer");
        });
      }
    };
  })
  .directive("helloWorld1", function() {
    return {
      restrict: "AE",
      replace: true,
      scope: {
        color11: "@colorAttr"
      },
      template: '<p style="background-color:{{color11}}">Hello World',
      link: function(scope, elem, attrs) {
        elem.bind("click", function() {
          elem.css("background-color", "white");
          scope.$apply(function() {
            scope.color11 = "white";
          });
        });
        elem.bind("mouseover", function() {
          elem.css("cursor", "pointer");
        });
      }
    };
  })
  .directive("notepad", function(notesFactory) {
    return {
      restrict: "AE",
      scope: {},
      templateUrl: "./templates/notepad.html",
      link: function(scope, elem, attrs) {
        scope.openEditor = function(index) {
          scope.editMode = true;
          if (index !== undefined) {
            scope.noteText = notesFactory.get(index).content;
            scope.index = index;
            //for delete
            scope.index = index;
          } else scope.noteText = undefined;
        };
        scope.save = function() {
          if (scope.noteText !== "" && scope.noteText !== undefined) {
            var note = {};
            note.title =
              scope.noteText.length > 10
                ? scope.noteText.substring(0, 10) + ". . ."
                : scope.noteText;
            note.content = scope.noteText;
            note.id = scope.index != -1 ? scope.index : localStorage.length;
            scope.notes = notesFactory.put(note);
          }
          scope.restore();
        };
        scope.restore = function() {
          scope.editMode = false;
          scope.index = -1;
          scope.noteText = "";
        };
        scope.deleteNote = function() {
          notesFactory.delete(scope.index);
          scope.restore();
          scope.notes = notesFactory.getAll();
        };

        var editor = elem.find("#editor");

        scope.restore();
        scope.notes = notesFactory.getAll();
        editor.bind("keyup keydown", function() {
          scope.noteText = editor.text().trim();
        });
      }
    };
  });
