const main = async () => {
  const responses = await Promise.all([
    fetch('data/slides.json'),
    fetch('data/externalSlides.json'),
  ]);
  let slides = await Promise.all(responses.map((resp) => resp.json()));
  slides = slides.flat();
  const grid = document.getElementById('talksGrid');
  slides.forEach((slide) => {
    const { link, title } = slide;
    const sectionEl = document.createElement('section');
    sectionEl.className =
      'shadow-md border border-slate-300 rounded-md hover:bg-purple-700 duration-200 hover:text-white cursor-pointer';
    const anchorEl = document.createElement('a');
    anchorEl.className = 'p-4 w-full h-full block';
    const isExternal = link.includes('http');
    anchorEl.href = isExternal ? link : `talks/${link}`;
    anchorEl.target = '_blank';
    anchorEl.textContent = title;
    if (isExternal) {
      anchorEl.setAttribute('data-external-link', true);
      const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>
`;
      anchorEl.innerHTML += icon;
    }
    sectionEl.appendChild(anchorEl);
    grid.appendChild(sectionEl);
  });
};

main();
