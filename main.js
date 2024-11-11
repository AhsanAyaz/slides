const main = async () => {
  const responses = await Promise.all([
    fetch('data/slides.json'),
    fetch('data/externalSlides.json'),
  ]);

  let slides = await Promise.all(responses.map((resp) => resp.json()));
  slides = slides.flat();
  const grid = document.getElementById('talksGrid');

  // Get the card template
  const template = document.getElementById('cardTemplate').content;

  slides.forEach((slide) => {
    const { link, title } = slide;

    // Clone the template
    const cardClone = document.importNode(template, true);

    // Update card title
    cardClone.querySelector('.card-title').textContent = title;

    // Set up the anchor link
    const anchorEl = cardClone.querySelector('.btn-primary');
    const isExternal = link.includes('http');
    anchorEl.href = isExternal ? link : `talks/${link}`;
    anchorEl.target = '_blank';
    anchorEl.textContent = isExternal ? 'Open External' : 'View';

    // Optionally add an icon for external links
    if (isExternal) {
      anchorEl.setAttribute('data-external-link', true);
      anchorEl.innerHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      `;
      anchorEl.classList.add('btn-secondary');
      anchorEl.classList.remove('btn-primary');
    }

    // Append the cloned card to the grid
    grid.appendChild(cardClone);
  });
};

main();
