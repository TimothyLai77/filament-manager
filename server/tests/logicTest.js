import { createSpool } from "../modules/spoolLogic.js";
const runTests = async () => {
    await createSpool('spool', 'creality', 'pla', 'black', 'matte', 1000.00, 22.12);
    await createSpool('spool2', 'esun', 'asa', 'white', null, 1000.00, 25.34);
    await createSpool('spool3', 'bambu', 'petg', 'purple', 'normal', 1000.00, 25.34);
}

export { runTests }