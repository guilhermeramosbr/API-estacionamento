import { DataTypes } from 'sequelize';
import { database } from '../database.js';

const Veiculo = database.define('veiculos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

export { Veiculo };