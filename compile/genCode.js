
function append(node, target) {
  target.appendChild(node);
}

let fragment = document.createDocumentFragment();
let div1 = document.createElement('div');
let t1 = document.createTextNode("\n    ");

append(
  t1,
  div1
);
let span1 = document.createElement('span');
let t2 = document.createTextNode("瓜⚽️");

append(
  t2,
  span1
);

append(
  span1,
  div1
);
let ul1 = document.createElement('ul');
let t3 = document.createTextNode("\n        ");

append(
  t3,
  ul1
);
let li1 = document.createElement('li');
let t4 = document.createTextNode("小米");

append(
  t4,
  li1
);

append(
  li1,
  ul1
);
let li2 = document.createElement('li');
let t5 = document.createTextNode("滴滴");

append(
  t5,
  li2
);

append(
  li2,
  ul1
);
let li3 = document.createElement('li');
let t6 = document.createTextNode("快手");

append(
  t6,
  li3
);

append(
  li3,
  ul1
);

append(
  ul1,
  div1
);

append(
  div1,
  fragment
);
document.body.appendChild(fragment);