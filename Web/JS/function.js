document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
  
    window.addEventListener('scroll', function() {
      slides.forEach(slide => {
        const slideTop = slide.offsetTop;
        const slideBottom = slideTop + slide.offsetHeight;
  
        const isHalfShown = slideTop < (window.scrollY + window.innerHeight / 2);
        const isNotScrolledPast = window.scrollY < slideBottom;
  
        if (isHalfShown && isNotScrolledPast) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    });
  });
  