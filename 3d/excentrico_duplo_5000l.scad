// ============================================================================
// Aerador Eólico Savonius (5.000 L) — Mecanismo Excêntrico + Dupla Biela
// Arquivo paramétrico em OpenSCAD pronto para exportação STL
//
// Peças incluídas:
//   1. Disco excêntrico (eixo Ø 25 mm, raio r = 15 mm -> curso 30 mm, pino M8)
//   2. Biela com alojamento para rolamento 608-2RS (imprima 2 unidades)
//   3. Arruela espaçadora entre as duas bielas no pino M8
//
// Impressão recomendada: PETG ou ASA/ABS | 4-5 paredes | 35-40% preenchimento
//                        Sem necessidade de suportes!
// ============================================================================

// Escolha o que renderizar para exportar o STL:
// Opções: "tudo", "disco", "biela", "espacador"
PECA = "tudo";

// --- PARÂMETROS PRINCIPAIS (em mm) ---
$fn = 80; // Suavidade dos círculos

// Eixo do rotor Savonius
diametro_eixo     = 25.0;  // Eixo de aço Ø 25 mm (1")
folga_eixo        = 0.4;   // Folga para encaixe deslizante firme

// Disco excêntrico
diametro_disco    = 100.0; // Diâmetro externo do disco
espessura_disco   = 14.0;  // Espessura da base do disco
altura_cubo       = 26.0;  // Altura do colarinho de fixação no eixo
diametro_cubo     = 44.0;  // Diâmetro externo do cubo
raio_excentrico   = 15.0;  // r = 15 mm -> curso total de 30 mm (3 cm)
diametro_pino_m8  = 8.3;   // Furo para parafuso M8 de aço (pino excêntrico)

// Biela (imprimir 2 unidades)
comprimento_biela = 180.0; // Distância centro a centro (pino M8 -> pino M6)
largura_haste     = 18.0;  // Largura da barra da biela
espessura_biela   = 9.0;   // Altura da biela (rolamento 608 tem 7 mm + aba 2 mm)
od_rolamento_608  = 22.25; // Rolamento 608 (22 mm) + 0.25 mm de folga de encaixe
alt_rolamento_608 = 7.1;   // Altura do alojamento do rolamento 608
furo_diafragma_m6 = 6.3;   // Furo na outra ponta (parafuso M6 do diafragma)

// ============================================================================
// MÓDULO 1: DISCO EXCÊNTRICO
// ============================================================================
module disco_excentrico() {
    difference() {
        union() {
            // Base do disco
            cylinder(h = espessura_disco, d = diametro_disco);
            // Cubo central reforçado para fixar no eixo
            cylinder(h = espessura_disco + altura_cubo, d = diametro_cubo);
        }

        // Furo central do eixo Ø 25 mm
        translate([0, 0, -1])
            cylinder(h = espessura_disco + altura_cubo + 2, d = diametro_eixo + folga_eixo);

        // 2 furos laterais passantes (M6) no cubo para travar no eixo com parafuso/pino
        for (ang = [0, 90]) {
            rotate([0, 0, ang])
                translate([0, 0, espessura_disco + altura_cubo / 2])
                    rotate([0, 90, 0])
                        cylinder(h = diametro_cubo + 4, d = 6.3, center = true);
        }

        // Furo do pino excêntrico (M8) deslocado em r = 15 mm
        translate([raio_excentrico, 0, -1])
            cylinder(h = espessura_disco + 2, d = diametro_pino_m8);

        // Rebaixo sextavado na face superior para travar a cabeça/porca M8 (chave 13 mm)
        translate([raio_excentrico, 0, espessura_disco - 6])
            cylinder(h = 7, d = 15.2, $fn = 6);
    }
}

// ============================================================================
// MÓDULO 2: BIELA PARA ROLAMENTO 608 (IMPRIMIR 2 UNIDADES)
// ============================================================================
module biela() {
    d_cabeca_grande  = od_rolamento_608 + 10.0; // Parede de 5 mm ao redor do 608
    d_cabeca_pequena = 18.0;

    difference() {
        union() {
            // Corpo principal da biela (transição suave entre as duas pontas)
            hull() {
                cylinder(h = espessura_biela, d = d_cabeca_grande);
                translate([comprimento_biela, 0, 0])
                    cylinder(h = espessura_biela, d = d_cabeca_pequena);
            }
        }

        // Furo passante no alojamento do 608 (deixa aba de retenção para o anel externo)
        translate([0, 0, -1])
            cylinder(h = espessura_biela + 2, d = od_rolamento_608 - 4.0);

        // Alojamento preciso do rolamento 608-2RS (encaixe por pressão pelo topo)
        translate([0, 0, espessura_biela - alt_rolamento_608])
            cylinder(h = alt_rolamento_608 + 1, d = od_rolamento_608);

        // Furo da ponta do diafragma (parafuso M6)
        translate([comprimento_biela, 0, -1])
            cylinder(h = espessura_biela + 2, d = furo_diafragma_m6);

        // Rasgo central de alívio de peso (economiza filamento sem perder rigidez)
        hull() {
            translate([d_cabeca_grande / 2 + 12, 0, -1])
                cylinder(h = espessura_biela + 2, d = 7);
            translate([comprimento_biela - d_cabeca_pequena / 2 - 12, 0, -1])
                cylinder(h = espessura_biela + 2, d = 7);
        }
    }
}

// ============================================================================
// MÓDULO 3: ARRUELA ESPAÇADORA (ENTRE AS DUAS BIELAS NO PINO M8)
// ============================================================================
module espacador() {
    difference() {
        cylinder(h = 3.0, d = 14.0);
        translate([0, 0, -1])
            cylinder(h = 5.0, d = diametro_pino_m8 + 0.2);
    }
}

// ============================================================================
// RENDERIZAÇÃO CONFORME SELEÇÃO
// ============================================================================
if (PECA == "disco") {
    disco_excentrico();
} else if (PECA == "biela") {
    biela();
} else if (PECA == "espacador") {
    espacador();
} else {
    // Layout completo na mesa para visualização
    disco_excentrico();
    translate([-45, 78, 0]) biela();
    translate([-45, 118, 0]) biela();
    translate([75, 0, 0]) espacador();
}
