import {AbstractProvider} from "@/lib/AbstractProvider";

/**
 * Custom provider to parse source tree list
 */
export class ListProvider extends AbstractProvider {

	/**
	 * Transform original node to a compatible node with tree component
	 * @param {Object} node original node from source
	 * @return {Object}
	 */
	static transform(node) {
		return {
			[AbstractProvider.ID]: node.id,
			[AbstractProvider.PARENT]: node.id_parent,
			[AbstractProvider.TITLE]: node.title
		};
	}
}