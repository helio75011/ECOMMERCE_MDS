async function getProduct() {
    const url = "http://localhost:4612/api/products";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        for (let i = 0; i < result.length; i++) {
            const product = result[i];
            const sectionProduct = document.getElementById("product");
            const pieceElement = document.createElement("article");

            const titleArticle = document.createElement("h2");
            const titleCategory = document.createElement("h3");
            const description = document.createElement("p");
            const imageArticle = document.createElement("img");

            titleArticle.innerText = product.title;
            imageArticle.src = product.images;
            titleCategory.innerText = product.category;
            description.innerText = product.description;

            sectionProduct.appendChild(pieceElement);
            pieceElement.appendChild(titleArticle);
            pieceElement.appendChild(imageArticle);
            pieceElement.appendChild(titleCategory);
            pieceElement.appendChild(description);

            console.log(product.title)
            console.log(product.category)
        }
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

getProduct();