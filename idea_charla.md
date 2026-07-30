Agentes en Accion: Fundamentos, MCP y Codigo

intro:
Estamos en un tiempo de revolucion tecnologica sin precedentes, y algo que pasa en estos tiempos, es que transforma todo...
cambio la forma de trabajar, cambio la percepcion de nuevo, cambio la cultura, cambio la forma de hacer ciencia y tambien como todo cambio, viene con muchas ideas o conceptos y vocabulario nuevo.
que agente, que llm, que workflow, que mcp, que gpt. Y a veces como profesionales es totalmente normal que muchas veces no tengamos tiempo de profundizar. Y algo que pasa es que terminamos usando esas palabras esos conceptos, muchas veces sin saber exactamente lo que significan, o sin saber sus capacidades, o como encajan en tu dia a dia.
En folder, somos profecionales con una vara muy alta, tenemos el tren, desde lo tecnicos y puros programadores a los no tan tecnicos, las mentes creativas del disenho.
Dicho eso, quiero comenzar planteando el objetivo de esta charla.
Y ya siendo claro desde el principio, esta es una charla para todo publico. Como dice el titulo, agentes en accion, fundamentos, MCP y codigo. 
Tengo dos objetivos, uno. teorico y otro practico
1 -> Mi objetivo principal es que si llegaste, teniendo una vaga idea de lo que es el mundo de IA, puedas aprender cuales son las ideas base de estos conceptos que estuvimos nombrando y lo importante, es que sepas como se relacionan para que tengas un juicio critico de como elegir tus herramientas luego.
2 -> mi segundo objetivo es que veamos esto en accion, vamos a tener 2 demos (o sea que hay 2 puntos de fallo). una va a ser para la gente tecnica y la otra para gente no tecnica.

Que es un agente?
Agentes en accion, pero, que es un agente?
Bueno aca traemos a colacion un error que se ve mucho en el campo.
que IA usas o que LLM usas?
Que 
y algo que pasa y mucho es que 


LLM <> Agente

y aca les voy a dar varias palabras y quiero ver si la asocian a un LLM o a agente

sonnet, gpt, gh copilot, claude code, opus, gemini, cursor, CodeConnect, chatGPT...

Hay algunos trampa.
Bueno, la idea aca es que tenemos dos conceptos totalmente distintos pero que se connectan fuertemente.

Primero que es un LLM... a lo criollo, no es mas que un predictor de palabras. Y esto sin desmerecerlo, pq tiene ingenieria bestial detras.
Pero quiero que sepamos bien esto, pq la magia de la inteligencia que tenemos hoy en los sistemas no es SOLO por un LLM, sino que hay algo mas que ahora veremos, que es que lo potencia. y esto es clave tenerlo en cuenta como profesionales, pq si todo fuera tan simple como meter un LLM y que te haga las cosas, no tendriamos laburo jajajja
Y junto a LLM viene un concepto que es el token, seguramente ya todos lo saben pero y aca viene un concepto que no vamos a profundizår pero es clave, que es la palabra token, seguramente escucharon la frase de, me comio todos los tokens con 1 prompt... para ser basicos el token es una unidad de informacion que le mandas al LLM y que te devuelta, como un aproximado, podemos decir que 1 token es aprox 1 palabra
Pero antes, algunos ejemplos de LLMs. Los LLMs son distribuidos por empresas y tenes, generalmente 3 dimensiones de pros y cons.

velocidad -> mas rapidos en predecir o mas lentos

contexto -> les podes meter mas informacion para que resuelva tu problema, hay un concepto aca que se llama, la ventana de contexto, cantidad de token que le entra y que salen del LLM.

potencia -> modelos de frontera o no.

Anthropic: haiku, sonnet, opus
Gemini: flash, pro
Open AI: o4, GPT 5.5, GPT 5 mini
Meta: Llama 4
xAI: grok 4
Deepseek: R1
Nvidia: nemotron

bien, pero en la practica, yo escribo un prompt y me codificaron media app o me hicieron esta clase entera.
No parece que sean simples predictores de palabras. hay algo mas.
Y tenes toda la razon, pero aca viene nuestro proximo concepto

Que es un Agente?
realmente no hay una definicion 100% precisa y formal... Pero vamos a atrevernos a llegar a una definicion mediante los problemas que vamos a ir viendo a continuacion...


(estaria bueno que en la diapo, progresivamente vayamos armando un )
problemas:
0 -> priemo vamos a tratar al agente como un orquestador, o el director de orquesta, va a ser el que mueve la batuta para guiar. y ojo que estoy hablando de un simple algoritmo. hace esto y despues esto y despues esto.
comencemos con el mas sencillo:
loop
-llamo al llm con una pregunta
-me responde

1 -> como hago para que actue como yo quiero - system prompt
Y aca vamos a un concepto base, si a un LLM (que solo predice palabras) le decimos que debe actuar de cierta manera, entonces comenzara a predecir de esa manera. Por lo tanto, aca viene la magia del prompt engineering, como se dice. Si le definimos una base de funcionamiento. Por ejemplo, responde la siguiente conversacion como si fueras un experto de IA.
Genial. hasta aca ya tenemos un LLM que me responde como quiero, pero no es tan util asi como esta, pq?
Se acuerdan lo que pasaba hace mucho tiempo? hablabamos con chatgpt y se olvidaba despues de un rato de lo que le dijiste y nos frustrabamos para que nos siga el hilo... bueno, vamos al siguiente problema

