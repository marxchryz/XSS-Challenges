function deep_merge(target, source) {
  // don't bother reading this code. You can xss even without understanding these lines
  // trust me
  for (let key in source) {
    let source_val = source[key];
    let target_val = target[key];
    if (typeof source_val === 'object' && typeof target_val === 'object') {
      target[key] = deep_merge(target_val, source_val);
      continue;
    }
    target[key] = source[key];
  }
  return target;
}

function sanitize(name) {
  return name.replace(/>/g, '&gt;').replace(/</g, '&lt;');
}

function check_xss(message) {
  let tag;
  const regex = /<(.*?)>/g; // this will match all possible html tags

  const allowed_tags = {
    '<b>': true,
    '</b>': true,
    '<i>': true,
    '</i>': true,
    // tags not here will be automatically false (not allowed)
  };
  while ((tag = regex.exec(message)) !== null) {
    if (!allowed_tags[tag[0]]) return 'Forbidden'; // xss detected
  }

  return message;
}

function say_quote(name, message, year) {
  document.querySelector('#name').innerHTML = name + ' (' + year + ')';
  document.querySelector('#message').innerHTML = check_xss(message);
}

let user = {
  year: '2020',
};

// accepts JSON in format {"name": "Juan", "message": "Some text here"}
let input = JSON.parse(decodeURIComponent(document.location.hash.substring(1)));

input.name = sanitize(input.name); // disable tags for name

user = deep_merge(user, input); // I could use shallow merge but i still used deep merge, why?
say_quote(user.name, user.message, user.year);
