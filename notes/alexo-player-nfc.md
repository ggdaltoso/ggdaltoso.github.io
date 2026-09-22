# Alexo: player de música por tag NFC

Material bruto para um post futuro. Não é rascunho de texto — é o que aconteceu, com os números,
para não depender da memória depois.

Datas: 23 a 28 de agosto de 2026. Repositório: `ggdaltoso/alexo`, PR #4.

---

## O que é

O Alexo é um dashboard com estética Windows 95 rodando num Raspberry Pi Zero W, tela de 3,5"
(480×320). Já mostrava clima, câmbio e relógio. A adição foi um player de música acionado por tag
NFC: encosta a tag, toca um álbum; tira, pausa; recoloca a mesma, retoma de onde parou; encosta
outra, troca de álbum.

O efeito "caixinha" tipo Tonie ou Yoto.

---

## Os quatro fios narrativos

O que torna essa história contável não é a feature — é que **quatro diagnósticos meus estavam
errados**, e em cada caso a medição contradisse o raciocínio.

### 1. O NFC que não funcionava (e o hardware estava bom o tempo todo)

O módulo PN532 estava mudo por UART. Duas hipóteses foram construídas e defendidas: que ele
precisava de 5V (o regulador de 3,3V do Pi não daria conta), e que o TX precisava de um resistor de
1kΩ em série para não danificar o GPIO.

**As duas eram falsas.** O módulo roda em 3,3V sem problema, e o resistor nunca foi necessário —
I2C é open-drain com pull-ups fixos no próprio Pi.

O que resolveu foi mudar de protocolo. O módulo estava soldado direto nos pinos da UART, sem
jumpers — eu tinha sugerido testar I2C dizendo que "não precisa de solda", e o usuário me corrigiu:
mover para os pinos de I2C de hardware exigiria dessoldar. A saída foi o `i2c-gpio`, um driver que
cria um barramento I2C **por software**, bit-banged, em qualquer par de GPIOs. Zero mudança física.

Funcionou de primeira.

> Frase que resume: `i2cdetect -y 3` teria dado uma resposta binária no primeiro dia, e a escolha
> do UART nos privou desse sinal durante toda a investigação.

### 2. Eu medindo meu próprio bug por três rodadas

Depois de funcionar, a leitura parecia instável: com a tag parada na antena, o leitor lia uma vez e
sumia. Testei três estratégias de varredura contínua, todas com ~2% de acerto. Pedi ao usuário
várias vezes para segurar a tag enquanto eu media.

**A causa era meu script de teste.** Ele pedia 12 bytes na resposta do `SAMConfiguration`, que tem
9. Os 3 bytes a mais eram consumidos do barramento e dessincronizavam todos os comandos seguintes.
O hardware estava perfeito.

O sinal estava na mesa desde o começo e eu não vi: outro script meu, com os tamanhos certos,
funcionava para o usuário **na mesma sessão** em que minha medição dava 2%. Desconfiei do rádio, do
posicionamento e do protocolo antes de desconfiar da ferramenta.

Com a ferramenta corrigida: **100% de leitura com a tag parada**, na primeira tentativa.

Ainda nessa fase, travei o barramento I2C de vez portando código Python para Node sem notar que
`os.read` aceita leitura curta e o `i2cRead` do `i2c-bus` não. Pedir 64 bytes de um dispositivo com
6 pendentes fez o driver clocar até o chip travar segurando a linha SCL. **Não saiu com reboot** —
o módulo é alimentado pelo pino 3V3 do Pi, que não cai num reboot quente. Precisou tirar da tomada.

### 3. A foto do cachorro que derrubava o Wi-Fi

Esse é o melhor.

O Pi começou a cair da rede a cada poucas horas. Sintoma: o roteador mostrando o aparelho
conectado, mas nada respondendo — nem SSH, nem ARP. E o kiosk na tela continuava funcionando
normalmente, porque tudo que ele mostra vem de `localhost`.

Hipóteses testadas e **refutadas**:

| Hipótese | Como caiu |
|---|---|
| Subtensão da fonte (o ampli divide trilho com o rádio) | `vcgencmd get_throttled` = `0x0`, zero ocorrências no dmesg |
| O túnel de depuração remota que eu tinha montado | As quedas continuaram depois de removido |
| A varredura I2C do NFC | Efeito real e medido, mas reduzi 10x e não resolveu |

