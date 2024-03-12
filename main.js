$(document).ready(function () {

  
    // header 高度
    let headerHeight = $(".header-top").outerHeight(); // Get the header height
    // setActiveTab(headerHeight);
    
    // 點擊tab後滾動到相對應位置   
    $(".anchor_btn").on("click", function (event) {
      event.preventDefault();
      let marginSpace = 0;
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

    // scroll function
      $(window).scroll(function () {
        setActiveTab(headerHeight);
    });
  
  });
  
  // 防止錨點滾到一半卡住
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

      let screenHeight1On3 = window.screen.height/6; //  畫面高的6分之1
      
      if (scrollPosition >= sectionTop - screenHeight1On3 && scrollPosition < sectionBottom) {
        $(".anchor_btn").removeClass("active");
        let activeTab = $('.anchor_btn[data-target="' + sectionId + '"]');
        activeTab.addClass("active");
        scrollToTab(activeTab);
        isActiveSet = true;
      }
    });
    if (!isActiveSet) {
      $(".anchor_btn").removeClass("active");
    }
  }
  
  // place the active tab on the center of navbar 活動頁導覽列置中設定
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
  
  // 點選顯示相對應內容
  $('.rule_tab').on('click',function() {
    let targetRule = $(this).data("targetRule");
    togglePanel(targetRule);
  })
  // 點選顯示相對應內容
  function togglePanel (targetRule) {
      $(".rule_tab").removeClass("active").each(function () {
        if (
        $(this).data("targetRule") === targetRule) {
          $(this).addClass("active");
        }
      });
      $(".rule_content_box .content-panel").removeClass("is-show").each(function () {
        if ( $(this).data("ruleName") === targetRule) {
          $(this).addClass("is-show");
        }
      });;
  } 