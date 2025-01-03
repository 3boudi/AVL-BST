// Class representing a single node in the AVL tree
class Node {
	constructor(value) {
		this.value = value; // Value stored in the node
		this.left = null; // Reference to the left child node
		this.right = null; // Reference to the right child node
		this.height = 1; // Height of the node (used for balancing)
		this.x = 0; // X-coordinate for graphical representation
		this.y = 0; // Y-coordinate for graphical representation
	}
}

// Class representing the AVL Tree
class AVLTree {
	constructor() {
		this.root = null; // Root of the tree
		this.canvas = document.getElementById("canvas"); // Canvas element for drawing
		this.ctx = this.canvas.getContext("2d"); // Context for 2D drawing
	}

	// Get the height of a node (null nodes have height 0)
	getHeight(node) {
		return node ? node.height : 0;
	}

	// Calculate the balance factor of a node
	getBalanceFactor(node) {
		return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
	}

	// Perform a right rotation to balance the tree
	rightRotate(y) {
		const x = y.left; // Left child becomes the new root
		const T2 = x.right; // Temporarily store the right subtree of x

		// Perform rotation
		x.right = y;
		y.left = T2;

		// Update heights
		y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
		x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

		return x; // Return the new root
	}

	// Perform a left rotation to balance the tree
	leftRotate(x) {
		const y = x.right; // Right child becomes the new root
		const T2 = y.left; // Temporarily store the left subtree of y

		// Perform rotation
		y.left = x;
		x.right = T2;

		// Update heights
		x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
		y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

		return y; // Return the new root
	}

	// Insert a value into the AVL tree
	insert(node, value) {
		if (!node) return new Node(value); // Create a new node if the current node is null

		// Traverse the tree to find the correct position for insertion
		if (value < node.value) {
			node.left = this.insert(node.left, value);
		} else if (value > node.value) {
			node.right = this.insert(node.right, value);
		} else {
			return node; // Duplicate values are not allowed
		}

		// Update the height of the current node
		node.height =
			1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

		// Get the balance factor to check if the node is unbalanced
		const balance = this.getBalanceFactor(node);

		// Perform rotations if necessary
		if (balance > 1 && value < node.left.value) return this.rightRotate(node);
		if (balance < -1 && value > node.right.value) return this.leftRotate(node);
		if (balance > 1 && value > node.left.value) {
			node.left = this.leftRotate(node.left);
			return this.rightRotate(node);
		}
		if (balance < -1 && value < node.right.value) {
			node.right = this.rightRotate(node.right);
			return this.leftRotate(node);
		}

		return node; // Return the unchanged node
	}

	// Delete a value from the AVL tree
	delete(node, value) {
		if (!node) return node; // If the node is null, return it

		// Traverse the tree to find the node to delete
		if (value < node.value) {
			node.left = this.delete(node.left, value);
		} else if (value > node.value) {
			node.right = this.delete(node.right, value);
		} else {
			// Node with only one child or no child
			if (!node.left || !node.right) {
				node = node.left ? node.left : node.right;
			} else {
				// Node with two children: Get the inorder successor
				const minValueNode = this.getMinValueNode(node.right);
				node.value = minValueNode.value; // Copy the value of the successor
				node.right = this.delete(node.right, minValueNode.value); // Delete the successor
			}
		}

		if (!node) return node; // If the tree had only one node

		// Update height and balance the tree
		node.height =
			1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
		const balance = this.getBalanceFactor(node);

		// Perform rotations if necessary
		if (balance > 1 && this.getBalanceFactor(node.left) >= 0)
			return this.rightRotate(node);
		if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
			node.left = this.leftRotate(node.left);
			return this.rightRotate(node);
		}
		if (balance < -1 && this.getBalanceFactor(node.right) <= 0)
			return this.leftRotate(node);
		if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
			node.right = this.rightRotate(node.right);
			return this.leftRotate(node);
		}

		return node;
	}

	// Find the node with the smallest value (used in deletion)
	getMinValueNode(node) {
		let current = node;
		while (current.left) {
			current = current.left;
		}
		return current;
	}

	// Search for a value in the tree
	search(node, value) {
		if (!node) console.log(`${value} not found in the tree`); // If node is null, value not found
		if (value === node.value) return node; // Value found
		return value < node.value
			? this.search(node.left, value)
			: this.search(node.right, value);
		// when user tries to search for a value not found in the tree
	}

	// In-order traversal of the tree
	inOrder(cb, root = this.root) {
		if (cb == null)
			throw new Error(
				"Error in Tree class: Called inOrder but didn't provide callback!"
			);

		if (root == null) return;

		this.inOrder(cb, root.left);
		cb(root);
		this.inOrder(cb, root.right);
	}

	// Draw the entire tree
	drawTree(node, x, y, dx) {
		if (node) {
			node.x = x; // Set the x-coordinate
			node.y = y; // Set the y-coordinate
			this.drawTree(node.left, x - dx, y + 60, dx / 2); // Draw the left subtree
			this.drawTree(node.right, x + dx, y + 60, dx / 2); // Draw the right subtree
		}
	}

	// Draw a single node
	drawNode(node) {
		if (!node) return;
		const radius = 20; // Radius of the node circle
		const depth = Math.floor(node.y / 60); // Depth of the node
		const colors = [
			"#FF5733",
			"#008000",
			"#3357FF",
			"#FFD433",
			"#D433FF",
			"#33FFF5",
		]; // Colors for different depths
		const color = colors[depth % colors.length];

		this.ctx.beginPath();
		this.ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI); // Draw the circle
		this.ctx.fillStyle = color; // Fill with depth-specific color
		this.ctx.fill();
		this.ctx.stroke();

		this.ctx.fillStyle = "white"; // Set text color
		this.ctx.font = "16px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(node.value, node.x, node.y); // Draw the node value
		this.ctx.closePath();
	}

	// Draw connections (edges) between nodes
	drawConnections(node) {
		if (node.left) {
			this.ctx.beginPath();
			this.ctx.moveTo(node.x, node.y); // Start from the current node
			this.ctx.lineTo(node.left.x, node.left.y); // Draw line to the left child
			this.ctx.stroke();
			this.ctx.closePath();
			this.drawConnections(node.left); // Recursively draw for the left subtree
		}
		if (node.right) {
			this.ctx.beginPath();
			this.ctx.moveTo(node.x, node.y); // Start from the current node
			this.ctx.lineTo(node.right.x, node.right.y); // Draw line to the right child
			this.ctx.stroke();
			this.ctx.closePath();
			this.drawConnections(node.right); // Recursively draw for the right subtree
		}
	}

	// Draw the full tree
	drawFullTree() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
		if (this.root) {
			this.drawTree(
				this.root,
				this.canvas.width / 2,
				30,
				this.canvas.width / 4
			); // Set initial position
			this.drawConnections(this.root); // Draw edges
			this.drawAllNodes(this.root); // Draw nodes
		}
	}

	// Draw all nodes recursively
	drawAllNodes(node) {
		if (node) {
			this.drawNode(node); // Draw the current node
			this.drawAllNodes(node.left); // Draw the left subtree
			this.drawAllNodes(node.right); // Draw the right subtree
		}
	}
}
