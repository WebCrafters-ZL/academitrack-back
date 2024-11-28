const {
  obterUsuarioIdDoToken,
} = require("../helpers/obterUsuarioIdDoToken.helper");
const Mensagem = require("../models/mensagem.model");
const Turma = require("../models/turma.model");

// **Contexto 1: Mensagens para todas as turmas**

const enviarMensagemParaTodasTurmas = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Obtém o token do cabeçalho
    const remetente_id = obterUsuarioIdDoToken(token); // Obtém o remententeID do token
    const { assunto, conteudo } = req.body;

    if ( !assunto || !conteudo) {
      return res
        .status(400)
        .json({
          mensagem: "Todos os campos obrigatórios devem ser preenchidos",
        });
    }

    // Recupera todas as turmas cadastradas
    const turmas = await Turma.find();
    const destinatarios = turmas.map((turma) => turma._id);

    const novaMensagem = new Mensagem({
      remetente_id,
      destinatario_id: destinatarios,
      assunto: assunto,
      conteudo: conteudo,
    });

    await novaMensagem.save();
    res
      .status(201)
      .json({
        mensagem: "Mensagem enviada com sucesso para todas as turmas",
        mensagem: novaMensagem,
      });
  } catch (erro) {
    console.error(erro);
    res
      .status(500)
      .json({
        mensagem: "Erro ao enviar mensagem para todas as turmas",
        erro: erro.message,
      });
  }
};

const listarMensagensParaTodasTurmas = async (req, res) => {
  try {
    const mensagens = await Mensagem.find()
      .populate("remetente_id", "nomeCompleto")

      const mensagensComRemetente = mensagens.map(mensagem => ({
        remetente: mensagem.remetente_id.nomeCompleto,
        assunto: mensagem.assunto,
        conteudo: mensagem.conteudo,
        dataEnvio: mensagem.dataEnvio
      }))

    res.status(200).json(mensagensComRemetente);
  } catch (erro) {
    console.error("Erro ao listar mensagens:", erro);
    res
      .status(500)
      .json({ mensagem: "Erro ao listar mensagens", erro: erro.message });
  }
};

const excluirMensagemDeTodasTurmas = async (req, res) => {
  try {
    const { mensagemId } = req.params;

    const mensagem = await Mensagem.findById(mensagemId);
    if (!mensagem) {
      return res.status(404).json({ mensagem: "Mensagem não encontrada" });
    }

    await Mensagem.findByIdAndDelete(mensagemId);
    res
      .status(200)
      .json({ mensagem: "Mensagem deletada com sucesso de todas as turmas" });
  } catch (erro) {
    console.error(erro);
    res
      .status(500)
      .json({ mensagem: "Erro ao deletar mensagem de todas as turmas", erro });
  }
};

// **Contexto 2: Mensagens para uma turma específica**

const enviarMensagemParaTurma = async (req, res) => {
  try {
    const { remetente, assunto, conteudo } = req.body;
    const { turmaId } = req.params;

    if (!remetente || !assunto || !conteudo) {
      return res
        .status(400)
        .json({
          mensagem: "Todos os campos obrigatórios devem ser preenchidos",
        });
    }

    const turma = await Turma.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ mensagem: "Turma não encontrada" });
    }

    const novaMensagem = new Mensagem({
      remetente_id: remetente,
      destinatario_id: [turmaId],
      assunto: assunto,
      conteudo: conteudo,
    });

    await novaMensagem.save();
    res
      .status(201)
      .json({
        mensagem: "Mensagem enviada com sucesso para a turma específica",
        mensagem: novaMensagem,
      });
  } catch (erro) {
    console.error(erro);
    res
      .status(500)
      .json({
        mensagem: "Erro ao enviar mensagem para a turma",
        erro: erro.message,
      });
  }
};

const listarMensagensPorTurma = async (req, res) => {
  try {
    const { turmaId } = req.params;

    const turma = await Turma.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ mensagem: "Turma não encontrada" });
    }

    const mensagens = await Mensagem.find({ destinatario_id: turmaId })
      .populate("remetente_id", "nomeCompleto")
      .exec();

    res.status(200).json(mensagens);
  } catch (erro) {
    console.error("Erro ao listar mensagens:", erro);
    res
      .status(500)
      .json({
        mensagem: "Erro ao listar mensagens para a turma",
        erro: erro.message,
      });
  }
};

const excluirMensagemDaTurma = async (req, res) => {
  try {
    const { turmaId, mensagemId } = req.params;

    const turma = await Turma.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ mensagem: "Turma não encontrada" });
    }

    const mensagem = await Mensagem.findById(mensagemId);
    if (!mensagem) {
      return res.status(404).json({ mensagem: "Mensagem não encontrada" });
    }

    if (!mensagem.destinatario_id.includes(turmaId)) {
      return res
        .status(400)
        .json({ mensagem: "Mensagem não pertence a esta turma" });
    }

    await Mensagem.findByIdAndDelete(mensagemId);
    res
      .status(200)
      .json({ mensagem: "Mensagem deletada com sucesso da turma específica" });
  } catch (erro) {
    console.error(erro);
    res
      .status(500)
      .json({ mensagem: "Erro ao deletar mensagem da turma", erro });
  }
};

module.exports = {
  enviarMensagemParaTodasTurmas,
  listarMensagensParaTodasTurmas,
  excluirMensagemDeTodasTurmas,
  enviarMensagemParaTurma,
  listarMensagensPorTurma,
  excluirMensagemDaTurma,
};
