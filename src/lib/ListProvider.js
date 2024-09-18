import {AbstractProvider} from "@/tree/lib/AbstractProvider";

/**
 * Custom provider to parse source tree list
 */
export class ListProvider extends AbstractProvider {

	/**
	 * @inheritDoc
	 */
	getId(node) {
		return node.id;
	}

	/**
	 * @inheritDoc
	 */
	getParent(node) {
		return node.id_parent;
	}

	/**
	 * @inheritDoc
	 */
	getTitle(node) {
		return node.title;
	}
}