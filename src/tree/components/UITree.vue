<template>
	<u-i-node
		v-for="node in root.children"
		:key="node.id"
		:node="node"
	/>
</template>

<script>
import UINode from "@/tree/components/UINode.vue";
import {AbstractProvider} from "@/tree/lib/AbstractProvider";
import {TreeBuilder} from "@/tree/lib/TreeBuilder";

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
			root: {},
		};
	},
	mounted() {
		this.buildTree();
	},
	methods: {
		/**
		 * Try to iterate source and convert the objects to real nodes
		 */
		buildTree() {

			let source = this.source;
			let step = 0;
			let builder = new TreeBuilder(this.provider);

			while (source.length && step < 100) {

				this.provider.load(source).forEach(node => {
					builder.process(node);
				});

				source = builder.getTempSource();
				builder.resetTempSource();

				step ++;
			}

			// It makes no sense to have such a large tree
			if (step === 100) {
				console.warn("It seems to be a not well optimized tree data source");
			}

			// Caught root
			this.root = builder.getRoot();
		},
	}
};

</script>
<style scoped>
</style>