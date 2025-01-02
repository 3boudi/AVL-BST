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
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
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
    if (!node) return new Node(value);

    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    } else {
      return node; // Duplicate values not allowed
    }

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalanceFactor(node);

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

    return node;
  }

  delete(node, value) {
    if (!node) return node;

    if (value < node.value) {
      node.left = this.delete(node.left, value);
    } else if (value > node.value) {
      node.right = this.delete(node.right, value);
    } else {
      if (!node.left || !node.right) {
        node = node.left ? node.left : node.right;
      } else {
        const minValueNode = this.getMinValueNode(node.right);
        node.value = minValueNode.value;
        node.right = this.delete(node.right, minValueNode.value);
      }
    }

    if (!node) return node;

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalanceFactor(node);

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

  getMinValueNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  search(node, value) {
    if (!node) return null;
    if (value === node.value) return node;
    return value < node.value ? this.search(node.left, value) : this.search(node.right, value);
  }

  drawTree(node, x, y, dx) {
    if (node) {
      node.x = x;
      node.y = y;
      this.drawTree(node.left, x - dx, y + 60, dx / 2);
      this.drawTree(node.right, x + dx, y + 60, dx / 2);
    }
  }

  drawNode(node) {
    if (!node) return;
    const radius = 20;
    const depth = Math.floor(node.y / 60);
    const colors = ["#FF5733", "#008000", "#3357FF", "#FFD433", "#D433FF", "#33FFF5"];
    const color = colors[depth % colors.length];

    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = "white";
    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(node.value, node.x, node.y);
    this.ctx.closePath();
  }

  drawConnections(node) {
    if (node.left) {
      this.ctx.beginPath();
      this.ctx.moveTo(node.x, node.y);
      this.ctx.lineTo(node.left.x, node.left.y);
      this.ctx.stroke();
      this.ctx.closePath();
      this.drawConnections(node.left);
    }
    if (node.right) {
      this.ctx.beginPath();
      this.ctx.moveTo(node.x, node.y);
      this.ctx.lineTo(node.right.x, node.right.y);
      this.ctx.stroke();
      this.ctx.closePath();
      this.drawConnections(node.right);
    }
  }

  drawFullTree() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.root) {
      this.drawTree(this.root, this.canvas.width / 2, 30, this.canvas.width / 4);
      this.drawConnections(this.root);
      this.drawAllNodes(this.root);
    }
  }

  drawAllNodes(node) {
    if (node) {
      this.drawNode(node);
      this.drawAllNodes(node.left);
      this.drawAllNodes(node.right);
    }
  }
}

const avl = new AVLTree();

function addValue() {
  const value = parseInt(document.getElementById("nodeValue").value);
  if (!isNaN(value)) {
    avl.root = avl.insert(avl.root, value);
    avl.drawFullTree();
  }
}

function deleteValue() {
  const value = parseInt(document.getElementById("nodeValue").value);
  if (!isNaN(value)) {
    const path = [];
    const targetNode = searchWithPath(avl.root, value, path);

    if (targetNode) {
      avl.drawFullTree();
      drawPath(path);
      highlightNode(targetNode);

      setTimeout(() => {
        avl.root = avl.delete(avl.root, value);
        avl.drawFullTree();
      }, 1000);
    } else {
      alert(`Value ${value} not found in the tree.`);
    }
  }
}

function searchWithPath(node, value, path = []) {
  if (!node) return null;
  path.push(node);
  if (value === node.value) return node;
  return value < node.value ? searchWithPath(node.left, value, path) : searchWithPath(node.right, value, path);
}

function drawPath(path) {
  avl.ctx.strokeStyle = "red";
  avl.ctx.lineWidth = 3;

  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];

    avl.ctx.beginPath();
    avl.ctx.moveTo(from.x, from.y);
    avl.ctx.lineTo(to.x, to.y);
    avl.ctx.stroke();
    avl.ctx.closePath();
  }

  avl.ctx.lineWidth = 1;
  avl.ctx.strokeStyle = "black";
}

function highlightNode(node) {
  avl.ctx.beginPath();
  avl.ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
  avl.ctx.fillStyle = "yellow";
  avl.ctx.fill();
  avl.ctx.stroke();

  avl.ctx.fillStyle = "black";
  avl.ctx.font = "16px Arial";
  avl.ctx.textAlign = "center";
  avl.ctx.textBaseline = "middle";
  avl.ctx.fillText(node.value, node.x, node.y);
  avl.ctx.closePath();
}
