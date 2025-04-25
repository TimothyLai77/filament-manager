import { Sequelize, col } from "sequelize";
import uniqid from 'uniqid';
import { Spool } from '../data/models/Spool.js'

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

}

const createSpool = async (
    name,
    brand,
    material,
    colour,
    finish,
    weight,
    cost,
) => {
    const newSpool = await Spool.create({
        id: uniqid('spool-'),
        name: name,
        brand: brand,
        material: material,
        colour: colour,
        finish: finish,
        weight: weight,
        filamentUsed: 0.0,
        filamentLeft: weight,
        cost: cost,
        dateAdded: new Date()
    });
    console.log(`Added: ${newSpool.id} to database.`);

    // toJSON() just returns the dataValues, and doesn't include the
    // the extra data/ also means doesn't include the model object.
    return newSpool.toJSON();

}

const deleteSpool = async () => {

}

const adjustFilament = async () => {

}

const editSpool = async () => {

}


export { createSpool, getSpoolById, getSpools };