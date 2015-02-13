/**
* @jsx React.DOM
*/

var BrowseFilterContainer = React.createClass({displayName: 'BrowseFilterContainer',
  render: function() {
    return (
      React.DOM.section({className: "browse-filter-container"}, 
        FilterGroup({label: "Department", filterGroup: "departments", filters: this.props.departments, multiSelect: this.props.multiSelect}), 
        FilterGroup({label: "Category", filterGroup: "categories", filters: this.props.categories, multiSelect: this.props.multiSelect}), 
        FilterGroup({label: "Gender", filterGroup: "genders", filters: this.props.genders, multiSelect: this.props.multiSelect}), 
        FilterGroup({label: "Brand", filterGroup: "brands", filters: this.props.brands, multiSelect: this.props.multiSelect}), 
        FilterGroup({label: "Color", filterGroup: "colors", filters: this.props.colors, multiSelect: this.props.multiSelect}), 
        FilterGroup({label: "Price", filterGroup: "prices", filters: this.props.prices, multiSelect: this.props.multiSelect}), 
        FilterGroup({label: "Size", filterGroup: "sizes", filters: this.props.sizes, multiSelect: this.props.multiSelect}), 
        SizeFilter({label: "Size", sizeGroups: this.props.sizeGroups})
      )
    );
  }
});

var FilterControls = React.createClass({displayName: 'FilterControls',
  render: function() {
    return (
      React.DOM.div({className: "filter-controls-container"}, 
        React.DOM.strong(null, 
          React.DOM.span(null, "+ "), 
          React.DOM.span({className: "clear-button", 'data-clear-filters': "1"}, "Clear Filters")
        )
      )
    );
  }
});

var FilterGroup = React.createClass({displayName: 'FilterGroup',
  getInitialState: function(){
    return {shown: false};
  },
  handleClick: function() {
    if(this.props.sizeFilter) {
      return false;
    }
    this.setState({shown: !this.state.shown});
    var filtersList = $(this.getDOMNode()).children('ul');
    if(!this.state.shown) {
      filtersList.stop(false, true).slideDown();
    } else {
      filtersList.stop(false, true).slideUp();
    }
  },
  render: function() {
    var filterGroup = this.props.filterGroup;
    var sizeFilterGroup = this.props.sizeFilter;
    var filterNodes = this.props.filters.map(function (filter) {
      return Filter({value: filter.value, filterGroup: filterGroup, sizeFilter: sizeFilterGroup, shown: filter.shown, key: filterGroup + '-' + filter.value}, filter.name);
    });
    var filterIcon = this.state.shown ? ' open ' : ' closed ';
    var filterIconShown = this.props.sizeFilter ? 'hide' : 'show';
    var filterShown = this.props.sizeFilter ? 'show' : 'hide';
    var hideFilterGroup = ((this.props.filters.length < 2 && this.props.multiSelect) || (this.props.filters.length < 1 && !this.props.multiSelect)) ? 'hide' : 'show';
    if(this.props.sizeFilter) {
      function hasDisplayedFilter(element, index, array) {
        return element.props.shown === true;
      }
      if(!filterNodes.some(hasDisplayedFilter)) {
        hideFilterGroup = 'hide';
      }
    }
    return (
      React.DOM.div({className: 'filter-group ' + hideFilterGroup}, 
        React.DOM.div({className: 'icon' + filterIcon + filterIconShown}), 
        React.DOM.strong({onClick: this.handleClick}, this.props.label), 
        React.DOM.ul({className: filterShown, 'data-filters-shown': this.state.shown}, 
          filterNodes
        )
      )
    );
  }
});
 
var Filter = React.createClass({displayName: 'Filter',
  getInitialState: function() {
    return {active: false};
  },
  handleClick: function(event) {
    $('[data-filter-blocker]').fadeIn();
    this.setState({active: !this.state.active});
    var value = this.props.value;
    if(typeof this.props.value === 'string' && this.props.value.indexOf('(') > -1) {
      value = encodeURI(value.substr(0, (value.indexOf('(') - 1)));
    }
    if(!this.state.active) {
      PLNDR.browse.filterData[this.props.filterGroup].push(value);
      PLNDR.browse.currentFilters.push({filterGroup: (this.props.sizeFilter ? 'sizeGroups' : this.props.filterGroup), filter: this.props.value});
    } else {
      PLNDR.browse.filterData[this.props.filterGroup].splice(PLNDR.browse.filterData[this.props.filterGroup].indexOf(value), 1);
      for(var i = 0; i < PLNDR.browse.currentFilters.length; i++) {
        if(PLNDR.browse.currentFilters[i].filterGroup === (this.props.sizeFilter ? 'sizeGroups' : this.props.filterGroup)) {
          PLNDR.browse.currentFilters.splice(i, 1);
          break;
        }
      }
    }
    $.lazyLoader('reset');
  },
  render: function() {
    var filterState = this.state.active ? 'active' : 'inactive';
    var filterShown = (this.props.shown || this.state.active) ? 'shown' : 'hide';
    return (
      React.DOM.li({className: filterShown}, 
        React.DOM.span({onClick: this.handleClick, className: filterState, 'data-filter-value': this.props.value}, this.props.children)
      )
    );
  }
});
 
var SizeFilter = React.createClass({displayName: 'SizeFilter',
  getInitialState: function() {
    return {shown: false};
  },
  handleClick: function() {
    this.setState({shown: !this.state.shown});
    var filtersList = $(this.getDOMNode()).children('[data-size-filter-group-container]');
    if(!this.state.shown) {
      filtersList.stop(false, true).slideDown();
    } else {
      filtersList.stop(false, true).slideUp();
    }
  },
  render: function() {
    var filterGroupNodes = this.props.sizeGroups.map(function (sizeGroup) {
      return FilterGroup({label: sizeGroup.name, key: sizeGroup.sizeGroupingId, sizeFilter: true, filterGroup: "sizes", filters: sizeGroup.sizes});
    });
    var filterIcon = this.state.shown ? ' open' : ' closed';
    var hideFilterGroup = this.props.sizeGroups.length > 0 ? 'shown' : 'hide';
    return (
      React.DOM.div({className: 'size-filter-container ' + hideFilterGroup}, 
        React.DOM.div({className: 'icon' + filterIcon}), 
        React.DOM.strong({onClick: this.handleClick}, this.props.label), 
        React.DOM.div({className: "hide size-filter-group-container", 'data-size-filter-group-container': "1"}, 
          filterGroupNodes
        )
      )
    );
  }
});
 
React.renderComponent(BrowseFilterContainer({multiSelect: PLNDR.browse.multiSelect, departments: PLNDR.browse.filters.departments, categories: PLNDR.browse.filters.categories, genders: PLNDR.browse.filters.genders, brands: PLNDR.browse.filters.brands, colors: PLNDR.browse.filters.colors, prices: PLNDR.browse.filters.prices, sizes: PLNDR.browse.filters.sizes, sizeGroups: PLNDR.browse.filters.sizeGroups}), document.getElementById('filter-container'));