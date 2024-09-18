// import {AbstractProvider} from "@/lib/AbstractProvider";

/**
 * Tree node mapping
 */
export class Node {

	constructor(id, title) {

		// unique node id
		this.id = id;

		// node title
		this.title = title;

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