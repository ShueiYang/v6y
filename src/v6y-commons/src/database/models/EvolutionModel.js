import { DataTypes } from 'sequelize';

const evolutionModelSchema = {
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    subCategory: {
        type: DataTypes.TEXT,
    },
    module: DataTypes.JSON,
    evolutionHelp: DataTypes.JSON,
};

const evolutionModelOptions = {};

const EvolutionModel = {
    name: 'Evolution',
    schema: evolutionModelSchema,
    options: evolutionModelOptions,
};

export default EvolutionModel;
