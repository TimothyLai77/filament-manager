'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('inventories', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        })

        await queryInterface.createTable('jobs', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            spoolId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            filamentAmountUsed: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            cost: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            date: {
                type: Sequelize.Sequelize.DATEONLY
            }
        })

        await queryInterface.createTable('spools', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            brand: {
                type: Sequelize.STRING,
                allowNull: false
            },
            material: {
                type: Sequelize.STRING,
                allowNull: false
            },
            colour: {
                type: Sequelize.STRING,
                allowNull: false
            },
            finish: {
                type: Sequelize.STRING,
                allowNull: true
            },
            initialWeight: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            filamentUsed: {
                type: Sequelize.FLOAT,
                allowNull: false,
                defaultValue: 0.0
            },
            filamentLeft: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            cost: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            dateAdded: {
                // no clue why need to call Sequelize first but ok?
                type: Sequelize.Sequelize.DATEONLY
            },
            isEmpty: {
                type: Sequelize.Sequelize.BOOLEAN,
                defaultValue: false
            },
            numberOfJobs: {
                type: Sequelize.Sequelize.INTEGER,
                defaultValue: 0
            }
        })

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('spools')
        await queryInterface.dropTable('jobs')
        await queryInterface.dropTable('inventories')
    }
};
