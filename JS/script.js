document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll("[data-slide]");
    const buttons = document.querySelectorAll("[data-button]");
    const cards = document.querySelectorAll(".card");

    let currSlide = 0;
    let maxSlide = slides.length - 1;

    const updateCarousel = (number = 0) => {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - number) * 100}%)`;
        });
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            button.dataset.button == "next" ? ++currSlide : --currSlide;

            if (currSlide > maxSlide) {
                currSlide = 0;
            } else if (currSlide < 0) {
                currSlide = maxSlide;
            }

            updateCarousel(currSlide);
        });
    });

    updateCarousel();

    cards.forEach(card => {
        const decrementBtn = card.querySelector(".decrement");
        const incrementBtn = card.querySelector(".increment");
        const counterValue = card.querySelector(".counter-value");

        let count = 0;

        decrementBtn.addEventListener('click', function() {
            if (count > 0) {
                count--;
                counterValue.textContent = count;
            }
        });

        incrementBtn.addEventListener('click', function() {
            count++;
            counterValue.textContent = count;
        });
    });

    $("#filter-button").click(function () {
        $("#filter-panel").css("left", "0");
    });

    $("#close-filter").click(function () {
        $("#filter-panel").css("left", "-100%");
    });

    $("#filter-panel").click(function (e) {
        e.stopPropagation();
    });

    $("#filter-button").click(function (e) {
        e.stopPropagation();
    });

    $("#filter-button").click(function () {
        $("#filter-form").css("display", "block");
    });

    $("#close-filter").click(function () {
        $("#filter-form").css("display", "none");
    });
});