ahora nuestro algoritmo:
loop
- sysprompt base + mi prompt
- respuesta

2 -> como hago para que se acuerde - memory
ya tenemos a nuestro "chatbot de IA olvidadizo", ahora vamos a ponerle onda y queremos que tenga memoria y se acuerde de lo que fuimos hablando. como dijimos, un LLM es solo un predictor de palabras, asi que en realidad no se acuerda de lo que hablaste con el, te da esa ilusion pq a la hora de preguntarle de nuevo tenemos la magia de agente que nos permite el siguiente flujo

ahora nuestro algoritmo:
loop
- sysprompt + historial(memory) + mi prompt
- respuesta

3 -> como hago para que ejecute acciones - tools
Hasta aca, me hace acordar a chatGPT en el 2023, se acordaba algo, pero estaba medio encajonado en responderte con muchos emojis nomas. hoy vemos que puede leer archivos, ejecutar comandos, escribir words, etc. Evoluciono inmensamente.
Para ello viene el proximo concepto, herramientas o tools
Estas son acciones que el agente puede ejecutar internamente en sus sistema y asi, ganar informacion/contexto, o ejecutar una accion. Aca estan cosas como crear archivos por ejemplo. fijate como ya el simple chat, ahora puede ayudarnos a hacer cosas reales, estamos en otro nivel ya.

Algoritmo:
loop
- contexto + prompt
    loop
    - necesito usar herramienta?
    - herramienta
- respuesta


DEFINICION FINAL
un agente es un sistema de IA el cual utiliza uno o mas LLMs (0), gestiona contexto(1,2) y utiliza herramientas internas (3) y externas para llegar a una meta.

Ejemplos:
Microsoft: Copilot y gh copilot
Anthropic: claude desktop/code
OpenAI: chatGPT
Google: Gemini (agent)


Y ahora viene una de mis partes favoritas pq estuve trabajando en ella los ultimos varios meses.
Se habran dado cuenta que dijimos herramientas internas y externas... bueno aca viene un 4to problema y un punto fuerte de la charla:

bonus -> como hago para que interactue con el mundo?
Hace no mucho tiempo, los agentes de IA solo estaban encasillados en nuestra maquina. Pero a fines del 2024 comenzo algo que esta revolucionando nuestros sistemas de IA. Esto es, tener herramientas pero para conectar al agente con algo totalmente externo al sistema en donde nos encontramos. esto es el protocolo MCP, model context protocol. Esto tiene menos de 2 anhos y sento la base para que los agentes esten comenzando a salir de la caja y poder accionar en el mundo real.
Esto puede ser muy bueno y muy peligroso jajajaj pero los limites son inimaginables. con esta tecnologia podrias tranquilamente conectar tu agente con tu casa, con un avion, con una central nuclear, con cosas menos peligrosas como tu calendario o mail. y asi el agente conseguir metas fuera de su cajita de encierro.

el algoritmo queda asi:
Algoritmo:
loop
- contexto + prompt
    loop
    - necesito usar herramienta interna o MCP?
    - herramienta
- respuesta

A simple modo, que es y como funciona un MCP, para los rpogramadores en este caso.

El MCP funciona con una arquitectura cliente-servidor
el servidor es un backend que esta desplegado en algun lado y expone al cliente (nuestro agente en este caso) acciones de manera programatica (puede incluso estar desplegado en local), esto es un estilo endpoint para IAs para hacer la analogia. Por ejemplo, vamos a la del calendario... un mcp puede exponer la herramientea de ver las reuniones entre una tiempo y otro... de fondo conectarse a la api de google calendar y buscar las reuniones que tenes en el mes, conn el objetivo de setear un entrevista con ciertas restricciones (sea por la manhana, me deje tiempo para desayunar, me de un relajo deespues para no caer cansado a la otra reunion si hay, que sea de tanto tiempo, etc) por ejemplo, desp el agente usando todas las herramienta que vimos, decidir que quiere buscar entre hoy y el mes que viene, analiza con ese contexto que hay un hueco perfecto la semana que viene el martes a las 10:30, y puede preguntarte si te parece esa hora, le confirmas que si, y el agente decide usar una herramienta que expone el mcp para ejecutar la accion.
Esta es la magia que vamos a ver en un ratito.

Cada empresa puede generar su MCP para conectarse a sus servicios... Incluso folder podria si encontramos el caso de uso, por ejemplo... un MCP de GALA, para crear eventos desde un chat, la dejo picando.

Dicho esto, terminamos con la teoria pero me gustaria dejar suelto algunos detalles mas para los que son tecnicos...
1. si en REST solemos usar JSON, que usamos en MCP?
JSON RPC (remote procedure call)- es un json orientado a pedir que se ejecuten acciones
2. que es un workflow?
Esto es tema para profundizar en otra charla, pero es armar un paso a paso, en donde pueden actuar varios agentes para automatizar una tarea definida. n8n usamos en el CDP de David
3. que es RAG?
Otro tema para otra charla, pero es una forma sofisticada de meterle contexto al agente para que resuelva problemas mejor


Y ahora las demos...