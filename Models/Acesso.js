import { data } from 'react-router-dom';
import { database } from '../database.js';
import { DataTypes } from 'sequelize';

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
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    id_veiculo: {
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