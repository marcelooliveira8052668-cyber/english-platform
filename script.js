/* ==========================================================================
   FUNÇÃO GLOBAL DE FALA (Com filtro para voz feminina nativa)
   ========================================================================== */
function falarTexto(textoParaFalar) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textoParaFalar);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // Velocidade ideal para estudo

        // Tenta encontrar uma voz feminina em inglês no navegador
        const voices = window.speechSynthesis.getVoices();
        const vozFeminina = voices.find(voice => 
            (voice.lang === 'en-US' || voice.lang === 'en_US' || voice.lang.startsWith('en')) && 
            (voice.name.toLowerCase().includes('female') || 
             voice.name.toLowerCase().includes('zira') || 
             voice.name.toLowerCase().includes('samantha') || 
             voice.name.toLowerCase().includes('karen') ||
             voice.name.toLowerCase().includes('google us english'))
        );

        // Se achar a voz feminina, define ela; caso contrário, usa a padrão em inglês
        if (vozFeminina) {
            utterance.voice = vozFeminina;
        }

        window.speechSynthesis.speak(utterance);
    } else {
        alert("Seu navegador não suporta recursos de áudio por voz.");
    }
}

// Garante que as vozes estejam carregadas em navegadores como o Chrome
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

/* ==========================================================================
   BANCO DE DADOS EXPANDIDO (30 Textos e Situações Reais com Tradução)
   ========================================================================== */
