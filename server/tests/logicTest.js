import * as util from "../modules/spoolLogic.js";
Object.assign(global, util);

const runTests = async () => {
    await spoolCreationTest();

}



const spoolCreationTest = async () => {
    try {
        const s1 = await createSpool('spool', 'creality', 'pla', 'black', 'matte', 1000.00, 22.12);
        const s2 = await createSpool('spool2', 'esun', 'asa', 'white', null, 1000.00, 25.34);
        const s3 = await createSpool('spool3', 'bambu', 'petg', 'purple', 'normal', 1000.00, 25.34);

        const s1p = await getSpoolById(s1.id);
        console.log(s1p.name == s1.name);
    } catch {
        return false;
    }


}

export { runTests }