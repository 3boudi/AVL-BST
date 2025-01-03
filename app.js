
(function () {
	// Create an instance of the AVL tree
	const avl = new AVLTree();
	const numberInput = document.getElementById("nodeValue");

	// Onclick Events Setup
	document.getElementById("add").onclick = addValue;
	document.getElementById("search").onclick = searchValue;
	document.getElementById("delete").onclick = deleteValue;
	document.getElementById("array").onclick = popup;

	// Define colors for each level
	const levelColors = [
		"#ff8d0c",
		"#10b810",
		"#3357FF",
		"#646464",
		"#a113c9",
		"#00c7bd",
	];

	// Animate a single node's transition
	function animateNodePosition(node, targetX, targetY, duration = 500) {
		const startX = node.x;
		const startY = node.y;
		const startTime = performance.now();

		function animate(time) {
			const elapsedTime = time - startTime;
			const progress = Math.min(elapsedTime / duration, 1); // Clamp progress to 1

			// Interpolate the position
			node.x = startX + (targetX - startX) * progress;
			node.y = startY + (targetY - startY) * progress;

			// Redraw the tree
			avl.ctx.clearRect(0, 0, avl.canvas.width, avl.canvas.height);
			avl.drawConnections(avl.root);
			avl.drawAllNodesWithColors(avl.root, 0); // Pass level 0 for the root node

			if (progress < 1) {
				requestAnimationFrame(animate); // Continue animation
			}
		}

		requestAnimationFrame(animate);
	}

	// Update node positions with animation
	AVLTree.prototype.updateTreePositions = function (node, x, y, dx) {
		if (node) {
			const targetX = x; // Target X-coordinate
			const targetY = y; // Target Y-coordinate
			animateNodePosition(node, targetX, targetY);
			this.updateTreePositions(node.left, x - dx, y + 60, dx / 2); // Update left subtree
			this.updateTreePositions(node.right, x + dx, y + 60, dx / 2); // Update right subtree
		}
	};

	// Draw all nodes with level-based colors
	AVLTree.prototype.drawAllNodesWithColors = function (node, level) {
		if (node) {
			// Set the color based on the level
			const color = levelColors[level % levelColors.length]; // Cycle through colors
			this.ctx.fillStyle = color;

			// Draw the node
			this.ctx.beginPath();
			this.ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI); // Draw a circle for the node
			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.closePath();

			// Draw the value inside the node
			this.ctx.fillStyle = "#000"; // Text color
			this.ctx.font = "16px Arial";
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.fillText(node.value, node.x, node.y);

			// Recursively draw child nodes with increased level
			this.drawAllNodesWithColors(node.left, level + 1);
			this.drawAllNodesWithColors(node.right, level + 1);
		}
	};

	// Smoothly draw the full tree
	AVLTree.prototype.drawFullTree = function () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
		if (this.root) {
			this.updateTreePositions(
				this.root,
				this.canvas.width / 2,
				30,
				this.canvas.width / 4
			);
		}
	};

	// Example usage when adding a value
	function addValue() {
		const value = parseInt(numberInput.value); // Get the value from input
		if (isNaN(value)) return;

		avl.root = avl.insert(avl.root, value); // Insert the value
		avl.drawFullTree(); // Redraw the tree with animation
	}

	function searchValue() {
		const value = parseInt(numberInput.value); // Get the value from input
		if (isNaN(value)) return;

		const path = []; // Array to store the path to the node
		const result = searchWithPath(avl.root, value, path); // Search for the value and record the path

		if (result) {
			drawPath1(path); // Highlight the path to the node
			highlightNodeYellow(result); // Highlight the found node
			setTimeout(() => {
				avl.drawFullTree(); // Redraw the tree with animations
			}, 3000);
		}
	}

	// Example delete value function with highlight
	function deleteValue() {
		const value = parseInt(numberInput.value); // Get the value from input
		if (isNaN(value)) return;

		const path = []; // Array to store the path to the node
		const targetNode = searchWithPath(avl.root, value, path); // Find the node to delete
		if (targetNode) {
			drawPath2(path); // Highlight the path
			highlightNodeRed(targetNode); // Highlight the node for 1 second

			setTimeout(() => {
				avl.root = avl.delete(avl.root, value); // Perform deletion after highlight
				avl.drawFullTree(); // Redraw the tree with animations
			}, 2000);
		}
	}

	// Search for a value and record the path to the node
	function searchWithPath(node, value, path = []) {
		if (!node) return null; // If node is null, value not found

		path.push(node); // Add the current node to the path

		if (value === node.value) return node; // If value matches, return the node

		return value < node.value
			? searchWithPath(node.left, value, path)
			: searchWithPath(node.right, value, path);
	}

	// Highlight the path to a node
	function drawPath1(path) {
		avl.ctx.strokeStyle = "yellow"; // Set path color to red
		avl.ctx.lineWidth = 3;

		for (let i = 0; i < path.length - 1; i++) {
			const from = path[i];
			const to = path[i + 1];

			avl.ctx.beginPath();
			avl.ctx.moveTo(from.x, from.y); // Start from the current node
			avl.ctx.lineTo(to.x, to.y); // Draw line to the next node
			avl.ctx.stroke();
			avl.ctx.closePath();
		}

		avl.ctx.lineWidth = 1; // Reset line width
		avl.ctx.strokeStyle = "black"; // Reset stroke color
	}
	function drawPath2(path) {
		avl.ctx.strokeStyle = "red"; // Set path color to red
		avl.ctx.lineWidth = 3;

		for (let i = 0; i < path.length - 1; i++) {
			const from = path[i];
			const to = path[i + 1];

			avl.ctx.beginPath();
			avl.ctx.moveTo(from.x, from.y); // Start from the current node
			avl.ctx.lineTo(to.x, to.y); // Draw line to the next node
			avl.ctx.stroke();
			avl.ctx.closePath();
		}

		avl.ctx.lineWidth = 1; // Reset line width
		avl.ctx.strokeStyle = "black"; // Reset stroke color
	}

	function highlightNodeYellow(node) {
		avl.ctx.beginPath();
		avl.ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI); // Draw a larger circle around the node
		avl.ctx.fillStyle = "yellow"; // Set highlight color to yellow
		avl.ctx.fill();
		avl.ctx.stroke();

		avl.ctx.fillStyle = "black"; // Set text color to black
		avl.ctx.font = "16px Arial";
		avl.ctx.textAlign = "center";
		avl.ctx.textBaseline = "middle";
		avl.ctx.fillText(node.value, node.x, node.y); // Draw the node value
		avl.ctx.closePath();
	}

	function highlightNodeRed(node) {
		avl.ctx.beginPath();
		avl.ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI); // Draw a larger circle around the node
		avl.ctx.fillStyle = "red"; // Set highlight color to yellow
		avl.ctx.fill();
		avl.ctx.stroke();

		avl.ctx.fillStyle = "black"; // Set text color to black
		avl.ctx.font = "16px Arial";
		avl.ctx.textAlign = "center";
		avl.ctx.textBaseline = "middle";
		avl.ctx.fillText(node.value, node.x, node.y); // Draw the node value
		avl.ctx.closePath();
	}

	function popup() {
		const popupContainer = document.querySelector(".popup-container");
		const closeBtn = document.querySelector(".close-btn");
		const popupMessage = document.getElementById("popup-message");
	
		const arr = [];
		avl.inOrder((node) => {
			arr.push(node.value);
		});
	
		popupMessage.textContent = "Ordered list: [" + arr.join(", ") + "]";
	
		popupContainer.classList.add("active");
	
		closeBtn.onclick = () => {
			popupContainer.classList.remove("active");
		};
	}
	
	
})();


