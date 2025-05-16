# --------------------------
# Definição dos Grafos
# --------------------------
cidade1 = {
    'Central de Transportes': {'Praça da Liberdade': 3, 'Bairro das Palmeiras': 5},
    'Praça da Liberdade': {'Central de Transportes': 3, 'Escola Municipal': 2, 'Hospital Central': 6},
    'Bairro das Palmeiras': {'Central de Transportes': 5, 'Hospital Central': 4, 'Estação Norte': 7},
    'Escola Municipal': {'Praça da Liberdade': 2, 'Shopping Cidade': 8},
    'Hospital Central': {'Praça da Liberdade': 6, 'Bairro das Palmeiras': 4, 'Shopping Cidade': 3, 'Parque Verde': 5},
    'Estação Norte': {'Bairro das Palmeiras': 7, 'Parque Verde': 2},
    'Shopping Cidade': {'Escola Municipal': 8, 'Hospital Central': 3, 'Universidade Federal': 6},
    'Parque Verde': {'Hospital Central': 5, 'Estação Norte': 2, 'Museu Histórico': 4},
    'Universidade Federal': {'Shopping Cidade': 6, 'Terminal Rodoviário': 5},
    'Museu Histórico': {'Parque Verde': 4, 'Terminal Rodoviário': 3},
    'Terminal Rodoviário': {'Universidade Federal': 5, 'Museu Histórico': 3}
}
cidade2 = {
    'Central de Transportes': {'Avenida das Flores': 4, 'Vila Industrial': 6},
    'Avenida das Flores': {'Central de Transportes': 4, 'Mercado Municipal': 3, 'Teatro Municipal': 5},
    'Vila Industrial': {'Central de Transportes': 6, 'Complexo Esportivo': 4, 'Estação Leste': 7},
    'Mercado Municipal': {'Avenida das Flores': 3, 'Biblioteca Central': 6},
    'Teatro Municipal': {'Avenida das Flores': 5, 'Parque Central': 4},
    'Complexo Esportivo': {'Vila Industrial': 4, 'Parque Central': 6},
    'Estação Leste': {'Vila Industrial': 7, 'Zona Rural': 5},
    'Parque Central': {'Teatro Municipal': 4, 'Complexo Esportivo': 6, 'Biblioteca Central': 3},
    'Biblioteca Central': {'Mercado Municipal': 6, 'Parque Central': 3, 'Universidade Estadual': 4},
    'Universidade Estadual': {'Biblioteca Central': 4, 'Museu da Cidade': 6},
    'Museu da Cidade': {'Universidade Estadual': 6, 'Zona Rural': 4},
    'Zona Rural': {'Estação Leste': 5, 'Museu da Cidade': 4}
}
cidade3 = {
    'Central de Transportes': {'Largo do Carmo': 3, 'Jardim Imperial': 7},
    'Largo do Carmo': {'Central de Transportes': 3, 'Prefeitura': 2, 'Catedral Metropolitana': 4},
    'Jardim Imperial': {'Central de Transportes': 7, 'Estádio Municipal': 5, 'Estação Oeste': 6},
    'Prefeitura': {'Largo do Carmo': 2, 'Centro Cultural': 5},
    'Catedral Metropolitana': {'Largo do Carmo': 4, 'Centro Cultural': 3},
    'Estádio Municipal': {'Jardim Imperial': 5, 'Lago Azul': 6},
    'Estação Oeste': {'Jardim Imperial': 6, 'Lago Azul': 4},
    'Centro Cultural': {'Prefeitura': 5, 'Catedral Metropolitana': 3, 'Lago Azul': 7},
    'Lago Azul': {'Estádio Municipal': 6, 'Estação Oeste': 4, 'Centro Cultural': 7, 'Campus Tecnológico': 5},
    'Campus Tecnológico': {'Lago Azul': 5, 'Observatório Astronômico': 6},
    'Observatório Astronômico': {'Campus Tecnológico': 6}
}