const questionsDatabase = [
    // 1. Aeroporto / Alfândega
    {
        question: "How do you say at US immigration: 'I am staying here for two weeks'?",
        translation: "Tradução: Como você diz na imigração americana: 'Estarei aqui por duas semanas'?",
        options: [
            "I will live here for two years.",
            "I am staying here for two weeks.",
            "I am working at the airport."
        ],
        correct: 1
    },
    {
        question: "Where is the baggage claim?",
        translation: "Tradução: Onde fica a retirada de bagagens?",
        options: [
            "Where is the baggage claim?",
            "Where is the bathroom?",
            "How much is the ticket?"
        ],
        correct: 0
    },
    {
        question: "The officer asks: 'What is the purpose of your trip?' What does it mean?",
        translation: "Tradução: O oficial pergunta: 'Qual é o propósito da sua viagem?' O que isso significa?",
        options: [
            "Qual é o preço da passagem?",
            "Qual é o propósito da sua viagem?",
            "Onde você perdeu sua mala?"
        ],
        correct: 1
    },

    // 2. Ajudando um americano perdido no Brasil
    {
        question: "An American is lost and you want to say: 'You need to take the subway'?",
        translation: "Tradução: Um americano está perdido e você quer dizer: 'Você precisa pegar o metrô'?",
        options: [
            "You need to take the subway.",
            "You bought a new car.",
            "She loves eating pizza."
        ],
        correct: 0
    },
    {
        question: "How to tell him: 'It is right around the corner'?",
        translation: "Tradução: Como dizer a ele: 'Fica logo ali na esquina'?",
        options: [
            "It is very far from here.",
            "It is right around the corner.",
            "Tomorrow is another day."
        ],
        correct: 1
    },
    {
        question: "To offer help politely: 'Can I help you find the address?'",
        translation: "Tradução: Para oferecer ajuda educadamente: 'Posso te ajudar a encontrar o endereço?'",
        options: [
            "Can I help you find the address?",
            "Do you want to buy my house?",
            "What time is the meeting?"
        ],
        correct: 0
    },

    // 3. Alimentação / Restaurantes
    {
        question: "How do you ask for the check in a restaurant in English?",
        translation: "Tradução: Como você pede a conta em um restaurante em inglês?",
        options: [
            "Can I have the menu, please?",
            "Can I have the check, please?",
            "Where is the kitchen?"
        ],
        correct: 1
    },
    {
        question: "To tell the waiter: 'I would like a coffee with milk, please'?",
        translation: "Tradução: Para dizer ao garçom: 'Eu gostaria de um café com leite, por favor'?",
        options: [
            "I would like a coffee with milk, please.",
            "I don't like drinking water.",
            "Give me some cold juice."
        ],
        correct: 0
    },
    {
        question: "How to ask if a dish contains pork due to dietary restrictions?",
        translation: "Tradução: Como perguntar se um prato contém porco por restrição alimentar?",
        options: [
            "Does this dish have pork in it?",
            "Is this table clean?",
            "How much is the dessert?"
        ],
        correct: 0
    },
    {
        question: "To praise the food: 'The food was delicious!'",
        translation: "Tradução: Para elogiar a comida: 'A comida estava deliciosa!'",
        options: [
            "The food was terrible.",
            "The food was delicious!",
            "The check was very expensive."
        ],
        correct: 1
    },

    // 4. Emprego e Entrevistas
    {
        question: "In an interview, how to talk about your experience: 'I worked with web development for three years'?",
        translation: "Tradução: Em uma entrevista, como falar sobre sua experiência: 'Eu trabalhei com desenvolvimento web por três anos'?",
        options: [
            "I will work at home tomorrow.",
            "I worked with web development for three years.",
            "I never touch a computer."
        ],
        correct: 1
    },
    {
        question: "How to state your main qualities: 'I am focused on solving problems'?",
        translation: "Tradução: Como declarar suas principais qualidades: 'Eu sou focado em resolver problemas'?",
        options: [
            "I am focused on solving problems.",
            "I am very lazy at work.",
            "I hate solving issues."
        ],
        correct: 0
    },
    {
        question: "How to ask about career growth opportunities in the company?",
        translation: "Tradução: Como perguntar sobre oportunidades de crescimento de carreira na empresa?",
        options: [
            "What are the career growth opportunities here?",
            "When is payday?",
            "Can I sleep at the office?"
        ],
        correct: 0
    },
    {
        question: "To accept a professional challenge: 'I am ready for this new project'?",
        translation: "Tradução: Para aceitar um desafio profissional: 'Estou pronto para este novo projeto'?",
        options: [
            "I am ready for this new project.",
            "I am afraid of computers.",
            "This project is closed."
        ],
        correct: 0
    },

    // 5. Com Amigos e Vida Social
    {
        question: "How to invite a friend out: 'Do you want to hang out tonight?'",
        translation: "Tradução: Como convidar um amigo para sair: 'Quer sair hoje à noite?'",
        options: [
            "Do you want to hang out tonight?",
            "Are you working next week?",
            "Where were you yesterday?"
        ],
        correct: 0
    },
    {
        question: "To say: 'It was nice to see you again!'",
        translation: "Tradução: Para dizer: 'Foi muito bom ver você de novo!'",
        options: [
            "It was nice to see you again!",
            "Go away from me.",
            "I don't know you."
        ],
        correct: 0
    },
    {
        question: "How to answer when someone asks 'How is it going?'",
        translation: "Tradução: Como responder quando alguém pergunta 'Como vão as coisas?'",
        options: [
            "Everything is great, and you?",
            "My name is Marcelo.",
            "I live in a garage."
        ],
        correct: 0
    },
    {
        question: "To plan something: 'Call me later so we can talk'",
        translation: "Tradução: Para combinar algo: 'Me liga mais tarde para conversarmos'",
        options: [
            "Call me later so we can talk.",
            "Don't talk to me anymore.",
            "Send me an email in 2030."
        ],
        correct: 0
    },

    // 6. Com a Família e Casa
    {
        question: "How to tell the family: 'Dinner is ready on the table'?",
        translation: "Tradução: Como dizer para a família: 'O jantar está pronto na mesa'?",
        options: [
            "Dinner is ready on the table.",
            "The house is on fire.",
            "Nobody is hungry today."
        ],
        correct: 0
    },
    {
        question: "To ask for help with groceries: 'Can you help me carry these bags?'",
        translation: "Tradução: Para pedir ajuda com as compras: 'Você pode me ajudar a carregar estas sacolas?'",
        options: [
            "Can you help me carry these bags?",
            "Where is my computer?",
            "Let's play video games."
        ],
        correct: 0
    },
    {
        question: "How to ask family members: 'How was your day?'",
        translation: "Tradução: Como perguntar aos familiares: 'Como foi o seu dia?'",
        options: [
            "How was your day?",
            "What time is it?",
            "Where is the car key?"
        ],
        correct: 0
    },

    // 7. Viagens, Hotéis e Ruas
    {
        question: "At the hotel counter, how to check in: 'I have a reservation under the name Silva'?",
        translation: "Tradução: No balcão do hotel, como fazer o check-in: 'Eu tenho uma reserva no nome de Silva'?",
        options: [
            "I have a reservation under the name Silva.",
            "I lost my hotel room.",
            "How much is a flight to Miami?"
        ],
        correct: 0
    },
    {
        question: "How to ask for the Wi-Fi password at a hotel or restaurant?",
        translation: "Tradução: Como pedir a senha do Wi-Fi em um hotel ou restaurante?",
        options: [
            "What is the Wi-Fi password, please?",
            "Where is the swimming pool?",
            "Can I pay with cash?"
        ],
        correct: 0
    },
    {
        question: "To ask where the nearest train station is:",
        translation: "Tradução: Para perguntar onde fica a estação de trem mais próxima:",
        options: [
            "Where is the nearest train station?",
            "Is it raining outside?",
            "What time does the store open?"
        ],
        correct: 0
    },
    {
        question: "To ask a favor on the street: 'Excuse me, do you know what time it is?'",
        translation: "Tradução: Para pedir um favor na rua: 'Com licença, você sabe que horas são?'",
        options: [
            "Excuse me, do you know what time it is?",
            "Stop talking to me.",
            "Give me your watch."
        ],
        correct: 0
    },

    // 8. Tecnologia, Trabalho Remoto e Startups
    {
        question: "In a Google Meet meeting, how to say: 'My microphone was muted'?",
        translation: "Tradução: Em uma reunião no Google Meet, como dizer: 'Meu microfone estava mutado'?",
        options: [
            "My microphone was muted.",
            "The internet is very fast.",
            "I am sharing my screen."
        ],
        correct: 0
    },
    {
        question: "How to warn the team: 'I am going to push the updated code to GitHub'?",
        translation: "Tradução: Como avisar a equipe: 'Vou subir o código atualizado para o GitHub'?",
        options: [
            "I am going to push the updated code to GitHub.",
            "I deleted the entire website.",
            "The computer is broken."
        ],
        correct: 0
    },
    {
        question: "To talk about deadlines: 'We need to deliver this task by Friday'?",
        translation: "Tradução: Para falar sobre prazos: 'Precisamos entregar esta tarefa até sexta-feira'?",
        options: [
            "We need to deliver this task by Friday.",
            "We started this company last year.",
            "Nobody likes working here."
        ],
        correct: 0
    },
    {
        question: "To pitch an innovative idea to investors:",
        translation: "Tradução: Para apresentar uma ideia inovadora para investidores:",
        options: [
            "We have a disruptive solution for the market.",
            "Our office is closed today.",
            "We don't have any customers."
        ],
        correct: 0
    },
    {
        question: "Hitting a milestone: 'We achieved our goal this quarter!'",
        translation: "Tradução: Atingindo uma meta: 'Conseguimos bater nossa meta deste trimestre!'",
        options: [
            "We achieved our goal this quarter!",
            "We failed all our projects.",
            "Let's cancel the company."
        ],
        correct: 0
    }
];

