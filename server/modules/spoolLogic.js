import { Sequelize, col } from "sequelize";
import uniqid from 'uniqid';
import { Spool } from '../data/models/Spool.js'

const getSpool = async () => {

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
    console.log(`Added: ${newSpool.id} to database.`)
}

const deleteSpool = async () => {

}

const adjustFilament = async () => {

}

const editSpool = async () => {

}


export { createSpool };