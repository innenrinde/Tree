<template>
	<u-i-node
		v-for="node in root.children"
		:key="node.id"
		:node="node"
	/>
</template>

<script>
import {Node} from "@/models/Node";
import UINode from "@/components/UINode.vue";
import {AbstractProvider} from "@/lib/AbstractProvider";

export default {
	name: "UITree",
	components: {UINode},
	props: {
		source: {
			type: Array,
			default: () => []
		},
		provider: {
			type: AbstractProvider,
			default: {}
		}
	},
	data() {
		return {
			root: {}
		};
	},
	mounted() {
		this.root = new Node({ id: 0 });
		this.buildTree(this.root, this.source);
	},
	methods: {
		/**
		 * Parse tree by using a class Node
		 * @param node
		 * @param source
		 */
		buildTree(node, source) {
			this.provider.load(source).forEach(child => {
				if (child[AbstractProvider.PARENT] === node.id) {
					let childNode = new Node(child);
					node.addChild(childNode);
					this.buildTree(childNode, source);
				}
			});
		}
	}
};

</script>
<style scoped>
</style>