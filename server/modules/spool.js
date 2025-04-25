import { Sequelize, col } from "sequelize";
import uniqid from 'uniqid';
import { Spool } from '../data/models/Spool'

const createSpool = async (
    name,
    brand,
    material,
    colour,
    weight,
    cost,
) => {
    const newSpool = await Spool.create({
        id: uniqid('spool-'),
        name: name,
        brand: brand,
        material: material,
        colour: colour,
        weight: weight,
        filamentUsed: 0.0,
        filamentLeft: weight,
        cost: cost,
        dateAdded: DataTypes.NOW
    });
    console.log(`Added: ${newSpool.id} to database.`)
}

const deleteSpool = async () => {

}

const adjustFilament = async () => {

}

const editSpool = async () => {

}


exports[createSpool];