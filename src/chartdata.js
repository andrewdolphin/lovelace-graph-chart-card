/**
 * chart data builder
 * TODO: this is not final, try to find a optimized methode
 */

/**
 * data formatter
 * @param {*} d
 * @param {*} fmt
 */
function formatDate(d, fmt) {
	const date = new Date(d);

	function pad(value) {
		return value.toString().length < 2 ? "0" + value : value;
	}
	if (fmt == "timestamp") {
		return (
			date.getUTCFullYear() +
			"-" +
			pad(date.getUTCMonth() + 1) +
			"-" +
			pad(date.getUTCDate()) +
			" " +
			pad(date.getUTCHours()) +
			":" +
			pad(date.getUTCMinutes()) +
			":" +
			pad(date.getUTCSeconds())
		);
	}
	return fmt.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
		switch (fmtCode) {
			case "Y":
				return date.getUTCFullYear();
			case "M":
				return pad(date.getUTCMonth() + 1);
			case "d":
				return pad(date.getUTCDate());
			case "H":
				return pad(date.getUTCHours());
			case "m":
				return pad(date.getUTCMinutes());
			case "s":
				return pad(date.getUTCSeconds());
			default:
				throw new Error("Unsupported format code: " + fmtCode);
		}
	});
}

/**
 * number format integer or float
 * @param {*} n
 */
function num(n) {
	return n === parseInt(n) ? parseInt(n) : parseFloat(n).toFixed(2);
}

/**
 * class chart data builder
 */
class chartData {
	/**
	 * constructor chart data
	 * @param {*} config
	 */
	constructor(config) {
		this.entities = config.entities;
		this.entityData = config.entityData;
		this.entityNames = config.entityNames;
		this.stateHistories = config.stateHistories;
		this.data_dateGroup = config.data_dateGroup;
		this.data_aggregate = config.aggregate || "last";
		this.graphData = {};
	}

	/**
	 * build the grouped historydata
	 *
	 * TODO: this is not final, try to find a optimized methode
	 * ---------------------------------------------------------
	 * @param {*} array
	 * @param {*} fmt
	 * @param {*} aggr
	 */
	_getGroupHistoryData(array, fmt, aggr) {
		try {
			let groups = {};
			array.forEach(function (o) {
				let group = formatDate(o.last_changed, fmt);
				groups[group] = groups[group] || [];
				o.timestamp = formatDate(o.last_changed, "timestamp");
				o.last_changed = group;
				groups[group].push(o);
			});
			return Object.keys(groups).map(function (group) {
				let items = groups[group].filter(
					(item) => !isNaN(parseFloat(item.state)) && isFinite(item.state)
				);
				if (aggr == "first") {
					const item = items.shift();
					return {
						y: num(item.state),
						x: item.last_changed,
					};
				}
				if (aggr == "last") {
					const item = items[items.length - 1];
					return {
						y: num(item.state),
						x: item.last_changed,
					};
				}
				if (aggr == "max") {
					return items.reduce((a, b) =>
						a.state > b.state
							? {
									y: num(a.state),
									x: a.last_changed,
							  }
							: {
									y: num(b.state),
									x: b.last_changed,
							  }
					);
				}
				if (aggr == "min")
					return items.reduce((a, b) =>
						a.state < b.state
							? {
									y: num(a.state),
									x: a.last_changed,
							  }
							: {
									y: num(b.state),
									x: b.last_changed,
							  }
					);
				if (aggr == "sum") {
					const val = items.reduce((sum, entry) => sum + num(entry.state), 0);
					return {
						y: num(val),
						x: items[0].last_changed,
					};
				}
				if (aggr == "avg") {
					const val =
						items.reduce((sum, entry) => sum + num(entry.state), 0) /
						items.length;
					return {
						y: num(val),
						x: items[0].last_changed,
					};
				}
				return items.map((items) => {
					return {
						y: num(items.state),
						x: items.timestamp,
					};
				});
			});
		} catch (err) {
			console.error("Build Histroydata", err.message);
		}
	}

	/**
	 * get the graph data for the entities
	 * all current states for the defined entities
	 */
	getCurrentGraphData() {
		try {
			const emptyIndexes = this.entityData.reduce(
				(arr, e, i) => (e == 0 && arr.push(i), arr),
				[]
			);
			let _data = this.entityData.filter(
				(element, index, array) => !emptyIndexes.includes(index)
			);
			let _labels = this.entityNames.filter(
				(element, index, array) => !emptyIndexes.includes(index)
			);
			// build the datasource for the chartjs
			this.graphData = {
				data: {
					labels: _labels,
					datasets: [
						{
							data: _data,
							borderWidth: 0,
							hoverBorderWidth: 0,
							pointRadius: 0,
							fill: true,
							pointRadius: 0,
							unit: this.data_units,
							mode: "current",
						},
					],
				},
			};
			// custom colors from the entities
			let entityColors = this.entities
				.map((x) => {
					if (x.color !== undefined) return x.color;
				})
				.filter((notUndefined) => notUndefined !== undefined);
			if (entityColors.length === this.graphData.data.labels.length) {
				this.graphData.data.datasets[0].backgroundColor = entityColors;
			}
			if (this.graphData.data.length === 0) {
				console.error("No Histroydata present !");
				return;
			}
			return this.graphData;
		} catch (err) {
			console.error("Current entities GraphData", err.message);
		}
		return null;
	}

	/**
	 * build the graph cart data and datasets for the
	 * defined graph chart. Uses the history data
	 * for each entity
	 *
	 * @param {*} stateHistories
	 * @param {*} update
	 */
	getHistoryGraphData() {
		try {
			if (this.stateHistories && this.stateHistories.length) {
				// timebased data from the history
				let _graphData = {
					data: {
						labels: [],
						datasets: [],
					},
				};
				for (const list of this.stateHistories) {
					const items = this._getGroupHistoryData(
						list,
						this.data_dateGroup,
						this.data_aggregate
					);
					const id = list[0].entity_id;
					// get all settings from the selected entity
					const _attr = this.entities.find((x) => x.entity === id);

					// build the dataseries and check ignore data with zero values
					let _items = this.data_ignoreZero
						? items.map((d) => d.y).filter((x) => x != 0)
						: items.map((d) => d.y);

					// const _minval = Math.min(..._items);
					// const _maxval = Math.min(..._items);

					// default options
					let _options = {
						label: _attr.name,
						borderWidth: 3,
						hoverBorderWidth: 0,
						fill: false,
						unit: "",
						data: _items,
						minval: Math.min(..._items),
						maxval: Math.max(..._items),
					};
					_graphData.data.labels = items.map((l) => l.x);
					// add all entity settings (simple merge)
					if (_attr) _options = { ..._options, ..._attr };
					_graphData.data.datasets.push(_options);
				}
				this.graphData = _graphData;
				return this.graphData;
			}
		} catch (err) {
			console.error("Build History GraphData", err.message);
		}
		return null;
	}
}

export { chartData };