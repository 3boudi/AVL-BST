const popup = () => {
    const buildButton = document.getElementById("array");
    const popupContainer = document.querySelector(".popup-container");
    const closeBtn = document.querySelector(".close-btn");
    const popupMessage = document.getElementById("popup-message");

    buildButton.onclick = () => {
        const arr = [];
        avl.inOrder((node) => {
            arr.push(node.value);
        });

        // Set the message inside the popup
        popupMessage.textContent = "Ordered list: [" + arr.join(", ") + "]";

        // Show the popup
        popupContainer.classList.add("active");
    };

    closeBtn.onclick = () => {
        // Hide the popup
        popupContainer.classList.remove("active");
    };
};



function buildArray() {
    const arr = [];

    avl.inOrder((node) => {
        arr.push(node.value);
    });

    alert("Ordered list: [" + arr.join(", ") + "]");
}