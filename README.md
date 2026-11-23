# Aquaponia & Aeradores Autônomos — Estudo Técnico Completo

Este repositório reúne a auditoria física inicial, o dimensionamento completo de aeradores autônomos (**Solar 12V** e **Eólico Savonius** para 1.000–3.000 L e 5.000 L), o **modelo 3D paramétrico (OpenSCAD)** do mecanismo excêntrico e a evolução para um sistema integrado de **Aquaponia de 6.000 litros (2 × 3.000 L + Decantador + Horta Hidropônica)**.

---

## Navegação & Arquivos do Projeto

| Arquivo | Descrição |
| :--- | :--- |
| **[index.html](./index.html)** | **Página Principal (Portal Interativo)** — chama todas as plantas animadas, documentação e arquivo 3D. |
| **[documentacao.html](./documentacao.html)** | **Documentação Técnica Unificada (HTML)** — todos os cálculos, auditoria, listas de materiais e guias. |
| **[plantas/planta_filtro_solar_alvenaria.html](./plantas/planta_filtro_solar_alvenaria.html)** | **Projeto 4 — Filtro Solar Duplo (2×100 L) para Tanque de Alvenaria** (sem horta, bomba na gaiola, tampas anti-mosquito). |
| **[plantas/planta_aquaponia_6000l.html](./plantas/planta_aquaponia_6000l.html)** | **Projeto 3 — Aquaponia CHOP2 (2 × 3.000 L + Horta + Sump)** com bombeamento individualizado 50/50. |
| **[componentes/bomba_diafragma_agua.html](./componentes/bomba_diafragma_agua.html)** | **Componente 1 — Bomba de Diafragma para Água** (corte animado, lista de materiais DIY vs. pronta). |
| **[componentes/camara_de_ar.html](./componentes/camara_de_ar.html)** | **Componente 2 — Câmara de Ar / Amortecedor** (auditoria da Lei de Henry, bexiga interna vs. vaso pronto). |
| **[componentes/rotor_savonius.html](./componentes/rotor_savonius.html)** | **Componente 3 — Rotor Savonius 1,80 × 0,95 m** (sobreposição 15%, estrutura e lista completa de materiais). |
| **[plantas/planta_aerador_eolico_5000l.html](./plantas/planta_aerador_eolico_5000l.html)** | **Projeto 2B — Aerador Eólico Savonius 5.000 L** (2 tambores 200 L + duplo diafragma 180°). |
| **[plantas/detalhe_excentrico_duplo.html](./plantas/detalhe_excentrico_duplo.html)** | **Detalhe Mecânico — Excêntrico e Dupla Biela** em 3 ângulos sincronizados (0° a 360°). |
| **[plantas/planta_aerador_eolico_mecanico.html](./plantas/planta_aerador_eolico_mecanico.html)** | **Projeto 2A — Aerador Eólico Savonius Compacto** (1.000–3.000 L, PVC 200 mm). |
| **[plantas/planta_aerador_solar_12v.html](./plantas/planta_aerador_solar_12v.html)** | **Projeto 1 — Aerador Solar Fotovoltaico 12V** (autônomo 24h com bateria estacionária). |
| **[3d/excentrico_duplo_5000l.scad](./3d/excentrico_duplo_5000l.scad)** | **Modelo 3D OpenSCAD** (pronto p/ exportar `.stl` sem suportes: disco excêntrico, bielas p/ 608 e espaçador). |

> **Dica (GitHub Pages):** Ativando o GitHub Pages na branch `main` (pasta raiz `/`), todas as animações interativas e a documentação ficam navegáveis diretamente no navegador via `https://ronaldobr72.github.io/Aquaponia/`.

---

## 1. Auditoria Técnica da Proposta Inicial (O que funciona vs. Alucinação)

