function add_carte(tags = [], description = '', id = null) {

    // creation d'un id unique
    const uniqueId = id || 'carte_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

    // Create the main carte div
    const divCarte = document.createElement('div');
    divCarte.classList.add('div_carte');
    divCarte.id = uniqueId;

    // Create the tags container
    const divTags = document.createElement('div');
    divTags.classList.add('div_tags');

    // Add some default tags
    tags.forEach((tag, index) => {
        const spanTag = document.createElement('span');
        spanTag.classList.add('tag');
        spanTag.textContent = tag;

        // Assign a unique color based on the index
        const colors = ['#FFB3B3', '#B3FFB3', '#B3D9FF', '#FFFFB3', '#FFB3D9'];
        spanTag.style.backgroundColor = colors[index % colors.length];

        divTags.appendChild(spanTag);
    });

    // Create the description container
    const divDescription = document.createElement('div');
    divDescription.classList.add('div_description');

    // Add a textarea for the description
    const textarea = document.createElement('textarea');
    textarea.name = 'description';
    textarea.id = 'description';
    textarea.value = description;
    divDescription.appendChild(textarea);

    // eventlistener
    textarea.addEventListener('input', (event) => {
        // Update local storage with the new description dans un Json
        const cartes = JSON.parse(localStorage.getItem('cartes')) || {};
        cartes[uniqueId] = {
            tags: tags,
            description: event.target.value
        };
        localStorage.setItem('cartes', JSON.stringify(cartes));
    });

    // Append tags and description to the main carte div
    divCarte.appendChild(divTags);
    divCarte.appendChild(divDescription);

    // Append the carte to the body or a specific container
    return divCarte;
}

function loadCartesFromLocalStorage() {
    const cartes = JSON.parse(localStorage.getItem('cartes')) || {};
    Object.keys(cartes).forEach(id => {
        const carteData = cartes[id];
        document.body.appendChild(add_carte(carteData.tags, carteData.description, id));
    });
}

// Load cartes on page load
window.addEventListener('load', loadCartesFromLocalStorage);
document.body.appendChild(add_carte(['Tag1', 'Tag2'], 'This is a sample description.'));
