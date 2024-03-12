$(document).ready(function () {

  
    // header 高度
    let headerHeight = $(".header-top").outerHeight(); // Get the header height
    // setActiveTab(headerHeight);
    
    // 點擊tab後滾動到相對應位置   
    $(".anchor_btn").on("click", function (event) {
      event.preventDefault();
      let marginSpace = 32;
      let targetId = $(this).data("target");
      let targetSection = $("#" + targetId);
      if (targetSection.length) {
        window.location.hash = targetId;
        let targetOffset = targetSection.offset().top - headerHeight - marginSpace;  // marginSpace is depends on what you need in ur page
        $("html, body").animate({ scrollTop: targetOffset }, 200, 'swing', function () {
        }, 100);
      }
    });
  
    // 置頂按鈕
    $(".toTopBtn").on('click', function () {
      goPageTop();
    });
  
    // 導到活動規則並打開
    $(".rule-btn").on("click", function () {
        let ruleName = $(this).data("rulename"); // 規則tab
        let aimSection =  $(".rules-section");  // 要顯示的section
        scrollAndOpenRule(ruleName,aimSection,headerHeight);
    });
  
      // scroll function
      $(window).scroll(function () {
        console.log("???")
        setActiveTab(headerHeight);
    });
  
  });
  
  $(window).on('load', function() {
    adjustScrollPositionForHash();
  });
  
  function adjustScrollPositionForHash() {
    if (window.location.hash) {
      let headerHeight = $(".header-top").outerHeight(); // Get the updated header height
      let marginSpace = 32; // Margin space
      let targetId = window.location.hash.slice(1); // Remove '#' from the hash
      let targetSection = $("#" + targetId);
  
      if (targetSection.length) {
        let targetOffset = targetSection.offset().top - headerHeight - marginSpace;
        // Use setTimeout to ensure any last-minute layout adjustments are accounted for
        setTimeout(function () {
          $("html, body").animate({ scrollTop: targetOffset }, 200, 'swing');
        }, 100);
      }
      setActiveTab(headerHeight);
    }
  }
  
  // 活動頁置頂
  function goPageTop () {
    $("html, body").animate({ scrollTop: 0 }, 100, 'swing');
  }
  
  // 活動頁導覽列active設定
  function setActiveTab(headerHeight) {
    
    let isActiveSet = false; // 重要
    
    $(".anchor_section").each(function () {
      let scrollPosition = $(window).scrollTop() + headerHeight;
      let sectionTop = $(this).offset().top - headerHeight;
      let sectionId = $(this).attr("id");
      let sectionBottom = sectionTop + $(this).outerHeight(); // 超過section就移除

      if (scrollPosition >= sectionTop - 80 && scrollPosition < sectionBottom) {
        $(".anchor_btn").removeClass("active");
        let activeTab = $('.anchor_btn[data-target="' + sectionId + '"]');
        console.log('activetab',activeTab);
        activeTab.addClass("active");
        scrollToTab(activeTab);
        isActiveSet = true;
      }
    });
    if (!isActiveSet) {
      $(".anchor_btn").removeClass("active");
    }
  }
  
  // place the active tab on the center of navbar
  function scrollToTab(tab) {
    let tabOffset = tab.offset().left;
    let tabWidth = tab.outerWidth();
    let navbarWrapper = $(".navbar");
    let navbarScrollLeft = navbarWrapper.scrollLeft();
    let navbarWidth = navbarWrapper.width();
    // Calculate the position to scroll to
    let scrollTo = tabOffset - navbarWidth / 2 + tabWidth / 2 + navbarScrollLeft;
    navbarWrapper.animate(
      {
        scrollLeft: scrollTo,
      },
      0
    );
  }
  
  // 滾動到活動規則並打開指定tab
  function scrollAndOpenRule(ruleName,aimSection,headerHeight) {
    $(".nav-link").removeClass("active").each(function () {
      if (this.id === ruleName) {
        $(this).addClass("active");
      }
    });
  
    // Change active state of the tab contents
    $(".tab-pane").removeClass("active show").each(function () {
      if ($(this).attr("aria-labelledby") === ruleName) {
        $(this).addClass("active show");
      }
    });
  
    // scroll to the rule section
    let rulePosition = aimSection.offset().top - headerHeight;
    $("html, body").animate({ scrollTop: rulePosition }, 100, "swing");
  }