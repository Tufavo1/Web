document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const firstSlide = slides[0];
  const secondSlide = slides[1];

  function checkSlide() {
      slides.forEach(slide => {
          const slideTop = slide.getBoundingClientRect().top;
          const slideBottom = slide.getBoundingClientRect().bottom;

          const isHalfShown = (slideTop < window.innerHeight / 2);
          const isNotScrolledPast = (slideBottom > 0);

          if (isHalfShown && isNotScrolledPast) {
              slide.classList.add('active');
          } else {
              slide.classList.remove('active');
          }
      });
  }

  // Agregar la clase 'active' a los dos primeros slides al cargar la página
  firstSlide.classList.add('active');
  secondSlide.classList.add('active');

  window.addEventListener('scroll', checkSlide);
  window.addEventListener('resize', checkSlide);
});
