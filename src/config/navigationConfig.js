export const getBannerReference = () => {
    if (window.location.hostname.includes('localhost')) {
      return 'assets/fixtures/nws_banner.png';
    }
  
    return '/drone-simulation/assets/fixtures/nws_banner.png';
};

export const getPdfPrefix = () => {
  if (window.location.hostname.includes('localhost')) {
    return 'assets/pdfs/lessons';
  }

  return '/drone-simulation/assets/pdfs/lessons';
};


export const isHimalayas = () => {
  return window.location.href.includes('himalayas')
}