A causa real: **as fotos da galeria eram fotos de celular em resolução plena**, 3468×4624. O
arquivo é pequeno — 344 KB — porque JPEG comprime bem. Mas para desenhar na tela o navegador
precisa descomprimir, e aí cada pixel vira 4 bytes:

```
3468 × 4624 × 4 bytes = 61 MB de RAM   para uma foto
5 fotos                = 190 MB
RAM total do aparelho  = 430 MB
tamanho do painel      = 240 × 230 pixels
```

Estávamos decodificando 16 milhões de pixels para mostrar 48 mil.

E aqui está a parte que ninguém adivinha: **no BCM2835, o cartão SD e o rádio Wi-Fi dividem o mesmo
controlador SDIO.** Memória estoura → kernel usa swap no cartão → o barramento satura → o rádio não
é atendido e perde a associação.

Uma foto de cachorro derrubava a rede.

Depois de reduzir para 800px no lado maior: **190 MB → 8,2 MB decodificados**, memória disponível
de 80 MB para ~250 MB, e as quedas pararam em todas as medições feitas depois.

#### Epílogo (27 de agosto): a queda que sobrou não era do rádio

Reduzir as fotos parou as quedas por falta de memória. Não parou todas. Duas semanas depois o Pi
sumiu de novo — e dessa vez o monitor rodando a bordo tinha o registro inteiro do momento.

Às 12:39:57 o Pi trocou de rede sozinho: saiu do `GAMA Deco` a -27 dBm e foi para o `GAMA`, outra
rede da mesma casa, a -67 dBm. Ficou 65 segundos lá e voltou. Na volta, o `dhcpcd` tentou renovar o
lease de `192.168.0.96`, falhou em 5 segundos, declarou `DHCP lease expired` e assumiu um endereço
de link-local: `169.254.24.12`.

A partir dali o quadro era este:

| | |
|---|---|
| Associação | OK, `wpa_state=COMPLETED` |
| Sinal | -27 dBm, link 70/70 |
| Pings ao gateway | **387 falhas consecutivas, 1h54** |
| Tentativas do `dhcpcd` de pedir DHCP de novo, nessas 2h | **zero** |

Não era problema de rádio. Era problema de IPv4. O aparelho estava impecavelmente conectado a uma
rede na qual não tinha endereço válido, e o `dhcpcd` estacionou no link-local sem nunca mais
insistir. O mDNS continuou anunciando alegremente o `169.254.24.12` — que é exatamente por que o
roteador mostra o aparelho e nada responde. Reboot devolveu o `192.168.0.96`.

O gatilho é banal: existem três redes no `wpa_supplicant.conf`, e uma delas — a `GAMA` — é fraca no
lugar onde o Pi mora. Ela só está lá para dar opção de roaming, e é justamente a opção que quebra
tudo.

E uma hipótese minha caiu no meio do caminho: eu tinha afirmado que a `GAMA Deco` era rede de
convidados, sem DHCP e sem rota para fora. Falso — 1.050 pings ao gateway responderam, e o relógio
sincronizou por NTP. Esse segundo sinal vale sozinho: o Pi Zero W **não tem relógio de tempo real**,
então sobe com a data velha e só corrige quando alcança um servidor de tempo na internet. Ver o
relógio pular é prova de que há internet.

### 4. Os 13 °C de um player pausado

Dois dias depois de tudo funcionando, o Pi estava "extremamente quente, meio que do nada".

Primeira hipótese, minha: o ambiente. Ele tinha saído de um powerbank e ido para a USB do PC, e a
pilha de módulos — Pi, amplificador, driver da tela — vive toda encostada. **Refutada na mesma
tarde**: o aparelho estabilizou em 60 °C no mesmo lugar, no mesmo cabo, sem mudar nada.

Eram duas causas, e as duas eram software.

**Causa 1: o mpv escrevendo treze linhas de log por segundo.** A linha de status do mpv (`AV:
00:01:23 / 00:04:10`) se reescreve sozinha com `\r` num terminal. Debaixo do systemd não há
terminal, e cada atualização vira um registro novo no journal. Treze minutos de música produziram
**10.096 linhas**, 78% de todo o journal do dia, e o arquivo estourou o teto de 50 MB (chegou a
62,5 MB). Isso é escrita constante no cartão SD — o mesmo barramento da história da foto do
cachorro. `--quiet` na unit resolveu: zero linhas na medição seguinte.