| Conceito avaliado | Veredito | Observação técnica |
| :--- | :--- | :--- |
| Rastreador solar eletrônico / passivo industrial (Zomeworks) | **Real / Funciona** | Ganhos reais de 20–45%, mas exige proteção contra vento. |
| Clepsidra (relógio d'água com gotejador e contrapeso) | **Funciona** | Princípio real; equipo entope fácil e vazão varia com o nível. |
| Rastreador flutuante com minicélula na sombra | **Funciona** | Reduz atrito drasticamente; controle analógico real por realimentação negativa. |
| Músculo de nylon torcido (Ray Baughman, *Science*, 2014) | **Ciência real, aplicação inviável assim** | Exige tratamento térmico (*annealing*) e altas temperaturas; não move placa real desse jeito. |
| Rastreador de 2 garrafas PET (ar + água) | **Erro de sinal + fraco demais** | Aquecer o Leste e pesar o Oeste inclina a placa para o **Oeste** (contra o sol da manhã). |
| **Roda de Minto "Invertida" de PET + Água/Álcool + Conchas** | **Impossível (Alucinação)** | Viola conservação de energia, Lei de Boyle e limites térmicos do PET. |

---

## 2. Projeto 1 — Aerador Solar Fotovoltaico 12V (1.000–3.000 L, 24h)

- **Painel 50 W (12V)** (~170 Wh úteis/dia) + **Controlador PWM 10A** + **Bateria 12V 30 Ah Estacionária/AGM** (180 Wh úteis a 50% DoD) + **Compressor 12V de diafragma** (5–6 W contínuo 24h, ou 10–12 W por 12h com timer).
- **Ordem de ligação no PWM:** 1º bateria → 2º painel solar → 3º compressor (saída LOAD).
- **Planta interativa:** [plantas/planta_aerador_solar_12v.html](./plantas/planta_aerador_solar_12v.html)

---

## 3. Projeto 2A — Aerador Eólico Savonius Compacto (1.000–3.000 L)

- **Rotor:** 2 estágios a 90°, **H = 1,40 m × Ø = 0,70 m** (tubos PVC 200 mm, 15% sobreposição central).
- **Bomba:** 1 câmara PVC Ø 75 mm (curso 2,5 cm, torque exigido ~0,41 N·m vs. ~0,90 N·m disponíveis a 12 km/h).
- **Vazão:** ~5 a 14 L/min (11 a 25 km/h) com difusor entre 0,6 m e 0,8 m de profundidade.
- **Planta interativa:** [plantas/planta_aerador_eolico_mecanico.html](./plantas/planta_aerador_eolico_mecanico.html)

---

## 4. Projeto 2B — Aerador Eólico Savonius 5.000 L + Peças 3D

- **Rotor:** **H = 1,80 m × Ø = 0,95 m** (2 tambores de 200 L cortados ao meio, 2 estágios a 90°). Torque de partida: **~2,1 N·m** a 12 km/h.
- **Bomba Duplo Diafragma (180°):** **2 câmaras PVC Ø 75 mm opostas** (curso 3,0 cm, excêntrico r = 1,5 cm) acionadas em alternância — dobra a vazão (**~9 a 20 L/min**) mantendo o torque suave (~0,80 N·m).
- **Eixo e Estrutura:** Aço Ø 25 mm + mancais P205 + estaiamento; 2 pedras porosas a 0,9 m de profundidade.
- **Impressão 3D ([3d/excentrico_duplo_5000l.scad](./3d/excentrico_duplo_5000l.scad)):** Disco excêntrico (eixo Ø 25 mm, furo M8 a r = 15 mm), 2 bielas com alojamento para rolamentos **608-2RS** e arruela espaçadora (imprimir em **PETG/ASA**, 4–5 paredes, 35–40% preenchimento, sem suportes).
- **Plantas interativas:** [planta_aerador_eolico_5000l.html](./plantas/planta_aerador_eolico_5000l.html) e [detalhe_excentrico_duplo.html](./plantas/detalhe_excentrico_duplo.html)

---

## 5. Projeto 3 — Aquaponia CHOP2 (2 × 3.000 L no Mesmo Nível + Decantador + Horta + Sump)

```text
[Tanque A - 3.000 L (Vórtex + SLO)] ──┐
                                      ├──► [Decantador 200 L] ──► (Dreno lodo 1×/sem)
[Tanque B - 3.000 L (Vórtex + SLO)] ──┘            │  Água clarificada (sem sólidos)
                                                   ▼
                                       [Horta / Cama de Cultivo (Argila Expandida)] (NH₃ → NO₃⁻)
                                                   │  Água 100% filtrada (gravidade)
                                                   ▼
            ◄── (Bomba puxa SÓ água limpa!) ── [Sump 300–500 L (Baixo + Boia de reposição)]
            (Divide 50% p/ Tanque A + 50% p/ Tanque B com jato tangencial)
```

### 2 Modos Individualizados para CHOP2 (ΔH ≈ 0,85–1,1 m) — simulados em [planta_aquaponia_6000l.html](./plantas/planta_aquaponia_6000l.html)
1. **100% Eólico — 2 Câmaras de Diafragma Independentes (Zero Placa Solar):** **Câmara A → Tanque A** e **Câmara B → Tanque B** (afogadas abaixo do Sump, cada linha com sua câmara de ar amortecedora). Por ser deslocamento positivo (~85 mL/volta em cada câmara), garante divisão **50% / 50% exata em qualquer vento** sem precisar estrangular registros.
2. **Híbrido Solar 12V — 2 Bombas Brushless Independentes + Aerador Eólico:** **2 bombas 12V de 15 W (~900 L/h cada)** dentro do Sump (uma p/ Tanque A, outra p/ Tanque B) garantem **50/50 perfeito + redundância real** 24h mesmo sem vento, enquanto o Savonius injeta O₂ seco nos 2 tanques.

### Pontos Críticos da Aquaponia CHOP2
- **Limpeza igual dos 2 tanques:** Ambos os tanques circulares têm entrada tangencial (efeito "xícara de chá") + SLO central indo ao Decantador (remove ~60–80% dos sólidos pesados).
- **Por que não Airlift aqui?** Um Airlift só eleva ~30–40% da sua profundidade submersa; para vencer ΔH = 1,1 m do Sump até os tanques altos, exigiria um poço enterrado de ~2,5 m — por isso usamos bomba pressurizada.
- **Horta resiliente à calmaria:** No modo 100% eólico, use **Cama de Cultivo (argila expandida/brita)** ou **DWC** — nunca tubos NFT secos.
- **Boia de reposição no Sump** para compensar 1–3%/dia de evapotranspiração mantendo os tanques de peixes sempre cheios.
