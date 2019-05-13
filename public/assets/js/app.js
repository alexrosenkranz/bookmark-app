const $postFeed = $('#post-feed');

function getRedditPosts() {
  return $.getJSON('/api/scrape').then(printPosts);
}

function printPosts(postData) {
  $postFeed.empty();
  postData.forEach(({ title, link }) => {
    $('<li>')
      .data({ title, link })
      .addClass('list-group-item row d-flex align-items-center')
      .append(`<div class='col-12 col-md-8'><a href=${link} target='_blank'>${title}</a></div>`)
      .append(
        `<div class='col text-right'><button class='btn btn-sm btn-outline-danger save-bookmark'>Bookmark this!</button></div>`
      )
      .appendTo($postFeed);
  });
}

getRedditPosts();

function signUp(event) {
  event.preventDefault();

  const userData = {
    firstName: $('#first-name-input')
      .val()
      .trim(),
    lastName: $('#last-name-input')
      .val()
      .trim(),
    email: $('#email-input')
      .val()
      .trim(),
    password: $('#password-input')
      .val()
      .trim()
  };

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    return swal({
      title: "You're missing something!",
      icon: 'error'
    });
  }

  $.ajax({
    url: '/api/user/register',
    method: 'POST',
    data: userData
  })
    .then(function(userData) {
      console.log(userData);
      return swal({
        title: userData,
        icon: 'success'
      });
    })
    .then(function() {
      $('#login').tab('show');
    });
}

function login(event) {
  event.preventDefault();

  const userData = {
    email: $('#email-input-login')
      .val()
      .trim(),
    password: $('#password-input-login')
      .val()
      .trim()
  };

  if (!userData.email || !userData.password) {
    return swal({
      title: "You're missing something!",
      icon: 'error'
    });
  }

  $.ajax({
    url: '/api/user/login',
    method: 'POST',
    data: userData
  })
    .then(function(userData) {
      console.log(userData);
    });
}

$(document).ready(function() {
  $('#signup-form').on('submit', signUp);
  $('#login-form').on('submit', login);
});
