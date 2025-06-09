import { DataTypes } from 'sequelize';
import { database } from '../database.js';

const Acesso = database.define('acessos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_saida: {
        type: DataTypes.DATE,
        allowNull: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    veiculoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'veiculos',
            key: 'id'
        }
    },
    autorizado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false
});

export { Acesso };