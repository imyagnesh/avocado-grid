(function (polymer) {

  'use strict';

  Polymer({
    is: 'avocado-grid',

    properties: {

      grid: {
        type: Array
      },

      cell: {
        type: Array
      },

      selectAll: {
        type: Boolean
      },

      readOnly: {
        type: Boolean,
        value: false
      },

      height: {
        type: Number,
        value: 200
      },

      rowHeight: {
        type: Number,
        value: 40
      },

      cellsPerPage: {
        type: Number,
        computed: 'computeCellsPerPage(height, rowHeight)'
      },

      numberOfCells: {
        type: Number,
        computed: 'computeNumberOfCells(cellsPerPage)'
      },

      scrollTop: {
        type: Number,
        value: 0,
        notify: true,
        observer: 'changeScrollPosition'
      }


    },

    ready: function () {
      this.grid = [
        {
          label: 'First Name',
          binding: 'firstName',
          type: 'string',
          control: 'text-box',
          width: 10
        },
        {
          label: 'Last Name',
          binding: 'lastName',
          type: 'string',
          control: 'text-box',
          width: 10
        },
        {
          label: 'Address',
          binding: 'address',
          type: 'string',
          control: 'text-box',
          width: 10
        },
        {
          label: 'Contact',
          binding: 'contact',
          type: 'number',
          control: 'text-box',
          width: 10
        }];

      this.cell = [
        {
          firstName: 'Yagnesh',
          lastName: 'Modh',
          address: 'Ahmedabad',
          contact: '8690090417'
        },
        {
          firstName: 'Yagnesh1',
          lastName: 'Modh1',
          address: 'Ahmedabad1',
          contact: '86900904171'
        }
      ];
    },

    computeCellsPerPage: function (height, rowHeight) {
      return Math.round(height / rowHeight);
    },

    computeNumberOfCells: function (cellsPerPage) {
      return 3 * cellsPerPage;
    },

    scrollData: function () {
      this.scrollTop = this.$.virtual-scroll.scrollTop;
    },

    changeScrollPosition: function (newValue) {
      var firstCell = Math.max(Math.floor(newValue / this.rowHeight) - this.cellsPerPage, 0);
      var cellsToCreate = Math.min(firstCell + this.numberOfCells, this.numberOfCells);
      var searchResult = this.getIndexData(this.cell, firstCell, firstCell + cellsToCreate);
//        if (searchResult.data.length > 0) {
//          this.noResultFound = true;
//        }
//        else {
//          this.noResultFound = false;
//        }
      this.cell = searchResult;
      var ironSelector = Polymer.dom(this.root).querySelector('#canvas');
      ironSelector.setAttribute('style', 'height: ' + searchResult.length * this.rowHeight + 'px;');
      var childNodes = Polymer.dom(this.root).querySelectorAll('div.renderer');
      for (var i = 0; i < childNodes.length; i++) {
        childNodes[i].setAttribute('style', 'top: ' + ((firstCell + i) * this.rowHeight) + 'px;');
      }
    },


    getIndexData: function (searchResult, startIndex, endIndex) {
      return _.slice(searchResult, startIndex, endIndex);
    }

  });

})(Polymer);
