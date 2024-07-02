<template>
	<div class="node">

		<div class="label">
			<span
				:class="{
					'arrow-right': !collapse,
					'arrow-bottom': collapse
				}"
				v-if="node.children.length"
				@click="displayChildren"
			/>

			<span
				class="bullet"
				v-if="!node.children.length"
			/>

			<input
				type="checkbox"
				v-model="checkedNode"
				@change="onCheckNode"
			/>

			{{ node.title }}

		</div>

		<u-i-node
			v-show="collapse"
			v-for="child in node.children"
			:key="child.id"
			:node="child"
			:checked="checkedChildren[child.id]"
			@check="onCheckChild"
		/>
	</div>
</template>

<script>
import {Node} from "@/models/Node";

export default {
	name: "UINode",
	props: {
		node: {
			type: Node
		},
		checked: {
			type: Boolean,
			default: false,
		}
	},
	data() {
		return {
			collapse: false,
			checkedNode: false,
			checkedChildren: {},
		};
	},
	watch: {
		checked() {
			this.checkedNode = this.checked;
			this.checkChildren(this.checkedNode);
		}
	},
	mounted() {
		this.checkedNode = this.checked;
		this.checkChildren(this.checkedNode);
	},
	methods: {
		/**
		 * Show/Hide children
		 */
		displayChildren() {
			this.collapse = !this.collapse;
		},
		/**
		 * Click on checkbox node
		 */
		onCheckNode() {
			// check children for current node
			this.checkChildren(this.checkedNode);

			// emitting checked status to be catching in parent component
			this.$emit("check", {
				node: this.node,
				value: this.checkedNode
			});

		},
		/**
		 * Click on a child node
		 * Check parent
		 * @param {Object} data
		 */
		onCheckChild(data) {

			this.checkedChildren[data.node.id] = data.value;
			
			this.checkParent();

			// recursively emitting from child to root node
			this.$emit("check", {
				node: this.node,
				value: this.checkedNode
			});

		},
		/**
		 * Check/Uncheck all children
		 * @param {Boolean} checked
		 */
		checkChildren(checked) {
			this.node.children.forEach(child => {
				this.checkedChildren[child.id] = checked;
			})
		},
		/**
		 * Check/Uncheck parent by verifying children status
		 */
		checkParent() {
			this.checkedNode = true;
			this.node.children.forEach(child => {
				if (!this.checkedChildren[child.id]) {
					this.checkedNode = false;
				}
			});
		}
	}
};

</script>
<style scoped>
.node {
	margin-left: 25px;
	padding: 3px;
}

.label {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.arrow-right, .arrow-bottom {
	display: inline-block;
	cursor: pointer;
	border: solid 5px transparent;
	border-left: solid 5px #a2a2a2;
	border-right: none;
	margin-right: 10px;
	transition-duration: 0.2s;
	transition-property: transform;
}

.arrow-bottom {
	transform: rotate(90deg);
}

.bullet {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 5px;
	background-color: #a2a2a2;
	margin-right: 10px;
}
</style>