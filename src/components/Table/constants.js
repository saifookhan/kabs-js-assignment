const statuses = [
  { type: "To Do" },
  { type: "In Progress" },
  { type: "Blocked" },
  { type: "In QA" },
  { type: "Done" },
  { type: "Deployed" },
];

const possibleStates = {
  "To Do": ["In Progress"],
  "In Progress": ["In QA", "Blocked"],
  Blocked: ["To Do"],
  "In QA": ["To Do", "Done"],
  Done: ["Deployed"],
  Deployed: [""],
  "": ["Deployed"],
};

export { statuses, possibleStates };
