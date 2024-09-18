/**
 * Template provider
 */
export class AbstractProvider {

	// default keyword for a basic node fields
	ID = "id";
	PARENT = "id_parent";
	TITLE = "title";

	constructor() {
		if (this.constructor === AbstractProvider) {
			throw new Error("Cannot instantiate abstract class");
		}
	}

	/**
	 * Generate list of transformed nodes
	 * @param {Array} data
	 */
	load(data) {
		if (!Array.isArray(data)) {
			throw new Error("Load array source nodes");
		}

		return data;
	}

	/**
	 * @param {Object} node
	 * @return {string|number}
	 */
	getId(node) {
		return node[this.ID];
	}

	/**
	 * @param {Object} node
	 * @return {string|number}
	 */
	getParent(node) {
		return node[this.PARENT];
	}

	/**
	 * @param {Object} node
	 * @return {string}
	 */
	getTitle(node) {
		return node[this.TITLE];
	}
}