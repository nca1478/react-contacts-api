// Dependencies
import bcrypt from 'bcryptjs';

// Helpers
import { responseError, responseGET, responsePOST } from '../helpers/response';
import { sendTokenUser } from '../helpers/sendToken';

// Service
import UserService from './service';

class UserController extends UserService {
  constructor(user) {
    super(user);
    this.error = new Error();
  }

  async create(req, res) {
    try {
      const dataUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role,
      };
      const result = await this.createUser(dataUser);
      const response = responsePOST({
        msg: 'Usuario creado con éxito.',
        user: result,
        token: sendTokenUser(result),
      });
      return res.status(201).json(response);
    } catch (err) {
      const error = responseError([err]);
      console.log(error);
      res.status(500).json(error);
    }
  }

  async find(req, res) {
    try {
      const result = await this.findUsers();
      const response = responseGET(null, result);
      return res.status(200).json(response);
    } catch (err) {
      const error = responseError([err]);
      res.status(500).json(error);
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const result = await this.findUserById(id);
      const response = responseGET(null, result);
      return res.status(200).json(response);
    } catch (err) {
      const error = responseError([err]);
      res.status(500).json(error);
    }
  }

  async findByIdAndUpdate(req, res) {
    try {
      const dataUser = {
        id: req.user.id,
        name: req.body.name,
        email: req.body.email,
      };
      const password = req.body.password;
      const result = await this.updateUser(dataUser, password);
      if (!result) {
        const error = responseError({
          msg: 'Contraseña no es correcta',
        });
        return res.status(401).json(error);
      } else {
        const response = responsePOST(result);
        return res.status(200).json(response);
      }
    } catch (err) {
      const error = responseError([err]);
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await this.deleteUser(id);
      const response = responsePOST(result);
      return res.status(200).json(response);
    } catch (err) {
      const error = responseError([err]);
      res.status(500).json(error);
    }
  }

  async login(req, res) {
    try {
      const dataLogin = {
        email: req.body.email,
        password: req.body.password,
      };
      let result = await this.loginUser(dataLogin);
      if (result) {
        const data = {
          msg: 'Login Exitoso.',
          user: result,
          token: sendTokenUser(result),
        };
        const response = responsePOST(data);
        return res.status(200).json(response);
      } else {
        if (result === null) {
          const error = responseError({
            msg: 'El correo electrónico no existe o el usuario no está activo.',
          });
          return res.status(404).json(error);
        } else {
          const error = responseError({
            msg: 'La combinación de correo electrónico y contraseña no existe.',
          });
          return res.status(401).json(error);
        }
      }
    } catch (err) {
      const error = responseError([err]);
      res.status(500).json(error);
    }
  }

  async google(req, res) {
    try {
      const tokenId = req.body.tokenId;
      let result = await this.loginGoogle(tokenId);
      if (result) {
        const data = {
          msg: 'Login de Google Exitoso.',
          user: result,
          token: sendTokenUser(result),
        };
        const response = responsePOST(data);
        return res.status(200).json(response);
      } else {
        const error = responseError({
          msg: 'El Usuario no está activo.',
        });
        return res.status(404).json(error);
      }
    } catch (err) {
      const error = responseError([err]);
      res.status(500).json(error);
    }
  }

  async facebook(req, res) {
    try {
      const facebookData = req.body;
      let result = await this.loginFacebook(facebookData);
      if (result) {
        const data = {
          msg: 'Login de Facebook Exitoso.',
          user: result,
          token: sendTokenUser(result),
        };
        const response = responsePOST(data);
        return res.status(200).json(response);
      } else {
        const error = responseError({
          msg: 'El Usuario no está activo.',
        });
        return res.status(404).json(error);
      }
    } catch (err) {
      const error = responseError([err]);
      return res.status(500).json(error);
    }
  }

  async sendEmailRecovery(req, res) {
    try {
      let result = await this.sendEmailRecoveryPass(req.body.email);
      if (result) {
        const data = {
          msg: 'Email enviado exitosamente.',
          messageId: result.messageId,
        };
        const response = responsePOST(data);
        return res.status(200).json(response);
      } else {
        const error = responseError({
          msg: 'Correo electrónico no encontrado o no permite cambiar contraseña',
        });
        return res.status(401).json(error);
      }
    } catch (err) {
      const error = responseError([err]);
      return res.status(500).json(error);
    }
  }

  async recoveryPass(req, res) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.newPassword,
        token: req.params.token,
      };
      let result = await this.recoveryPassword(data);
      if (result.accepted[0].length > 0) {
        const dataResponse = {
          msg: 'Contraseña cambiada con éxito.',
          messageId: result.messageId,
        };
        const response = responsePOST(dataResponse);
        return res.status(200).json(response);
      } else {
        const error = responseError({
          msg: 'Error al recuperar contraseña. Intente nuevamente.',
        });
        return res.status(400).json(error);
      }
    } catch (err) {
      const error = responseError([err]);
      return res.status(500).json(error);
    }
  }
}

export default UserController;
