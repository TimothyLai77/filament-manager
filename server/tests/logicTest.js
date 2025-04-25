import * as util from "../modules/spoolLogic.js";
Object.assign(global, util);

const runTests = async () => {
    const list = await createSpools();
    checkSpools(list);
}

const checkSpools = async (list) => {
    list.forEach(e => {
        console.log(e.id)
    });
}

const createSpools = async () => {
    try {
        const s1 = await createSpool('spool', 'creality', 'pla', 'black', 'matte', 1000.00, 22.12);
        const s2 = await createSpool('spool2', 'esun', 'asa', 'white', null, 1000.00, 25.34);
        const s3 = await createSpool('spool3', 'bambu', 'petg', 'purple', 'normal', 1000.00, 25.34);
        return [s1, s2, s3];
    } catch {
        return false;
    }


}

export { runTests }