let currentQuestionIndex = 0;

const questionText = document.getElementById("question-text");
const translationBox = document.getElementById("translation-box");
const optionsBox = document.getElementById("options-box");
const quizContainer = document.getElementById("quiz-container");
const resultBox = document.getElementById("result-box");
const feedbackText = document.getElementById("feedback-text");

function loadQuiz() {
    if (currentQuestionIndex < questionsDatabase.length) {
        const currentData = questionsDatabase[currentQuestionIndex];
        
        questionText.innerText = `Questão ${currentQuestionIndex + 1} de ${questionsDatabase.length}: ${currentData.question}`;
        
        translationBox.innerText = currentData.translation;
        translationBox.className = "translation-hidden";

        optionsBox.innerHTML = "";
        
        currentData.options.forEach((optionText, index) => {
            const optionRow = document.createElement("div");
            optionRow.className = "option-row";

            const btnOption = document.createElement("button");
            btnOption.innerText = optionText;
            btnOption.className = "btn-option-text";
            btnOption.onclick = () => checkAnswer(index, currentData.correct);

            const btnAudioOption = document.createElement("button");
            btnAudioOption.innerHTML = "🔊 Ouvir";
            btnAudioOption.className = "btn-audio-option";
            btnAudioOption.title = "Ouvir pronúncia desta alternativa";
            btnAudioOption.onclick = (e) => {
                e.stopPropagation();
                falarTexto(optionText);
            };

            optionRow.appendChild(btnOption);
            optionRow.appendChild(btnAudioOption);
            optionsBox.appendChild(optionRow);
        });

        quizContainer.classList.remove("hidden");
        resultBox.classList.add("hidden");
    } else {
        quizContainer.innerHTML = "🎉 <strong>Parabéns!</strong> Você completou todos os 30 desafios práticos do ecossistema de conversação!";
        resultBox.classList.add("hidden");
    }
}