**Causa 2, a boa: pausar não solta a placa de som.** A medição:

| Momento | Temperatura |
|---|---|
| Ocioso, tudo parado | 60,5 °C |
| 19 min de música | 64,3 °C |
| **27 min depois de pausar** | **70,8 °C** |
| 22 min depois de dar `stop` de verdade | 64,8 °C |

A curva continuou subindo *depois* de a música parar. O que estava aberto:

```
$ cat /proc/asound/card0/pcm0p/sub0/status
state: SETUP

$ lsof /dev/snd/pcmC0D0p
mpv  5413  pi  17u  CHR  116,16  /dev/snd/pcmC0D0p
```

Pausado, o mpv segura o dispositivo; o I2S segue clocando e o amplificador segue ligado. Um player
esquecido em pause custa **13 °C** — 60 °C ocioso contra 73 °C pausado. E isso explica
retroativamente a manhã que tinha me deixado intrigado: música das 12:10 às 12:23, pausada em
seguida, Pi a 73 °C até as 14:35.

A correção tinha uma versão em hardware (o pino `SD` do MAX98357A) e uma em software. Ganhou a de
software, e o detalhe é bonito: o mpv 0.29.1 do Raspbian buster não tem `--audio-keep-open`, mas
aceita trocar `audio-device` em tempo de execução. Definir o dispositivo como `null` **fecha o ALSA
preservando a playlist, o índice da faixa e a posição**; devolver o valor reabre. Um timer de 60
segundos de ociosidade, com a propriedade `core-idle` como guarda, e o problema some sem o usuário
saber que existia.

---

## Números que valem citar

| | |
|---|---|
| Boot do backend: `npm start` → `node` direto | **3min19 → 32s** |
| npm apenas subindo, ocioso, nesse Pi | 12,9s (contra 2,6s do node) |
| Bundle após atualizar `@react95/icons` | 880 KB → **4.451 KB** |
| Mesma versão, importando ícone a ícone | 880 KB de volta |
| Ícones no barril do pacote | 975 módulos, ~8 KB cada |
| Compilar `i2c-bus` no ARMv6 | 3min23 |
| mpv abrir o socket IPC | ~11s |
| Backend reaproveitando mpv já rodando | 1,0s |
| Catálogo de música | 404 faixas, 6 álbuns |
| Temperatura, serviços parados → tudo rodando | 50,8 °C → 70,8 °C |
| Player pausado vs. ocioso | 70,8 °C vs. 60,5 °C |
| mpv logando a linha de status sob systemd | 10.096 linhas em 13 min (~13/s) |
| Journal do dia com o mpv falante | 62,5 MB, para um teto de 50 MB |
| Queda de rede sem perder a associação | 387 pings falhos em 1h54, sinal -27 dBm |

---

## Decisões de projeto que renderiam parágrafo

**Uma tag = um álbum, não uma faixa.** Mudança pedida pelo usuário no meio do caminho. Simplificou
o cadastro e, de quebra, deu alvo real para "próxima/anterior" — que no escopo antigo não tinha
para onde ir e tinha virado "reiniciar a faixa atual".

**Não gravar nada na tag.** O PN532 escreve, e a ideia surgiu de guardar o álbum na própria tag. O
argumento que encerrou a discussão foi do usuário: como o leitor precisa cair pra trás no UID
quando a tag vier ilegível, o mapeamento em JSON existe de qualquer jeito — gravar criaria uma
**segunda cópia do mesmo fato**, com as duas podendo divergir e nenhuma regra de qual vence.

**O player não tem controles na tela.** Quem comanda é a tag. Botão de pause criaria estados
contraditórios: "pausado" na interface com a tag ainda encostada.

**O painel de música é permanente, não uma tela do carrossel.** O plano original previa uma rota
`/music` com navegação automática ao encostar a tag e retorno à rota anterior ao tirá-la — que era
exatamente a mecânica que a gente tinha removido do `/message` semanas antes por ser ruim. O
desenho do usuário (painel fixo abaixo da galeria, aparecendo só quando há música) eliminou o
problema em vez de resolvê-lo.

