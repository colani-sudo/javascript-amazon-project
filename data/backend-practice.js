const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {  // is triggered by send()
  console.log(xhr.response);
}); // load - means the response has loaded

xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
xhr.send();   // asynchronous - no wait for response
