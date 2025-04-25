import * as util from "../modules/spoolLogic.js";
Object.assign(global, util);

const runTests = async () => {
    await spoolCreationTest();
    await getAllSpools();
    //await getLimitedSpools(2);
}

const getAllSpools = async () => {
    console.log(await getSpools());
}

const getLimitedSpools = async (limit) => {
    console.log(await getSpools(limit));
}

const spoolCreationTest = async () => {

    const sData = {
        name: "spool name",
        brand: "bambu",
        material: "pla",
        colour: "black",
        finish: "matte",
        initialWeight: 1000.00,
        cost: 22.35,
    };

    try {
        const s1 = await createSpool(sData);
        const s1p = await getSpoolById(s1.id);
        console.log(s1p.name == s1.name);
    } catch {
        return false;
    }


}

export { runTests }