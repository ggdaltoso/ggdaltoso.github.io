---
title: "Crie um videogame com Raspberry Pi"
date: "2016-08-30T01:36:36.000Z"
template: "post"
draft: false
slug: "/posts/crie-um-videogame-com-raspberry-pi/"
category: "RaspberryPi"
tags:
  - "Videogame"
  - "RaspberryPi"
  - "Recalbox"

description: "Fazer um console que emule vários outros consoles é muito fácil. O 
segredo está em utilizar um Raspberry Pi e ler esse post!"
---

Que a cada dia que passa os jogos ficam cada vez ~~melhores~~ mais bonitos, isso
ninguém pode discordar. Mas também não podemos esquecer dos grandes clássicos de
antigamente.

Você consegue fazer as contas de quantas horas já gastou com Zelda? Donkey Kong?
Street Fighter? Crash? Metroid? Se for colocar a saga do Mário então, nem se
fala...

O que me motivou nesse projeto foi o contato com Raspberry Pi e o quão fácil foi
configurá-lo e fazer dele uma central de emulação completa, com vários consoles
disponíveis.

Estou escrevendo esse post porque várias pessoas me pediram para dar mais
detalhes de como fiz meu "videogame". Haha

Então, vamos lá!!

### Resultado

O que seremos capaz de fazer, se seguirmos esse post passo-a-passo, é o
seguinte:

<iframe width="560" height="315" src="https://www.youtube.com/embed/q5UYxuzKEec" frameborder="0" allowfullscreen></iframe>

### Primeiros passos

O que precisamos?

Ao contrário dos consoles convencionais, nosso videogame será montado peça por
peça, até que vire um único acessório. Existem kits completos na internet mas eu
preferi comprar um por um. A lista que necessitamos não é tão grande e nem tão
cara:

<p>
  <table style="width: 80%; margin: auto">
    <thead>
      <tr ><th>Componente</th> <th style="text-align: right">Preço</th></tr>
    </thead>
    <tfoot>
      <tr>
        <td>Total</td>
        <td style="text-align: right" ><strong>456,98</strong></td>
      </tr>
    </tfoot>
    <tbody>
      <tr>
        <td>Raspberry Pi 3</td>
        <td style="text-align: right"> 279,79 </td>
      </tr>
      <tr>
        <td>Fonte de 5V e 2.2A</td>
        <td style="text-align: right"> 34,80 </td>
      </tr>
      <tr>
        <td>Cartão Micro SD 64 Gb</td>
        <td style="text-align: right"> 92,39 </td>
      </tr>
      <tr>
        <td>Controle Dualshock (2x) </td>
        <td style="text-align: right"> 50,00 </td>
      </tr>
      <tr>
        <td>Cabo HDMI </td>
        <td style="text-align: right"> 0,00 </td>
      </tr>
      <tr>
        <td>Teclado USB </td>
        <td style="text-align: right"> 0,00 </td>
      </tr>
    </tbody>
  </table>
</p>

Note que escolhi o Raspberry Pi 3 por ser o mais novo e com melhores
configurações, mas não há nada que o impeça de seguir com uma versão anterior.
Os valores do Cabo HDMI e do teclado estão zerados pois eu já tinha eles e não
precisei comprá-los.

