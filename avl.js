// Class representing a single node in the AVL tree
class Node {
  constructor(value) {
    this.value = value;   // Value stored in the node
    this.left = null;     // Reference to the left child node
    this.right = null;    // Reference to the right child node
    this.height = 1;      // Height of the node (used for balancing)
    this.x = 0;           // X-coordinate for graphical representation
    this.y = 0;           // Y-coordinate for graphical representation
  }
}

// Class representing the AVL Tree
class AVLTree {
  constructor() {
    this.root = null;                       // Root of the tree
    this.canvas = document.getElementById("canvas"); // Canvas element for drawing
    this.ctx = this.canvas.getContext("2d");         // Context for 2D drawing
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
    const x = y.left;      // Left child becomes the new root
    const T2 = x.right;    // Temporarily store the right subtree of x

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
    const y = x.right;     // Right child becomes the new root
    const T2 = y.left;     // Temporarily store the left subtree of y

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
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

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
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalanceFactor(node);

    // Perform rotations if necessary
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) return this.rightRotate(node);
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) return this.leftRotate(node);
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
    if (!node) return null; // If the node is null, the value is not found
    if (value === node.value) return node; // Value found
    return value < node.value ? this.search(node.left, value) : this.search(node.right, value);
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
    const colors = ["#FF5733", "#008000", "#3357FF", "#FFD433", "#D433FF", "#33FFF5"]; // Colors for different depths
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
      this.drawTree(this.root, this.canvas.width / 2, 30, this.canvas.width / 4); // Set initial position
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

// Create an instance of the AVL tree
const avl = new AVLTree();

// Add a value to the AVL tree and redraw it
function addValue() {
  const value = parseInt(document.getElementById("nodeValue").value); // Get the value from input
  if (!isNaN(value)) {
    avl.root = avl.insert(avl.root, value); // Insert the value
    avl.drawFullTree(); // Redraw the tree
  }
}

// Delete a value from the AVL tree and redraw it
function deleteValue() {
  const value = parseInt(document.getElementById("nodeValue").value); // Get the value from input
  if (!isNaN(value)) {
    const path = [];
    const targetNode = searchWithPath(avl.root, value, path); // Find the path to the node

    if (targetNode) {
      avl.drawFullTree();
      drawPath(path); // Highlight the path
      highlightNode(targetNode); // Highlight the node to delete

      setTimeout(() => {
        avl.root = avl.delete(avl.root, value); // Delete the node
        avl.drawFullTree(); // Redraw the tree
      }, 1000); // Delay to show the highlight
    } else {
      alert(`Value ${value} not found in the tree.`);
    }
  }
}

// Search for a value in the tree and highlight the path
function searchWithPath(node, value, path = []) {
  if (!node) return null; // If node is null, value not found
  path.push(node); // Add the current node to the path
  if (value === node.value) return node; // If value matches, return the node
  return value < node.value ? searchWithPath(node.left, value, path) : searchWithPath(node.right, value, path);
}

// Highlight the path to a node
function drawPath(path) {
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

// Highlight a specific node
function highlightNode(node) {
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
