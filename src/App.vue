<template>
	<u-i-tree
		:source="treeData"
		:provider="provider"
	/>

</template>

<script>

import UITree from "@/components/UITree.vue";
import {treeData} from "@/mock/treeData";
import {ListProvider} from "@/lib/ListProvider";

export default {
  name: "App",
  components: {
		UITree
	},
	data() {
		return {
			treeData: treeData,
			provider: new ListProvider()
		};
	},
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
