var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]",
  DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]",
  THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]",
  PREVIOUS_BUTTON_NAVIGATOR = "[data-previous-button=\"trigger\"]",
  NEXT_BUTTON_NAVIGATOR = "[data-next-button=\"trigger\"]",
  current_button_index = 0;

function setDetails(imageUrl, titleText) {
  "use strict";

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);

  var previousButton = getButton(PREVIOUS_BUTTON_NAVIGATOR);
  addButtonClickHandler(previousButton);

  var nextButton = getButton(NEXT_BUTTON_NAVIGATOR);
  addButtonClickHandler(nextButton);
}

function getButton(button) {
  "use strict";
  return document.querySelector(button);
}

function getPrevious() {
  "use strict";
  var thumbnailArray = getThumbnailsArray();
  var thumbnailNum = thumbnailArray.length;

  if (--current_button_index < 0) {
    current_button_index = thumbnailNum - 1;
  }

  setDetailsFromThumb(thumbnailArray[current_button_index]);
}

function getNext() {
  "use strict";
  var thumbnailArray = getThumbnailsArray();
  var thumbnailNum = thumbnailArray.length;

  current_button_index = ++current_button_index % thumbnailNum;

  setDetailsFromThumb(thumbnailArray[current_button_index]);
}

function addButtonClickHandler(button) {
  "use strict";
  button.addEventListener("click", function () {
    if (button == PREVIOUS_BUTTON_NAVIGATOR) {
      getPrevious();
    } else {
      getNext();
    }
  });
}

initializeEvents();
