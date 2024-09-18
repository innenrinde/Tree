import {Node} from "@/tree/models/Node";

export class TreeBuilder {

	/**
	 * Tree root
	 * @type {Node}
	 */
	#root = {};

	/**
	 * Table of processed nodes
	 * @type {Object}
	 */
	#nodesTable = {};

	/**
	 * Queue of unprocessed nodes
	 * @type {Array}
	 */
	#temporarySourceNodes = [];

	/**
	 * To process data input
	 * @type {AbstractProvider}
	 */
	#provider = null;

	/**
	 * @param {AbstractProvider} provider
	 */
	constructor(provider) {
		this.#provider = provider;
		this.#root = new Node(0);

		this.#nodesTable[this.#root.id] = this.#root;
	}

	/**
	 * Get basic node data to to concerted to a node object
	 * @param {Object} node
	 */
	process(node) {
		let parentId = this.#provider.getParent(node);
		let nodeId = this.#provider.getId(node);
		let title = this.#provider.getTitle(node);

		if (this.#nodesTable[parentId]) {
			let treeNode = new Node(nodeId, title);
			this.#nodesTable[nodeId] = treeNode;
			this.#nodesTable[parentId].addChild(treeNode);
		} else {
			this.#temporarySourceNodes.push(node);
		}
	}

	/**
	 * Get root
	 * @return {Node}
	 */
	getRoot() {
		return this.#root;
	}

	/**
	 * @return {Array}
	 */
	getTempSource() {
		return this.#temporarySourceNodes;
	}

	/**
	 * Reset queue of unprocessed nodes to be used for next iteration
	 */
	resetTempSource() {
		this.#temporarySourceNodes = [];
	}
}