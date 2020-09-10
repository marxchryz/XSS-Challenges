const sanitize = (message) => {
  // replace < and > symbols with &gt; and &lt;
  return message.replace(/>/g, "&gt;").replace(/</g, "&lt;");
};

const waf = (message) => {
  const disallow = /(alert|prompt|confirm)/g;
  
  if (message.match(disallow)) {
  	message = "Mammaaaaaaaaa just waffed a man";
    return JSON.stringify({ message });
  } else {
    return message;
  }
};

let data = window.location.hash.substring(1);
// decode url characters like %27 and change it to '
data = decodeURIComponent(data);

data = sanitize(data);
data = waf(data);
// parse the json then get the message field
const message = JSON.parse(data).message;

document.querySelector("#main").innerHTML = message;