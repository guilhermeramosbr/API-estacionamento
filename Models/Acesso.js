import { DataTypes } from 'sequelize';
import { database } from '../database.js';
import { Usuario } from './usuario.js';
import { Veiculo } from './veiculo.js';

const Acesso = database.define('acesso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    veiculoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Veiculo,
            key: 'id'
        }
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_saida: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'acessos',
    timestamps: false
});

Acesso.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Acesso, { foreignKey: 'usuarioId' });

Acesso.belongsTo(Veiculo, { foreignKey: 'veiculoId' });
Veiculo.hasMany(Acesso, { foreignKey: 'veiculoId' });

export { Acesso };