**Os scripts em Python ficaram em Python.** A pergunta natural — "por que não portar tudo para
JS?" — tem resposta ruim neste aparelho. Só um script está no caminho de execução, o que redimensiona
as fotos da galeria, e as três alternativas em Node são piores: o `sharp` precisa de Node ≥ 20.9 ou
do binário pré-compilado, e o pacote `@img/sharp-libvips-linux-arm` declara `cpu: ["arm"]`, que **não
distingue ARMv6 de ARMv7** — o npm instala o binário errado e ele só falha em tempo de execução; o
`jimp` faz a decodificação de 61 MB dentro do heap do Node, que é literalmente a causa da história da
foto do cachorro; e o Pillow vem pronto do apt, sem compilar nada. Portar os scripts de NFC seria
fácil, mas destruiria o teste diferencial que compara as duas implementações lado a lado.

**O mpv virou serviço systemd próprio.** Como filho do backend, ninguém o supervisionava: se
morresse, ficava morto. Como serviço, sobe no boot em paralelo — e aqueles 11s de subida somem
dentro da inicialização em vez de virarem uma janela morta depois que o backend já atende.

---

## Armadilhas que renderiam uma seção "coisas que aprendi na marra"

**`i2cdetect` achando o endereço não prova que a antena funciona.** O `0x24` aparecendo prova só
que o chip confirma o próprio endereço. O campo de RF é outro subsistema, e um módulo mal
posicionado responde a todos os comandos e não lê tag nenhuma — sintoma idêntico a bug de software.

**`pkill -f` casa com a linha de comando do próprio shell que o executa.** Num `ssh host 'pkill -f
foo'`, a linha do shell remoto contém `foo`. Ele mata a si mesmo. Aconteceu **quatro vezes** neste
projeto, sendo duas depois de eu ter anotado isso como regra permanente.

**`systemctl disable` apaga a unit** se ela estiver em `/etc/systemd/system/` como symlink em vez de
arquivo. Aconteceu com dois serviços; só foi recuperável porque estavam versionados no repositório.

**Carga alta com CPU ociosa significa I/O bloqueado**, não computação. Foi o que apontou para o
swap.

**`ping` mede duas coisas ao mesmo tempo.** Com carga alta num núcleo único, o processo de ping é
preterido pelo escalonador e a amostra falha com a rede perfeita. Separar "rede caiu" de "máquina
ocupada" foi obrigatório para a investigação andar.

**Medir de fora perde os dados na hora da queda.** O monitor teve que rodar no próprio Pi, gravando
em disco — quando a rede caiu durante um teste, o SSH morreu junto e levaria a medição com ele.

**`vcgencmd measure_volts core` não mede a fonte.** Ele devolve a tensão do núcleo do SoC (1,35 V),
não o trilho de 5 V da entrada. Para saber se a fonte dá conta existe só o `get_throttled` (bit 0 =
subtensão agora, bits 16+ = já aconteceu desde o boot; `0x50005` é o valor clássico de fonte ruim), e
ele dispara em ~4,63 V. **Amperagem não dá para ler por software num Pi Zero**: o `pmic_read_adc`,
que faria isso, é exclusivo do Pi 4/5 e responde "Command not registered".

**Não dá para parsear log por índice de coluna quando um campo tem espaço.** O log do monitor de
Wi-Fi tem o SSID (`GAMA Deco`) no meio e uma lista de 0 a 3 nomes de serviço no fim — nem contar da
esquerda nem contar de `NF` para trás funciona. Um awk assim me fez reportar 60 ms de latência média
lendo, na verdade, a coluna de temperatura. **Foi a quarta vez neste projeto que a ferramenta de
medição era o bug.** A correção definitiva foi casar a linha inteira com uma regex ancorada no único
campo de largura fixa que existe: o MAC do BSSID.

**Uma trava de reconexão liberada tarde demais deixa o processo morto para sempre.** A função de
reconexão ao mpv marcava `reconectando = false` *depois* de dois `await`. Se a conexão recém-aberta
morresse durante esses dois await, o evento de `close` chamava a reconexão de novo, encontrava a
trava ainda presa e voltava sem fazer nada — silenciosamente, para não tentar mais. Só um restart do
backend ressuscitava.

