class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.height = 1;
      this.x = 0;
      this.y = 0;
    }
  }

  class AVLTree {
    constructor() {
      this.root = null;
      this.canvas = document.getElementById('canvas');
    }

    getHeight(node) {
      if (!node) return 0;
      return node.height;
    }

    getBalanceFactor(node) {
      if (!node) return 0;
      return this.getHeight(node.left) - this.getHeight(node.right);
    }

    rightRotate(y) {
      const x = y.left;
      const T2 = x.right;
      x.right = y;
      y.left = T2;
      y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
      x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
      return x;
    }

    leftRotate(x) {
      const y = x.right;
      const T2 = y.left;
      y.left = x;
      x.right = T2;
      x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
      y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
      return y;
    }

    insert(node, value) {
      if (!node) {
        return new Node(value);
      }

      if (value < node.value) {
        node.left = this.insert(node.left, value);
      } else if (value > node.value) {
        node.right = this.insert(node.right, value);
      } else {
        return node;
      }

      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
      const balance = this.getBalanceFactor(node);

      if (balance > 1 && value < node.left.value) {
        return this.rightRotate(node);
      }

      if (balance < -1 && value > node.right.value) {
        return this.leftRotate(node);
      }

      if (balance > 1 && value > node.left.value) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }

      if (balance < -1 && value < node.right.value) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }

      return node;
    }

    drawTree(node, x, y, dx) {
      if (node !== null) {
        node.x = x;
        node.y = y;
        this.drawTree(node.left, x - dx, y + 60, dx / 2);
        this.drawTree(node.right, x + dx, y + 60, dx / 2);
      }
    }
    drawNode(ctx, node) {
const radius = 20;
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFD433", "#D433FF", "#33FFF5"]; // Array of distinct colors
const depth = Math.floor(node.y / 60); // Calculate depth as an integer
const color = colors[depth % colors.length]; // Assign color based on depth modulo colors length

// Draw the node circle
ctx.beginPath();
ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
ctx.fillStyle = color; // Use the calculated color
ctx.fill();
ctx.stroke();

// Draw the node value
ctx.fillStyle = 'white'; // Use a contrasting color for text
ctx.font = '16px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(node.value, node.x, node.y);

ctx.closePath();
}


    drawConnections(ctx, node) {
      if (node.left !== null) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
        ctx.closePath();
        this.drawConnections(ctx, node.left);
      }

      if (node.right !== null) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
        ctx.closePath();
        this.drawConnections(ctx, node.right);
      }
    }
  }

  const avl = new AVLTree();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  function addValue() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
      avl.root = avl.insert(avl.root, value);
      drawFinalTree();
    }
  }

  function drawFinalTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (avl.root) {
      avl.drawTree(avl.root, canvas.width / 2, 30, canvas.width / 4);
      avl.drawConnections(ctx, avl.root);
      drawNodes(avl.root);
    }
  }

  function drawNodes(node) {
    if (node !== null) {
      avl.drawNode(ctx, node);
      drawNodes(node.left);
      drawNodes(node.right);
    }
  }

  // Initial drawing of the tree if needed
  drawFinalTree();