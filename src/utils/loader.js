// Create loader element
const createLoader = () => {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.className = 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 dark:bg-dark-100 dark:bg-opacity-80 z-50 transition-opacity duration-300';
  
  const spinner = document.createElement('div');
  spinner.className = 'loader-spinner';
  
  loader.appendChild(spinner);
  return loader;
};

// Show loader
export const showLoader = () => {
  let loader = document.getElementById('page-loader');
  
  if (!loader) {
    loader = createLoader();
    document.body.appendChild(loader);
  }
  
  // Make visible
  loader.style.opacity = '1';
  loader.style.visibility = 'visible';
};

// Hide loader
export const hideLoader = () => {
  const loader = document.getElementById('page-loader');
  
  if (loader) {
    loader.style.opacity = '0';
    
    // Remove after transition
    setTimeout(() => {
      loader.style.visibility = 'hidden';
    }, 300);
  }
};