**`/usr/sbin` não está no PATH de um `ssh host 'comando'`.** `iwgetid` e `iwconfig` viram "command
not found" num shell não interativo, e a mensagem sugere que não estão instalados.

**Tree-shaking não é garantido.** Um pacote que não declara `sideEffects: false` e reexporta 975
módulos de um barril entra quase inteiro no bundle. Os dois upgrades que causaram isso passaram por
typecheck e build sem um único aviso; só apareceu quando estranhei o tamanho do arquivo.

---

## O ângulo que eu escolheria para o post

Não "como construí um player NFC" — isso é tutorial e já existe aos montes.

O ângulo é **quanto de depuração é você descobrindo que estava medindo errado**. A conta não parou
em três: o script de teste, não o rádio; a foto na galeria, não a fonte de alimentação; o wrapper
npm, não o hardware lento; o `dhcpcd` parado, não o sinal; o player pausado, não a exaustão do PC; e,
duas vezes, o meu próprio awk lendo a coluna errada do log que eu mesmo tinha escrito.

O padrão é sempre o mesmo: o erro estava mais perto de casa do que a hipótese sugeria. E a hipótese
sempre era mais interessante — subtensão, interferência, roteador — do que a causa, que era sempre
alguma coisa mundana que eu tinha construído duas horas antes.

E o fecho natural: um Pi Zero W caindo da rede a cada poucas horas por causa de uma foto de
cachorro em 16 megapixels. É engraçado, é verdade, e o mecanismo (SDIO compartilhado entre cartão e
rádio) é genuinamente pouco conhecido.

Título possível: *A foto do meu cachorro derrubava o Wi-Fi*.

---

## Material visual disponível

No repositório, em `screens/`:

- `music-player.png` — o painel com o letreiro no meio da rolagem
- `music-player-exchange.png` — outro álbum
- `admin.png`, `admin-music.png`, `admin-music-player.png` — as telas de administração
- `admin-gallery.png` — com as fotos borradas
- `clock.png`, `forecast.png`, `exchange-rate.png`

Vale gravar um vídeo curto do gesto: encostar a tag, a música começar, o painel aparecer, tirar a
tag, pausar. É a coisa que texto nenhum comunica bem.

---

## Fica em aberto (verificar antes de publicar)

- ~~A tela do Todoist parou de renderizar tarefas~~ — resolvido, segundo o usuário (22/09/2026)
- ~~Os álbuns ainda têm vinhetas de 2 a 10 segundos~~ — resolvido, segundo o usuário (22/09/2026)
- ~~O áudio distorce acima do volume ~60~~ — FALSO. Verificado em 22/09/2026: o usuário diz que
  a distorção não existe e provavelmente nunca existiu, foi teste mal feito na época
- O `dhcpcd` continua sem endurecimento: ele ainda pode estacionar em link-local se o lease falhar
- A rede `GAMA` continua no `wpa_supplicant.conf`, e é ela que dispara o roaming ruim
- A estabilidade do Wi-Fi só foi verificada por horas, não por dias

Resolvidos desde a primeira versão desta nota:

- ~~70,8 °C com tudo rodando; não medido se o calor contribuía para as quedas de rede~~ — eram duas
  causas de software (log do mpv e player pausado segurando o `/dev/snd`), ambas corrigidas; o
  aparelho estabiliza em ~60 °C ocioso e ~64 °C tocando

---

## Reservado para a seção "Aprendizados" do post

Material tirado do corpo do post por pesar demais no meio da narrativa. O plano é juntar tudo
numa seção própria no fim, onde o tecniquês é bem-vindo. A cada corte novo, anotar aqui.

- **O `dhcpcd` estacionado em link-local** (cortado da seção "A foto do cachorro" em 14/09).
  Era o epílogo de 27 de agosto: roaming pra uma rede fraca, lease não renovado, endereço
  169.254.x, 387 pings falhos em 1h54 com o sinal em -27 dBm e zero tentativa de pedir DHCP de
  novo. O texto completo está na seção "Epílogo (27 de agosto)" acima. Junto sai o item de
  "O que ficou faltando" que dizia que o `dhcpcd` continua sem endurecimento.
