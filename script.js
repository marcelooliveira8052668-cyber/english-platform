/* ==========================================================================
   FUNÇÃO GLOBAL DE FALA (Text-to-Speech nativa do navegador)
   ========================================================================== */
function falarTexto(textoParaFalar) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textoParaFalar);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Seu navegador não suporta recursos de áudio por voz.");
    }
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
        
        // Configura o texto da tradução, mas deixa oculto inicialmente
        translationBox.innerText = currentData.translation;
        translationBox.className = "translation-hidden";

        optionsBox.innerHTML = "";
        
        // Cria cada alternativa com seu próprio botão de áudio ao lado
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
                e.stopPropagation(); // Evita marcar a resposta ao clicar no áudio
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

/* ==========================================================================
   FUNÇÃO PARA MOSTRAR/OCULTAR A TRADUÇÃO DA PERGUNTA ATUAL
   ========================================================================== */
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

// Inicializa o quiz ao carregar a página
loadQuiz();