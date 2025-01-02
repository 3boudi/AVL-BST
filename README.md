# AVL Tree Visualization Project

## Index
1. [Project Overview](#project-overview)
2. [Project Details](#project-details)
   - [Technologies Used](#technologies-used)
   - [Implementation Highlights](#implementation-highlights)
   - [Features Added](#features-added)
   - [How It Works](#how-it-works)
3. [About the Team](#about-the-team)
   - [Team Members](#team-members)
   - [Module and Instructor](#module-and-instructor)
4. [How to Use](#how-to-use)
   - [Example Usage](#example-usage)
5. [Future Enhancements](#future-enhancements)
6. [Acknowledgments](#acknowledgments)

## Project Overview
This project implements an **AVL Tree Visualization** using **HTML**, **CSS**, and **JavaScript**. The main objective is to provide an interactive and animated visualization of AVL tree operations, including **insertion**, **deletion**, **search**, and **tree balancing**.

The project incorporates animations to demonstrate the dynamic nature of AVL tree operations, making it a powerful educational tool for understanding **algorithms and complexity**.

### Key Features
1. **Interactive Insertion**:
   - Allows users to insert nodes into the AVL tree.
   - Automatically rebalances the tree and updates the visualization.

2. **Interactive Deletion**:
   - Highlights the node to be deleted.
   - Performs deletion while maintaining the AVL tree properties.

3. **Search Operation**:
   - Highlights the path to the node being searched.
   - Visually distinguishes the found node.

4. **Animations**:
   - Smooth transitions for node movements during insertions and deletions.
   - Highlighting nodes with color changes for better visualization.

5. **Dynamic Visualization**:
   - Nodes and edges are dynamically drawn on a canvas.
   - Tree depth is color-coded for better clarity.

## Project Details

### Technologies Used
- **HTML**: Structure of the web interface.
- **CSS**: Styling and layout of the page.
- **JavaScript**: Core logic for AVL tree operations and animations.

### Implementation Highlights
1. **AVL Tree Class**:
   - Implements AVL tree algorithms including insertion, deletion, and search.
   - Includes rotation functions (left and right) to maintain tree balance.
   - Calculates node height and balance factor dynamically.

2. **Visualization**:
   - Nodes are represented as circles with values inside.
   - Edges between parent and child nodes are represented as lines.
   - Smooth animations for node transitions during rebalancing and deletion.

3. **Interactivity**:
   - Users can input values for insertion, deletion, or search using text fields and buttons.
   - Error handling ensures invalid inputs are not processed.

4. **Highlighting and Path Tracing**:
   - Nodes and paths are highlighted during operations for better understanding.
   - Uses different colors to indicate various tree levels and operations.

### Features Added
- **Node Animation**: Smoothly transitions nodes to their new positions after rebalancing.
- **Node Highlighting**: Highlights nodes during deletion and search operations.
- **Dynamic Canvas Redrawing**: Ensures the canvas is updated in real-time to reflect tree changes.

### How It Works
1. **Insertion**:
   - User enters a value in the input field and clicks "Add Value."
   - The value is inserted into the tree, and rotations are performed if necessary to balance the tree.
   - The canvas redraws to reflect the updated tree structure with smooth animations.

2. **Deletion**:
   - User enters a value in the input field and clicks "Delete Value."
   - The node is highlighted before deletion.
   - The value is removed from the tree, rebalancing is performed, and the tree is redrawn.

3. **Search**:
   - User enters a value in the input field and clicks "Search Value."
   - The path to the node is highlighted, and the node is distinguished visually.

## About the Team
This project was developed as part of the **Algorithms and Complexity** module at **08 May 1945 University - Guelma**. We are second-year Computer Science Engineering students.

### Team Members
- **CHERFA Mohammed Akram**
- **HALITIM Amin**
- **DJEGBAL Sidali**

### Module and Instructor
- **Module**: Algorithms and Complexity
- **Instructor**: dr. CHOHRA

## How to Use
1. Open the project in a web browser.
2. Use the input field to add, delete, or search for a value.
3. Watch the AVL tree update dynamically on the canvas.
4. Observe the animations for better understanding of AVL tree balancing.

### Example Usage
1. Add values: Enter "10" in the input field and click "Add Value."
2. Delete values: Enter "10" in the input field and click "Delete Value."
3. Search for values: Enter "15" in the input field and click "Search Value."

## Future Enhancements
1. Add support for custom color themes.
2. Provide step-by-step explanations for each operation.

## Acknowledgments
This project was independently developed as part of our coursework. We thank the Algorithms and Complexity module instructor "dr. CHOHRA" for inspiring us to create this educational tool.

