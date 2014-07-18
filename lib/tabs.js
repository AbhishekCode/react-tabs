/** @jsx React.DOM */
var React = require('react');

function isTabNode(node) {
	return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

module.exports = React.createClass({
	propTypes: {
		selectedIndex: React.PropTypes.number,
		onSelectedChange: React.PropTypes.func
	},

	getDefaultProps: function () {
		return {
			selectedIndex: 0
		};
	},

	getInitialState: function () {
		return {
			selectedIndex: -1
		};
	},

	setSelected: function (index, focus) {
		// Don't do anything if nothing has changed
		if (index === this.getSelectedIndex()) return;
		// Check index boundary
		if (index < 0 || index >= this.getTabs().length) return;

		// Update selected index
		this.__lastSelectedIndex = this.getSelectedIndex();
		this.setState({ selectedIndex: index });
	},

	getSelectedIndex: function () {
		return this.state.selectedIndex;
	},

	getTabs: function () {
		return this.props.children[0].props.children;
	},

	getPanels: function () {
		return this.props.children.slice(1);
	},

	componentDidMount: function () {
		var selectedIndex = this.props.selectedIndex,
			tabs = this.getTabs(),
			panels = this.getPanels();

		// Hook up relation between tabs and panels
		for (var i=0, l=tabs.length; i<l; i++) {
			var tab = tabs[i],
				panel = panels[i];

			tab.setState({
				index: i,
				panel: panel
			});

			panel.setState({
				index: i,
				tab: tab
			});
		}

		this.setSelected(selectedIndex);
	},

	componentDidUpdate: function () {
		var tabs = this.getTabs(),
			panels = this.getPanels(),
			index = this.getSelectedIndex(),
			last = this.__lastSelectedIndex;

		// Reset currently selected
		if (typeof last !== 'undefined' && last > -1) {
			tabs[last].setSelected(false);
			panels[last].setSelected(false);
			delete this.__lastSelectedIndex;
		}

		// Update selected
		tabs[index].setSelected(true, focus);
		panels[index].setSelected(true);

		// Call change event handler
		if (typeof this.props.onSelectedChange === 'function') {
			this.props.onSelectedChange(index, tabs[index], panels[index], this);
		}
	},

	handleClick: function (e) {
		if (isTabNode(e.target)) {
			this.setSelected(e.target.getAttribute('data-index'));
		}
	},

	handleKeyDown: function (e) {
		if (isTabNode(e.target)) {
			var index = this.getSelectedIndex(),
				max = this.getTabs().length - 1;

			// Select next tab to the left
			if (e.keyCode === 37 || e.keyCode === 38) {
				index -= 1;
				// Wrap back to last tab if index is negative
				if (index < 0) {
					index = max;
				}
			}
			// Select next tab to the right
			else if (e.keyCode === 39 || e.keyCode === 40) {
				index += 1;
				// Wrap back to first tab if index exceeds max
				if (index > max) {
					index = 0;
				}
			}

			this.setSelected(index, true);
		}
	},

	render: function () {
		return (
			<div className="react-tabs"
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}>
				{this.props.children}
			</div>
		);
	}
});
