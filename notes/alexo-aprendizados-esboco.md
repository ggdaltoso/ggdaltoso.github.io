# Esboço: seção "Aprendizados"

Rascunho arquivado. Decidido em 24/09/2026 não incluir esta seção: o post já está bom
sem ela, e com 2.800 palavras o detalhe técnico viria depois de o leitor já ter a conclusão.
Fica aqui caso a ideia volte.

**Onde entra:** depois de "O padrão" e antes de "Sempre tem mais uma coisa". O padrão fecha a
tese, os aprendizados dão o detalhe técnico pra quem quiser, e o fecho continua sendo a última
coisa que o leitor lê.

**Registro:** aqui é onde o tecniquês é bem-vindo, ao contrário do resto do post. Quem chegou até
aqui já leu 2.800 palavras e quer o detalhe.

**Seleção:** dos treze itens das notas, seis. O critério foi: serve fora deste projeto, é
surpreendente, e não está dito em outro lugar do post.

---

### Aprendizados

Algumas coisas que eu não sabia antes e que valem para além do Alexo.

**Carga alta com CPU ociosa é I/O travado, não conta.** Foi isso que apontou pro swap na história
da foto do cachorro. Se o `uptime` mostra carga 4 e o `top` mostra a CPU dormindo, ninguém está
calculando nada: tem processo parado esperando disco ou rede. Demorei a olhar pra isso porque
"carga alta" parece problema de processamento.

**`ping` mede duas coisas ao mesmo tempo.** Num aparelho de um núcleo só, com o sistema ocupado, o
próprio processo do ping é preterido pelo escalonador e a amostra falha com a rede perfeita. Eu
passei um tempo achando que a rede caía quando a máquina só estava cheia. Separar "a rede caiu" de
"a máquina está ocupada" foi obrigatório pra investigação andar.

**Medir de fora some com os dados na hora da queda.** Meu monitor de rede rodava da minha máquina
por SSH. Quando a rede do Pi caía, o SSH morria junto e levava a medição embora, justamente no
segundo que interessava. Só depois que passei o monitor pra dentro do Pi, gravando em disco, foi
que apareceram os dados do momento exato.

**`vcgencmd measure_volts core` não mede a fonte.** Ele devolve a tensão do núcleo do SoC, uns
1,35 V, não o trilho de 5 V da entrada. Pra saber se a fonte dá conta existe só o `get_throttled`,
que dispara em torno de 4,63 V. E amperagem não dá pra ler por software num Pi Zero: o comando que
faria isso é exclusivo do Pi 4 e 5. Eu estava medindo a coisa errada e concluindo que estava tudo
bem.

**`pkill -f alguma-coisa` mata o próprio shell que o executou.** Num `ssh pi@host 'pkill -f mpv'`,
a linha de comando do shell remoto contém "mpv", então ele casa com o padrão e se mata antes de
terminar. Aconteceu quatro vezes neste projeto. Duas delas depois de eu já ter anotado isso como
regra.

**`systemctl disable` apaga a unit.** Se o arquivo em `/etc/systemd/system/` for um symlink, e não
um arquivo de verdade, o disable remove o link. Aconteceu com dois serviços aqui. Só não perdi
nada porque estavam versionados no repositório.

---

## O que ficou de fora, e por quê

**O epílogo do `dhcpcd`** (o Pi impecavelmente conectado a uma rede em que não tinha endereço
válido, 387 pings falhos em 1h54). É a melhor história do lote, mas é uma história, não um
aprendizado de uma frase. Ou vira subseção própria lá em cima, junto com as quatro, ou fica pra
outro post. Não cabe numa lista.

**O `i2cdetect` achar o endereço não prova que a antena funciona.** Excelente, mas o post já
resolveu o assunto do leitor e voltar nele aqui reabre uma seção fechada.

**A trava de reconexão liberada tarde demais** e **o `awk` lendo a coluna errada**. Os dois são
bons, mas são bug de programação comum, não coisa de Raspberry Pi. Entrariam melhor num post sobre
concorrência e sobre parsing.

**Tree-shaking que não acontece** (o bundle indo de 880 KB para 4.451 KB porque um pacote reexporta
975 módulos de um barril). Ótimo item e completamente de outro assunto. Merece post próprio.

**`/usr/sbin` fora do PATH num `ssh host 'comando'`.** Verdadeiro e chato, mas pequeno demais.

---

## Dúvidas para resolver antes de escrever de verdade

1. Seis itens é muito? A seção fica com ~450 palavras e o post vai para ~3.250.
2. Os dois últimos (`pkill` e `systemctl disable`) são de natureza diferente dos quatro primeiros:
   os primeiros são sobre diagnosticar, esses são sobre comandos que fazem mais do que parecem.
   Talvez valha separar em dois blocos, ou cortar os dois.
3. O título "Aprendizados" é o que você usou na conversa. "O que eu aprendi na marra" tem mais a
   ver com o resto do post.
