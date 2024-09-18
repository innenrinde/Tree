<template>

	<header>
		<div class="title">
			Data size (number of nodes)
		</div>
		<div class="data-size">
			<span
				v-for="size in dataSize"
				:key="size"
				:class="{ 'selected': size === leaps }"
				@click="setSize(size)"
			>
				{{ size }}
			</span>
		</div>
		<div class="link">
			<a href="https://github.com/innenrinde/Tree" target="_blank">
				<font-awesome-icon :icon="['fab', 'fa-github']" />
			</a>
		</div>
	</header>

	<section>
		<u-i-tree
			:source="dummyTreeData"
			:provider="provider"
			:key="dummyTreeData.length"
		/>
	</section>

</template>

<script>

import UITree from "@/tree/components/UITree.vue";
import {treeData} from "@/mock/treeData";
import {ListProvider} from "@/lib/ListProvider";

export default {
  name: "App",
  components: {
		UITree
	},
	data() {
		return {
			dataSize: [25, 250, 2500, 5000, 10000, 25000, 50000, 100000],
			leaps: 25,
			treeData: treeData,
			provider: new ListProvider(),
		};
	},
	computed: {
		/**
		 * Try to generate a huge list of nodes
		 * @return {Array}
		 */
		dummyTreeData() {

			let fullTree = [{
				id: Number.MAX_SAFE_INTEGER,
				id_parent: 0,
				title: `Root (${this.leaps} nodes)`
			}];

			let count = 1;
			while (count <= this.leaps/25) {
				fullTree = fullTree.concat(this.getNodes(100 + count));
				count ++;
			}

			return fullTree;
		},
	},
	methods: {
		/**
		 * @param {Number} size
		 */
		setSize(size) {
			this.leaps = size;
		},
		/**
		 * Build a list of nodes based on mocked tree data with defined salt
		 * @param salt
		 * @return {Array}
		 */
		getNodes(salt) {
			const addSalt = id => !id ? Number.MAX_SAFE_INTEGER : parseInt(`${id}${salt}`);

			return this.treeData.map(node => {
				return {
					id: addSalt(node.id),
					id_parent: addSalt(node.id_parent),
					title: `${node.title} ${salt}`
				};
			});
		}
	}
}
</script>

<style>
html, body {
	margin: 0;
	padding: 0;
	height: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	background-color: #fcfcfc;
	display: flex;
	flex-direction: column;
	height: 100%;
}

header {
	background-color: #0e4491;
	border-bottom: solid 1px #fff;
	color: #fff;
	padding: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.title {
	white-space: nowrap;
}

.link a,
.link a:hover,
.link a:visited {
	color: #fff;
}

.data-size {
	width: 100%;
}

.data-size span {
	padding: 5px;
	margin: 0 5px 0 5px;
	cursor: pointer;
	border: solid 1px #3a69ab;
	border-radius: 5px;
}

.data-size span.selected,
.data-size span:hover {
	background-color: #bde9fa;
	color: #0e4491;
	animation: fadeBackground 0.2s;
}

@keyframes fadeBackground {
	from {
		background-color: transparent;
		color: #ffffff;
	}
	to {
		background-color: #bde9fa;
		color: #0e4491;
	}
}

section {
	padding: 20px;
	height: 100%;
	overflow: auto;
}

@media only screen and (max-width: 850px) {
	header {
		flex-direction: column;
	}

	.data-size {
		margin: 10px 0 15px 0;
		text-align: center;
	}
}

@media only screen and (max-width: 650px) {
	header {
		flex-direction: column;
	}

	.data-size span {
		display: inline-block;
		width: 70px;
		margin-bottom: 5px;
		text-align: center;
	}
}
</style>
