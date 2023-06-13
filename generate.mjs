import projects from "./projects.json" assert { type: "json" };
import fs from "fs";

const part1 = `<!DOCTYPE html>
<html>
<head>
<title>‎</title>
<link rel="stylesheet" href="index.css" />
</head>
<body>
<!-- ▒ p ▒ r ▒ o ▒ j ▒ e ▒ c ▒ t ▒ s ▒ -->`;

const part2 = `<!--------------------------------------->
<instructions>
<windows>
⊞ windows: <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>c</kbd>
</windows>
<mac> ⌘ mac: <kbd>cmd</kbd> + <kbd>opt</kbd> + <kbd>c</kbd> </mac>
<linux>
◷ linux: <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>c</kbd>
</linux>
</instructions>
</body>
</html>`;

const states = new Map([
  ["wip", "○"],
  ["live", "●"],
  ["archived", "□"],
]);

fs.writeFile(
  "index.html",
  `${part1}${Object.entries(projects).reduce(
    (a, [k, v]) => `${a}
<${k} ✣="${v.tagline}">
<state ${states.get(v.state)}="${v.state}"></state>
<project name="${v.project}" year="${v.year}"></project>
<a ctrl\\cmd+click="→" href="${v.link}"></a>
<stack backend="${v.backend}" api="${v.api}" frontend="${v.frontend}"></stack>
</${k}>`,
    ""
  )}
  ${part2}`,
  () => {}
);
