const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock');
const { delay } = require('@whiskeysockets/baileys');

const flowConsulta = addKeyword(['consulta', 'consultar', 'preguntar', 'saber','1'])
    .addAnswer(
        [
            '*¿Deseas saber si contamos con stock de alguna prenda en especifico?*'], {delay:3000})
    .addAnswer(
        [
            'Porfavor, envianos la imagen de las prendas a consultar, incluyendo tallas', 
            '',
            'Revisaremos nuestro stock y un encargado te contactará lo más pronto posible' ], {delay:2000}
    );

const flowPedir = addKeyword(['pedido', 'pedir','2','comprar', 'adquirir', 'conseguir'])
    .addAnswer(
        [
            'Bien, por lo que veo ya sabes que necesitas...'])
    .addAnswer(
        [
            'Por favor, enviame fotos de los productos que deseas adquirir'])
    .addAnswer(
        [ 'Te conectaré con el encargado'],{delay:5000}

    );

const flowInfo = addKeyword(['gracias', 'Gracias', 'okey', 'Okey', 'esta bien']).addAnswer('Tambien te agradecemos, recuerda que:')
    .addAnswer(
        [
            'TIENDA DE ROPA CALEES 💥', 'Casual & Streetwear'], {delay:2000})
    .addAnswer(
        [
            'Horario de atención:',
            '',
            'Lunes a sábado: 9:30 am - 8:30 pm',
            'Domingos: 10:00 am - 1:00 pm'])
    .addAnswer(
                [
                    '📍Ca. Vicente de la Vega #667',
                    '- Chiclayo'])
    ;


const flowPrincipal = addKeyword(['hola', 'ole', 'volver', 'alo', 'buenos días', 'buenas noches', 'buenas tardes', 'que tal', 'que onda', 'gracias','0'])
    .addAnswer('Hola, ¿Cómo estás?, Bienvenido a *CALEES*', {delay:5000})
    .addAnswer(['Aquí encontrarás nuestro catálogo virtual *ACTUALIZADO*📄',' ', '👉https://caleesperu.com/shop/ 🔥'], {delay:2000})
    .addAnswer('1. Deseas *CONSULTAR* por un producto en especifico de nuestro catálogo ❓',{delay:2000})
    .addAnswer('2. O tal vez ya sabes que prendas deseas adquirir, y quieres realizar un *PEDIDO* ✅ ', {delay:1000});

const flowWelcome = addKeyword(EVENTS.WELCOME).addAnswer('Hola, ¿Cómo estás?, Bienvenido a CALEES')
    .addAnswer([
            ' Escribe *CONSULTAR* para saber la disponibilidad de un producto en especifico de nuestro catálogo o *PEDIDO* si ya sabes que prendas deseas adquirir con nosotros'
        ],
        null,
        null,
        [flowConsulta, flowPedir]
    );




    const main = async () => {
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowPrincipal, flowWelcome,flowConsulta,flowPedir, flowInfo])
        const adapterProvider = createProvider(BaileysProvider)
    
        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })
    
        QRPortalWeb()
    }
    
    main()