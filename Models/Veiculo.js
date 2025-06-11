import { DataTypes } from 'sequelize';
import { database } from '../database.js';
import { Usuario } from './usuario.js';

const Veiculo = database.define('veiculo', {
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
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    tableName: 'veiculos',
    timestamps: false
});

Veiculo.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Veiculo, { foreignKey: 'usuarioId' });

export { Veiculo };
