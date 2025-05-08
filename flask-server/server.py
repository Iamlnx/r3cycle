from flask import Flask, jsonify
from flask_cors import CORS
from prim import R3Cycle

app = Flask(__name__)
CORS(app)

# Definindo os pontos de coleta
pontos_coleta = {
    'Central': (0, 0),
    'Praça Verde': (1, 2),
    'Escola Sustentável': (3, 1),
    'Shopping Reciclável': (-2, 3),
    'Parque Ecológico': (4, -1),
    'Condomínio Solar': (-3, -2),
    'Feira Orgânica': (2, -3),
    'Universidade Verde': (5, 2),
    'Hospital Limpo': (-4, 1),
    'Estação de Trem': (1, 4),
    'Mercado Sustentável': (-1, -4),
    'Biblioteca Ecológica': (3, 5),
    'Prefeitura Verde': (-5, 0),
    'Praça da Reciclagem': (0, 5),
    'Terminal de Ônibus': (-2, -3),
    'Centro Comunitário': (4, 4),
    'Lago Artificial': (-3, 4),
    'Aeroporto Sustentável': (6, 0),
    'Zoológico Ecológico': (-6, -1),
    'Ponto de Coleta Norte': (2, 6),
    'Ponto de Coleta Sul': (1, -5)
}

@app.route("/")
def test():
    r3cycle = R3Cycle(pontos_coleta)
    rota_otimizada = r3cycle.encontrar_rota_otimizada('Central')
    distancia_total = r3cycle.calcular_distancia_total(rota_otimizada)
    return jsonify({
        "rota_otimizada": rota_otimizada,
        "distancia_total": distancia_total
    })

if __name__ == "__main__":
    app.run(debug=True)

