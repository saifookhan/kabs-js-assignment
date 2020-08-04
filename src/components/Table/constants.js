const statuses = [
  { type: "To Do" },
  { type: "In Progress" },
  { type: "Blocked" },
  { type: "In QA" },
  { type: "Done" },
  { type: "Deployed" },
];

const possibleStates = {
  "To Do": ["To Do", "In Progress"],
  "In Progress": ["In Progress", "In QA", "Blocked"],
  Blocked: ["Blocked", "To Do"],
  "In QA": ["In QA", "To Do", "Done"],
  Done: ["Done", "Deployed"],
  Deployed: [""],
  "": ["Deployed"],
};

export { statuses, possibleStates };
