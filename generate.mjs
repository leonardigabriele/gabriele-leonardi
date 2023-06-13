import projectsData from "./data/projects.json" assert { type: "json" };
import contactsData from "./data/contacts.json" assert { type: "json" };
import fs from "fs";

const header = `<!DOCTYPE html>
<html>
  <head>
    <title>‎</title>
    <link rel="stylesheet" href="index.css" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>`;

const states = new Map([
  ["wip", "○"],
  ["live", "●"],
  ["archived", "□"],
]);

const projects = `

    <!-- ▒ p ▒ r ▒ o ▒ j ▒ e ▒ c ▒ t ▒ s ▒ -->
${Object.entries(projectsData).reduce(
  (a, [k, v]) => `${a}
    <${k} ✣="${v.tagline}">
      <state ${states.get(v.state)}="${v.state}"></state>
      <project name="${v.project}" year="${v.year}"></project>
      <a ctrl\\cmd+click="→" href="${v.link}"></a>
      <stack backend="${v.backend}" api="${v.api}" frontend="${
    v.frontend
  }"></stack>
    </${k}>
    `,
  ""
)}`;

const contacts = `
    <!-- ▒ c ▒ o ▒ n ▒ t ▒ a ▒ c ▒ t ▒ s ▒ -->

    <profile name="${contactsData.name} ${contactsData.surname}" role="${contactsData.role}"></profile>
    <a ctrl\\cmd+click="→" href="mailto:${contactsData.email}"></a>
    <a ctrl\\cmd+click="→" href="tel:${contactsData.phone}"></a>
    <a ctrl\\cmd+click="→" href="${contactsData.linkedin}"></a>
`;

const pageHeader = `
<!---->
<page>
<instructions>
<keyboard-shortcuts>
<windows>⊞ Windows: <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>c</kbd></windows>
<mac>⌘ Mac: <kbd>cmd</kbd> + <kbd>opt</kbd> + <kbd>c</kbd></mac>
<linux>◷ Linux: <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>c</kbd></linux>
</keyboard-shortcuts>
<a href="#inspector">No keyboard?</a>
</instructions>
<inspector id="inspector">
<nav>
<div>Inspector</div>
<a href="#index">Close</a>
</nav>
<pre>`;

const pageFooter = `
</pre>
</inspector>
</page>`;

const footer = `
  </body>
</html>`;

const escaped = (content) =>
  content.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const parts = [
  header,
  projects,
  contacts,
  pageHeader,
  escaped(header),
  escaped(projects),
  escaped(contacts),
  escaped(footer),
  pageFooter,
  footer,
];

fs.writeFile("index.html", parts.join(""), () => {});
