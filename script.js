function togglemenu(){
  document.getElementById("navbar").classList.toggle("active")
}

window.togglemenu = togglemenu;

$(document).ready(function() {

  // Sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  // Smooth scrolling for navigation links
  $(".header ul li a").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate({
        scrollTop: 0
      }, 500);
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate({
        scrollTop: offset
      }, 500);
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");

    // Close menu on mobile after clicking a link
    if ($("#menu").hasClass("active")) {
      togglemenu();
    }
  });

  // Initial content revealing using ScrollReveal.js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });


  // Update active section in the header based on scroll position
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    // Check if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }

});
