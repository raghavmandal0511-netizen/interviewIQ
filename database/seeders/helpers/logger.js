const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";

export const logger = {
  info(message) {
    console.log(`${CYAN}ℹ${RESET} ${message}`);
  },

  success(message) {
    console.log(`${GREEN}✔${RESET} ${message}`);
  },

  warn(message) {
    console.warn(`${YELLOW}⚠${RESET} ${message}`);
  },

  error(message, err) {
    console.error(`${RED}✖${RESET} ${message}`);
    if (err) {
      console.error(`${DIM}${err.stack || err.message || err}${RESET}`);
    }
  },

  step(message) {
    console.log(`${DIM}→${RESET} ${message}`);
  },

  blank() {
    console.log("");
  },
};
