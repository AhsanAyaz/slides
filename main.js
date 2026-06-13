const formatDate = (dateStr) => {
  if (!dateStr) return 'No Date';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateStr;
  }
};

const main = async () => {
  const responses = await Promise.all([
    fetch('data/slides.json'),
    fetch('data/externalSlides.json'),
  ]);

  let slides = await Promise.all(responses.map((resp) => resp.json()));
  let allSlides = slides.flat();

  // Elements
  const container = document.getElementById('talksGrid');
  const noResults = document.getElementById('noResults');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const gridBtn = document.getElementById('gridToggleBtn');
  const listBtn = document.getElementById('listToggleBtn');
  const activeFilters = document.getElementById('activeFilters');

  // State
  let searchQuery = '';
  let sortBy = 'date_desc';
  let currentLayout = localStorage.getItem('cwa_slides_layout') || 'grid';
  let activeTag = '';

  // Set active classes based on saved layout choice
  if (currentLayout === 'grid') {
    gridBtn.classList.add('btn-active');
    listBtn.classList.remove('btn-active');
  } else {
    listBtn.classList.add('btn-active');
    gridBtn.classList.remove('btn-active');
  }

  // Setup click handlers for layout toggling
  gridBtn.addEventListener('click', () => {
    currentLayout = 'grid';
    localStorage.setItem('cwa_slides_layout', 'grid');
    gridBtn.classList.add('btn-active');
    listBtn.classList.remove('btn-active');
    render();
  });

  listBtn.addEventListener('click', () => {
    currentLayout = 'list';
    localStorage.setItem('cwa_slides_layout', 'list');
    listBtn.classList.add('btn-active');
    gridBtn.classList.remove('btn-active');
    render();
  });

  // Search & Sort Event Listeners
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    render();
  });

  sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    render();
  });

  // Tag filters exposed to window for dynamically generated HTML
  window.handleTagClick = (tag) => {
    activeTag = tag;
    activeFilters.innerHTML = `
      <span class="badge badge-primary gap-1.5 p-3.5 font-semibold text-xs animate-fadeIn">
        Tag: #${tag}
        <button onclick="clearTagFilter()" class="hover:bg-primary-focus/50 rounded-full w-4 h-4 flex items-center justify-center font-bold transition-all duration-200">✕</button>
      </span>
    `;
    activeFilters.classList.remove('hidden');
    activeFilters.classList.add('flex');
    render();
  };

  window.clearTagFilter = () => {
    activeTag = '';
    activeFilters.classList.add('hidden');
    activeFilters.classList.remove('flex');
    render();
  };

  // Render logic
  const render = () => {
    // 1. Filter
    const filtered = allSlides.filter((slide) => {
      // Filter by tag if selected
      if (activeTag) {
        const slideTags = (slide.tags || []).map(t => t.toLowerCase());
        if (!slideTags.includes(activeTag.toLowerCase())) {
          return false;
        }
      }

      // Filter by search query
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      const title = (slide.title || '').toLowerCase();
      const venue = (slide.venue || '').toLowerCase();
      const description = (slide.description || '').toLowerCase();
      const tags = (slide.tags || []).map(t => t.toLowerCase()).join(' ');

      return title.includes(query) || 
             venue.includes(query) || 
             description.includes(query) || 
             tags.includes(query);
    });

    // 2. Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.date || 0) - new Date(a.date || 0);
      } else if (sortBy === 'date_asc') {
        return new Date(a.date || 0) - new Date(b.date || 0);
      } else if (sortBy === 'title_asc') {
        return (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'title_desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      return 0;
    });

    // 3. Update DOM layout
    if (filtered.length === 0) {
      container.innerHTML = '';
      noResults.classList.remove('hidden');
      return;
    }

    noResults.classList.add('hidden');

    if (currentLayout === 'grid') {
      container.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center w-full px-10';
      
      container.innerHTML = filtered.map((slide) => {
        const isExternal = slide.link.includes('http');
        const anchorHref = isExternal ? slide.link : `talks/${slide.link}`;
        
        return `
          <div class="card bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1 flex flex-col h-full rounded-xl overflow-hidden group">
            <div class="card-body p-6 flex flex-col justify-between h-full">
              <div>
                <div class="flex items-center justify-between gap-2 mb-3 text-xs opacity-60">
                  <span class="font-medium">${formatDate(slide.date)}</span>
                  ${slide.venue ? `<span class="badge badge-primary badge-sm h-auto py-1 px-2 whitespace-normal text-center font-semibold rounded-md">${slide.venue}</span>` : ''}
                </div>
                
                <h3 class="text-xl font-bold leading-snug mb-2 text-slate-100 group-hover:text-blue-400 transition-colors duration-350 line-clamp-3">
                  ${slide.title}
                </h3>
                
                ${slide.description ? `<p class="text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed">${slide.description}</p>` : ''}
                
                ${slide.tags && slide.tags.length > 0 ? `
                  <div class="flex flex-wrap gap-2 mb-4">
                    ${slide.tags.map(tag => `
                      <button onclick="handleTagClick('${tag}')" class="badge badge-ghost badge-sm text-[10px] opacity-75 hover:bg-blue-500 hover:text-white border-slate-800 transition-all duration-200 cursor-pointer">
                        #${tag}
                      </button>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
              
              <div class="card-actions justify-end mt-4 pt-4 border-t border-slate-800/80">
                <a href="${anchorHref}" target="_blank" class="btn btn-sm ${isExternal ? 'btn-secondary' : 'btn-primary'} gap-2 w-full font-bold">
                  <span>${isExternal ? 'Open External' : 'View Slides'}</span>
                  ${isExternal ? `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  ` : `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  `}
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('');
      
    } else {
      container.className = 'flex flex-col gap-4 w-full px-10 max-w-5xl mx-auto';
      
      container.innerHTML = filtered.map((slide) => {
        const isExternal = slide.link.includes('http');
        const anchorHref = isExternal ? slide.link : `talks/${slide.link}`;
        
        return `
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 group hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 text-xs opacity-60 mb-2">
                <span class="font-medium">${formatDate(slide.date)}</span>
                ${slide.venue ? `<span class="badge badge-primary badge-sm h-auto py-0.5 px-2 whitespace-normal text-center font-semibold rounded-md">${slide.venue}</span>` : ''}
              </div>
              
              <h3 class="text-xl font-bold leading-snug text-slate-100 mb-1.5 group-hover:text-blue-400 transition-colors duration-200">
                ${slide.title}
              </h3>
              
              ${slide.description ? `<p class="text-sm text-slate-400 mb-3 max-w-4xl leading-relaxed">${slide.description}</p>` : ''}
              
              ${slide.tags && slide.tags.length > 0 ? `
                <div class="flex flex-wrap gap-2">
                  ${slide.tags.map(tag => `
                    <button onclick="handleTagClick('${tag}')" class="badge badge-ghost badge-sm text-[10px] opacity-75 hover:bg-blue-500 hover:text-white border-slate-800 transition-all duration-200 cursor-pointer">
                      #${tag}
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            
            <div class="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800/80 sm:pl-6 flex justify-end">
              <a href="${anchorHref}" target="_blank" class="btn btn-sm ${isExternal ? 'btn-secondary' : 'btn-primary'} gap-2 w-full sm:w-auto font-bold min-w-[130px]">
                <span>${isExternal ? 'Open External' : 'View'}</span>
                ${isExternal ? `
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                ` : `
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                `}
              </a>
            </div>
          </div>
        `;
      }).join('');
    }
  };

  // Initial render
  render();
};

main();