function toggleTranslation() {
    if (translationBox.classList.contains("translation-hidden")) {
        translationBox.classList.remove("translation-hidden");
        translationBox.classList.add("translation-visible");
    } else {
        translationBox.classList.remove("translation-visible");
        translationBox.classList.add("translation-hidden");
    }
}

function checkAnswer(selectedIndex, correctIndex) {
    quizContainer.classList.add("hidden");
    resultBox.classList.remove("hidden");

    if (selectedIndex === correctIndex) {
        feedbackText.innerText = "✅ Correto! Excelente vocabulário assimilado!";
        feedbackText.style.color = "#4ade80";
    } else {
        feedbackText.innerText = "❌ Ops! Errado. Use o botão de tradução e escute as opções para tentar de novo.";
        feedbackText.style.color = "#f87171";
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuiz();
}

loadQuiz();

/* ==========================================================================
   BANCO DE DADOS: 100 PALAVRAS E 50 FRASES DO COTIDIANO
   ========================================================================== */
const listaPalavras = [
    { en: "Always", pt: "Sempre", pron: "ól-uéis" },
    { en: "Never", pt: "Nunca", pron: "né-vêr" },
    { en: "Today", pt: "Hoje", pron: "tu-dêi" },
    { en: "Tomorrow", pt: "Amanhã", pron: "tu-mó-rôu" },
    { en: "Yesterday", pt: "Ontem", pron: "yês-têr-dêi" },
    { en: "Now", pt: "Agora", pron: "náu" },
    { en: "Later", pt: "Mais tarde", pron: "lêi-têr" },
    { en: "Here", pt: "Aqui", pron: "rîr" },
    { en: "There", pt: "Lá / Ali", pron: "ðêr" },
    { en: "Friend", pt: "Amigo", pron: "frênd" },
    { en: "Family", pt: "Família", pron: "fé-mi-li" },
    { en: "Work", pt: "Trabalho", pron: "uôrk" },
    { en: "Home", pt: "Casa", pron: "rôm" },
    { en: "Food", pt: "Comida", pron: "fûd" },
    { en: "Water", pt: "Água", pron: "uó-têr" },
    { en: "Coffee", pt: "Café", pron: "kó-fi" },
    { en: "Money", pt: "Dinheiro", pron: "mâ-ni" },
    { en: "Time", pt: "Tempo / Hora", pron: "táim" },
    { en: "Day", pt: "Dia", pron: "dêi" },
    { en: "Night", pt: "Noite", pron: "náit" },
    { en: "Morning", pt: "Manhã", pron: "mór-ning" },
    { en: "Week", pt: "Semana", pron: "uîk" },
    { en: "Year", pt: "Ano", pron: "yîr" },
    { en: "Help", pt: "Ajuda / Ajudar", pron: "hêlp" },
    { en: "Question", pt: "Pergunta", pron: "kuês-chôn" },
    { en: "Answer", pt: "Resposta", pron: "ên-sêr" },
    { en: "Problem", pt: "Problema", pron: "pró-blêm" },
    { en: "Solution", pt: "Solução", pron: "su-lû-shôn" },
    { en: "Idea", pt: "Ideia", pron: "ái-dî-a" },
    { en: "Job", pt: "Emprego", pron: "djâb" },
    { en: "Company", pt: "Empresa", pron: "câm-pa-ni" },
    { en: "Meeting", pt: "Reunião", pron: "mî-ting" },
    { en: "Project", pt: "Projeto", pron: "pró-djêct" },
    { en: "Computer", pt: "Computador", pron: "côm-pyû-têr" },
    { en: "Phone", pt: "Telefone", pron: "fôn" },
    { en: "Email", pt: "E-mail", pron: "î-mêil" },
    { en: "Message", pt: "Mensagem", pron: "mé-sê-dj" },
    { en: "Street", pt: "Rua", pron: "strît" },
    { en: "Car", pt: "Carro", pron: "câr" },
    { en: "Bus", pt: "Ônibus", pron: "bâs" },
    { en: "Train", pt: "Trem", pron: "trêin" },
    { en: "Store", pt: "Loja", pron: "stôr" },
    { en: "Price", pt: "Preço", pron: "práis" },
    { en: "Card", pt: "Cartão", pron: "cârd" },
    { en: "Cash", pt: "Dinheiro em espécie", pron: "césh" },
    { en: "Door", pt: "Porta", pron: "dôr" },
    { en: "Window", pt: "Janela", pron: "uîn-dôu" },
    { en: "Key", pt: "Chave", pron: "kî" },
    { en: "Book", pt: "Livro", pron: "bûk" },
    { en: "Pen", pt: "Caneta", pron: "pên" },
    { en: "Paper", pt: "Papel", pron: "pêi-pêr" },
    { en: "City", pt: "Cidade", pron: "sí-ti" },
    { en: "Country", pt: "País", pron: "cân-tri" },
    { en: "World", pt: "Mundo", pron: "uôrld" },
    { en: "People", pt: "Pessoas", pron: "pî-pôl" },
    { en: "Child", pt: "Criança", pron: "cháild" },
    { en: "School", pt: "Escola", pron: "skûl" },
    { en: "Student", pt: "Estudante", pron: "stû-dênt" },
    { en: "Teacher", pt: "Professor", pron: "tî-chêr" },
    { en: "Language", pt: "Idioma", pron: "lên-guê-dj" },
    { en: "Word", pt: "Palavra", pron: "uôrd" },
    { en: "Sentence", pt: "Frase", pron: "sên-têns" },
    { en: "Music", pt: "Música", pron: "myû-zic" },
    { en: "Movie", pt: "Filme", pron: "mû-vi" },
    { en: "Game", pt: "Jogo", pron: "gêim" },
    { en: "Picture", pt: "Foto / Imagem", pron: "píc-chêr" },
    { en: "Gift", pt: "Presente", pron: "gîft" },
    { en: "Shop", pt: "Comprar / Loja", pron: "shâp" },
    { en: "Market", pt: "Mercado", pron: "mâr-kêt" },
    { en: "Doctor", pt: "Médico", pron: "dôc-têr" },
    { en: "Hospital", pt: "Hospital", pron: "hôs-pi-tâl" },
    { en: "Medicine", pt: "Remédio", pron: "mé-di-sin" },
    { en: "Ticket", pt: "Passagem / Ingresso", pron: "tí-kêt" },
    { en: "Bag", pt: "Mola / Sacola", pron: "bég" },
    { en: "Clothes", pt: "Roupas", pron: "clôuðz" },
    { en: "Shoes", pt: "Sapatos", pron: "shûz" },
    { en: "Sun", pt: "Sol", pron: "sân" },
    { en: "Rain", pt: "Chuva", pron: "rêin" },
    { en: "Wind", pt: "Vento", pron: "uînd" },
    { en: "Fire", pt: "Fogo", pron: "fái-êr" },
    { en: "Air", pt: "Ar", pron: "êr" },
    { en: "Love", pt: "Amor", pron: "lâv" },
    { en: "Happy", pt: "Feliz", pron: "hé-pi" },
    { en: "Sad", pt: "Triste", pron: "séd" },
    { en: "Good", pt: "Bom", pron: "gûd" },
    { en: "Bad", pt: "Ruim", pron: "béd" },
    { en: "Big", pt: "Grande", pron: "bîg" },
    { en: "Small", pt: "Pequeno", pron: "smôl" },
    { en: "New", pt: "Novo", pron: "nû" },
    { en: "Old", pt: "Velho / Antigo", pron: "ôuld" },
    { en: "Hot", pt: "Quente", pron: "hât" },
    { en: "Cold", pt: "Frio", pron: "côuld" },
    { en: "Fast", pt: "Rápido", pron: "fést" },
    { en: "Slow", pt: "Lento", pron: "slôu" },
    { en: "Easy", pt: "Fácil", pron: "î-zi" },
    { en: "Hard", pt: "Difícil / Duro", pron: "hârd" },
    { en: "Clean", pt: "Limpo", pron: "clîn" },
    { en: "Open", pt: "Aberto", pron: "ôu-pên" },
    { en: "Closed", pt: "Fechado", pron: "clôu-zd" },
    { en: "Right", pt: "Certo / Direita", pron: "ráit" }
];

const listaFrases = [
    { en: "How are you doing today?", pt: "Como você está hoje?", pron: "háu âr iu dû-ing tu-dêi?" },
    { en: "What do you do for a living?", pt: "O que você faz da vida (trabalho)?", pron: "uât dû iu dû fôr â lî-ving?" },
    { en: "I am learning English every single day.", pt: "Eu estou aprendendo inglês todo santo dia.", pron: "ái êm lâr-ning íng-glîsh év-ri sîn-gôl dêi." },
    { en: "Could you repeat that, please?", pt: "Você poderia repetir isso, por favor?", pron: "cûd iu ri-pît ðét, plîz?" },
    { en: "I don't understand this word.", pt: "Eu não entendo esta palavra.", pron: "ái dônt ânder-sténd ðis uôrd." },
    { en: "Where is the nearest restroom?", pt: "Onde fica o banheiro mais próximo?", pron: "uêr íz ðê nî-rêst rûst-rûm?" },
    { en: "How much does this cost?", pt: "Quanto custa isto?", pron: "háu mâch dâz ðis côst?" },
    { en: "I would like a cup of coffee, please.", pt: "Eu gostaria de uma xícara de café, por favor.", pron: "ái wûd láik â câp ôv kó-fi, plîz." },
    { en: "Can I pay with credit card?", pt: "Eu posso pagar com cartão de crédito?", pron: "cên ái pêi wîð créd-it cârd?" },
    { en: "What time is it right now?", pt: "Que horas são agora?", pron: "uât táim íz ít ráit náu?" },
    { en: "Have a wonderful day ahead!", pt: "Tenha um dia maravilhoso!", pron: "hév â wân-dêr-fûl dêi â-hêd!" },
    { en: "See you later alligator!", pt: "Até mais tarde!", pron: "sî íyu lêi-têr!" },
    { en: "Thank you very much for your help.", pt: "Muito obrigado pela sua ajuda.", pron: "thénk iu vé-ri mâch fôr yôr hêlp." },
    { en: "Excuse me, can you help me?", pt: "Com licença, você pode me ajudar?", pron: "êx-kyûz mî, cên iu hêlp mî?" },
    { en: "I am looking for a good job.", pt: "Eu estou procurando um bom emprego.", pron: "ái êm lû-king fôr â gûd djâb." },
    { en: "Let's work together on this project.", pt: "Vamos trabalhar juntos neste projeto.", pron: "lêts uôrk tu-gê-ðêr ôn ðis pró-djêct." },
    { en: "My computer is not working properly.", pt: "Meu computador não está funcionando direito.", pron: "mái côm-pyû-têr íz nât uôr-king pró-pêr-li." },
    { en: "Please send me an email later.", pt: "Por favor, me mande um e-mail mais tarde.", pron: "plîz sênd mî ên î-mêil lêi-têr." },
    { en: "The weather is amazing today.", pt: "O clima está incrível hoje.", pron: "ðê uê-ðêr íz â-mê-zing tu-dêi." },
    { en: "I need to buy some groceries.", pt: "Eu preciso comprar algumas compras de mercado.", pron: "ái nîd tû bái sâm grô-sê-riz." },
    { en: "Turn left at the next corner.", pt: "Vire à esquerda na próxima esquina.", pron: "tûrn lêft ét ðê néxt côr-nêr." },
    { en: "Turn right at the traffic lights.", pt: "Vire à direita no semáforo.", pron: "tûrn ráit ét ðê tré-fic láits." },
    { en: "I live near the city center.", pt: "Eu moro perto do centro da cidade.", pron: "ái lîv nîr ðê sí-ti cên-têr." },
    { en: "What is your phone number?", pt: "Qual é o seu número de telefone?", pron: "uât íz yôr fôn nâm-bêr?" },
    { en: "I am happy to meet you.", pt: "Estou feliz em conhecer você.", pron: "ái êm hé-pi tû mî-t iu." },
    { en: "Everything is under control.", pt: "Está tudo sob controle.", pron: "é-vri-thing íz ânder cên-trôl." },
    { en: "Do you speak Portuguese?", pt: "Você fala português?", pron: "dû iu spîk pôr-tu-gîz?" },
    { en: "Just a little bit, but I am learning.", pt: "Só um pouquinho, mas estou aprendendo.", pron: "djâst â lî-tôl bít, bât ái êm lâr-ning." },
    { en: "What is your favorite food?", pt: "Qual é a sua comida favorita?", pron: "uât íz yôr fêi-vô-rit fûd?" },
    { en: "I like listening to music while working.", pt: "Eu gosto de ouvir música enquanto trabalho.", pron: "ái láik lî-sê-ning tû myû-zic wáil uôr-king." },
    { en: "Let's make a video call tonight.", pt: "Vamos fazer uma chamada de vídeo hoje à noite.", pron: "lêts mêik â vî-di-ô côl tu-náit." },
    { en: "I have a meeting at 10 AM.", pt: "Eu tenho uma reunião às 10 da manhã.", pron: "ái hév â mî-ting ét tên ê-êm." },
    { en: "Can you send me the file?", pt: "Você pode me mandar o arquivo?", pron: "cên iu sênd mî ðê fáil?" },
    { en: "The internet connection is slow.", pt: "A conexão de internet está lenta.", pron: "ðê în-têr-nêt cô-néc-shôn íz slôu." },
    { en: "I forgot my password.", pt: "Eu esqueci minha senha.", pron: "ái fêr-gât mái pés-wôrd." },
    { en: "Please open the door.", pt: "Por favor, abra a porta.", pron: "plîz ôu-pên ðê dôr." },
    { en: "Close the window, it's cold.", pt: "Feche a janela, está frio.", pron: "clôu-zd ðê uîn-dôu, íts côuld." },
    { en: "Where did I put my keys?", pt: "Onde eu coloquei minhas chaves?", pron: "uêr díd ái pût mái kîz?" },
    { en: "I am running late for work.", pt: "Estou me atrasando para o trabalho.", pron: "ái êm râ-ning lêit fôr uôrk." },
    { en: "Take an umbrella, it might rain.", pt: "Leve um guarda-chuva, pode chover.", pron: "têik ên âm-bré-la, ít máit rêin." },
    { en: "I am proud of my progress.", pt: "Eu tenho orgulho do meu progresso.", pron: "ái êm práud ôv mái pró-grês." },
    { en: "Never give up on your dreams.", pt: "Nunca desista dos seus sonhos.", pron: "né-vêr gîv âp ôn yôr drîmz." },
    { en: "Hard work brings good results.", pt: "Trabalho duro traz bons resultados.", pron: "hârd uôrk brîngs gûd ri-zâlts." },
    { en: "Success comes with practice.", pt: "O sucesso vem com a prática.", pron: "sôk-sês câms wîð pré-ctis." },
    { en: "I will achieve my goals.", pt: "Eu vou alcançar minhas metas.", pron: "ái wûl â-chîv mái gôulz." },
    { en: "Life is full of surprises.", pt: "A vida é cheia de surpresas.", pron: "láif íz fûl ôv sêr-prái-zîz." },
    { en: "Always look on the bright side.", pt: "Sempre olhe pelo lado positivo.", pron: "ól-uéis lûk ôn ðê bráit sáid." },
    { en: "Time flies when you are having fun.", pt: "O tempo voa quando você está se divertindo.", pron: "táim fláis wên iu âr hé-ving fân." },
    { en: "Practice makes perfection.", pt: "A prática leva à perfeição.", pron: "pré-ctis mêiks pêr-féc-shôn." },
    { en: "Everything is going to be fine.", pt: "Vai dar tudo certo.", pron: "é-vri-thing íz gô-ing tû bî fáin." }
];

function mostrarSecao(tipo) {
    const container = document.getElementById("glossario-container");
    const btnPalavras = document.getElementById("btn-tab-palavras");
    const btnFrases = document.getElementById("btn-tab-frases");
    
    container.innerHTML = "";

    if (tipo === 'palavras') {
        btnPalavras.style.backgroundColor = "#0ea5e9";
        btnFrases.style.backgroundColor = "#64748b";

        listaPalavras.forEach((item, index) => {
            container.appendChild(criarLinhaItem(index + 1, item.en, item.pt, item.pron));
        });
    } else {
        btnFrases.style.backgroundColor = "#0ea5e9";
        btnPalavras.style.backgroundColor = "#64748b";

        listaFrases.forEach((item, index) => {
            container.appendChild(criarLinhaItem(index + 1, item.en, item.pt, item.pron));
        });
    }
}

function criarLinhaItem(numero, ingles, portugues, pronuncia) {
    const row = document.createElement("div");
    row.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0; gap: 10px;";

    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<strong style="color: #0284c7; font-size: 15px;">${numero}. ${ingles}</strong><br><span style="font-size: 13px; color: #475569;">💡 ${portugues}</span><br><span style="font-size: 12px; color: #94a3b8; font-style: italic;">🗣️ ${pronuncia}</span>`;

    const btnOuvir = document.createElement("button");
    btnOuvir.innerHTML = "🔊 Ouvir";
    btnOuvir.className = "btn-audio";
    btnOuvir.style.padding = "8px 12px";
    btnOuvir.onclick = () => falarTexto(ingles);

    row.appendChild(infoDiv);
    row.appendChild(btnOuvir);
    return row;
}

mostrarSecao('palavras');