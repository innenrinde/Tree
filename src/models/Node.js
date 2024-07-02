import {AbstractProvider} from "@/lib/AbstractProvider";

/**
 * Tree node mapping
 */
export class Node {

	constructor(data) {

		// unique node id
		this.id = data[AbstractProvider.ID] ?? null;

		// node title
		this.title = data[AbstractProvider.TITLE] ?? "";

		// ref to parent node
		this.parent = null;

		// list of children
		this.children = [];
	}

	/**
	 * Add a child to list of children keeping two-way connection with the parent
	 * @param {Node} child
	 */
	addChild(child) {
		child.parent = this;
		this.children.push(child);
	}
}