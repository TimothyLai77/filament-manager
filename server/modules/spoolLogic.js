import { Sequelize, col } from "sequelize";
import uniqid from 'uniqid';
import { Spool } from '../data/models/Spool.js'
import { NotEnoughFilamentError, SpoolNotFoundError } from '../errors/errors.js'
/**
 * Get's spool when given an id. 
 * @param {string} id 
 * @returns the spool's dataValue object
 */
const getSpoolById = async (id) => {
    try {
        // only return the dataValues
        const spool = await Spool.findByPk(id);
        return spool.toJSON();
    } catch (e) {
        console.log(e)
        return null;
    }
}
/**
 * Gets all spools or first n spools
 * @param {int} limit how many spools to return, null for all spools (default behaviour)
 * @returns array of spools
 */
const getSpools = async (limit = null) => {
    try {
        var spools;
        if (limit) {
            // return the first limit spools
            spools = await Spool.findAll({ limit: limit })
        } else {
            // return all spools
            spools = await Spool.findAll();
        }
        const formattedSpools = spools.map((spool) => spool.toJSON());
        return formattedSpools;
    } catch (e) {
        return e;
    }
}


/**
 * create new spool
   @param {object} newSpoolDataObj
 * @returns newly created spool
 */
const createSpool = async (newSpoolDataObj) => {
    try {
        console.log(newSpoolDataObj)
        const newSpool = await Spool.create({
            id: uniqid('spool-'),
            name: newSpoolDataObj.name,
            brand: newSpoolDataObj.brand,
            material: newSpoolDataObj.material,
            colour: newSpoolDataObj.colour,
            finish: newSpoolDataObj.finish,
            initialWeight: newSpoolDataObj.initialWeight,
            filamentUsed: 0.0,
            filamentLeft: newSpoolDataObj.initialWeight,
            cost: newSpoolDataObj.cost,
            dateAdded: new Date()
        });
        console.log(`Added: ${newSpool.id} to database.`);

        // toJSON() just returns the dataValues, and doesn't include the
        // the extra data/ also means doesn't include the model object.
        return newSpool.toJSON();
    } catch (e) {
        console.log(e);
    }


}

/**
 * Delete a spool with the specified id
 * @param {string} id 
 * @returns  true if the spool was deleted, error otherwise
 */
const deleteSpool = async (id) => {
    try {
        Spool.destroy({
            where: {
                id: id
            }
        });
        return true;
    } catch (e) {
        return e;
    }
}

const decreaseFilament = async (id, amount) => {
    try {
        const spool = await Spool.findByPk(id);
        if (!spool) throw new SpoolNotFoundError;
        //todo: i'm gonna comment this out for now, idk if I should actually check for enough filament?
        if (spool.filamentLeft - amount < 0.0) throw new NotEnoughFilamentError;
        console.log(`Decreasing ${id}'s filament by ${amount}`)
        spool.filamentLeft = spool.filamentLeft - amount;
        spool.filamentUsed = spool.filamentUsed + amount;
        await spool.save();
        return spool.toJSON();
    } catch (e) {
        throw e;
    }



}

const incrementJobCount = async (id) => {
    const spool = await Spool.findByPk(id);
    if (!spool) throw new SpoolNotFoundError;

    spool.numberOfJobs = spool.numberOfJobs + 1;
    await spool.save();
    return spool;
}

const markSpoolAsEmpty = async (id) => {
    try {
        const spool = await Spool.findByPk(id);
        if (!spool) throw new SpoolNotFoundError;

        spool.isEmpty = true;
        await spool.save();
        return spool.toJSON();
    } catch (e) {
        throw e;
    }
}
/**
 * edit spool by id
 * @param {string} id
 * @param {object} newDataObj 
 * @returns 
 */
const editSpool = async (id, newDataObj) => {
    try {
        const spool = await Spool.findByPk(id);
        if (!spool) throw new SpoolNotFoundError;

        /**
         * todo: there should probably be some constraints as part of the table or some logic checking here
         * todo_continued: like if you were to edit filamentUsed such that filamentUsed > initialWeight
         * todo_continued: and like similar restraints.
         * 
         * todo: i also just don't like this in general...
         */
        if (newDataObj.name) { spool.name = newDataObj.name };
        if (newDataObj.brand) { spool.brand = newDataObj.brand };
        if (newDataObj.material) { spool.material = newDataObj.material };
        if (newDataObj.colour) { spool.colour = newDataObj.colour };
        if (newDataObj.finish) { spool.finish = newDataObj.finish };
        if (newDataObj.initialWeight) { spool.initialWeight = newDataObj.initialWeight };
        if (newDataObj.cost) { spool.cost = newDataObj.cost };
        if (newDataObj.filamentUsed) { spool.filamentUsed = newDataObj.filamentUsed };
        //console.log(`${newDataObj.initialWeight} - ${newDataObj.filamentUsed} = ${newDataObj.initialWeight - newDataObj.filamentUsed}`)
        spool.filamentLeft = newDataObj.initialWeight - newDataObj.filamentUsed;
        await spool.save();
        return spool.toJSON();
    } catch (e) {
        return e;
    }
}


export { markSpoolAsEmpty, createSpool, getSpoolById, getSpools, deleteSpool, decreaseFilament, editSpool, incrementJobCount };