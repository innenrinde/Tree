/**
 * Template provider
 */
export class AbstractProvider {

	static ID = "id";
	static PARENT = "id_parent";
	static TITLE = "title";

	constructor() {
		if (this.constructor === AbstractProvider) {
			throw new Error("Cannot instantiate abstract class");
		}
	}

	/**
	 * Generate list of transformed nodes
	 * @param {Array} data
	 */
	*load(data) {
		for (let row of data) {
			yield this.constructor.transform(row);
		}
	}
}