Vamos utilizar o [Recalbox](https://www.recalbox.com/) como nossa plataforma.
Ele é open-source e de simples configuração. Para os mais aventureiros existem
outras opções como o [RetroPie](https://retropie.org.uk/) e o
[Lakka](http://www.lakka.tv/), por exemplo.

### Preparando o terreno

Com todas as peças em mãos, o próximo passo é formatar o cartão micro SD para
FAT32. O Recalbox recomenda a utilização do
[SD Formatter](https://www.sdcard.org/downloads/formatter_4/) para Windows ou
MacOSX e [gparted](http://gparted.org/ "sudo apt-get install gparted") para
Linux.

Enquanto faz esse processo, você pode deixar baixando o recalbox. Escolha a
última versão disponível em seu
[repositório do GitHub](https://github.com/recalbox/recalbox-os/releases).

Com o download feito, você deve ter um arquivo chamado _recalboxOS.zip_ e um
cartão formatado. Extraia os arquivos e os copie para cartão.

### 1, 2, 3 testando..

Agora que você tem o "HD" do seu videogame, vamos encaixar as peças no seu
Raspberry.

1. Insira o micro SD
2. Conecte o cabo HDMI nele e depois em um monitor/TV
3. Plugue um teclado
4. Ligue a fonte

Por alguns instantes ele fará algumas configurações e logo após irá fazer um
_reboot_.

Eee.... Voilá!

Simples, não?

### Configurando os controles

Você pode configurar vários [tipos de controles para o Recalbox](<https://github.com/recalbox/recalbox-os/wiki/Compatibility-(EN)>). Eu preferi o clássico DualShock.

Utilize o teclado para acessar as configurações. Aperte Enter para aparecer o
menu, A para selecionar e S para voltar.

<img 
  src="/media/crie-um-videogame-com-raspberry-pi/menu.jpg" 
  alt="Menu principal do Recalbox" 
  title="Menu.png"
/>

Essa etapa é simples: você deve apertar a tecla do controle referente à pedida
na tela, conforme a imagem

<img 
  src="/media/crie-um-videogame-com-raspberry-pi/controller.png" 
  alt="Controle do PlayStation 3" 
  title="PS3.png"
/>

Um detalhe importante é a última tecla pedida: a _HOTKEY_. Através dela você
conseguirá acessar vários comandos importantes da plataforma.

<p>
  <table>
    <thead>
      <tr ><th>Comando</th> <th>Função</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Hotkey + Y</td>
        <td> Carrega </td>
      </tr>
      <tr>
        <td>Hotkey + X</td>
        <td> Salva </td>
      </tr>
      <tr>
        <td>Hotkey + &uarr;</td>
        <td> Seleciona save -1 </td>
      </tr>
      <tr>
        <td>Hotkey + &darr;</td>
        <td> Seleciona save +1 </td>
      </tr>
      <tr>
        <td>Hotkey + Start</td>
        <td> Volta para os jogos </td>
      </tr>
      <tr>
        <td>Hotkey + A</td>
        <td> Reseta o jogo </td>
      </tr>
      <tr>
        <td>Hotkey + B</td>
        <td> Acessa o menu de emulação </td>
      </tr>
      <tr>
        <td>Hotkey + L1</td>
        <td> <i>screenshot</i> </td>
      </tr>
      <tr>
        <td>Hotkey + &rarr;</td>
        <td> Aumenta a velocidade  </td>
      </tr>
      <tr>
        <td>Hotkey + &larr;</td>
        <td> Diminui a velocidade  </td>
      </tr>
      <tr>
        <td>Hotkey + R2</td>
        <td> Altera a filtro da imagem (próximo)  </td>
      </tr>
      <tr>
        <td>Hotkey + L2</td>
        <td> Altera a filtro da imagem (anterior)  </td>
      </tr>
    </tbody>
  </table>
</p>

### Conectando

Ainda com o teclado conectado, vá nas opções e configure a conexão com a
internet (o Raspberry Pi 3 possui Wi-Fi e Bluetooth nativo)

<img 
  src="/media/crie-um-videogame-com-raspberry-pi/networkHD.jpg" 
  alt="Tela de configuração de internet" 
  title="Network.png"
/>

Se você tiver um cabo de rede, plugue-o e pule essa etapa. Caso prefira Wi-Fi,
como eu, preencha os campos necessários para a conexão:

- WIFI SSID: Nome da sua rede
- WIFI KEY: Senha

Espere até que a conexão seja feita e anote o _IP ADDRESS_. Esse passo é muito
importante.

### Inserindo Jogos

Você pode fazer essa parte de algumas formas, basta ter um computador na mesma
rede.

**Acessando diretamente o cartão SD**

Pelo o executar ou pelo explorer, digite o caminho `\\recalbox` e aperte enter.

<img 
  src="/media/crie-um-videogame-com-raspberry-pi/executar.png" 
  alt="Diretório do Recalbox" 
  title="\\recalbox.png"
/>

Navegue até o caminho `\\recalbox\share\roms` e tenha acesso à todas as pastas.
Agora é só copiar e colar a _rom_ em seu respectivo diretório.

**Via Browser**

Lembra do _IP ADDRESS_? Digite-o em seu browser de preferência. É possível
acessar várias configurações a partir da interface que irá aparecer: monitorar a
temperatura, adicionar/remover bios, ler a documentação e inclusive adicionar e
remover _roms_.

<img 
  src="/media/crie-um-videogame-com-raspberry-pi/interface.png" 
  alt="Interface do Recalbox acessado no browser" 
  title="browser.png"
/>

**Pegando imagens**

Depois de ter adicionado os jogos você pode colocar imagens nas roms. Para isso,
basta voltar ao menu principal e escolher a opção _SCRAPER_. Siga as instruções
pedidas e depois veja como ficaram seus jogos (esse passo pode demorar).

<img 
  src="/media/crie-um-videogame-com-raspberry-pi/scrapper.png" 
  alt="Imagem de um jogo e suas informações" 
  title="Scraper.png"
/>

### Case

Seu videogame está praticamente pronto mas para não ligar uma placa na TV
diretamente, eu comprei um case para o Raspberry. Como ele ainda não chegou
(comprei da China), fiz um temporário de papelão, seguindo um template que
[achei na internet](http://sixes.net/rdcHQ/mosh/raspberry.pi.b.plus.pdf).

<img 
  src="/media/crie-um-videogame-com-raspberry-pi/case.png" 
  alt="Capa para seu videogame" 
  title="Capinha.png"
/>

Ele não ficou tão bonito mas, como disse, é provisório até o case chegar.

### Próximos passos

Com a chegada do case, pretendo colocar um botão de ligar e desligar, reset
(talvez) e um LED indicando se está ligado ou não.

E é isso!

Espero que gostem e compartilhem fotos do videogame de vocês, caso o tenham
feito. O meu já está compartilhado!

Vlw! ;)
