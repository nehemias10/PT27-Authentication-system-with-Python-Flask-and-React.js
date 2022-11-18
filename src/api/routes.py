"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
#VALIDA TOKEN PARA NAVEGAR PAGINAS PROTEGIDAS
@api.route("/validartoken", methods=["GET"])
@jwt_required()
def validartoken():
    identidad = get_jwt_identity()
    return {"mensaje" : "inicio correcto"}

#REGISTRA USUARIOS (VERIFICA QUE NO EXISTA PREVIAMENTE)
@api.route('/registro', methods=['POST'])
def set_user():
    datos = request.get_json()
    if (datos is None):
        return 'Falta información'
    if ('email' not in datos):
        return 'Falta email'
    if ('password' not in datos):
        return 'Falta Password'
    
    new_user = User.query.filter_by(email = datos['email']).first()
    if(new_user != None):
        return {"mensaje": 'Email ya registrado'}
    if (new_user is None):
        new_user = User(name = datos['name'], email = datos['email'], password = datos['password'], is_active = True)
    db.session.add(new_user)
    db.session.commit()
    return {"mensaje": "Usuario Registrado"}

#VALIDA USUARIO PARA LOGIN Y ENTREGA TOKEN PARA SESION
@api.route("/token", methods=["POST"])
def token():
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    
    #print(user)
    #Si no se coloca el first entrega un arreglo con 1 dato, con first entrega el dato solo
    if(user):
        #Validacion de usuario
        if(user.password== body['password']):
            #Valida, otorga token
            #expiracion = datetime.timedelta(minutes=1)
            token = create_access_token(identity=body['email'])
            return jsonify({
                "id":user.id,
                "email": body['email'],
                "password": body['password'],
                "token": token
            })
        else:
            return jsonify({"mensaje": 'usuario o contraseña erroneo'})
    else:
        return jsonify({"mensaje": 'user no existe'})
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
    if(manager):
        #Validacion de usuario
        if(manager.password== body['password']):
            #Valida, otorga token
            #expiracion = datetime.timedelta(minutes=1)
            token = create_access_token(identity=body['email'])
            return jsonify({
                "id":manager.id,
                "email": body['email'],
                "password": body['password'],
                "token": token
            })
        else:
            return jsonify({"mensaje": 'usuario o contraseña erroneo'})
    else:
        return jsonify({"mensaje": 'user no existe'})
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/usuarios', methods=['GET'])
def getUsuarios():
    all_usuarios = User.query.all()
    serializados = list( map( lambda usuarios: usuarios.serialize(), all_usuarios))
    print(all_usuarios)

    return jsonify({
        "mensaje": "Todos los Usuarios",
        "usuarios": serializados
    }), 200
@api.route('/usuarios/<int:idusuarios>', methods=['GET'])
def dinamycUsuarios(idusuarios):
    one = User.query.filter_by(id=idusuarios).first()
    if(one):
        return jsonify({
            "id": idusuarios,
            "usuarios": one.serialize()
        }), 200

    else:
        return jsonify({
                "id": idusuarios,
                "usuarios": "not found!"
        }), 404


