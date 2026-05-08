import { loginService, getMeService } from './auth.service.js';

export async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if(!email || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Email e Senha são obrigatorios!'
            });
        }

        const resultado = await loginService({ email, senha});

        return res.status(200).json({
            sucesso: true,
            mensagem: 'Login realizado com sucesso!',
            token: resultado.token,
            barbeiro: resultado.barbeiro
        });
    } catch (error) {
        if(error.status) {
            return res.status(error.status).json({
                sucesso: false, 
                mensagem: error.mensagem
            });
        }

        console.error('[AUTH CONTROLLER] Erro inesperado no login!', error);
        return res.status(500).json({
            sucesso:false,
            mensagem: 'Erro interno no servidor! Tente novamente'
        });
    }
}

export async function getMe(req, res) {
    try {
        const barbeiro = await getMeService(req.barbeiro.id);

        return res.status(200).json({
            sucesso: true,
            barbeiro
        });


    } catch (error) {
        if(error.status) {
            return res.status(error.status).json({
                sucesso: false,
                mensagem: error.mensagem
            });

        }

        console.error('[AUTH CONTROLLER] Erro inesperado em getMe: ', error);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno no servidor!'
        });
    }
}