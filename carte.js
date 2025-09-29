function add_carte(tags = [], description = '', parent_id = null, id = null) {

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
            description: event.target.value,
            parent_id: parent_id
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
        const carteElement = add_carte(carteData.tags, carteData.description, carteData.parent_id, id);
        if (carteData.parent_id) {
            const parentSection = document.getElementById(carteData.parent_id);
            if (parentSection) {
                parentSection.appendChild(carteElement);
                return; // Exit the function to avoid appending again at the end
            }else{
                // creer la section si elle n'existe pas
                const newSection = add_section_taches("En cours", carteData.parent_id);
                document.querySelector('.taches').appendChild(newSection);
                newSection.appendChild(carteElement);
                return; // Exit the function to avoid appending again at the end
            }
        }
    });
}



function add_section_taches(nom_section = "En cours", id = null) {
    // Create a unique ID for the section if not provided
    const uniqueId = id || 'section_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

    // Create the main section div
    const divSection = document.createElement('div');
    divSection.classList.add('div_taches', 'en_cours');
    divSection.id = uniqueId;

    // Create the header for the section
    const divHeadTaches = document.createElement('div');
    divHeadTaches.classList.add('div_head_taches');

    // Add the section title
    const h2 = document.createElement('h2');
    h2.textContent = nom_section;

    // Add the "Ajouter une tâche" button
    const button = document.createElement('button');
    button.classList.add('add-task-btn');
    button.textContent = 'Ajouter une tâche';

    // Append the title and button to the header
    divHeadTaches.appendChild(h2);
    divHeadTaches.appendChild(button);

    // Append the header to the main section div
    divSection.appendChild(divHeadTaches);

    // Add event listener to the button to add a new carte
    button.addEventListener('click', () => {
        const newCarte = add_carte([], "", divSection.id);
        divSection.appendChild(newCarte);
    });

    // Append the section to the body or a specific container
    return divSection;
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addBoardBtn').addEventListener('click', () => {

        // get task title from input
        const taskTitle = document.getElementById('taskTitle').value || "Nouvelle section";
        const taskDescription = document.getElementById('taskDescription').value || "";

        const newSection = add_section_taches(taskTitle);
        document.querySelector('.taches').appendChild(newSection);
    });
});

window.addEventListener('load', loadCartesFromLocalStorage);

