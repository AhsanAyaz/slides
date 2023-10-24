const slides = [
    { link: 'careershowtalk.html', title: 'Career Show Talk' },
    {
      link: 'web-dev-basics',
      title: 'Web Development Basics (Urdu)',
    },
    {
      link: 'you-dont-see-me-as-a-dev.html',
      title: 'I am a Developer, you don\'t see me',
    },
    {
      link: 'optimizing-angular-apps-like-a-pro.html',
      title: 'Optimizing an Angular App like PRO',
    },
    {
      link: 'angular-schematics-a-time-well-spent.html',
      title: 'Angular Schematics - A time well spent',
    },
    {
      link: 'wisdom-perfection-and-crafting-excellence-at-work.html',
      title: 'Wisdom, Perfection, and crafting Excellence at Work',
    },
    {
      link: 'ui-for-backenders.html',
      title: 'UI for Backenders',
    }
];

const grid = document.getElementById('talksGrid');
slides.forEach((slide) => {
    const { link, title } = slide;
    const sectionEl = document.createElement('section');
    sectionEl.className =
      'shadow-md border border-slate-300 rounded-md hover:bg-purple-700 duration-200 hover:text-white cursor-pointer';
    const anchorEl = document.createElement('a');
    anchorEl.className = 'p-4 w-full h-full block';
    anchorEl.href = `talks/${link}`;
    anchorEl.target = '_blank';
    anchorEl.textContent = title;
    sectionEl.appendChild(anchorEl);
    grid.appendChild(sectionEl);
});