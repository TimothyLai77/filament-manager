import { createSpool } from "../modules/spoolLogic.js";
const runTests = async () => {
    await createSpool('spool', 'creality', 'pla', 'black', 'matte', 1000.00, 22.12);
}

export { runTests }