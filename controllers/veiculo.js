import { Veiculo } from '../models/veiculo.js';
import jwt from 'jsonwebtoken';

const segredoJwt = process.env.JWT_SECRET;

const registrarVeiculo = async (req, res) => {
    try {
        const { modelo, placa, cor, usuarioId } = req.body;
        if (!modelo || !placa || !cor || !usuarioId) {
            return res.status(400).send({ mensagem: 'Dados incompletos.' });
        }
        await Veiculo.create({ modelo, placa, cor, usuarioId });
        res.status(201).send({ mensagem: 'Veículo registrado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensagem: 'Erro ao registrar veículo.' });
    }
}

const autenticarCarro = async (req, res) => {
    try {
        const { placa } = req.body;
        if (!placa) {
            return res.status(400).send({ mensagem: 'Dados incompletos.' });
        }
        const buscarVeiculoPorPlaca = await Veiculo.findOne({ where: { placa } });
        if (!buscarVeiculoPorPlaca) {
            return res.status(404).send({ mensagem: 'Veículo não encontrado.' });
        }
        const conteudoDoToken = { idVeiculo: buscarVeiculoPorPlaca.id };
        const token = jwt.sign(conteudoDoToken, segredoJwt, { expiresIn: '1d' });
        return res.status(200).send({ token });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado.' });
    }
}

// NOVA FUNÇÃO: Para buscar veículo por placa via GET request
const buscarVeiculoPorPlacaGET = async (req, res) => {
    try {
        const placa = req.query.placa; // A placa vem como um query parameter
        if (!placa) {
            return res.status(400).json({ mensagem: 'Parâmetro de placa ausente.' });
        }

        const veiculo = await Veiculo.findOne({ where: { placa } });

        if (!veiculo) {
            // O frontend espera um array, retorne um array vazio se não encontrado
            return res.status(200).json([]); 
        }

        // Retorne o veículo dentro de um array, pois o frontend espera .data[0]
        return res.status(200).json([veiculo]); 

    } catch (error) {
        console.error('Erro ao buscar veículo por placa:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar veículo.' });
    }
};


const listarVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll();
    res.json(veiculos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar veículos.' });
  }
};

const excluirVeiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Veiculo.destroy({ where: { id } });
        if (result === 0) {
            return res.status(404).send({ mensagem: 'Veículo não encontrado.' });
        }
        res.status(200).send({ mensagem: 'Veículo excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensagem: 'Erro ao excluir veículo.' });
    }
};

const atualizarVeiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { modelo, placa, usuarioId } = req.body;
        const [atualizado] = await Veiculo.update(
            { modelo, placa, usuarioId },
            { where: { id } }
        );
        if (atualizado === 0) {
            return res.status(404).send({ mensagem: 'Veículo não encontrado.' });
        }
        res.status(200).send({ mensagem: 'Veículo atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensagem: 'Erro ao atualizar veículo.' });
    }
};

export { 
    registrarVeiculo, 
    autenticarCarro, 
    listarVeiculos, 
    excluirVeiculo, 
    atualizarVeiculo,
    buscarVeiculoPorPlacaGET
};