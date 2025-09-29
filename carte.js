function add_carte(tags = [], description = '') {
    // Create the main carte div
    const divCarte = document.createElement('div');
    divCarte.classList.add('div_carte');

    // Create the tags container
    const divTags = document.createElement('div');
    divTags.classList.add('div_tags');

    // Add some default tags
    tags.forEach(tag => {
        const spanTag = document.createElement('span');
        spanTag.classList.add('tag');
        spanTag.textContent = tag;
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

    // Append tags and description to the main carte div
    divCarte.appendChild(divTags);
    divCarte.appendChild(divDescription);

    // Append the carte to the body or a specific container
    return divCarte;
}