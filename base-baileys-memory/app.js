const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['Escribe el siguiente nombre del punto en la *lista proporcionada* para brindarte la información'])

const flowCarreras = addKeyword(['Carreras', 'carreras']).addAnswer(
    [
        '📘 Genial, aquí tienes información sobre las carreras que ofrecemos:',
        '1. Producción Agraria: Prepara a los estudiantes para la industria agroexportadora del Perú, con énfasis en producción, procesamiento y comercialización de productos agrícolas.',
        '2. Análisis de Sistemas Empresariales: Enfocado en las necesidades de tecnología de la información (TI) en diversas industrias, como banca, logística, retail y seguridad.',
        'Puedes encontrar más detalles en nuestro sitio web:',
        'https://vallegrande.edu.pe/oferta-academica/',
        '\n¿Hay algo más en lo que pueda ayudarte? Simplemente escribe *siguiente* para continuar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowAdmision = addKeyword(['Admisión', 'Admision', 'admision']).addAnswer(
    [
        '📝 Aquí encontrarás información sobre el proceso de admisión:',
        'Valle Grande tiene dos procesos de admisión al año, uno para iniciar clases en marzo y otro para agosto.',
        'El proceso de admisión se realiza por ingreso ordinario, ingreso por exoneración o ingreso extraordinario:',
        'a. **Ingreso Ordinario:** Aprobación del examen de admisión o ingresantes por convenios con otras instituciones.',
        'b. **Ingreso por Exoneración:** Para deportistas calificados, estudiantes talentosos, o quienes ocuparon el primer o segundo puesto de su promoción.',
        'c. **Ingreso Extraordinario:** Autorizado por MINEDU para jóvenes sujetos de becas u otros programas especiales.',
        '[Más información sobre el proceso de admisión](https://vallegrande.edu.pe/admision-y-ayuda/)',
        '\n¿En qué más puedo ayudarte? Escribe *siguiente* para continuar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac', 'grs', 'Ok', 'Oki']).addAnswer(
    [
        '¡De nada! 😊 Si necesitas más información, visita nuestra página web [aquí](https://vallegrande.edu.pe/) o contáctanos directamente en:',
        '- Dirección: Ant. Panamericana Sur: Km. 144, San Vicente de Cañete, Lima, Perú.',
        '\n¿En qué más puedo ayudarte? Escribe *siguiente* para continuar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowContacto = addKeyword(['Contacto']).addAnswer(
    [
        '📞 ¿Necesitas ayuda adicional? Puedes contactarnos directamente aquí:',
        'Mesa de partes e informes:',
        '- Teléfono: +511 581-2261',
        '- Celular & WhatsApp: 991 692 553',
        '- Email: informes@vallegrande.edu.pe',
        'Secretaría Académica:',
        '- Celular & WhatsApp: 991 692 577',
        '- Email: secretariaacademica@vallegrande.edu.pe',
        'Asesoría al Estudiante:',
        '- Celular & WhatsApp: 991 692 547',
        '- Email: atencionalestudiante@vallegrande.edu.pe',
        'Admisión:',
        '- Celular & WhatsApp: 991 692 553',
        '- Email: admision@vallegrande.edu.pe',
        'Marketing e Imagen Institucional:',
        '- Email: dramosq@vallegrande.edu.pe',
        'Laboratorio de Química Agrícola:',
        '- Celular & WhatsApp: 991 692 563',
        '- Email: laboratorio@vallegrande.edu.pe',
        '[Más información de contacto](https://vallegrande.edu.pe/contacto/). Pronto un funcionario se pondrá en contacto contigo.',
        '\n¿En qué más puedo ayudarte? Escribe *siguiente* para continuar.'
    ],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'Hola', 'Informacion'])
.addAnswer('👋 ¡Hola! Soy *Vallegrandino*, el asistente virtual del *I.E.S.T.P. Valle Grande* 💚💙. ¿Cómo puedo ayudarte hoy?')
.addAnswer(
    [
        '¡Aquí estoy para ayudarte! 😊 Por favor, elige una de las siguientes opciones:',
        '1. *Carreras* 📘 para obtener información sobre nuestras carreras.',
        '2. *Admisión* 📝 para conocer el proceso de admisión.',
        '3. *Contacto* 📞 para comunicarte directamente con nosotros.',
        ],
        null,
        null,
        [flowCarreras, flowGracias, flowAdmision, flowContacto]
    )

  
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()